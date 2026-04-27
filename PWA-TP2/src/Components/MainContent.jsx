import Title from "./Title";
import MainCard from "./MainCard";
import RoutineArchive from "./RoutineArchive";
import { useState } from "react";
import EmptyStateCard from "./EmptyStateCard";

export default function MainContent ({className}) {
    const [rutina, setRutina] = useState(() => {
        const rutinaGuardada = localStorage.getItem("rutinaActiva");
        return rutinaGuardada ? JSON.parse(rutinaGuardada) : null;
    });

    if(!rutina) {
        return ( 
            <main className={`bg-[#e0dbc5] gap-4 flex flex-col items-center justify-center p-4 md:px-24 ${className}`}>
                <EmptyStateCard />
            </main>
        );
    } else {
         return (
        <>
            <main className={`bg-[#e0dbc5] gap-4 flex flex-col justify-center p-4 md:px-48 ${className}`}>
                <Title titulo="Mis Rutinas" descripcion="Tu espacio de crecimiento."/>
                <MainCard />
                <RoutineArchive />
            </main>  
        </>
    );
    }

   
}