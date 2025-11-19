<template>
  <div class="race-controls bg-white rounded-lg shadow-lg p-6">
    <div class="flex flex-col gap-4">
      <button
        @click="handleGenerate"
        :disabled="isRacing"
        class="control-button bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Generate Horses & Schedule
      </button>

      <button
        @click="handleStart"
        :disabled="!canStartRace || isRacing"
        class="control-button bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Start Race
      </button>

      <button
        v-if="canAdvanceRound"
        @click="handleNextRound"
        class="control-button bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 animate-pulse"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
        Next Round
      </button>

      <button
        v-if="isGameComplete"
        @click="handleReset"
        class="control-button bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Reset Game
      </button>

      <div class="mt-4 p-4 bg-gray-100 rounded-lg">
        <div class="text-sm text-gray-600">
          <div class="flex justify-between mb-2">
            <span class="font-semibold">Status:</span>
            <span class="capitalize">{{ statusText }}</span>
          </div>
          <div v-if="currentRoundInfo" class="flex justify-between mb-2">
            <span class="font-semibold">Current Round:</span>
            <span
              >{{ currentRoundInfo.round }} / {{ currentRoundInfo.total }}</span
            >
          </div>
          <div v-if="currentRoundInfo" class="flex justify-between">
            <span class="font-semibold">Distance:</span>
            <span>{{ currentRoundInfo.distance }}m</span>
          </div>
          <div class="flex justify-between mt-2">
            <span class="font-semibold">Completed Rounds:</span>
            <span>{{ completedRounds }} / {{ totalRounds }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const canStartRace = computed(() => store.getters.canStartRace);
const canAdvanceRound = computed(() => store.getters.canAdvanceRound);
const isGameComplete = computed(() => store.getters.isGameComplete);
const isRacing = computed(() => store.state.isRacing);
const completedRounds = computed(() => store.getters.completedRounds);
const totalRounds = computed(() => store.getters.totalRounds);
const currentRoundInfo = computed(() => store.getters.currentRoundInfo);
const raceStatus = computed(() => store.state.raceStatus);

const statusText = computed(() => {
  switch (raceStatus.value) {
    case "idle":
      return "Waiting to start";
    case "ready":
      return "Ready to race";
    case "racing":
      return "Racing...";
    case "roundComplete":
      return "Round complete";
    case "finished":
      return "All races finished!";
    default:
      return raceStatus.value;
  }
});

async function handleGenerate() {
  await store.dispatch("generateHorses");
  await store.dispatch("generateRaceSchedule");
}

async function handleStart() {
  await store.dispatch("startRace");
}

async function handleNextRound() {
  await store.dispatch("nextRound");
}

function handleReset() {
  store.dispatch("resetGame");
}
</script>

<style scoped>
.control-button {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.control-button:disabled {
  transform: none !important;
  box-shadow: none;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
