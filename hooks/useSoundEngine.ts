'use client';

import { useCallback, useRef } from 'react';
import { SwitchSound } from '@/lib/types';
import { SoundSignature } from '@/keyboards/_base/types';

// Procedural keyboard sound synthesis with per-keyboard signature support.
// A SoundSignature tweaks pitch/body/click/noise/resonance so each keyboard
// sounds distinct even when its procedural family is the same.

interface SoundEngineState {
  ctx: AudioContext | null;
  volume: number;
  muted: boolean;
  audioCache: Map<string, AudioBuffer>;
  fetching: Set<string>;
  noiseBuffer: AudioBuffer | null;
  lastPlayTs: number;
}

// One big noise buffer shared across all presses. Source nodes pick a random
// offset each play so successive keystrokes sound different without allocating.
const NOISE_DUR_SEC = 1.0;
function getNoiseBuffer(ctx: AudioContext, state: SoundEngineState): AudioBuffer {
  if (state.noiseBuffer) return state.noiseBuffer;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * NOISE_DUR_SEC);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  state.noiseBuffer = buffer;
  return buffer;
}

function playSynth(
  ctx: AudioContext,
  masterGain: GainNode,
  sig: SoundSignature,
  state: SoundEngineState,
) {
  const now = ctx.currentTime;
  const family = sig.base;
  const pitch = sig.pitch ?? 1.0;
  const bodyAmp = sig.body ?? 1.0;
  const clickAmp = sig.click ?? 1.0;
  const noiseAmp = sig.noise ?? 1.0;
  const decay = sig.decay ?? 1.0;
  const resonance = sig.resonance ?? 1.0;
  const damped = sig.damped ?? false;

  // Body — low-frequency thump representing keycap striking stem
  const bodyFreq =
    (family === 'linear' ? 110 : family === 'tactile' ? 145 : 195) * pitch;
  const bodyDur = (family === 'linear' ? 0.08 : family === 'tactile' ? 0.1 : 0.08) * decay;

  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = damped ? 'sine' : family === 'clicky' ? 'triangle' : 'sine';
  osc.frequency.setValueAtTime(bodyFreq + Math.random() * 20, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(30, bodyFreq * 0.45), now + bodyDur);
  const bodyGainVal = (damped ? 0.22 : 0.4) * bodyAmp;
  oscGain.gain.setValueAtTime(bodyGainVal, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + bodyDur);
  osc.connect(oscGain).connect(masterGain);
  osc.start(now);
  osc.stop(now + bodyDur + 0.02);

  // Click — high-frequency transient (tactile/clicky only, or if clickAmp > 0)
  if (!damped && clickAmp > 0 && (family !== 'linear' || clickAmp > 0.6)) {
    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    const clickFreq =
      (family === 'clicky' ? 4200 : family === 'tactile' ? 2500 : 1800) * pitch;
    click.type = 'square';
    click.frequency.setValueAtTime(clickFreq + Math.random() * 500, now);
    click.frequency.exponentialRampToValueAtTime(Math.max(400, clickFreq * 0.3), now + 0.015);
    const clickDur = family === 'clicky' ? 0.015 : 0.02;
    const clickAmpFinal = (family === 'clicky' ? 0.24 : family === 'tactile' ? 0.16 : 0.08) * clickAmp;
    clickGain.gain.setValueAtTime(clickAmpFinal, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + clickDur);
    click.connect(clickGain).connect(masterGain);
    click.start(now);
    click.stop(now + clickDur + 0.01);
  }

  // Noise — shared buffer, random offset; no per-press allocation
  if (noiseAmp > 0) {
    const buffer = getNoiseBuffer(ctx, state);
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const maxOffset = Math.max(0, buffer.duration - 0.1);
    const filter = ctx.createBiquadFilter();
    const bandCenter = family === 'clicky' ? 3200 : family === 'tactile' ? 1400 : 900;
    filter.type = damped ? 'lowpass' : family === 'clicky' ? 'highpass' : 'bandpass';
    filter.frequency.setValueAtTime(bandCenter + Math.random() * 400, now);
    filter.Q.setValueAtTime(1.5 * resonance, now);
    const ng = ctx.createGain();
    const nGain = (damped ? 0.08 : family === 'clicky' ? 0.18 : 0.14) * noiseAmp;
    ng.gain.setValueAtTime(nGain, now);
    ng.gain.exponentialRampToValueAtTime(0.001, now + 0.04 * decay);
    noise.connect(filter).connect(ng).connect(masterGain);
    noise.start(now, Math.random() * maxOffset, 0.05 * decay + 0.02);
  }
}

export function useSoundEngine() {
  const stateRef = useRef<SoundEngineState>({
    ctx: null,
    volume: 0.7,
    muted: false,
    audioCache: new Map(),
    fetching: new Set(),
    noiseBuffer: null,
    lastPlayTs: 0,
  });

  const ensureContext = useCallback(() => {
    if (!stateRef.current.ctx) {
      stateRef.current.ctx = new AudioContext();
    }
    if (stateRef.current.ctx.state === 'suspended') stateRef.current.ctx.resume();
    return stateRef.current.ctx;
  }, []);

  const playBuffer = useCallback((buffer: AudioBuffer, masterGain: GainNode, ctx: AudioContext, pitch: number = 1) => {
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = pitch * (0.95 + Math.random() * 0.1);
    source.connect(masterGain);
    source.start(0);
  }, []);

  const playKeySound = useCallback(
    (profileOrSig: SwitchSound | SoundSignature, soundUrl?: string) => {
      const state = stateRef.current;
      if (state.muted) return;

      // Throttle — drop presses that arrive within 8ms of prior (debounce autorepeat floods)
      const nowMs = performance.now();
      if (nowMs - state.lastPlayTs < 8) return;
      state.lastPlayTs = nowMs;

      const ctx = ensureContext();

      const sig: SoundSignature =
        typeof profileOrSig === 'string'
          ? { base: profileOrSig, url: soundUrl }
          : profileOrSig;

      const masterGain = ctx.createGain();
      const vol = state.volume * (0.9 + Math.random() * 0.15);
      masterGain.gain.setValueAtTime(vol, ctx.currentTime);
      masterGain.connect(ctx.destination);

      const url = sig.url ?? soundUrl;
      if (url) {
        if (state.audioCache.has(url)) {
          playBuffer(state.audioCache.get(url)!, masterGain, ctx, sig.pitch ?? 1);
          return;
        }
        if (!state.fetching.has(url)) {
          state.fetching.add(url);
          fetch(url)
            .then((res) => res.arrayBuffer())
            .then((data) => ctx.decodeAudioData(data))
            .then((buffer) => {
              state.audioCache.set(url, buffer);
              state.fetching.delete(url);
              playBuffer(buffer, masterGain, ctx, sig.pitch ?? 1);
            })
            .catch(() => {
              state.fetching.delete(url);
              playSynth(ctx, masterGain, sig, state);
            });
        } else {
          playSynth(ctx, masterGain, sig, state);
        }
        return;
      }

      playSynth(ctx, masterGain, sig, state);
    },
    [ensureContext, playBuffer]
  );

  const setVolume = useCallback((v: number) => {
    stateRef.current.volume = Math.max(0, Math.min(1, v));
  }, []);

  const setMuted = useCallback((m: boolean) => {
    stateRef.current.muted = m;
  }, []);

  const getVolume = useCallback(() => stateRef.current.volume, []);
  const getMuted = useCallback(() => stateRef.current.muted, []);

  return { playKeySound, setVolume, setMuted, getVolume, getMuted, ensureContext };
}
