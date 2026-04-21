// Key definition for a single keyboard key
export interface KeyDef {
  code: string;       // event.code value (e.g., "KeyA", "Space")
  label: string;      // Display label
  label2?: string;    // Secondary label (shifted character)
  legendColor?: string; // Optional per-key legend override
  icon?: string;      // Optional symbolic icon rendered instead of text
  x: number;          // X position in units
  y: number;          // Y position in units
  w?: number;         // Width in units (default 1)
  h?: number;         // Height in units (default 1)
  isAccent?: boolean; // Accent colored key
  isModifier?: boolean; // Modifier colored key (e.g. dark grey vs black)
  shape?: 'rect' | 'circle';    // Actual geometry of the key top
  variant?: 'standard' | 'media'; // Sub-type styling (e.g. rubber media button)
  isTouchID?: boolean;
  legendPosition?: 'top-left' | 'bottom-left' | 'center';
}

// A complete keyboard layout (key positions)
export interface KeyboardLayout {
  id: string;
  name: string;
  type:
    | 'ansi-full'
    | 'ansi-tkl'
    | 'ansi-75'
    | 'ansi-65'
    | 'ansi-60'
    | 'iso-full'
    | 'mac-full'
    | 'apple-magic-full'
    | 'logitech-g915-tkl'
    | 'logitech-k380';
  width: number;      // Total width in units
  height: number;     // Total height in units
  keys: KeyDef[];
}

// Sound profile for a keyboard
export type SwitchSound = 'linear' | 'tactile' | 'clicky';

export type KeyboardLockCode = 'CapsLock' | 'NumLock' | 'ScrollLock';

export interface SoundProfile {
  type: SwitchSound;
  name: string;
  description: string;
}

// Keyboard category
export type KeyboardCategory = 'gaming' | 'productivity' | 'enthusiast' | 'budget';

// Full keyboard model
export interface KeyboardModel {
  id: string;
  brand: string;
  model: string;
  layoutType: KeyboardLayout['type'];
  switchType: string;
  soundProfile: SwitchSound;
  supportedSoundProfiles?: SwitchSound[];
  soundUrl?: string; // Specific URL for exact switch audio sample (.wav/.mp3)
  category: KeyboardCategory;
  color: string;        // Keyboard case color (hex)
  accentColor: string;  // Accent/brand color
  keycapColor: string;  // Keycap base color
  legendColor: string;  // Legend text color
  price: number;
  connectivity: string;
  keycaps: string;
  weight: string;
  features: string[];
  description: string;
  image?: string;
  visualTheme?: 'default' | 'g915' | 'apple-magic' | 'chunky-gaming';
}
