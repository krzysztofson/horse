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
  </div>
</template>

<script setup></script>

<style scoped>
.app-container {
  min-height: 100vh;
  padding-bottom: 20px;
}

.main-content {
  max-height: 600px;
}

.main-content > div {
  height: 600px;
  overflow: hidden;
}

.results-section {
  max-height: 400px;
  overflow-y: auto;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .main-content {
    max-height: none;
  }

  .main-content > div {
    height: auto;
    min-height: 400px;
  }
}
</style>
