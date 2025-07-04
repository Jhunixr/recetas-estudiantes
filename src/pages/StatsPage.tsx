import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';

const StatsPage: React.FC = () => {
  const { recetas, favoritos } = useRecipes();

  const totalRecetas = recetas.length;
  
  const recetasPorCategoria = recetas.reduce((contador, receta) => {
    contador[receta.categoria] = (contador[receta.categoria] || 0) + 1;
    return contador;
  }, {} as Record<string, number>);

  const recetasPorDificultad = recetas.reduce((contador, receta) => {
    contador[receta.dificultad] = (contador[receta.dificultad] || 0) + 1;
    return contador;
  }, {} as Record<string, number>);

  const recetaMasPopular = recetas.reduce((mejor, receta) => 
    receta.valoracion > mejor.valoracion ? receta : mejor
  );

  const tiempoPromedio = Math.round(
    recetas.reduce((suma, receta) => suma + receta.tiempo, 0) / totalRecetas
  );

  const totalFavoritos = favoritos.length;

  const getDificultadEmoji = (dificultad: string) => {
    if (dificultad === 'fácil') return '🟢';
    if (dificultad === 'medio') return '🟡';
    if (dificultad === 'difícil') return '🔴';
    return '⚪';
  };

  return (
    <div className="stats-page" style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>📊 Estadísticas de Recetas</h1>
      <div style={{ marginBottom: '2rem', background: '#fff', borderRadius: 8, padding: '1rem', boxShadow: '0 1px 4px #eee' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Resumen</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>Total recetas: <b>{totalRecetas}</b></li>
          <li>Min promedio: <b>{tiempoPromedio}</b></li>
          <li>Favoritos: <b>{totalFavoritos}</b></li>
          <li>Categorías: <b>{Object.keys(recetasPorCategoria).length}</b></li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem', background: '#fff', borderRadius: 8, padding: '1rem', boxShadow: '0 1px 4px #eee' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>🏆 Receta más popular</h2>
        <div style={{ marginBottom: 8 }}><b>{recetaMasPopular.nombre}</b></div>
        <div style={{ fontSize: '0.95rem', color: '#555' }}>
          ⭐ {recetaMasPopular.valoracion}/5 | ⏱️ {recetaMasPopular.tiempo} min | {getDificultadEmoji(recetaMasPopular.dificultad)} {recetaMasPopular.dificultad} | 🏷️ {recetaMasPopular.categoria}
        </div>
        <Link to={`/receta/${recetaMasPopular.id}`} style={{ display: 'inline-block', marginTop: 8, color: '#2563eb' }}>
          Ver Receta
        </Link>
      </div>

      <div style={{ marginBottom: '2rem', background: '#fff', borderRadius: 8, padding: '1rem', boxShadow: '0 1px 4px #eee' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>🏷️ Recetas por Categoría</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {Object.entries(recetasPorCategoria).map(([categoria, cantidad]) => (
            <li key={categoria}>{categoria}: <b>{cantidad}</b></li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: '2rem', background: '#fff', borderRadius: 8, padding: '1rem', boxShadow: '0 1px 4px #eee' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 8 }}>🎯 Recetas por Dificultad</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {Object.entries(recetasPorDificultad).map(([dificultad, cantidad]) => (
            <li key={dificultad}>{getDificultadEmoji(dificultad)} {dificultad}: <b>{cantidad}</b></li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/recetas" style={{ marginRight: 12, color: '#2563eb' }}>
          Ver Recetas
        </Link>
        <Link to="/crear" style={{ color: '#64748b' }}>
          Crear Receta
        </Link>
      </div>
    </div>
  );
};

export default StatsPage;