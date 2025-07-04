// Ejercicio 4: Servicio de favoritos
// Esto del localStorage me confunde un poco, pero voy a intentarlo

class FavoritesService {
  // Nombre de la clave donde guardar en localStorage
  private static readonly STORAGE_KEY = 'recetas-favoritos';

  // Obtener favoritos guardados
  static getFavorites(): number[] {
    try {
      // Intentar obtener del localStorage
      const favorites = localStorage.getItem(this.STORAGE_KEY);
      // Si existe, convertir de JSON a array, si no, devolver array vacío
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      // Si hay error, mostrar en consola y devolver array vacío
      console.error('Error al obtener favoritos:', error);
      return [];
    }
  }

  // Agregar receta a favoritos
  static addFavorite(recipeId: number): boolean {
    try {
      const favorites = this.getFavorites();
      // Solo agregar si no está ya en favoritos
      if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        // Guardar en localStorage como string JSON
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
        return true; // Éxito
      }
      return false; // Ya estaba en favoritos
    } catch (error) {
      console.error('Error al agregar favorito:', error);
      return false; // Error
    }
  }

  // Quitar receta de favoritos
  static removeFavorite(recipeId: number): boolean {
    try {
      const favorites = this.getFavorites();
      // Filtrar para quitar el ID que no queremos
      const newFavorites = favorites.filter(id => id !== recipeId);
      // Guardar la nueva lista
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newFavorites));
      return true;
    } catch (error) {
      console.error('Error al quitar favorito:', error);
      return false;
    }
  }

  // Verificar si una receta está en favoritos
  static isFavorite(recipeId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(recipeId);
  }

  // Limpiar todos los favoritos (por si acaso)
  static clearFavorites(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error al limpiar favoritos:', error);
      return false;
    }
  }

  // Contar cuántos favoritos hay
  static getFavoritesCount(): number {
    return this.getFavorites().length;
  }
}

export default FavoritesService;