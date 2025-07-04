// Servicio para manejar favoritos en localStorage
export class FavoritesService {
  private static readonly STORAGE_KEY = 'recetas-favoritos';

  // Obtener favoritos del localStorage
  static getFavorites(): number[] {
    try {
      const favorites = localStorage.getItem(this.STORAGE_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      return [];
    }
  }

  // Agregar receta a favoritos
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

  // Remover receta de favoritos
  static removeFavorite(recipeId: number): boolean {
    try {
      const favorites = this.getFavorites();
      const filteredFavorites = favorites.filter(id => id !== recipeId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredFavorites));
      return true;
    } catch (error) {
      console.error('Error al remover favorito:', error);
      return false;
    }
  }

  // Verificar si una receta está en favoritos
  static isFavorite(recipeId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(recipeId);
  }

  // Limpiar todos los favoritos
  static clearFavorites(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error al limpiar favoritos:', error);
      return false;
    }
  }

  // Obtener cantidad de favoritos
  static getFavoritesCount(): number {
    return this.getFavorites().length;
  }
}

export default FavoritesService;