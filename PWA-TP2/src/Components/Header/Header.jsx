import { useState } from 'react';
import { Bell, User } from 'lucide-react';
import {LanguageSwitcher } from '../LanguageSwitcher'

export default function Header() {
    return (
        <header className="bg-gray-200 h-auto sm:h-16 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <h1 className="text-base sm:text-lg font-medium text-teal-600">Dunder Mifflin</h1>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                        <Bell className="w-5 h-5 text-slate-600"/>
                    </button>

                    <button className="w-8 h-8 sm:h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center hover:opacity-90 transition-opacity">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
                    </button>
                    <LanguageSwitcher/>
                </div>
            </div>
        </header>
    );
}
