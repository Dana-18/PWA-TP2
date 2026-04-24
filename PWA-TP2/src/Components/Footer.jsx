import { useState } from 'react';
import { User } from 'lucide-react';

export default function Footer({
    groupName = "Dunder Mifflin",
    participants = [
    { id: 1, name: "Participante 1", icon: "👤", code: "P1"},
    { id: 2, name: "Participante 2", icon: "👤", code: "P2"},
    { id: 3, name: "Participante 3", icon: "👤", code: "P3"}
    ]
}) {
    return (
        <>
            <footer className="bg-gray-200 rounded-x1 p-6">
                <div className="flex items-center justify-between gap-8">
                    <div>
                        <label className="text-xs text-gray-600 font-mono block mb-2">
                            Grupo 8
                        </label>
                        <div className="text-2xl font-mono font-semibold text-gray-900 border-b-2 border-gray-800 pb-1 min-w-max">
                            {groupName}
                        </div>
                    </div>

                    <div className="flex gap-8 items-center">
                        {participants.map((participant) => (
                        <div key={participant.id} className="flex flex-col items-center gap-2">
                            <label className="text-xs text-gray-600 font-mono text-center leading-tight">
                            Nombre del <br />Participante
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-gray-800 flex items-center justify-center text-sm">
                                    {participant.icon}
                                </div>
                                <span className="text-xs font-mono font-semibold">
                                    {participant.code}
                                </span>
                            </div>
                             </div>
                            ))}
                    </div>
                </div>
            </footer>
        </>
    );
}