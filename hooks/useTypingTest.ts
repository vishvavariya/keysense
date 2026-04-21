'use client';

import { useCallback, useRef, useState } from 'react';

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog near the riverbank at dawn.",
  "Pack my box with five dozen liquor jugs and ship them before midnight.",
  "How vexingly quick daft zebras jump over the fallen log in the meadow.",
  "A wizard's job is to vex chumps quickly in foggy weather conditions.",
  "Sphinx of black quartz, judge my vow to become a faster typist today.",
  "The five boxing wizards jump quickly across the foggy bridge at noon.",
  "Crazy Frederick bought many very exquisite opal jewels from the shop.",
  "We promptly judged antique ivory buckles for the next prize ceremony.",
  "Sixty zippers were quickly picked from the woven jute bag on display.",
  "Grumpy wizards make toxic brew for the evil queen and her jack puppet.",
];

export function useTypingTest() {
  const [text] = useState(() => SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const startTimeRef = useRef<number>(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleChar = useCallback((char: string) => {
    if (finished) return;

    if (!started) {
      setStarted(true);
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const secs = (Date.now() - startTimeRef.current) / 1000;
        setElapsed(secs);
      }, 100);
    }

    setInput(prev => {
      const next = prev + char;
      const secs = (Date.now() - startTimeRef.current) / 1000;
      const words = next.length / 5;
      const currentWpm = secs > 0 ? Math.round((words / secs) * 60) : 0;
      setWpm(currentWpm);

      // Accuracy
      let correct = 0;
      for (let i = 0; i < next.length; i++) {
        if (next[i] === text[i]) correct++;
      }
      setAccuracy(next.length > 0 ? Math.round((correct / next.length) * 100) : 100);

      // Check if finished
      if (next.length >= text.length) {
        setFinished(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }

      return next;
    });
  }, [text, started, finished]);

  const handleBackspace = useCallback(() => {
    if (finished) return;
    setInput(prev => prev.slice(0, -1));
  }, [finished]);

  const reset = useCallback(() => {
    setInput('');
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    setElapsed(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  return { text, input, started, finished, wpm, accuracy, elapsed, handleChar, handleBackspace, reset };
}
