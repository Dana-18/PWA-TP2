import React from "react";
import { useParams, useSearchParams } from "react-router";
import Footer from "../../Components/Footer/Footer";
import MainContent from "../../Components/MainContent";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import ExerciseGallery from "../../Components/CatalogFilter/CatalogFilter";
import { useEffect, useState } from "react";

export default function Catalog() {
  const [datos, setDatos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const obtenerDatos = async (pageNum = 0) => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const limit = 10;
      const skip = pageNum * limit;
      const response = await fetch(`https://69e6e0ca68208c1debe8004e.mockapi.io/api/v1/ejercicios?limit=${limit}&page=${pageNum + 1}`);
      const datosRecibidos = await response.json();
      
      console.log("Datos recibidos página", pageNum, ":", datosRecibidos);
      
      if (datosRecibidos.length < limit) {
        setHasMore(false);
      }
      
      if (pageNum === 0) {
        setDatos(datosRecibidos);
      } else {
        setDatos(prev => [...prev, ...datosRecibidos]);
      }
      setPage(pageNum);
    } catch (error) {
      console.log("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    obtenerDatos(0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop + window.innerHeight;
      
      if (scrollTop >= scrollHeight - 200 && !loading && hasMore) {
        obtenerDatos(page + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, loading, hasMore]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 md:grid md:grid-cols-[280px_minmax(0,1fr)]">
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className='bg-[#e0dbc5] gap-4 flex flex-col justify-center p-4 md:px-48 overflow-y-auto flex-1'>
         <div className="mx-auto p-6">
           <div className="mb-4 max-w-md mx-auto">
             <input
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Buscar ejercicios por nombre..."
               className="w-full px-4 py-2 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
             />
           </div>
           {searchTerm && datos.length === 0 && (
             <div className="text-center text-gray-600 mb-4">Cargando ejercicios...</div>
           )}
           {searchTerm && datos.length > 0 && (
             <div className="text-sm text-gray-600 mb-4">Resultados para "{searchTerm}"</div>
           )}
            {(() => {
              const term = searchTerm.trim().toLowerCase();
              const filtered = term ? datos.filter(d => (d.name || '').toLowerCase().includes(term)) : datos;
              return (
                <>
                  <ExerciseGallery datos={filtered} />
                  {term && filtered.length === 0 && (
                    <div className="flex justify-center mt-8">
                      <p className="text-gray-600">No se encontraron ejercicios.</p>
                    </div>
                  )}
                </>
              );
            })()}
            {loading && (
              <div className="flex justify-center mt-8">
                <p className="text-gray-600">Cargando más items...</p>
              </div>
            )}
            {!hasMore && datos.length > 0 && (
              <div className="flex justify-center mt-8">
                <p className="text-gray-600">No hay más items para mostrar</p>
              </div>
            )}
         </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
