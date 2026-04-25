import React, { useState } from "react";
import { Menu, X, Plus } from "lucide-react";
import NavItems from './NavItems';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 shadow-xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:left-0 md:right-auto md:shadow-none md:w-full md:border-r md:border-l-0 md:bg-slate-100`}>
                <div className="flex h-full flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between border-b border-gray-200 p-6 md:border-b-0 md:bg-slate-100">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-teal-600" />
                                <span className="font-semibold text-gray-900">Panel</span>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="md:hidden rounded-lg p-2 hover:bg-gray-100"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <NavItems />
                    </div>

                    <div className="p-6">
                        <button className="w-full rounded-full bg-teal-600 px-4 py-3 text-white font-semibold transition-colors duration-200 hover:bg-teal-700 flex items-center justify-center gap-2">
                            <Plus className="w-5 h-5" />
                            Crear nuevo
                        </button>
                    </div>
                </div>
            </aside>

            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden fixed top-4 left-4 z-50 rounded-full bg-white/95 p-3 shadow-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
                >
                    <Menu className="w-6 h-6" />
                </button>
            )}

            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
