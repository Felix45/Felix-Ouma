const GOLDEN_ANGLE = 137.508;

export function hashHue(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Spread similar hashes across the hue wheel instead of clustering them.
  return Math.round(Math.abs(hash) * GOLDEN_ANGLE) % 360;
}
