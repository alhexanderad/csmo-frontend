import React from 'react'
import { useParams } from 'react-router-dom';
import CarImageCarousel from '../components/CarImageCarousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Car } from '../types/car';

const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el parámetro de la URL
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchCarDetails = async () => {
        try {
          const response = await axios.get<Car>(`http://127.0.0.1:8000/api/cars/${id}/`);
          setCar(response.data);
        } catch (err) {
          setError('Error al cargar los detalles del auto.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCarDetails();
    }, [id]);
  
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
<div className="car-details">
      {car ? (
        <>
          <h1>
            {car.model?.make?.name || 'Marca desconocida'} {car.model?.name || 'Modelo desconocido'}
          </h1>
          <div className="car-images">
            <CarImageCarousel 
              images={car.images || []} 
              altText={`${car.model?.make?.name || 'Marca'} ${car.model?.name || 'Modelo'}`}
            />
          </div>
          <div className="car-info">
            <p>Año: {car.year || 'Desconocido'}</p>
            <p>Color: {car.color || 'No especificado'}</p>
            <p>VIN: {car.vin}</p>
            <p>Precio: ${car.price ? car.price.toLocaleString() : 'No disponible'}</p>
          </div>
        </>
      ) : (
        <p>No se encontraron detalles para este automóvil.</p>
      )}
    </div>
    );
  }

export default CarDetails