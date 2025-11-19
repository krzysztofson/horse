<template>
  <div class="race-track-container">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Race Track</h2>

    <div
      v-if="!currentRaceData"
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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      <p class="text-lg">No active race. Start a race to see the action!</p>
    </div>

    <div v-else class="race-track">
      <div
        class="race-info from-blue-600 to-purple-600 text-white p-4 rounded-lg mb-4 shadow-lg"
      >
        <div class="flex justify-between items-center">
          <div>
            <div class="text-sm opacity-90">
              Round {{ currentRaceData.round }}
            </div>
            <div class="text-2xl font-bold">
              {{ currentRaceData.distance }}m
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm opacity-90">Horses Racing</div>
            <div class="text-2xl font-bold">
              {{ currentRaceData.horses.length }}
            </div>
          </div>
        </div>
      </div>

      <div class="track-lanes">
        <div
          v-for="(horse, index) in currentRaceData.horses"
          :key="horse.id"
          class="track-lane"
          :class="{ 'lane-even': index % 2 === 0, 'lane-odd': index % 2 !== 0 }"
        >
          <div class="lane-number">
            {{ index + 1 }}
          </div>

          <div class="start-line"></div>

          <div
            class="racing-horse"
            :class="{ racing: isRacing }"
            :style="{
              animationDuration: `${horse.duration}s`,
              animationPlayState: isRacing ? 'running' : 'paused',
            }"
          >
            <HorseIcon :color="horse.color" size="50px" />
          </div>

          <div class="finish-line"></div>

          <div class="horse-info">
            <div class="font-semibold text-sm">{{ horse.name }}</div>
            <div class="text-xs text-gray-600">
              Condition: {{ horse.condition }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="isRacing" class="progress-indicator mt-4">
        <div class="progress-bar-bg">
          <div
            class="progress-bar"
            :style="{ width: `${raceProgress}%` }"
          ></div>
        </div>
        <div class="text-sm text-gray-600 text-center mt-2">
          Race in progress... {{ Math.round(raceProgress) }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from "vue";
import { useStore } from "vuex";
import HorseIcon from "./HorseIcon.vue";

const store = useStore();

const currentRaceData = computed(() => store.state.currentRaceData);
const isRacing = computed(() => store.state.isRacing);

const raceProgress = ref(0);
let progressInterval = null;

// Watch for race start to begin progress tracking
watch(isRacing, (newValue) => {
  if (newValue && currentRaceData.value) {
    startProgressTracking();
  } else {
    stopProgressTracking();
  }
});

function startProgressTracking() {
  raceProgress.value = 0;
  const duration = currentRaceData.value.maxDuration * 1000; // Convert to ms
  const startTime = Date.now();

  progressInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / duration) * 100, 100);
    raceProgress.value = progress;

    if (progress >= 100) {
      stopProgressTracking();
    }
  }, 50);
}

function stopProgressTracking() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
  if (!isRacing.value) {
    raceProgress.value = 100;
  }
}

onUnmounted(() => {
  stopProgressTracking();
});
</script>

<style scoped>
.race-track-container {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;
}

.race-track {
  position: relative;
}

.track-lanes {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  border: 2px solid #e2e8f0;
}

.track-lane {
  position: relative;
  display: grid;
  grid-template-columns: 30px 2px 1fr 2px 150px;
  align-items: center;
  height: 70px;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 8px;
  overflow: hidden;
}

.lane-even {
  background: #f1f5f9;
}

.lane-odd {
  background: #e2e8f0;
}

.lane-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
}

.start-line {
  width: 2px;
  height: 100%;
  background: repeating-linear-gradient(
    to bottom,
    #10b981 0px,
    #10b981 8px,
    transparent 8px,
    transparent 16px
  );
}

.finish-line {
  width: 2px;
  height: 100%;
  background: repeating-linear-gradient(
    to bottom,
    #ef4444 0px,
    #ef4444 8px,
    transparent 8px,
    transparent 16px
  );
}

.racing-horse {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  transform: translateX(0);
}

.racing-horse.racing {
  animation: race-forward linear forwards;
}

@keyframes race-forward {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(100% - 50px));
  }
}

.horse-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 12px;
}

.progress-indicator {
  margin-top: 16px;
}

.progress-bar-bg {
  width: 100%;
  height: 20px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  border-radius: 10px;
  transition: width 0.05s linear;
}

/* Responsive Design */
@media (max-width: 768px) {
  .track-lane {
    grid-template-columns: 25px 2px 1fr 2px 120px;
    height: 60px;
  }

  .horse-info {
    font-size: 12px;
  }
}
</style>
