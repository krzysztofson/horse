<template>
  <div class="race-results-container">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Race Results</h2>

    <div
      v-if="raceResults.length === 0"
      class="empty-state text-gray-500 text-center py-16"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto mb-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
      <p class="text-lg">No results yet. Complete races to see results here.</p>
    </div>

    <div v-else class="results-list space-y-4">
      <div
        v-for="(result, index) in raceResults"
        :key="index"
        class="result-card bg-white rounded-lg shadow-md p-4 border-l-4 transition-all duration-300 hover:shadow-lg"
        :class="getRoundBorderColor(result.round)"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div
          class="result-header flex justify-between items-center mb-3 pb-2 border-b"
        >
          <div class="flex items-center gap-2">
            <div class="round-badge">Round {{ result.round }}</div>
            <span class="text-sm text-gray-600">{{ result.distance }}m</span>
          </div>
          <div class="text-sm text-gray-500">
            {{ result.results.length }} horses
          </div>
        </div>

        <div class="results-table">
          <div
            v-for="(horse, position) in result.results"
            :key="horse.id"
            class="result-row flex items-center gap-3 py-2 hover:bg-gray-50 rounded transition-colors"
          >
            <div class="position-badge" :class="getPositionClass(position)">
              {{ position + 1 }}
            </div>

            <div class="shrink-0">
              <HorseIcon :color="horse.color" size="30px" />
            </div>

            <div class="flex-1 min-w-0">
              <div class="font-semibold text-sm truncate">{{ horse.name }}</div>
              <div class="text-xs text-gray-500">
                Condition: {{ horse.condition }}
              </div>
            </div>

            <div class="time-display text-right">
              <div class="text-sm font-mono font-semibold text-gray-700">
                {{ formatTime(horse.finishTime) }}
              </div>
              <div
                v-if="position === 0"
                class="text-xs text-yellow-600 font-semibold"
              >
                Winner!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import HorseIcon from "./HorseIcon.vue";
import { formatTime } from "../utils/raceEngine";

const store = useStore();

const raceResults = computed(() => store.state.raceResults);

function getRoundBorderColor(round) {
  const colors = [
    "border-blue-500",
    "border-green-500",
    "border-purple-500",
    "border-pink-500",
    "border-orange-500",
    "border-red-500",
  ];
  return colors[(round - 1) % colors.length];
}

function getPositionClass(position) {
  if (position === 0) return "position-first";
  if (position === 1) return "position-second";
  if (position === 2) return "position-third";
  return "position-other";
}
</script>

<style scoped>
.race-results-container {
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.results-list {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-card {
  animation: slideIn 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.round-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.position-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.position-first {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #7c2d12;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
}

.position-second {
  background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
  color: #374151;
  box-shadow: 0 2px 8px rgba(192, 192, 192, 0.4);
}

.position-third {
  background: linear-gradient(135deg, #cd7f32 0%, #daa26f 100%);
  color: #7c2d12;
  box-shadow: 0 2px 8px rgba(205, 127, 50, 0.4);
}

.position-other {
  background: #e5e7eb;
  color: #6b7280;
}

.time-display {
  min-width: 80px;
}

.race-results-container::-webkit-scrollbar {
  width: 8px;
}

.race-results-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.race-results-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.race-results-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
