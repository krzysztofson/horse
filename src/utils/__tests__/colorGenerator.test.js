import { describe, it, expect } from "vitest";
import { generateHorseColor, generateColorPalette } from "../colorGenerator";

describe("colorGenerator", () => {
  describe("generateHorseColor", () => {
    it("should generate a valid hex color", () => {
      const color = generateHorseColor(0, 10);
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it("should generate different colors for different indices", () => {
      const color1 = generateHorseColor(0, 10);
      const color2 = generateHorseColor(1, 10);
      expect(color1).not.toBe(color2);
    });

    it("should generate consistent colors for the same input", () => {
      const color1 = generateHorseColor(5, 10);
      const color2 = generateHorseColor(5, 10);
      expect(color1).toBe(color2);
    });
  });

  describe("generateColorPalette", () => {
    it("should generate correct number of colors", () => {
      const palette = generateColorPalette(5);
      expect(palette).toHaveLength(5);
    });

    it("should generate unique colors", () => {
      const palette = generateColorPalette(10);
      const uniqueColors = new Set(palette);
      expect(uniqueColors.size).toBe(10);
    });

    it("should generate valid hex colors", () => {
      const palette = generateColorPalette(3);
      palette.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });
});
