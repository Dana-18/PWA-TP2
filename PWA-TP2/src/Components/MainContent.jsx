import Title from "./Title";
import MainCard from "./MainCard";
import RoutineArchive from "./RoutineArchive";

export default function MainContent ({className}) {
    return (
        <>
            <main className={`bg-[#e0dbc5] gap-4 flex flex-col p-4 md:px-24 ${className}`}>
                <Title titulo="Mis Rutinas" descripcion="Tu espacio de crecimiento."/>
                <MainCard />
                <RoutineArchive />
            </main>  
        </>
    );
}