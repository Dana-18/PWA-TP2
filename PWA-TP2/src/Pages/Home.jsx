import Footer from "../Components/Footer/Footer";
import MainContent from "../Components/MainContent";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import EjerciciosList from "../Components/Ejercicios/EjerciciosList";

export default function Home() {


    localStorage.setItem(
        "workoutHistory",
        JSON.stringify({
            "20/04/2026": "completed",
            "21/04/2026": "rest",
            "22/04/2026": "completed",
            "23/04/2026": "pending"
        })
    );

    return (
        <div className="flex flex-col md:grid md:grid-cols-[280px_minmax(0,1fr)] md:min-h-screen bg-white md:bg-slate-100 text-slate-900">
             <Sidebar />
            <div className="flex flex-col md:min-h-screen">
                <Header />
                <div className="flex-1 overflow-y-auto bg-white">
                    <EjerciciosList />
                    <MainContent />
                </div>
                <Footer />
            </div>
           
        </div>
    );
}

