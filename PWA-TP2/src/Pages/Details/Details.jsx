import { useLocation } from "react-router";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import DetailsCard from "../../Components/DetailsCard/DetailsCard";

export default function Details() {
    const location = useLocation();
    const exercise = location.state?.exercise;


    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 md:grid md:grid-cols-[280px_minmax(0,1fr)]">
             <Navbar />
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-1 overflow-y-auto bg-[#e0dbc5] py-8 md:py-16 px-4 md:px-8 flex items-center justify-center">
                    {exercise ? <DetailsCard exercise={ exercise } /> : <div className="p-8 text-center">Ejercicio no encontrado</div>}
                </div>
                <Footer />
            </div>
           
        </div>
    );
}

