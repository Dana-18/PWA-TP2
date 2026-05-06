import { useLocation, useParams } from "react-router";
import { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import DetailsCard from "../../Components/DetailsCard/DetailsCard";
import { useTranslation } from "react-i18next";

export default function Details() {
    const location = useLocation();
    const { id } = useParams();
    const [exercise, setExercise] = useState(location.state?.exercise || null);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchExercise = async () => {
            if (exercise) return;
            if (!id) return;
            try {
                setLoading(true);
                const res = await fetch(`https://69e6e0ca68208c1debe8004e.mockapi.io/api/v1/ejercicios/${id}`);
                if (!res.ok) throw new Error("Not found");
                const data = await res.json();
                setExercise(data);
            } catch (err) {
                setExercise(null);
            } finally {
                setLoading(false);
            }
        };
        fetchExercise();
    }, [id]);
    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 md:grid md:grid-cols-[280px_minmax(0,1fr)]">
             <Sidebar />
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-1 overflow-y-auto bg-[#e0dbc5] py-8 md:py-16 px-4 md:px-8 flex items-center justify-center">
                    {exercise ? <DetailsCard exercise={ exercise } /> : <div className="p-8 text-center">{t("detailsPage.notFound")}</div>}
                </div>
                <Footer />
            </div>
           
        </div>
    );
}

