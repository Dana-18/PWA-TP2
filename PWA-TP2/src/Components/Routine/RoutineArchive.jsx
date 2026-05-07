import SecondaryCard from "../Card/SecondaryCard";

export default function RoutineArchive ({rutinas = []}) {
    return (
        <div className="flex w-full flex-col gap-2 md:w-3/4 mx-auto">
            <span className="ml-2 text-stone-500 tracking-wide">ARCHIVO & ALTERNATIVAS</span>
            <div>
                {rutinas && (
                    <SecondaryCard /> 
                )}
            </div>
        </div>
    );
}