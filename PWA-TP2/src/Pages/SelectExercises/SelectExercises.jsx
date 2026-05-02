import { useState, useEffect } from "react";
import { useNavigate , useParams} from "react-router";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Sidebar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { ChevronLeft, Plus, Trash2, Search } from "lucide-react";

export default function SelectExercises() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ejercicios, setEjercicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    
    
    const [routineData, setRoutineData] = useState(() => {
        const routines = localStorage.getItem("routines");
        if (routines) {
            const routinesArray = JSON.parse(routines);
            const routine = routinesArray.find(r => r.id === parseInt(id));
            return routine?.days || [];
        }
        return [];
    });
    
    const [currentDayIndex, setCurrentDayIndex] = useState(() => {
        const routines = localStorage.getItem("routines");
        if (routines) {
            const routinesArray = JSON.parse(routines);
            const routine = routinesArray.find(r => r.id === parseInt(id));
            return routine?.days?.[0] || null;
        }
        return null;
    } );

    const [routineExercises, setRoutineExercises] = useState(() => {
        const routines = localStorage.getItem("routines");
        if (routines) {
            const routinesArray = JSON.parse(routines);
            const routine = routinesArray.find(r => r.id === parseInt(id));
            return routine?.exercises || {};
        }
        return {};
    });

    const categories = ["Todos", "Pecho", "Espalda", "Hombros", "Piernas", "Biceps", "Triceps"];

    // Cargar ejercicios
    useEffect(() => {
        const loadExercises = async () => {
            try {
                const response = await fetch("https://69e6e0ca68208c1debe8004e.mockapi.io/api/v1/ejercicios?limit=1000&page=1");
                const data = await response.json();
                setEjercicios(data);
            } catch (error) {
                console.error("Error loading exercises:", error);
            } finally {
                setLoading(false);
            }
        };
        loadExercises();
    }, []);

    // Inicializar estructura de días si no existe
    useEffect(() => {
        const newRoutineExercises = { ...routineExercises };
        routineData?.forEach((day) => {
            if (!newRoutineExercises[day]) {
                newRoutineExercises[day] = [];
            }
        });
        setRoutineExercises(newRoutineExercises);
    }, []);

    const currentDay = currentDayIndex || routineData.days?.[1];


    const filteredExercises = ejercicios.filter((ex) => {
        const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "Todos" || ex.muscular_group === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const addExerciseToDay = (exercise) => {
            console.log(currentDay);

        const newExercises = [...(routineExercises[currentDay] || [])];
        newExercises.push({
            id: exercise.id,
            name: exercise.name,
            muscular_group: exercise.muscular_group,
            sets: 3,
            reps: 10,
        });
        const updated = { ...routineExercises, [currentDay]: newExercises };
        setRoutineExercises(updated);
    };

    const removeExerciseFromDay = (index) => {
        const newExercises = routineExercises[currentDay].filter((_, i) => i !== index);
        const updated = { ...routineExercises, [currentDay]: newExercises };
        setRoutineExercises(updated);
    };

    const updateExercise = (index, field, value) => {
        const newExercises = [...routineExercises[currentDay]];
        newExercises[index][field] = field === "sets" || field === "reps" ? parseInt(value) : value;
        const updated = { ...routineExercises, [currentDay]: newExercises };
        setRoutineExercises(updated);
    };

    const handleFinish = () => {
        // Obtener todas las rutinas
        const routines = localStorage.getItem("routines");
        if (routines) {
            const routinesArray = JSON.parse(routines);
            // Encontrar y actualizar la rutina con los ejercicios
            const routineIndex = routinesArray.findIndex(r => r.id === parseInt(id));
            if (routineIndex !== -1) {
                routinesArray[routineIndex].exercises = routineExercises;
                localStorage.setItem("routines", JSON.stringify(routinesArray));
                localStorage.setItem("activeRoutine", JSON.stringify(id));
            }
        }
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 md:grid md:grid-cols-[280px_minmax(0,1fr)]">
            <Navbar />
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-1 overflow-hidden bg-[#e0dbc5]">
                    <div className="flex flex-col md:flex-row h-full">
                        {/* Left Sidebar - Movement Library */}
                        <div className="w-full md:w-80 bg-white border-r border-gray-200 p-6 flex flex-col overflow-y-auto">
                            <button
                                onClick={() => navigate("/create-routine")}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span>BACK</span>
                            </button>

                            <h2 className="text-xl font-bold text-gray-900 mb-4">Movement Library</h2>

                            {/* Search */}
                            <div className="mb-4 relative">
                                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search movements..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                />
                            </div>

                            {/* Categories */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                            selectedCategory === cat
                                                ? "bg-emerald-500 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Exercises List */}
                            <div className="flex-1 overflow-y-auto space-y-2">
                                {loading ? (
                                    <p className="text-gray-500 text-sm">Cargando ejercicios...</p>
                                ) : filteredExercises.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No exercises found</p>
                                ) : (
                                    filteredExercises.map((exercise) => (
                                        <div
                                            key={exercise.id}
                                            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm text-gray-900 truncate">
                                                        {exercise.name}
                                                    </p>
                                                    <p className="text-xs text-gray-600">{exercise.muscular_group}</p>
                                                </div>
                                                <button
                                                    onClick={() => addExerciseToDay(exercise)}
                                                    className="flex-shrink-0 p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Right Content - Exercises for Days */}
                        <div className="flex-1 flex flex-col p-6 overflow-hidden">
                            {/* Tabs for Days */}
                            <div className="mb-6">
                                <div className="flex gap-2 border-b border-gray-300 mb-4">
                                    {routineData?.map((day, index) => (
                                        <button
                                            key={day}
                                            onClick={() => setCurrentDayIndex(day)}
                                            className={`px-4 py-2 font-medium transition-colors ${
                                                currentDayIndex === day
                                                    ? "text-emerald-600 border-b-2 border-emerald-600"
                                                    : "text-gray-600 hover:text-gray-900"
                                            }`}
                                        >
                                            Day {index + 1}: {day}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Exercises for Current Day */}
                            <div className="flex-1 overflow-y-auto mb-6">
                                {routineExercises[currentDay]?.length === 0 ? (
                                    <div className="flex items-center justify-center h-64 text-gray-500">
                                        <p>Select a movement from the library to add</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {routineExercises[currentDay]?.map((exercise, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                                                        <p className="text-sm text-gray-600">{exercise.muscular_group}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeExerciseFromDay(index)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            TARGET SETS
                                                        </label>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    updateExercise(index, "sets", Math.max(1, exercise.sets - 1))
                                                                }
                                                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                                                            >
                                                                −
                                                            </button>
                                                            <input
                                                                type="number"
                                                                value={exercise.sets}
                                                                onChange={(e) => updateExercise(index, "sets", e.target.value)}
                                                                className="w-12 text-center border border-gray-300 rounded py-1"
                                                            />
                                                            <button
                                                                onClick={() => updateExercise(index, "sets", exercise.sets + 1)}
                                                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            TARGET REPS
                                                        </label>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    updateExercise(index, "reps", Math.max(1, exercise.reps - 1))
                                                                }
                                                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                                                            >
                                                                −
                                                            </button>
                                                            <input
                                                                type="number"
                                                                value={exercise.reps}
                                                                onChange={(e) => updateExercise(index, "reps", e.target.value)}
                                                                className="w-12 text-center border border-gray-300 rounded py-1"
                                                            />
                                                            <button
                                                                onClick={() => updateExercise(index, "reps", exercise.reps + 1)}
                                                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Finish Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleFinish}
                                    className="px-8 py-3 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors"
                                >
                                    Finish and Save Routine →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
