<template>
  <div
    class="app-container min-h-screen bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 p-4"
  >
    <header class="header-section mb-6">
      <div class="bg-white rounded-lg shadow-2xl p-6 text-center">
        <h1
          class="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-2"
        >
          🏇 Horse Racing Game
        </h1>
        <p class="text-gray-600">
          Generate horses, start races, and watch the competition!
        </p>
      </div>
    </header>

    <div class="main-content grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
      <div class="lg:col-span-3">
        <HorseList />
      </div>

      <div class="lg:col-span-6">
        <RaceTrack />
      </div>

      <div class="lg:col-span-3">
        <RaceControls />
      </div>
    </div>

    <div class="results-section">
      <RaceResults />
    </div>
  </div>
</template>

<script setup>
import HorseList from "./components/HorseList.vue";
import RaceTrack from "./components/RaceTrack.vue";
import RaceControls from "./components/RaceControls.vue";
import RaceResults from "./components/RaceResults.vue";
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  padding-bottom: 20px;
}
</style>
