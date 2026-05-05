import React, { useState, useEffect } from 'react';
import CardItem from "../../Components/CardItem/CardItem";
import { useTranslation } from 'react-i18next';

const ExerciseGallery = ({datos}) => {

    const { t } = useTranslation();
    const [categoriaActiva, setCategoriaActiva] = useState('Todos');
    const [datosCompletos, setDatosCompletos] = useState([]);
    const [cargandoFiltro, setCargandoFiltro] = useState(false);

    const categorias = ['Todos', 'Pecho', 'Espalda', 'Hombros', 'Piernas', 'Biceps', 'Triceps'];

    // Cargar todos los datos cuando se selecciona una categoría diferente a "Todos"
    useEffect(() => {
        if (categoriaActiva !== 'Todos') {
            obtenerTodosDatos();
        }
    }, [categoriaActiva]);

    const obtenerTodosDatos = async () => {
        setCargandoFiltro(true);
        try {
            const response = await fetch('https://69e6e0ca68208c1debe8004e.mockapi.io/api/v1/ejercicios?limit=1000&page=1');
            const datosRecibidos = await response.json();
            setDatosCompletos(datosRecibidos);
        } catch (error) {
            console.log("Error al cargar todos los datos:", error);
            setDatosCompletos([]);
        }
        setCargandoFiltro(false);
    };

    const datosFiltrados = categoriaActiva === 'Todos' ? datos : datosCompletos.filter(item => item.muscular_group === categoriaActiva);

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6">{t("catalog.title")}</h2>

            <div className="flex flex-wrap gap-2 mb-6">
                {categorias.map((cat) => (
                    <button
                    key={cat}
                    onClick={() => setCategoriaActiva(cat)}
                    className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                        categoriaActiva === cat 
                            ? 'bg-teal-700 text-white cursor-pointer' 
                            : 'bg-stone-100 text-black hover:bg-stone-200 cursor-pointer'
                    }`}
                    disabled={cargandoFiltro && cat !== 'Todos'}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {cargandoFiltro && categoriaActiva !== 'Todos'
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {datosFiltrados.map((item) => (
                    <div key={item.id}>
                        <CardItem 
                        key={item.id}
                        item={item}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExerciseGallery;