import Button from "./Button";
import Title from "./Title";
import {Plus} from "lucide-react";

export default function EmptyStateCard() {
    return (
        <div className="flex md:w-1/2 flex-col items-center h-80 justify-center gap-4 rounded-4xl bg-white p-6 shadow-md">
            <p className="text-3xl text-center font-semibold text-gray-600">Tu entrenamiento comienza aquí.</p>
            <p className="text-center text-gray-600">Diseña una rutina a tu medida y empeza tu viaje de fitness.</p>
            <div className="cursor-pointer hover:bg-emerald-600 hover:scale-105 transition-transform w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mt-6">
                <Plus className="w-6 h-6 text-white" />
            </div>
        </div>
    );
}