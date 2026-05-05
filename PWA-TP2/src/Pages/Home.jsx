import Footer from "../Renombradotemporal/Footer/Footer";
import MainContent from "../Renombradotemporal/MainContent";
import Sidebar from "../Renombradotemporal/Sidebar/Sidebar";
import Header from "../Renombradotemporal/Header/Header";
import EjerciciosList from "../Renombradotemporal/Ejercicios/EjerciciosList";

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
        <div className="min-h-screen bg-slate-100 text-slate-900 md:grid md:grid-cols-[280px_minmax(0,1fr)]">
             <Sidebar />
            <div className="flex flex-col min-h-screen">
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

