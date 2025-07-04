// AGREGADO: Nueva página completa de estadísticas
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';

const StatsPage: React.FC = () => {
  const { recetas, favoritos } = useRecipes();

  const totalRecetas = recetas.length;
  
  // AGREGADO: Calcular estadísticas por categoría
  const recetasPorCategoria = recetas.reduce((contador, receta) => {
    contador[receta.categoria] = (contador[receta.categoria] || 0) + 1;
    return contador;
  }, {} as Record<string, number>);

  // AGREGADO: Calcular estadísticas por dificultad
  const recetasPorDificultad = recetas.reduce((contador, receta) => {
    contador[receta.dificultad] = (contador[receta.dificultad] || 0) + 1;
    return contador;
  }, {} as Record<string, number>);

  // AGREGADO: Encontrar la receta más popular (mejor valorada)
  const recetaMasPopular = recetas.reduce((mejor, receta) => 
    receta.valoracion > mejor.valoracion ? receta : mejor
  );

  // AGREGADO: Calcular tiempo promedio de preparación
  const tiempoPromedio = Math.round(
    recetas.reduce((suma, receta) => suma + receta.tiempo, 0) / totalRecetas
  );

  const totalFavoritos = favoritos.length;

  // AGREGADO: Función helper para emojis de dificultad
  const getDificultadEmoji = (dificultad: string) => {
    if (dificultad === 'fácil') return '🟢';
    if (dificultad === 'medio') return '🟡';
    if (dificultad === 'difícil') return '🔴';
    return '⚪';
  };

  return (
    <div className="stats-page">
      <div className="page-header">
        <h1 className="page-title">📊 Estadísticas de Recetas</h1>
        <p className="page-subtitle">
          Datos interesantes sobre nuestras recetas
        </p>
      </div>

      {/* AGREGADO: Sección de resumen general */}
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

      {/* AGREGADO: Sección de receta más popular */}
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

      {/* AGREGADO: Sección de estadísticas por categoría */}
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

      {/* AGREGADO: Sección de estadísticas por dificultad */}
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

      {/* AGREGADO: Botones de navegación al final */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link to="/recetas" className="cta-button primary" style={{ marginRight: '1rem' }}>
          Ver Recetas
        </Link>
        <Link to="/crear" className="cta-button secondary">
          Crear Receta
        </Link>
      </div>
    </div>
  );
};

export default StatsPage;