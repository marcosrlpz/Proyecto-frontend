import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const FavoritesContext = createContext(null);

const STORAGE_KEY = "favorites_projects_v1";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Cargar del localStorage al iniciar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch (e) {
      console.error("Error leyendo favoritos:", e);
    }
  }, []);

  // Guardar cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Error guardando favoritos:", e);
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => favorites.some((p) => p.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback((project) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === project.id);
      if (exists) return prev.filter((p) => p.id !== project.id);
      return [project, ...prev];
    });
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
