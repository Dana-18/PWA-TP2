import Title from "../Title/Title";
import Badge from "../Badge/Badge";
import RoutineTracker from "../Routine/RoutineTracker";
import Button from "../Button/Button";
import {SquarePen, ArrowRight} from "lucide-react";

export default function MainCard ({rutinaActiva}) {
    const rutinas = JSON.parse(localStorage.getItem("routines"));
    const rutinaActivaData = rutinas ? rutinas.find(rutina => rutina.id === parseInt(rutinaActiva)) : null;
    console.log("Rutina Activa Data:", rutinaActivaData);
    return (
        <div className="flex items-center flex-col md:w-3/4 w-full max-w-4xl rounded-3xl bg-[#141314] p-6 shadow-sm mx-auto mt-4">
            <div className="grid grid-cols-4 gap-4 items-start w-full">
                <Title className="col-span-3 text-emerald-500" titulo={rutinaActivaData.name} size="medium" >
                    <Badge className="ml-3 bg-[#10B981] text-white" text="ACTIVA" />
                </Title>
                <SquarePen className="cursor-pointer col-span-1 ml-auto text-[#10B981]" size={24} />
            </div>
            <div className="mt-4 w-full">
                <span className="tracking-wide text-white">ESTA SEMANA</span>
                <RoutineTracker className="mt-2" />
            </div>
            <div className="w-full flex">
                <Button text="Comenzar Sesión" className="cursor-pointer mt-4 ml-auto rounded-full flex items-center gap-1">
                    <ArrowRight size={20} />
                </Button>
            </div>
        </div>
    );
}
