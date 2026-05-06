import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Footer from "../../Components/Footer/Footer";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CreateRoutine() {
    const navigate = useNavigate();
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    const daysFullNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const [selectedDays, setSelectedDays] = useState([]);
    const [routineName, setRoutineName] = useState("");
    const { t } = useTranslation();

    const toggleDay = (index) => {
        setSelectedDays((prev) => {
            if (prev.includes(index)) {
                return prev.filter((d) => d !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const handleContinue = () => {
        if (selectedDays.length > 0 && routineName.trim() !== "") {
            // Guardar los días seleccionados y nombre de la rutina en localStorage
            const selectedDayNames = selectedDays.map((idx) => daysFullNames[idx]);
            const routines = localStorage.getItem("routines") ? JSON.parse(localStorage.getItem("routines")) : [];
            const cantRoutines = routines.length;
            const newRoutine = {id: cantRoutines, name: routineName, days: selectedDayNames };
            routines.push(newRoutine);
            localStorage.setItem("routines", JSON.stringify(routines));
            // Redirigir al siguiente paso del flujo
            navigate(`/select-exercises/${newRoutine.id}`);
        }
    };

    return (
        <div className="md:h-screen bg-white text-slate-900 md:grid md:grid-cols-[280px_minmax(0,1fr)]">
            <Sidebar />
            <div className="flex md:h-screen flex-col">
                <Header />
                <div className="flex-1 bg-white">
                    <main className="flex flex-col items-center justify-center p-4 md:px-24 py-4">
                        <div className="self-start">
                            <button
                                onClick={() => navigate("/")}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span>BACK</span>
                            </button>
                        </div>

                        <div className="max-w-2xl w-full bg-[#141314] h-full rounded-4xl p-8 md:px-0 md:py-2 shadow-lg">
                            <h1 className="text-4xl font-bold text-center text-emerald-500 mb-6">
                                {t("createRoutine.title")}
                            </h1>
                            
                            <div className="mb-6 items-center flex flex-col">
                                <input
                                    type="text"
                                    placeholder={t("createRoutine.nameButton")}
                                    value={routineName}
                                    onChange={(e) => setRoutineName(e.target.value)}
                                    className="w-3/4 px-4 text-white py-3 border border-emerald-500 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-center"
                                />
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 mb-8">
                                {days.map((day, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleDay(index)}
                                        className={`w-16 h-16 rounded-full font-bold text-lg transition-all transform ${
                                            selectedDays.includes(index)
                                                ? "bg-emerald-500 text-white scale-100"
                                                : "bg-gray-300 text-gray-600 hover:scale-105"
                                        }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>

                            {/* Counter and Continue Button */}
                            <div className="flex flex-col items-center gap-6">
                                <div className="text-white text-sm">
                                    {selectedDays.length} {selectedDays.length === 1 ? t("createRoutine.day") : t("createRoutine.days")} 
                                </div>
                                <button
                                    onClick={handleContinue}
                                    disabled={selectedDays.length === 0 || routineName.trim() === ""}
                                    className={`px-12 py-3 rounded-full font-semibold text-white transition-all ${
                                        selectedDays.length > 0 && routineName.trim() !== ""
                                            ? "bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
                                            : "bg-gray-400 cursor-not-allowed opacity-50"
                                    }`}
                                >
                                    {t("createRoutine.button")} →
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    );
}
