export const RACE_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200];
export const BASE_DURATION = 8;

/**
 * Calculate race duration based on horse condition and distance
 * @param {number} condition - Horse condition (1-100)
 * @param {number} distance - Race distance in meters
 * @returns {number} Duration in seconds
 */
export function calculateRaceDuration(condition, distance) {
  const distanceMultiplier = distance / 1200;
  const baseDuration = BASE_DURATION * distanceMultiplier;
  const randomFactor = 0.9 + Math.random() * 0.2;
  const conditionFactor = 100 / condition;

  return baseDuration * conditionFactor * randomFactor;
}

/**
 * Calculate finish time for a horse
 * @param {number} condition - Horse condition (1-100)
 * @param {number} distance - Race distance in meters
 * @returns {number} Finish time in seconds
 */
export function calculateFinishTime(condition, distance) {
  const baseTime = distance / 10;
  const randomFactor = 0.9 + Math.random() * 0.2;
  const conditionFactor = 100 / condition;

  return baseTime * conditionFactor * randomFactor;
}

/**
 * Simulates a race and returns sorted results
 * @param {Array} horses - Array of horses in the race
 * @param {number} distance - Race distance in meters
 * @returns {Array} Sorted array of race results
 */
export function simulateRace(horses, distance) {
  const results = horses.map((horse) => ({
    ...horse,
    finishTime: calculateFinishTime(horse.condition, distance),
    duration: calculateRaceDuration(horse.condition, distance),
  }));

  return results.sort((a, b) => a.finishTime - b.finishTime);
}

/**
 * Format finish time for display
 * @param {number} time - Time in seconds
 * @returns {string} Formatted time string
 */
export function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toFixed(2);
  return minutes > 0 ? `${minutes}:${seconds.padStart(5, "0")}` : `${seconds}s`;
}

/**
 * Generate a random condition score
 * @returns {number} Random condition between 50 and 100
 */
export function generateRandomCondition() {
  return Math.floor(Math.random() * 100) + 1;
}

/**
 * Select random horses for a race
 * @param {Array} horses - Available horses
 * @param {number} count - Number of horses to select
 * @returns {Array} Selected horses
 */
export function selectRandomHorses(horses, count) {
  const shuffled = [...horses].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, horses.length));
}
