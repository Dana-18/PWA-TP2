import React from "react";
import Footer from "../../Components/Footer/Footer";
import MainContent from "../../Components/MainContent/MainContent";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import ExerciseGallery from "../../Components/CatalogFilter/CatalogFilter";
import Spinner from "../../Components/Spinner/Spinner";
import { useEffect, useState, useCallback} from "react";
import { useTranslation } from "react-i18next";

export default function Catalog() {
  const [datos, setDatos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { t, i18n } = useTranslation();

  const obtenerDatos =  useCallback (async (pageNum = 0) => {
    // Freno de mano: Evita peticiones duplicadas si ya está cargando o si ya procesamos esa página
    if (loading || !hasMore || (pageNum > 0 && pageNum <= page)) return;
    
    setLoading(true);
    try {
      const limit = 10;
      
      // URL de tu API en Express alojada en Vercel
      const response = await fetch(`https://tp-express.vercel.app/api/exercises?lang=${i18n.language}`);
      let datosRecibidos = await response.json();
      
      console.log("Datos recibidos página", pageNum, ":", datosRecibidos);
      console.log(i18n.language); 
      // Validación por si la API devuelve un objeto intermedio
      if (datosRecibidos && !Array.isArray(datosRecibidos) && Array.isArray(datosRecibidos.exercises)) {
        datosRecibidos = datosRecibidos.exercises;
      }

      // Si no es un array válido o viene completamente vacío, cerramos el scroll
      if (!Array.isArray(datosRecibidos) || datosRecibidos.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      
      // Si llegaron menos elementos que el límite, significa que es la última página
      if (datosRecibidos.length < limit) {
        setHasMore(false);
      }
      
      if (pageNum === 0) {
        setDatos(datosRecibidos);
      } else {
        setDatos(prev => {
          // Filtramos usando un Set con los IDs existentes para asegurar que no se dupliquen en pantalla
          const IDsExistentes = new Set(prev.map(item => item.id || item._id));
          const nuevosFiltrados = datosRecibidos.filter(item => !IDsExistentes.has(item.id || item._id));
          
          // Si la API nos mandó datos pero todos están repetidos, apagamos el "hasMore"
          if (nuevosFiltrados.length === 0) {
            setHasMore(false);
          }
          
          return [...prev, ...nuevosFiltrados];
        });
      }
      
      setPage(pageNum);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false); 
    }
  },[i18n.language])  ;

  useEffect(() => {
    obtenerDatos(0);
  }, [i18n.language, obtenerDatos]); // Recarga al cambiar el idioma

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop + window.innerHeight;
      
      // Se dispara cuando el usuario está a 250px de tocar el fondo
      if (scrollTop >= scrollHeight - 250 && !loading && hasMore) {
        obtenerDatos(page + 1); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, loading, hasMore]); // Dependencias clave para seguir el estado real del scroll

  return (
    <div className="no-scrollbar min-h-screen bg-slate-100 text-slate-900 md:grid md:grid-cols-[280px_minmax(0,1fr)]">
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className='bg-white gap-4 flex flex-col justify-center p-4 md:px-48 overflow-y-auto flex-1'>
         <div className="mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">{t("catalog.title")}</h2>
           <div className="mb-4 max-w-md mx-auto ml-0">
             <input
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Buscar ejercicios por nombre..."
               className="w-full px-4 py-2 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
             />
           </div>
           {searchTerm && datos.length > 0 && (
             <div className="text-sm text-gray-600 mb-4">Resultados para "{searchTerm}"</div>
           )}
            {(() => {
              const term = searchTerm.trim().toLowerCase();
              console.log("Datos" + datos);
              const filtered = term ? datos.filter(d => (d.name || '').toLowerCase().includes(term)) : datos;
              console.log("Filtrados" + filtered);
              return (
                <>
                  <ExerciseGallery datos={filtered} searchTerm={searchTerm} />
                  {term && filtered.length === 0 && (
                    <div className="flex justify-center mt-8">
                      <p className="text-gray-600">No se encontraron ejercicios.</p>
                    </div>
                  )}
                </>
              );
            })()}
            {!searchTerm && datos.length === 0 && loading && (
             <div className="flex flex-col items-center justify-center mt-8">
               <Spinner size="lg" />
               <p className="text-gray-600 mt-4">Cargando ejercicios...</p>
             </div>
           )}
           {searchTerm && datos.length === 0 && loading && (
             <div className="text-center mb-4">
               <Spinner size="md" />
               <p className="text-gray-600 mt-2">Buscando ejercicios...</p>
             </div>
           )}
            {loading && datos.length > 0 && (
              <div className="flex flex-col items-center justify-center mt-8 mb-8">
                <Spinner size="md" />
                <p className="text-gray-600 mt-2">Cargando más items...</p>
              </div>
            )}
         </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
