import Title from "./Title";
import MainCard from "./MainCard";

export default function MainContent ({className}) {
    return (
        <>
            <main className={`bg-[#e0dbc5] p-4 md:px-24 ${className}`}>
                <Title titulo="Mis Rutinas" descripcion="Tu espacio de crecimiento."/>
                <MainCard />
            </main>  
        </>
    );
}