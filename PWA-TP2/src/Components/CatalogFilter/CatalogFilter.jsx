import React, { useState, useEffect } from 'react';
import CardItem from "../CardItem/CardItem";
import { useTranslation } from 'react-i18next';

const ExerciseGallery = ({datos, searchTerm = ""}) => {

    const {i18n} = useTranslation();
    const [categoriaActiva, setCategoriaActiva] = useState('All');
    const [datosCompletos, setDatosCompletos] = useState([]); // reservado pero no cargamos todo aquí

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

    // Nota: para respetar la carga incremental del padre, NO solicitamos todos los datos aquí.
    // Usaremos `datos` provistos por el componente padre (`Catalog`).

    // Usar los datos provistos por el padre para respetar la paginación incremental
    const datosAMostrar = datos;
    const valorFiltroActivo = getValorFiltro(categoriaActiva);
    
    // Filtrar por categoría y searchTerm
    let datosFiltrados = categoriaActiva === 'All'
        ? datosAMostrar
        : datosAMostrar.filter(item => {
            // comparo por identificador base o por nombre traducido
            return item.muscleGroup === categoriaActiva || item.muscleGroup === getCategoriaNombre(categoriaActiva);
        });
    
    // Aplicar filtro de búsqueda
    if (searchTerm.trim()) {
        const termino = searchTerm.trim().toLowerCase();
        datosFiltrados = datosFiltrados.filter(item => 
            (item.name || '').toLowerCase().includes(termino)
        );
    }

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
                            }`}>
                            {label}
                        </button>
                    );
                })}
            </div>

            

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