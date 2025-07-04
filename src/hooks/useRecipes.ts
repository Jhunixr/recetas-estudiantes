import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import type { Recipe } from '../types/Recipe';

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes debe ser usado dentro de un RecipeProvider');
  }

  const filterByDifficulty = (difficulty: string): Recipe[] => {
    if (!difficulty || difficulty === '') {
      return context.recetas;
    }
    
    return context.recetas.filter(receta => 
      receta.dificultad.toLowerCase() === difficulty.toLowerCase()
    );
  };

  return {
    ...context,
    filterByDifficulty
  };
};