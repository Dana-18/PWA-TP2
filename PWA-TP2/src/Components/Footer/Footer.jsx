import { useState, useTransition } from 'react';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer({
    groupName = "Dunder Mifflin",
    participants = [
        { id: 1, name: "Dana Garcia", icon: "👤", code: "P1" },
        { id: 2, name: "Tomas Mengon", icon: "👤", code: "P2" },
        { id: 3, name: "Jeremias Herrera", icon: "👤", code: "P3" }
    ]
}) {

    const { t } = useTranslation();
    return (
        <footer className="bg-gray-200 rounded-xl p-4 sm:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                {/* Información del Grupo */}
                <div className="text-center md:text-left">
                    <label className="text-[10px] sm:text-xs text-gray-600 font-mono block mb-1 sm:mb-2">
                        {t("footer.name")}
                    </label>
                    <div className="text-xl sm:text-2xl font-mono font-semibold text-gray-900 border-b-2 border-gray-800 pb-1 inline-block md:min-w-max">
                        {groupName}
                    </div>
                </div>

                {/* Lista de Participantes */}
                <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-8 items-start">
                    {participants.map((participant) => (
                        <div key={participant.id} className="flex flex-col items-center gap-1 sm:gap-2">
                            <label className="text-[10px] text-gray-600 font-mono text-center leading-tight hidden sm:block">
                                {participant.name}
                            </label>
                            <div className="flex items-center gap-2 bg-white/50 md:bg-transparent p-2 md:p-0 rounded-lg">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-300 border-2 border-gray-800 flex items-center justify-center text-xs sm:text-sm">
                                    {participant.icon}
                                </div>
                                <span className="text-[10px] sm:text-xs font-mono font-semibold">
                                    {participant.code}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}