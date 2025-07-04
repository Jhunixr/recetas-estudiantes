/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Recipe } from '../types/Recipe';
import recetasData from '../data/recetas.json';
import FavoritesService from '../services/favoritesService';

interface RecipeContextType {
  recetas: Recipe[];
  favoritos: number[];
  addToFavoritos: (id: number) => void;
  removeFromFavoritos: (id: number) => void;
  isFavorito: (id: number) => boolean;
  addReceta: (receta: Omit<Recipe, 'id'>) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recetas, setRecetas] = useState<Recipe[]>(recetasData.recetas as Recipe[]);
  const [favoritos, setFavoritos] = useState<number[]>([]);

  // useEffect para cargar favoritos cuando se inicia la app
  useEffect(() => {
    // Usar el servicio para obtener favoritos guardados
    const favoritosGuardados = FavoritesService.getFavorites();
    setFavoritos(favoritosGuardados);
  }, []);

  const addToFavoritos = (id: number) => {
    // Usar el servicio para agregar
    const success = FavoritesService.addFavorite(id);
    if (success) {
      // Si se guardó bien, actualizar el estado
      setFavoritos(prev => [...prev, id]);
    }
  };

  const removeFromFavoritos = (id: number) => {
    // Usar el servicio para quitar
    const success = FavoritesService.removeFavorite(id);
    if (success) {
      // Si se quitó bien, actualizar el estado
      setFavoritos(prev => prev.filter(favId => favId !== id));
    }
  };

  const isFavorito = (id: number) => {
    return favoritos.includes(id);
  };

  const addReceta = (nuevaReceta: Omit<Recipe, 'id'>) => {
    const newId = Math.max(...recetas.map(r => r.id)) + 1;
    const receta: Recipe = {
      ...nuevaReceta,
      id: newId
    };
    setRecetas(prev => [...prev, receta]);
  };

  const value = {
    recetas,
    favoritos,
    addToFavoritos,
    removeFromFavoritos,
    isFavorito,
    addReceta,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};