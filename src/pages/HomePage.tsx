import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Car, PaginatedResponse } from '../types/car';
import '../styles/CarDetails.css'

const HomePage: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  // Efecto para obtener los datos de los automóviles
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Solicitud GET a la API
        const response = await axios.get<PaginatedResponse<Car>>('http://127.0.0.1:8000/api/cars/');
        // Extraer los resultados de la respuesta paginada
        setCars(response.data.results || []);
      } catch (err) {
        setError('Error al cargar los autos');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Mostrar mensaje de carga
  if (loading) return <div>Cargando...</div>;

  // Mostrar mensaje de error
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Listado de Automóviles</h1>
      <div className="cars-grid">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.vin} className="car-card">
              <div className="car-image">
                {car.primary_image && car.primary_image.image ? (
                  <img
                    src={`${car.primary_image.image}`}
                    alt={`${car.model?.make?.name || 'Marca desconocida'} ${car.model?.name || 'Modelo desconocido'}`}
                  />
                ) : (
                  <div className="no-image">Sin imagen</div>
                )}
              </div>
              <div className="car-details">
                <h3>
                  {car.model?.make?.name || 'Marca desconocida'} {car.model?.name || 'Modelo desconocido'}
                </h3>
                <p>Año: {car.year || 'Desconocido'}</p>
                <p>Color: {car.color || 'No especificado'}</p>
                <p>VIN: {car.vin}</p>
                <p>Precio: ${car.price ? car.price.toLocaleString() : 'No disponible'}</p>
                {/* Agregar enlace a la página de detalles */}
                <Link to={`/car/${car.id}`}>Ver detalles</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No hay automóviles disponibles</p>
        )}
      </div>
    </div>
    
      );
    
}

export default HomePage