import React from 'react';

export function KeyIcon({ icon, color, size }: { icon: string; color: string; size: number }) {
  const common = {
    stroke: color,
    fill: 'none',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (icon) {
    case 'brightness-down':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="1.8" />
          <path {...common} d="M12 3.5v2.8" />
          <path {...common} d="M12 17.7v2.8" />
          <path {...common} d="M3.5 12h2.8" />
          <path {...common} d="M17.7 12h2.8" />
          <path {...common} d="m6.2 6.2 2 2" />
          <path {...common} d="m15.8 15.8 2 2" />
          <path {...common} d="m17.8 6.2-2 2" />
          <path {...common} d="m8.2 15.8-2 2" />
          <path {...common} d="M5 21h14" />
        </svg>
      );
    case 'brightness-up':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="1.8" />
          <path {...common} d="M12 2.8v3" />
          <path {...common} d="M12 18.2v3" />
          <path {...common} d="M2.8 12h3" />
          <path {...common} d="M18.2 12h3" />
          <path {...common} d="m5.4 5.4 2.1 2.1" />
          <path {...common} d="m16.5 16.5 2.1 2.1" />
          <path {...common} d="m18.6 5.4-2.1 2.1" />
          <path {...common} d="m7.5 16.5-2.1 2.1" />
        </svg>
      );
    case 'mission-control':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <rect x="3.5" y="6" width="7.5" height="5.5" rx="1.2" stroke={color} strokeWidth="1.8" fill="none" />
          <rect x="13" y="6" width="7.5" height="12" rx="1.2" stroke={color} strokeWidth="1.8" fill="none" />
          <rect x="3.5" y="13.5" width="7.5" height="4.5" rx="1.2" stroke={color} strokeWidth="1.8" fill="none" />
        </svg>
      );
    case 'search':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <circle cx="10.5" cy="10.5" r="5.2" stroke={color} strokeWidth="1.8" fill="none" />
          <path {...common} d="m15 15 4.2 4.2" />
        </svg>
      );
    case 'dictation':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <rect x="9" y="4" width="6" height="10" rx="3" stroke={color} strokeWidth="1.8" fill="none" />
          <path {...common} d="M6.5 11.5a5.5 5.5 0 0 0 11 0" />
          <path {...common} d="M12 17v3.5" />
          <path {...common} d="M8.5 20.5h7" />
        </svg>
      );
    case 'do-not-disturb':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M15.5 4.5a7.8 7.8 0 1 0 4 14.5 8.8 8.8 0 0 1-4-14.5Z"
            stroke={color}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'volume-down':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M5 10h4l4-4v12l-4-4H5v-4Z" fill={color} />
          <path {...common} d="M16.5 9.5a3.5 3.5 0 0 1 0 5" />
        </svg>
      );
    case 'volume-up':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M5 10h4l4-4v12l-4-4H5v-4Z" fill={color} />
          <path {...common} d="M16.5 9.2a4.4 4.4 0 0 1 0 5.6" />
          <path {...common} d="M18.9 7.3a7.2 7.2 0 0 1 0 9.4" />
        </svg>
      );
    case 'lock':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <rect x="6.2" y="10.2" width="11.6" height="9.2" rx="1.6" stroke={color} strokeWidth="1.8" fill="none" />
          <path {...common} d="M8.5 10V8.3a3.5 3.5 0 0 1 7 0V10" />
        </svg>
      );
    case 'calculator':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <rect x="5" y="3.5" width="14" height="17" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
          <rect x="8" y="6.5" width="8" height="3" rx="0.8" stroke={color} strokeWidth="1.6" fill="none" />
          <path {...common} d="M8 13h1.5" />
          <path {...common} d="M14.5 13H16" />
          <path {...common} d="M12 12.2v1.6" />
          <path {...common} d="M8 17h1.5" />
          <path {...common} d="M14.5 17H16" />
          <path {...common} d="m11 16 2 2" />
          <path {...common} d="m13 16-2 2" />
        </svg>
      );
    case 'capture':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <rect x="4.5" y="6.5" width="15" height="11" rx="1.8" stroke={color} strokeWidth="1.8" fill="none" />
          <path {...common} d="M8 4.5h3" />
          <path {...common} d="M13 4.5h3" />
          <path {...common} d="M12 9.2v5.6" />
          <path {...common} d="M9.2 12H14.8" />
        </svg>
      );
    case 'emoji':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" fill="none" />
          <circle cx="9" cy="10" r="1" fill={color} />
          <circle cx="15" cy="10" r="1" fill={color} />
          <path {...common} d="M8.5 14.2c1 1.3 2.2 1.9 3.5 1.9s2.5-.6 3.5-1.9" />
        </svg>
      );
    case 'mic-mute':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <rect x="9" y="4" width="6" height="10" rx="3" stroke={color} strokeWidth="1.8" fill="none" />
          <path {...common} d="M6.5 11.5a5.5 5.5 0 0 0 8.4 4.6" />
          <path {...common} d="M12 17v3.5" />
          <path {...common} d="M8.5 20.5h7" />
          <path {...common} d="m16.5 7.5 4 4" />
          <path {...common} d="m20.5 7.5-4 4" />
        </svg>
      );
    case 'easy-switch':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <rect x="3.5" y="6" width="10" height="7" rx="1.2" stroke={color} strokeWidth="1.8" fill="none" />
          <path {...common} d="M8.5 15.5h7" />
          <path {...common} d="M17.5 8.2h3" />
          <path {...common} d="M17.5 11.8h3" />
        </svg>
      );
    case 'keyboard-light-down':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M5 15.5h14" />
          <path {...common} d="M8.5 10.5h7" />
          <path {...common} d="M12 4.5v4" />
          <path {...common} d="M9 7.5h6" />
        </svg>
      );
    case 'keyboard-light-up':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M5 15.5h14" />
          <path {...common} d="M8.5 10.5h7" />
          <path {...common} d="M12 3.5v5" />
          <path {...common} d="M7.8 8.2h8.4" />
          <path {...common} d="m9 5.2 3 3 3-3" />
        </svg>
      );
    case 'launchpad':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          {[6, 12, 18].flatMap((cx) => [6, 12, 18].map((cy) => (
            <rect key={`${cx}-${cy}`} x={cx - 1.5} y={cy - 1.5} width="3" height="3" rx="0.4" fill={color} />
          )))}
        </svg>
      );
    case 'globe':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" fill="none" />
          <path {...common} d="M4.5 12h15" />
          <path {...common} d="M12 4.2c2.2 2.2 3.4 5 3.4 7.8s-1.2 5.6-3.4 7.8" />
          <path {...common} d="M12 4.2c-2.2 2.2-3.4 5-3.4 7.8s1.2 5.6 3.4 7.8" />
          <path {...common} d="M6 8.5c1.8 1 4 1.5 6 1.5s4.2-.5 6-1.5" />
          <path {...common} d="M6 15.5c1.8-1 4-1.5 6-1.5s4.2.5 6 1.5" />
        </svg>
      );
    case 'home':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="m4.5 11.5 7.5-6 7.5 6" />
          <path {...common} d="M7.5 10.5v8h9v-8" />
        </svg>
      );
    case 'app-switch':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <rect x="4.5" y="7" width="8.5" height="6.8" rx="1.2" stroke={color} strokeWidth="1.8" fill="none" />
          <rect x="11" y="10.2" width="8.5" height="6.8" rx="1.2" stroke={color} strokeWidth="1.8" fill="none" />
        </svg>
      );
    case 'menu-lines':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M5 7.5h14" />
          <path {...common} d="M5 12h14" />
          <path {...common} d="M5 16.5h14" />
        </svg>
      );
    case 'browser-back':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M18.5 12H7.5" />
          <path {...common} d="m11 7.5-4.5 4.5 4.5 4.5" />
        </svg>
      );
    case 'browser-forward':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M5.5 12h11" />
          <path {...common} d="m13 7.5 4.5 4.5-4.5 4.5" />
        </svg>
      );
    case 'lightspeed':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M7 16c3-1 5.1-3.3 6.2-6.7" />
          <path {...common} d="M10 19c4-1.2 7.1-4.2 8.7-8.8" />
          <path {...common} d="M5 12.5c1.6-.5 2.9-1.7 3.8-3.5" />
          <path {...common} d="M12.2 8.8 10 6.6" />
        </svg>
      );
    case 'bluetooth':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M9 5l7 7-7 7V5Z" />
          <path {...common} d="M9 12 16 5" />
          <path {...common} d="M9 12 16 19" />
        </svg>
      );
    case 'game-mode':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M12 6v12" />
          <path {...common} d="M8 18h8" />
          <path {...common} d="M9 10c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3Z" />
        </svg>
      );
    case 'brightness':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="1.8" />
          <path {...common} d="M12 2.8v3" />
          <path {...common} d="M12 18.2v3" />
          <path {...common} d="M2.8 12h3" />
          <path {...common} d="M18.2 12h3" />
          <path {...common} d="m5.4 5.4 2.1 2.1" />
          <path {...common} d="m16.5 16.5 2.1 2.1" />
          <path {...common} d="m18.6 5.4-2.1 2.1" />
          <path {...common} d="m7.5 16.5-2.1 2.1" />
        </svg>
      );
    case 'prev-track':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M7 6v12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="m17 7-6 5 6 5V7Z" fill={color} />
          <path d="m12 7-6 5 6 5V7Z" fill={color} opacity="0.92" />
        </svg>
      );
    case 'play-pause':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="m7 6 8 6-8 6V6Z" fill={color} />
          <path d="M17 7.2v9.6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20 7.2v9.6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'next-track':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M17 6v12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="m7 7 6 5-6 5V7Z" fill={color} opacity="0.92" />
          <path d="m12 7 6 5-6 5V7Z" fill={color} />
        </svg>
      );
    case 'mute':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M5 10h4l4-4v12l-4-4H5v-4Z" fill={color} />
          <path {...common} d="m16.5 9.2 3 5.6" />
        </svg>
      );
    case 'windows':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M3 5.5 10 4v7H3V5.5Zm8 5.5V3.8L21 2v9h-10Zm-8 2h7v7L3 18.5V13Zm8 0h10v9.2L11 20.2V13Z" fill={color} />
        </svg>
      );
    case 'menu-grid':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          {[
            [6, 6], [12, 6], [18, 6],
            [6, 12], [12, 12], [18, 12],
            [6, 18], [12, 18], [18, 18],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fill={color} />
          ))}
        </svg>
      );
    default:
      return null;
  }
}
