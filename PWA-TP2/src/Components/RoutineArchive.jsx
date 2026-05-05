import SecondaryCard from "./SecondaryCard";

export default function RoutineArchive ({rutinas = []}) {
    return (
        <div className="md:ml-15 flex w-full flex-col gap-2">
            <span className="ml-2 text-stone-500 tracking-wide">ARCHIVO & ALTERNATIVAS</span>
            <div>
                {rutinas && (
                    <SecondaryCard /> 
                )}
            </div>
        </div>
    );
}