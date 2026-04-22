import Title from "./Title";

export default function MainContent ({className}) {
    return (
        <>
            <main className={`bg-[#e0dbc5] p-4 ${className}`}>
                <Title titulo="Mis Rutinas" descripcion="Tu espacio de crecimiento." />
            </main>  
        </>
    );
}