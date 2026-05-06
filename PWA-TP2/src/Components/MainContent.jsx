import Title from "./Title";
import MainCard from "./MainCard";
import RoutineArchive from "./RoutineArchive";
import { useState } from "react";
import EmptyStateCard from "./EmptyStateCard";

export default function MainContent ({className}) {
    const [rutinaActivaId, setRutinaActiva] = useState(() => {
        const activeRoutineId = localStorage.getItem("activeRoutine");
        return activeRoutineId ? JSON.parse(activeRoutineId) : null;
    });
    if(!rutinaActivaId) {
        return ( 
            <main className={`bg-white gap-4 flex flex-col items-center justify-center p-4 md:px-24${className}`}>
                <EmptyStateCard />
            </main>
        );
    } else {
         return (
        <>
            <main className={`bg-white gap-4 flex flex-col items-center justify-center p-4 md:px-24 ${className}`}>
                <div className="w-full md:w-3/4 mx-auto">
                    <div className="text-left mb-2 -ml-50">
                        <Title titulo="Mis Rutinas" className="text-teal-600" descripcion="Tu espacio de crecimiento."/>
                    </div>
                    <MainCard rutinaActiva={rutinaActivaId}/>
                    <RoutineArchive />
                </div>
            </main>  
        </>
    );
    }

   
}