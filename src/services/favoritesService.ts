class FavoritesService {
  private static readonly STORAGE_KEY = 'recetas-favoritos';

  static getFavorites(): number[] {
    try {
      const favorites = localStorage.getItem(this.STORAGE_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      return [];
    }
  }

  static addFavorite(recipeId: number): boolean {
    try {
      const favorites = this.getFavorites();
      if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al agregar favorito:', error);
      return false;
    }
  }

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

  static isFavorite(recipeId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(recipeId);
  }

  static clearFavorites(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error al limpiar favoritos:', error);
      return false;
    }
  }

  static getFavoritesCount(): number {
    return this.getFavorites().length;
  }
}

export default FavoritesService;