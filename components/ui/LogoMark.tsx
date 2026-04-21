import type { SVGProps } from 'react';

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="keysense-mark-bg" x1="6" y1="5" x2="42" y2="43">
          <stop stopColor="#1f2433" />
          <stop offset="0.45" stopColor="#111827" />
          <stop offset="1" stopColor="#05070d" />
        </linearGradient>
        <linearGradient id="keysense-mark-accent" x1="12" y1="12" x2="37" y2="35">
          <stop stopColor="#a78bfa" />
          <stop offset="0.52" stopColor="#6366f1" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="keysense-mark-glow" x1="9" y1="7" x2="39" y2="43">
          <stop stopColor="#c4b5fd" stopOpacity="0.9" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <rect x="2.5" y="2.5" width="43" height="43" rx="11" fill="url(#keysense-mark-bg)" />
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="10.5"
        stroke="url(#keysense-mark-glow)"
        strokeOpacity="0.7"
      />

      <g transform="rotate(-6 24 24)">
        <rect
          x="10"
          y="16"
          width="28"
          height="20"
          rx="4.5"
          fill="#0b1020"
          stroke="white"
          strokeOpacity="0.14"
        />
        <rect x="13" y="19" width="5" height="4" rx="1.2" fill="url(#keysense-mark-accent)" />
        <rect x="20" y="19" width="5" height="4" rx="1.2" fill="white" fillOpacity="0.58" />
        <rect x="27" y="19" width="8" height="4" rx="1.2" fill="white" fillOpacity="0.32" />
        <rect x="13" y="25" width="6" height="4" rx="1.2" fill="white" fillOpacity="0.4" />
        <rect x="21" y="25" width="5" height="4" rx="1.2" fill="white" fillOpacity="0.7" />
        <rect x="28" y="25" width="7" height="4" rx="1.2" fill="#22d3ee" fillOpacity="0.7" />
        <rect x="17" y="31" width="14" height="2.8" rx="1.4" fill="white" fillOpacity="0.48" />
      </g>

      <path
        d="M33.8 12.8c2.4 1.1 4.2 3 5.1 5.3M31.4 16.4c1.3.6 2.3 1.6 2.9 2.9"
        stroke="#22d3ee"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="13.5" cy="34.5" r="2" fill="#a78bfa" opacity="0.86" />
    </svg>
  );
}
