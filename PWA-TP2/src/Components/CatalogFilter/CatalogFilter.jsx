import React, { useState, useEffect } from 'react';
import CardItem from "../CardItem/CardItem";
import { useTranslation } from 'react-i18next';

const ExerciseGallery = ({datos}) => {

    const {i18n} = useTranslation();
    const [categoriaActiva, setCategoriaActiva] = useState('All');
    const [datosCompletos, setDatosCompletos] = useState([]);
    const [cargandoFiltro, setCargandoFiltro] = useState(false);

    // Categorías base en inglés (identificadores consistentes)
    const categoriasBase = ['All', 'Chest', 'Back', 'Shoulders', 'Legs', 'Biceps', 'Triceps'];
    
    // Función para obtener la traducción de una categoría
    const getCategoriaNombre = (categoria) => {
        const traducciones = {
            'All': i18n.language === 'es' ? 'Todos' : 'All',
            'Chest': i18n.language === 'es' ? 'Pecho' : 'Chest',
            'Back': i18n.language === 'es' ? 'Espalda' : 'Back',
            'Shoulders': i18n.language === 'es' ? 'Hombros' : 'Shoulders',
            'Legs': i18n.language === 'es' ? 'Piernas' : 'Legs',
            'Biceps': i18n.language === 'es' ? 'Biceps' : 'Biceps',
            'Triceps': i18n.language === 'es' ? 'Triceps' : 'Triceps'
        };
        return traducciones[categoria] || categoria;
    };

    // Función para obtener el valor correcto de filtro según el idioma
    const getValorFiltro = (categoria) => {
        if (categoria === 'All') return 'All';
        return getCategoriaNombre(categoria);
    };

    // Cargar todos los datos desde la API
    const obtenerTodosDatos = async (idioma) => {
        setCargandoFiltro(true);
        try {
            const response = await fetch(`https://tp-express.vercel.app/api/exercises?lang=${idioma}&limit=1000`);
            const datosRecibidos = await response.json();
            
            // Validación por si la API devuelve un objeto intermedio
            let datosFinales = Array.isArray(datosRecibidos) ? datosRecibidos : datosRecibidos.exercises || [];
            
            setDatosCompletos(datosFinales);
            console.log("Datos completos recibidos:", datosFinales);
            console.log("Grupos musculares únicos:", [...new Set(datosFinales.map(d => d.muscleGroup))]);
        } catch (error) {
            console.log("Error al cargar todos los datos:", error);
            setDatosCompletos([]);
        }
        setCargandoFiltro(false);
    };
    
    // Cargar datos cuando cambia el idioma
    useEffect(() => {
        setCategoriaActiva('All');
        obtenerTodosDatos(i18n.language);
    }, [i18n.language]);
    
    // Cargar datos cuando se selecciona una categoría distinta a "All"
    useEffect(() => {
        if (categoriaActiva !== 'All') {
            obtenerTodosDatos(i18n.language);
        }
    }, [categoriaActiva, i18n.language]);

    // Usar datosCompletos si tenemos datos, sino usar datos del padre (para "All")
    const datosAMostrar = datosCompletos.length > 0 ? datosCompletos : datos;
    const valorFiltroActivo = getValorFiltro(categoriaActiva);
    const datosFiltrados = categoriaActiva === 'All' 
        ? datosAMostrar 
        : datosCompletos.filter(item => {
            console.log("Filtrando item:", item, "por categoria:", categoriaActiva, "valor filtro:", valorFiltroActivo, "muscleGroup:", item.muscleGroup);
            return item.muscleGroup === valorFiltroActivo;
          });

    return (
        <div className="w-full">
            
            <div className="flex flex-wrap gap-2 mb-6">
                {categoriasBase.map((cat) => {
                    const label = getCategoriaNombre(cat);
                    return (
                        <button
                            key={cat}
                            onClick={() => setCategoriaActiva(cat)}
                            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                                categoriaActiva === cat
                                    ? 'bg-teal-700 text-white cursor-pointer'
                                    : 'bg-stone-100 text-black hover:bg-stone-200 cursor-pointer'
                            }`}
                            disabled={cargandoFiltro && cat !== 'All'}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {cargandoFiltro && categoriaActiva !== 'All'
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