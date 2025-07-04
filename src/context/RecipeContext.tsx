/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Recipe } from '../types/Recipe';
import recetasData from '../data/recetas.json';
import FavoritesService from '../services/favoritesService'; // AGREGADO: Servicio para manejar favoritos

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

  // MODIFICADO: Usar servicio para cargar favoritos del localStorage
  useEffect(() => {
    const favoritosGuardados = FavoritesService.getFavorites();
    setFavoritos(favoritosGuardados);
  }, []);

  // MODIFICADO: Usar servicio para agregar favoritos con manejo de errores
  const addToFavoritos = (id: number) => {
    const success = FavoritesService.addFavorite(id);
    if (success) {
      setFavoritos(prev => [...prev, id]);
    }
  };

  // MODIFICADO: Usar servicio para quitar favoritos con manejo de errores
  const removeFromFavoritos = (id: number) => {
    const success = FavoritesService.removeFavorite(id);
    if (success) {
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