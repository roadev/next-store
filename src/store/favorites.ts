import { create } from "zustand";
import { persist } from "zustand/middleware";

type Favorite = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type FavoritesState = {
  favorites: Favorite[];
  toggleFavorite: (item: Favorite) => void;
  isFavorite: (id: number) => boolean;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (item) => {
        const exists = get().favorites.some((f) => f.id === item.id);
        if (exists) {
          set({
            favorites: get().favorites.filter((f) => f.id !== item.id),
          });
        } else {
          set({
            favorites: [...get().favorites, item],
          });
        }
      },

      isFavorite: (id) => get().favorites.some((f) => f.id === id),
    }),
    { name: "favorites-storage" },
  ),
);
