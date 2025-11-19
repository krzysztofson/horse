import { createStore } from "vuex";
import { generateColorPalette } from "../utils/colorGenerator";
import {
  RACE_DISTANCES,
  generateRandomCondition,
  simulateRace,
  calculateRaceDuration,
} from "../utils/raceEngine";

export default createStore({
  state: {
    horses: [],
    raceSchedule: [],
    currentRound: 0,
    raceResults: [],
    isRacing: false,
    raceStatus: "idle",
    currentRaceData: null,
  },

  mutations: {
    SET_HORSES(state, horses) {
      state.horses = horses;
      state.raceStatus = "ready";
    },

    SET_RACE_SCHEDULE(state, schedule) {
      state.raceSchedule = schedule;
    },

    START_RACE(state) {
      state.isRacing = true;
      state.raceStatus = "racing";
    },

    UPDATE_ROUND(state, roundIndex) {
      state.currentRound = roundIndex;
    },

    ADD_RESULT(state, result) {
      state.raceResults.push(result);
    },

    SET_CURRENT_RACE_DATA(state, data) {
      state.currentRaceData = data;
    },

    FINISH_RACE(state) {
      state.isRacing = false;
    },

    COMPLETE_ROUND(state) {
      state.raceStatus = "roundComplete";
    },

    COMPLETE_ALL_RACES(state) {
      state.raceStatus = "finished";
      state.isRacing = false;
    },

    RESET_RACE(state) {
      state.horses = [];
      state.raceSchedule = [];
      state.currentRound = 0;
      state.raceResults = [];
      state.isRacing = false;
      state.raceStatus = "idle";
      state.currentRaceData = null;
    },

    CLEAR_RACE_DATA(state) {
      state.raceSchedule = [];
      state.currentRound = 0;
      state.raceResults = [];
      state.isRacing = false;
      state.raceStatus = "ready";
      state.currentRaceData = null;
    },
  },

  actions: {
    generateHorses({ commit }) {
      const numberOfHorses = Math.floor(Math.random() * 20) + 1;
      const colors = generateColorPalette(numberOfHorses);

      const horses = Array.from({ length: numberOfHorses }, (_, index) => ({
        id: index + 1,
        name: `Horse #${index + 1}`,
        color: colors[index],
        condition: generateRandomCondition(),
      }));

      commit("SET_HORSES", horses);
      return horses;
    },

    generateRaceSchedule({ commit, state }) {
      if (state.horses.length === 0) {
        throw new Error("No horses available. Generate horses first.");
      }

      const schedule = RACE_DISTANCES.map((distance, index) => ({
        round: index + 1,
        distance,
        horses: [...state.horses],
      }));

      commit("CLEAR_RACE_DATA");
      commit("SET_RACE_SCHEDULE", schedule);
      return schedule;
    },

    async startRace({ commit, dispatch, state }) {
      if (state.horses.length === 0) {
        throw new Error(
          "Please generate horses first before starting the race."
        );
      }

      if (state.raceSchedule.length === 0) {
        await dispatch("generateRaceSchedule");
      }

      commit("START_RACE");
      commit("UPDATE_ROUND", 0);

      await dispatch("runRound", 0);
    },

    async runRound({ commit, state }, roundIndex) {
      if (roundIndex >= state.raceSchedule.length) {
        commit("COMPLETE_ALL_RACES");
        return;
      }

      const round = state.raceSchedule[roundIndex];
      commit("UPDATE_ROUND", roundIndex);

      const raceResults = simulateRace(round.horses, round.distance);
      const maxDuration = Math.max(...raceResults.map((r) => r.duration));

      commit("SET_CURRENT_RACE_DATA", {
        round: round.round,
        distance: round.distance,
        horses: raceResults,
        maxDuration,
      });

      await new Promise((resolve) =>
        setTimeout(resolve, maxDuration * 1000 + 500)
      );

      commit("ADD_RESULT", {
        round: round.round,
        distance: round.distance,
        results: raceResults,
      });

      commit("FINISH_RACE");
      commit("COMPLETE_ROUND");
    },

    async nextRound({ commit, dispatch, state }) {
      const nextRoundIndex = state.currentRound + 1;

      if (nextRoundIndex >= state.raceSchedule.length) {
        commit("COMPLETE_ALL_RACES");
        return;
      }

      commit("START_RACE");
      await dispatch("runRound", nextRoundIndex);
    },

    resetGame({ commit }) {
      commit("RESET_RACE");
    },
  },

  getters: {
    availableHorses: (state) => state.horses,

    currentRaceHorses: (state) => {
      if (!state.currentRaceData) return [];
      return state.currentRaceData.horses;
    },

    completedRounds: (state) => state.raceResults.length,

    totalRounds: (state) => state.raceSchedule.length,

    canGenerateRace: (state) => state.horses.length > 0 && !state.isRacing,

    canStartRace: (state) => {
      return (
        state.horses.length > 0 &&
        state.raceSchedule.length > 0 &&
        state.raceStatus === "ready" &&
        !state.isRacing
      );
    },

    canAdvanceRound: (state) => {
      return (
        state.raceStatus === "roundComplete" &&
        state.currentRound < state.raceSchedule.length - 1
      );
    },

    isGameComplete: (state) => state.raceStatus === "finished",

    currentRoundInfo: (state) => {
      if (!state.currentRaceData) return null;
      return {
        round: state.currentRaceData.round,
        distance: state.currentRaceData.distance,
        total: state.raceSchedule.length,
      };
    },
  },
});
