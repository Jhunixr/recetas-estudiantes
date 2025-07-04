import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import type { Recipe } from '../types/Recipe';

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes debe ser usado dentro de un RecipeProvider');
  }

  // Ejercicio 1: Función para filtrar por dificultad
  // No estoy muy seguro si esto está bien, pero creo que así funciona
  const filterByDifficulty = (difficulty: string): Recipe[] => {
    // Si no hay dificultad seleccionada, devolver todas las recetas
    if (!difficulty || difficulty === '') {
      return context.recetas;
    }
    
    // Filtrar las recetas que coincidan con la dificultad
    // Uso toLowerCase() para que no importe si escriben "Fácil" o "fácil"
    return context.recetas.filter(receta => 
      receta.dificultad.toLowerCase() === difficulty.toLowerCase()
    );
  };

  return {
    ...context,
    filterByDifficulty // Devolver la función para que se pueda usar
  };
};