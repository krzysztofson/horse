import { describe, it, expect, beforeEach } from "vitest";
import store from "../index";

describe("Vuex Store", () => {
  beforeEach(() => {
    // Reset the store state before each test
    store.commit("RESET_RACE");
  });

  describe("mutations", () => {
    it("SET_HORSES should set horses and update status", () => {
      const horses = [
        { id: 1, name: "Horse 1", condition: 80 },
        { id: 2, name: "Horse 2", condition: 90 },
      ];

      store.commit("SET_HORSES", horses);

      expect(store.state.horses).toEqual(horses);
      expect(store.state.raceStatus).toBe("ready");
    });

    it("START_RACE should update racing state", () => {
      store.commit("START_RACE");

      expect(store.state.isRacing).toBe(true);
      expect(store.state.raceStatus).toBe("racing");
    });

    it("RESET_RACE should clear all state", () => {
      store.state.horses = [{ id: 1 }];
      store.state.isRacing = true;
      store.state.currentRound = 3;

      store.commit("RESET_RACE");

      expect(store.state.horses).toEqual([]);
      expect(store.state.isRacing).toBe(false);
      expect(store.state.currentRound).toBe(0);
      expect(store.state.raceStatus).toBe("idle");
    });

    it("ADD_RESULT should add race result", () => {
      const result = { round: 1, horses: [] };
      store.commit("ADD_RESULT", result);

      expect(store.state.raceResults).toHaveLength(1);
      expect(store.state.raceResults[0]).toEqual(result);
    });

    it("UPDATE_ROUND should update current round", () => {
      store.commit("UPDATE_ROUND", 5);
      expect(store.state.currentRound).toBe(5);
    });

    it("COMPLETE_ALL_RACES should update status", () => {
      store.commit("COMPLETE_ALL_RACES");

      expect(store.state.raceStatus).toBe("finished");
      expect(store.state.isRacing).toBe(false);
    });
  });

  describe("actions", () => {
    it("generateHorses should create 20 horses with colors", async () => {
      await store.dispatch("generateHorses");

      expect(store.state.horses).toHaveLength(20);
      expect(store.state.horses[0]).toHaveProperty("id");
      expect(store.state.horses[0]).toHaveProperty("name");
      expect(store.state.horses[0]).toHaveProperty("color");
      expect(store.state.horses[0]).toHaveProperty("condition");
    });

    it("generated horses should have unique ids", async () => {
      await store.dispatch("generateHorses");

      const ids = store.state.horses.map((h) => h.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(20);
    });

    it("generated horses should have valid conditions", async () => {
      await store.dispatch("generateHorses");

      store.state.horses.forEach((horse) => {
        expect(horse.condition).toBeGreaterThanOrEqual(1);
        expect(horse.condition).toBeLessThanOrEqual(101);
      });
    });
  });

  describe("state initialization", () => {
    it("should have correct initial state", () => {
      expect(store.state.horses).toEqual([]);
      expect(store.state.raceSchedule).toEqual([]);
      expect(store.state.currentRound).toBe(0);
      expect(store.state.raceResults).toEqual([]);
      expect(store.state.isRacing).toBe(false);
      expect(store.state.raceStatus).toBe("idle");
      expect(store.state.currentRaceData).toBe(null);
    });
  });
});
