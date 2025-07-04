// AGREGADO: Nuevo servicio completo para manejar favoritos con localStorage
class FavoritesService {
  private static readonly STORAGE_KEY = 'recetas-favoritos';

  // AGREGADO: Obtener favoritos del localStorage con manejo de errores
  static getFavorites(): number[] {
    try {
      const favorites = localStorage.getItem(this.STORAGE_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      return [];
    }
  }

  // AGREGADO: Agregar favorito con validación y manejo de errores
  static addFavorite(recipeId: number): boolean {
    try {
      const favorites = this.getFavorites();
      if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
        return true;
      }
      return false; // Ya existe en favoritos
    } catch (error) {
      console.error('Error al agregar favorito:', error);
      return false;
    }
  }

  // AGREGADO: Quitar favorito con manejo de errores
  static removeFavorite(recipeId: number): boolean {
    try {
      const favorites = this.getFavorites();
      const newFavorites = favorites.filter(id => id !== recipeId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newFavorites));
      return true;
    } catch (error) {
      console.error('Error al quitar favorito:', error);
      return false;
    }
  }

  // AGREGADO: Verificar si una receta es favorita
  static isFavorite(recipeId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(recipeId);
  }

  // AGREGADO: Limpiar todos los favoritos
  static clearFavorites(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error al limpiar favoritos:', error);
      return false;
    }
  }

  // AGREGADO: Obtener cantidad de favoritos
  static getFavoritesCount(): number {
    return this.getFavorites().length;
  }
}

export default FavoritesService;