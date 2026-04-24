import Title from "./Title";
import Badge from "./Badge";    
import RoutineTracker from "./RoutineTracker";
import Button from "./Button";
import {SquarePen, ArrowRight} from "lucide-react";

export default function MainCard () {
    return (
        <>
            <div className="flex items-start flex-col w-full bg-white h- rounded-3xl mt-12 p-6">
                <div className="grid grid-cols-4 items-start w-full">
                    <Title className="col-span-3" titulo="Rutina 1" descripcion="Descripción de la rutina 1." size="medium" >
                        <Badge className="ml-3 bg-[#71F8E4]" text="ACTIVA" />
                    </Title>
                    <SquarePen className="col-span-1 ml-auto text-[#10B981]" size={24} />
                </div>
                <div className="mt-4 w-full">
                    <span className="tracking-wide text-stone-500">ESTA SEMANA</span>
                    <RoutineTracker className="mt-2" /> 
                </div>
                <div className="w-full flex">
                    {/* Acá hay que pasar el prop "to: ruta" para que vaya a la vista de comenzar la sesion,  */}
                    <Button text="Comenzar Sesión" className="mt-4 ml-auto flex items-center gap-1">
                        <ArrowRight size={20} />
                    </Button>
                </div>
            </div>
        </>
    );
}