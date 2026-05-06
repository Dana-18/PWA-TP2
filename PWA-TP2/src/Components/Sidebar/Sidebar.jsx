import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import SidebarItems from './SidebarItems';
import { useTranslation} from "react-i18next";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            <aside id="sidebar" role="navigation" className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-50 border-none transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:left-0 md:right-auto md:shadow-none md:w-full md:border-r md:border-l-0 md:bg-slate-200`}>
                <div className="flex h-full bg-black flex-col justify-between relative">
                    <div>
                        <div className="flex items-center justify-between border-b border-gray-200 p-6 md:border-b-0 md:bg-black">
                           
                                <h1 className="text-base sm:text-3xl md:font-bold font-medium text-teal-600 ">Dunder Mifflin</h1>


                            <button
                                onClick={() => setIsOpen(false)}
                                className="md:hidden rounded-lg p-2 hover:bg-gray-100"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <SidebarItems />
                    </div>

                    <div className="p-6">
                        <button className="w-full rounded-full bg-emerald-500 px-4 py-3 text-white font-semibold transition-colors duration-200 hover:bg-teal-700 flex items-center justify-center gap-2">
                            <Plus className="w-5 h-5" />
                            {t("sidebar.newRoutine")}  
                        </button>
                    </div>
                </div>
                <div className="absolute right-0 top-24 z-10 w-[0.5px] h-[90%] bg-gradient-to-r from-slate-300 to-transparent"></div>
            </aside>

            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    aria-expanded={isOpen}
                    aria-controls="sidebar"
                    aria-label="Abrir menú"
                    className="md:hidden fixed top-3.5 left-3 z-60 rounded-lg bg-white/95 p-2 shadow-md border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
                >
                    <span className="block w-7 h-0.5 bg-slate-700 my-1" />
                    <span className="block w-7 h-0.5 bg-slate-700 my-1" />
                    <span className="block w-7 h-0.5 bg-slate-700 my-1" />
                </button>
            )}

            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-35"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
