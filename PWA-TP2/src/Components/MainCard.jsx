import Title from "./Title";
import Badge from "./Badge";
import RoutineTracker from "./RoutineTracker";
import Button from "./Button";
import {SquarePen, ArrowRight} from "lucide-react";

export default function MainCard ({rutinaActiva}) {
    const rutinas = JSON.parse(localStorage.getItem("routines"));
    const rutinaActivaData = rutinas ? rutinas.find(rutina => rutina.id === parseInt(rutinaActiva)) : null;
    console.log("Rutina Activa Data:", rutinaActivaData);
    return (
        <div className="flex items-start flex-col w-full rounded-3xl bg-white p-6 shadow-sm mt-12">
            <div className="grid grid-cols-4 gap-4 items-start w-full">
                <Title className="col-span-3" titulo={rutinaActivaData.name} size="medium" >
                    <Badge className="ml-3 bg-[#71F8E4]" text="ACTIVA" />
                </Title>
                <SquarePen className="cursor-pointer col-span-1 ml-auto text-[#10B981]" size={24} />
            </div>
            <div className="mt-4 w-full">
                <span className="tracking-wide text-stone-500">ESTA SEMANA</span>
                <RoutineTracker className="mt-2" />
            </div>
            <div className="w-full flex">
                <Button text="Comenzar Sesi�n" className="cursor-pointer mt-4 ml-auto flex items-center gap-1">
                    <ArrowRight size={20} />
                </Button>
            </div>
        </div>
    );
}
