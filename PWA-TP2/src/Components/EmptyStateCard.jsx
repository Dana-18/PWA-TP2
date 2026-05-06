import Button from "./Button";
import Title from "./Title";
import {Plus} from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function EmptyStateCard() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleCreateRoutine = () => {
        navigate("/create-routine");
    };

    return (
        <div className="flex md:w-1/2 flex-col items-center h-80 justify-center gap-4 rounded-4xl bg-[#141314] p-6 shadow-md">
            <p className="text-3xl text-center font-semibold text-emerald-500">{t("emptyCard.title")}</p>
            <p className="text-center text-white">{t("emptyCard.description")}</p>
            <div
                onClick={handleCreateRoutine}
                className="cursor-pointer hover:bg-emerald-600 hover:scale-105 transition-transform w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mt-6"
            >
                <Plus className="w-6 h-6 text-white" />
            </div>
        </div>
    );
}