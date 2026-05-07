import { getCurrentWeekDates } from "../../utils/getDateUtils";
import { useState } from "react";
import { Check, CircleDot, Bed, Dumbbell} from "lucide-react";

export default function RoutineTracker({ className }) {
  //setHistory lo usamos luego para actualizar el estado del historial de entrenamiento
  //borrar proximo comentario cuando se use la funcion setHistory
  // eslint-disable-next-line no-unused-vars
  const [history, setHistory] = useState(() => {
    const storedHistory = localStorage.getItem("workoutHistory");
    return storedHistory ? JSON.parse(storedHistory) : {};
  });
  const weekDates = getCurrentWeekDates();
  const dayNames = ["L", "M", "M", "J", "V", "S", "D"];
  const dayNamesFull = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const idRutinaActiva = parseInt(JSON.parse(localStorage.getItem("activeRoutine")));
  const rutinaActiva = JSON.parse(localStorage.getItem("routines")).find(
    (rutina) => rutina.id === idRutinaActiva
  );
  const trainingDays =  rutinaActiva ? rutinaActiva.days : [];

  return (
    <>
      <div className={`bg-white w-full rounded-2xl h-20 p-4 ${className}`}>
        <div className="flex justify-between items-center w-full">
          {weekDates.map((dateString, index) => {
            const status = history[dateString];
            return (
              <div
                key={dateString}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs font-medium text-stone-600">
                  {dayNames[index]}
                </span>

                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  {status === "completed" && (
                    <div className="w-full h-full bg-emerald-500 rounded-full flex items-center justify-center text-white">
                      <Check className="w-4 h-4" strokeWidth={3} />
                    </div>
                  )}

                  {status === "pending" && (
                    <CircleDot className="w-6 h-6 text-emerald-400" />
                  )}

                  {!trainingDays.includes(dayNamesFull[index]) && (
                    <Bed className="w-6 h-6 text-emerald-400" />
                  )}

                  {!status && (
                    <span className="text-emerald-400">
                      {trainingDays.includes(dayNamesFull[index]) && (
                        <Dumbbell className="w-6 h-6 text-emerald-400" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
