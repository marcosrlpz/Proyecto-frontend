import { createContext, useEffect, useMemo, useState } from "react";

export const FavoritesContext = createContext(null);

const STORAGE_KEY = "portfolio:favorites";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // ✅ Cargar desde localStorage (persistencia pro)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      // si falla, no pasa nada
      setFavorites([]);
    }
  }, []);

  // ✅ Guardar en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const addFavorite = (project) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === project.id)) return prev;
      return [project, ...prev];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleFavorite = (project) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === project.id);
      if (exists) return prev.filter((p) => p.id !== project.id);
      return [project, ...prev];
    });
  };

  const clearFavorites = () => setFavorites([]);

  // ✅ useMemo para evitar re-renders innecesarios
  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
