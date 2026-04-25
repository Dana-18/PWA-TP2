import { useState, useEffect } from 'react';

export default function EjerciciosList() {
  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerEjercicios = async () => {
      try {
        const response = await fetch('https://69e6e0ca68208c1debe8004e.mockapi.io/api/v1/ejercicios');
        if (!response.ok) {
          throw new Error('Error al obtener los ejercicios');
        }
        const datos = await response.json();
        setEjercicios(datos);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    obtenerEjercicios();
  }, []);

  if (loading) return console.log("Cargando ejercicios...");
  if (error) return console.log("error");

}
