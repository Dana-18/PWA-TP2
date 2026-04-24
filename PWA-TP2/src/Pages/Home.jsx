import Footer from "../Components/Footer/Footer";
import MainContent from "../Components/MainContent";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header/Header"; 

export default function Home() {
    localStorage.setItem("workoutHistory", JSON.stringify({"20/04/2026": "completed",
  "21/04/2026": "rest",
  "22/04/2026": "completed",
  "23/04/2026": "pending"}));
    return (
        <>
            <div className="flex w-full flex-col h-screen md:grid md:grid-cols-12 md:overflow-hidden">
                <Navbar className="fixed bottom-0 h-16 w-full md:relative md:col-span-2 md:h-screen"/>
                <div className="flex-1 pb-16 flex flex-col overflow-y-auto h-screen md:col-span-10 md:pb-0">
                    <Header className="sticky top-0"/>
                    <MainContent className="flex-1"/>
                    <Footer className="mt-auto"/>
                </div>
            </div>
        </>
    );
}