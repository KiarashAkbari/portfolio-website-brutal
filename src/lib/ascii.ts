export const RAMP = " .·:;=+*#%@";
export const RAMP_INV = "@%#*+=;:·. ";

export const randomChar = (pool = RAMP) =>
  pool[Math.floor(Math.random() * pool.length)];

/** glitchy single characters used for row corruption */
export const GLITCH = "/\\|<>[]{}=+*~^";

/** monospace aspect: char width / char height */
export const CHAR_ASPECT = 0.6;

export function padNum(n: number, len: number) {
  return String(Math.max(0, Math.floor(n))).padStart(len, "0");
}

export function buildBar(ratio: number, cells = 32, full = "█", empty = "░") {
  const f = Math.round(Math.max(0, Math.min(1, ratio)) * cells);
  return full.repeat(f) + empty.repeat(cells - f);
}
