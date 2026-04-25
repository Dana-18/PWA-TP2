import Footer from "../Components/Footer/Footer";
import MainContent from "../Components/MainContent";
import Navbar from "../Components/Sidebar/Navbar";
import Header from "../Components/Header/Header";

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
             <Navbar />
            <div className="flex min-h-screen flex-col overflow-y-auto">
                <Header />
                <MainContent className="flex-1" />
                <Footer className="mt-auto" />
            </div>
           
        </div>
    );
}

