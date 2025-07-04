// AGREGADO: Nuevo componente SearchBar para funcionalidad de búsqueda
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Buscar recetas..." 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // AGREGADO: Manejar envío del formulario de búsqueda
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  // AGREGADO: Búsqueda en tiempo real mientras el usuario escribe
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Búsqueda instantánea
  };

  // AGREGADO: Función para limpiar la búsqueda
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          alignItems: 'center',
          background: 'white',
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder={placeholder}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            {/* AGREGADO: Botón para limpiar búsqueda cuando hay texto */}
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  color: '#6b7280'
                }}
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            🔍 Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;