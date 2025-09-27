# 🚀 SourceOps - SpaceX Mission Explorer

<div align="center">
  <img src="./.github/assets/hero.png" alt="SpaceX Mission Explorer Hero" width="100%" />
</div>

A modern, elegant React application for exploring SpaceX launches with real-time updates, favorites system, and a beautiful space-themed UI. Built with performance and user experience in mind.

## 📸 Screenshots

### Light & Dark Mode
<div align="center">
  <img src="./.github/assets/light-mode.png" alt="Light Mode" width="45%" />
  <img src="./.github/assets/dark-mode.png" alt="Dark Mode" width="45%" />
</div>

### Mission Details & Favorites
<div align="center">
  <img src="./.github/assets/mission-details.png" alt="Mission Details" width="45%" />
  <img src="./.github/assets/favorites.png" alt="Favorites" width="45%" />
</div>

### Search & Filters
<div align="center">
  <img src="./.github/assets/search-filters.png" alt="Search and Filters" width="100%" />
</div>

### Responsive Design
<div align="center">
  <img src="./.github/assets/mobile-view.png" alt="Mobile View" width="30%" />
</div>

## ✨ Key Features

- 🚀 Real-time SpaceX mission data with detailed information
- � Beautiful space-themed UI with dark/light mode
- ❤️ Instant favorites system with persistent storage
- 🔍 Advanced search and filtering capabilities
- � Year and success status filtering
- � Stunning dark mode experience
- 📱 Fully responsive design for all devices

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Lucide React** - Modern icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd spacex-mission-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── MissionCard.tsx # Individual mission display
│   ├── MissionFilters.tsx # Search and filter controls
│   ├── MissionModal.tsx # Mission detail modal
│   └── EmptyState.tsx  # Empty states for different scenarios
├── hooks/              # Custom React hooks
│   ├── useSpaceX.ts    # SpaceX API data fetching
│   └── useFavorites.ts # Favorites management
├── pages/              # Application pages
│   ├── Index.tsx       # Main missions page
│   └── NotFound.tsx    # 404 page
├── types/              # TypeScript type definitions
│   └── spacex.ts       # SpaceX API types
└── lib/                # Utility functions
    └── utils.ts        # Helper functions
```

## Features Overview

### Mission Browsing
- View all SpaceX launches in a responsive grid layout
- Each mission card shows key information: name, date, success status, and rocket type
- Pagination with 9 missions per page for optimal performance

### Advanced Filtering
- **Search**: Find missions by name
- **Year Filter**: Filter launches by specific year
- **Success Filter**: Show only successful missions
- **Favorites Filter**: Display only favorited missions
- Active filter indicators with easy removal

### Favorites System
- Click the heart icon to favorite/unfavorite missions
- Favorites are persisted in localStorage
- Filter to view only favorited missions

### Mission Details
- Click "View Details" to see comprehensive mission information
- Modal display with mission images, description, and technical details
- Links to external resources like Wikipedia and YouTube

## API Integration

This project uses the [SpaceX REST API](https://docs.spacexdata.com/) to fetch:
- Launch data (`/launches`)
- Rocket information (`/rockets`)

Data is cached using React Query for optimal performance and user experience.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- SpaceX for providing the public API
- The React and Vite communities for excellent tooling
- shadcn for the beautiful UI component library