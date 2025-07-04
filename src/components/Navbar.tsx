import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { favoritos } = useRecipes();

  const isActive = (path: string) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          🍳 Recetas Estudiantes
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/" className={isActive('/')}>
          🏠 Inicio
        </Link>
        <Link to="/recetas" className={isActive('/recetas')}>
          📖 Todas las Recetas
        </Link>
        <Link to="/favoritas" className={isActive('/favoritas')}>
          ❤️ Favoritas ({favoritos.length})
        </Link>
        {/* AGREGADO: Nuevo enlace a página de estadísticas */}
        <Link to="/estadisticas" className={isActive('/estadisticas')}>
          📊 Estadísticas
        </Link>
        <Link to="/crear" className={isActive('/crear')}>
          ➕ Crear Receta
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;