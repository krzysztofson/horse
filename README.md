# 🏇 Horse Racing Game

A dynamic horse racing simulation game built with Vue 3, Vuex, and Tailwind CSS. Generate horses, schedule races, and watch them compete in real-time!

## ✨ Features

- **Generate Horses**: Create 20 unique horses with distinct colors and conditions
- **Race Simulation**: Realistic race physics based on horse condition and distance
- **Multiple Rounds**: Run races across 6 different distances (1200m - 2200m)
- **Live Visualization**: Watch horses race in real-time on an animated track
- **Results Tracking**: View complete race history with rankings and finish times
- **Responsive Design**: Beautiful UI that works on desktop and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/krzysztofson/horse.git
cd horse

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎮 How to Play

1. Click **Generate Horses & Schedule** to create 20 horses and a race schedule
2. Click **Start Race** to begin the first race
3. Watch the horses compete on the track
4. After each race, click **Next Race** to continue
5. View complete results after all races finish
6. Click **Reset** to start over

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vuex** - State management
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing

## 📦 Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run unit tests in watch mode
npm run test:run     # Run unit tests once
npm run test:ui      # Run unit tests with UI
npm run test:e2e     # Run e2e tests
npm run test:e2e:ui  # Run e2e tests with UI
```

## 📁 Project Structure

```
horse/
├── src/
│   ├── components/       # Vue components
│   │   ├── HorseList.vue
│   │   ├── RaceTrack.vue
│   │   ├── RaceControls.vue
│   │   └── RaceResults.vue
│   ├── store/           # Vuex store
│   │   └── index.js
│   ├── utils/           # Utility functions
│   │   ├── colorGenerator.js
│   │   └── raceEngine.js
│   ├── App.vue          # Root component
│   └── main.js          # Entry point
├── e2e/                 # E2E tests
└── __tests__/           # Unit tests
```

## 🧪 Testing

The project includes comprehensive test coverage:

- **Unit Tests**: Test utilities and store logic with Vitest
- **E2E Tests**: Test user workflows with Playwright

## 👨‍💻 Author

**Krzysztof Dabrowski**

## 📄 License

ISC
