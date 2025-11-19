<template>
  <div class="horse-list">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Horses</h2>

    <div v-if="horses.length === 0" class="text-gray-500 text-center py-8">
      No horses generated yet. Click "Generate" to create horses.
    </div>

    <div v-else class="space-y-2">
      <div
        v-for="horse in horses"
        :key="horse.id"
        class="horse-item flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <HorseIcon :color="horse.color" size="40px" />

        <div class="flex-1">
          <div class="font-semibold text-gray-800">{{ horse.name }}</div>
          <div class="text-sm text-gray-500">
            Condition: {{ horse.condition }}/100
          </div>
        </div>

        <div
          class="condition-bar-container w-24 h-2 bg-gray-200 rounded-full overflow-hidden"
        >
          <div
            class="condition-bar h-full rounded-full transition-all duration-300"
            :style="{
              width: `${horse.condition}%`,
              backgroundColor: getConditionColor(horse.condition),
            }"
          ></div>
        </div>

        <div
          class="color-indicator w-8 h-8 rounded-full border-2 border-gray-300"
          :style="{ backgroundColor: horse.color }"
        ></div>
      </div>
    </div>

    <div
      v-if="horses.length > 0"
      class="mt-4 text-sm text-gray-600 text-center"
    >
      Total Horses: {{ horses.length }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import HorseIcon from "./HorseIcon.vue";

const store = useStore();
const horses = computed(() => store.getters.availableHorses);

function getConditionColor(condition) {
  if (condition >= 80) return "#10b981";
  if (condition >= 60) return "#3b82f6";
  if (condition >= 40) return "#f59e0b";
  return "#ef4444";
}
</script>

<style scoped>
.horse-list {
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.horse-item {
  transition: transform 0.2s ease;
}

.horse-item:hover {
  transform: translateX(4px);
}

.condition-bar {
  transition: width 0.5s ease-in-out;
}
</style>
