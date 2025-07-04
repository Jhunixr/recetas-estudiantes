import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';

const StatsPage: React.FC = () => {
  const { recetas, favoritos } = useRecipes();

  // Calcular estadísticas
  const totalRecetas = recetas.length;
  
  // Recetas por categoría
  const recetasPorCategoria = recetas.reduce((acc, receta) => {
    acc[receta.categoria] = (acc[receta.categoria] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Recetas por dificultad
  const recetasPorDificultad = recetas.reduce((acc, receta) => {
    acc[receta.dificultad] = (acc[receta.dificultad] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Receta más popular (mayor valoración)
  const recetaMasPopular = recetas.reduce((max, receta) => 
    receta.valoracion > max.valoracion ? receta : max
  );

  // Tiempo promedio de preparación
  const tiempoPromedio = Math.round(
    recetas.reduce((sum, receta) => sum + receta.tiempo, 0) / totalRecetas
  );

  // Total de favoritos
  const totalFavoritos = favoritos.length;

  const getDificultadEmoji = (dificultad: string) => {
    switch (dificultad) {
      case 'fácil': return '🟢';
      case 'medio': return '🟡';
      case 'difícil': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="stats-page">
      <div className="page-header">
        <h1 className="page-title">📊 Estadísticas de Recetas</h1>
        <p className="page-subtitle">
          Descubre datos interesantes sobre nuestra colección de recetas
        </p>
      </div>

      {/* Estadísticas generales */}
      <div className="stats-section">
        <h2 className="section-title">📈 Resumen General</h2>
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">{totalRecetas}</span>
            <span className="stat-label">Total Recetas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{tiempoPromedio}</span>
            <span className="stat-label">Min Promedio</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{totalFavoritos}</span>
            <span className="stat-label">Favoritos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{Object.keys(recetasPorCategoria).length}</span>
            <span className="stat-label">Categorías</span>
          </div>
        </div>
      </div>

      {/* Receta más popular */}
      <div className="stats-section">
        <h2 className="section-title">🏆 Receta Más Popular</h2>
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '1rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>
            {recetaMasPopular.nombre}
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem',
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            <span>⭐ {recetaMasPopular.valoracion}/5</span>
            <span>⏱️ {recetaMasPopular.tiempo} min</span>
            <span>{getDificultadEmoji(recetaMasPopular.dificultad)} {recetaMasPopular.dificultad}</span>
            <span>🏷️ {recetaMasPopular.categoria}</span>
          </div>
          <Link 
            to={`/receta/${recetaMasPopular.id}`}
            className="cta-button primary"
          >
            Ver Receta
          </Link>
        </div>
      </div>

      {/* Recetas por categoría */}
      <div className="stats-section">
        <h2 className="section-title">🏷️ Recetas por Categoría</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {Object.entries(recetasPorCategoria).map(([categoria, cantidad]) => (
            <div 
              key={categoria}
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {cantidad}
              </div>
              <div style={{ color: '#64748b', textTransform: 'capitalize' }}>
                {categoria}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recetas por dificultad */}
      <div className="stats-section">
        <h2 className="section-title">🎯 Recetas por Dificultad</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          {Object.entries(recetasPorDificultad).map(([dificultad, cantidad]) => (
            <div 
              key={dificultad}
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {getDificultadEmoji(dificultad)}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {cantidad}
              </div>
              <div style={{ color: '#64748b', textTransform: 'capitalize' }}>
                {dificultad}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link to="/recetas" className="cta-button primary" style={{ marginRight: '1rem' }}>
          Explorar Recetas
        </Link>
        <Link to="/crear" className="cta-button secondary">
          Crear Nueva Receta
        </Link>
      </div>
    </div>
  );
};

export default StatsPage;