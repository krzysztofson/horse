import { describe, it, expect } from "vitest";
import {
  calculateRaceDuration,
  calculateFinishTime,
  simulateRace,
  formatTime,
  generateRandomCondition,
  selectRandomHorses,
  RACE_DISTANCES,
  BASE_DURATION,
} from "../raceEngine";

describe("raceEngine", () => {
  describe("calculateRaceDuration", () => {
    it("should return a positive number", () => {
      const duration = calculateRaceDuration(80, 1200);
      expect(duration).toBeGreaterThan(0);
    });

    it("should increase with distance", () => {
      const duration1 = calculateRaceDuration(80, 1200);
      const duration2 = calculateRaceDuration(80, 2400);
      expect(duration2).toBeGreaterThan(duration1);
    });

    it("should decrease with better condition", () => {
      const duration1 = calculateRaceDuration(50, 1200);
      const duration2 = calculateRaceDuration(100, 1200);
      expect(duration1).toBeGreaterThan(duration2);
    });
  });

  describe("calculateFinishTime", () => {
    it("should return a positive number", () => {
      const finishTime = calculateFinishTime(80, 1200);
      expect(finishTime).toBeGreaterThan(0);
    });

    it("should increase with distance", () => {
      const time1 = calculateFinishTime(80, 1200);
      const time2 = calculateFinishTime(80, 2400);
      expect(time2).toBeGreaterThan(time1);
    });
  });

  describe("simulateRace", () => {
    it("should return sorted results by finish time", () => {
      const horses = [
        { id: 1, name: "Horse 1", condition: 90 },
        { id: 2, name: "Horse 2", condition: 70 },
        { id: 3, name: "Horse 3", condition: 85 },
      ];

      const results = simulateRace(horses, 1200);

      expect(results).toHaveLength(3);
      expect(results[0].finishTime).toBeLessThanOrEqual(results[1].finishTime);
      expect(results[1].finishTime).toBeLessThanOrEqual(results[2].finishTime);
    });

    it("should add finishTime and duration to each horse", () => {
      const horses = [{ id: 1, name: "Horse 1", condition: 80 }];
      const results = simulateRace(horses, 1200);

      expect(results[0]).toHaveProperty("finishTime");
      expect(results[0]).toHaveProperty("duration");
    });
  });

  describe("formatTime", () => {
    it("should format seconds correctly", () => {
      const formatted = formatTime(45.67);
      expect(formatted).toBe("45.67s");
    });

    it("should format minutes and seconds correctly", () => {
      const formatted = formatTime(125.5);
      expect(formatted).toMatch(/2:05\.50/);
    });

    it("should handle zero", () => {
      const formatted = formatTime(0);
      expect(formatted).toBe("0.00s");
    });
  });

  describe("generateRandomCondition", () => {
    it("should return a number between 1 and 101", () => {
      const condition = generateRandomCondition();
      expect(condition).toBeGreaterThanOrEqual(1);
      expect(condition).toBeLessThanOrEqual(101);
    });

    it("should return an integer", () => {
      const condition = generateRandomCondition();
      expect(Number.isInteger(condition)).toBe(true);
    });
  });

  describe("selectRandomHorses", () => {
    it("should select correct number of horses", () => {
      const horses = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
      const selected = selectRandomHorses(horses, 5);
      expect(selected).toHaveLength(5);
    });

    it("should not exceed available horses", () => {
      const horses = Array.from({ length: 3 }, (_, i) => ({ id: i + 1 }));
      const selected = selectRandomHorses(horses, 10);
      expect(selected).toHaveLength(3);
    });

    it("should not modify original array", () => {
      const horses = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
      const originalLength = horses.length;
      selectRandomHorses(horses, 5);
      expect(horses).toHaveLength(originalLength);
    });
  });

  describe("constants", () => {
    it("should have RACE_DISTANCES array", () => {
      expect(Array.isArray(RACE_DISTANCES)).toBe(true);
      expect(RACE_DISTANCES.length).toBeGreaterThan(0);
    });

    it("should have BASE_DURATION defined", () => {
      expect(typeof BASE_DURATION).toBe("number");
      expect(BASE_DURATION).toBeGreaterThan(0);
    });
  });
});
