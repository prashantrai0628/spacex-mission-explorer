import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  favorites: string[];
  toggleFavorite: (launchId: string) => void;
  isFavorite: (launchId: string) => boolean;
  favoritesCount: number;
}

const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (launchId: string) => {
        set((state) => {
          const exists = state.favorites.includes(launchId);
          const newFavorites = exists
            ? state.favorites.filter(id => id !== launchId)
            : [...state.favorites, launchId];
          return {
            favorites: newFavorites,
            favoritesCount: newFavorites.length
          };
        });
      },
      isFavorite: (launchId: string) => get().favorites.includes(launchId),
      favoritesCount: 0
    }),
    {
      name: 'spacex-favorites'
    }
  )
);

export const useFavorites = () => {
  const store = useFavoritesStore();
  
  return {
    favorites: store.favorites,
    toggleFavorite: store.toggleFavorite,
    isFavorite: store.isFavorite,
    favoritesCount: store.favorites.length
  };
};