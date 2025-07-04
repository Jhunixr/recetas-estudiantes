import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar'; // Importar el nuevo componente

const HomePage: React.FC = () => {
  const { recetas } = useRecipes();
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda

  // Filtrar recetas basado en la búsqueda
  const filteredRecetas = recetas.filter(receta =>
    receta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receta.ingredientes.some(ingrediente =>
      ingrediente.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Obtener las recetas más valoradas (top 3) de las filtradas
  const recetasDestacadas = filteredRecetas
    .sort((a, b) => b.valoracion - a.valoracion)
    .slice(0, 3);

  // Obtener recetas rápidas (menos de 20 minutos) de las filtradas
  const recetasRapidas = filteredRecetas
    .filter(receta => receta.tiempo <= 20)
    .slice(0, 3);

  // Función para manejar la búsqueda
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🍳 Recetas para Estudiantes</h1>
          <p className="hero-subtitle">
            Deliciosas recetas fáciles, rápidas y económicas para estudiantes universitarios
          </p>
          <div className="hero-buttons">
            <Link to="/recetas" className="cta-button primary">
              Explorar Recetas
            </Link>
            <Link to="/crear" className="cta-button secondary">
              Crear Mi Receta
            </Link>
          </div>
        </div>
      </section>

      {/* Usar el componente SearchBar */}
      <SearchBar 
        onSearch={handleSearch}
        placeholder="🔍 Buscar recetas por nombre o ingredientes..."
      />

      {/* Mostrar información de búsqueda si hay término de búsqueda */}
      {searchTerm && (
        <div style={{ 
          textAlign: 'center', 
          color: '#64748b',
          marginBottom: '2rem'
        }}>
          {filteredRecetas.length === 0 
            ? `No se encontraron recetas para "${searchTerm}"`
            : `Mostrando ${filteredRecetas.length} resultado${filteredRecetas.length !== 1 ? 's' : ''} para "${searchTerm}"`
          }
        </div>
      )}

      <section className="featured-section">
        <h2 className="section-title">⭐ Recetas Más Valoradas</h2>
        {recetasDestacadas.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>
            No se encontraron recetas destacadas con tu búsqueda
          </p>
        ) : (
          <div className="recipes-grid">
            {recetasDestacadas.map(receta => (
              <RecipeCard key={receta.id} recipe={receta} />
            ))}
          </div>
        )}
        <div className="section-footer">
          <Link to="/recetas" className="view-all-link">
            Ver todas las recetas →
          </Link>
        </div>
      </section>

      <section className="quick-section">
        <h2 className="section-title">⚡ Recetas Rápidas</h2>
        <p className="section-subtitle">Perfectas para cuando tienes poco tiempo</p>
        {recetasRapidas.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>
            No se encontraron recetas rápidas con tu búsqueda
          </p>
        ) : (
          <div className="recipes-grid">
            {recetasRapidas.map(receta => (
              <RecipeCard key={receta.id} recipe={receta} />
            ))}
          </div>
        )}
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">{filteredRecetas.length}</span>
            <span className="stat-label">
              {searchTerm ? 'Resultados' : 'Recetas'}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {filteredRecetas.length > 0 
                ? Math.round(filteredRecetas.reduce((acc, r) => acc + r.tiempo, 0) / filteredRecetas.length)
                : 0
              }
            </span>
            <span className="stat-label">Min Promedio</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {filteredRecetas.filter(r => r.dificultad === 'fácil').length}
            </span>
            <span className="stat-label">Recetas Fáciles</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;