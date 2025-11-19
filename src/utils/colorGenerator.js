/**
 * Generates a unique color for each horse
 * @param {number} index - Horse index
 * @param {number} total - Total number of horses
 * @returns {string} Hex color code
 */
export function generateHorseColor(index, total) {
  // Use HSL to generate evenly distributed colors around the color wheel
  const hue = (index * 360) / total;
  const saturation = 65 + (index % 3) * 10; // Vary saturation slightly
  const lightness = 45 + (index % 2) * 10; // Vary lightness slightly
  
  return hslToHex(hue, saturation, lightness);
}

/**
 * Converts HSL to Hex color
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Hex color code
 */
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Generates an array of unique colors
 * @param {number} count - Number of colors to generate
 * @returns {string[]} Array of hex color codes
 */
export function generateColorPalette(count) {
  return Array.from({ length: count }, (_, i) => generateHorseColor(i, count));
}

