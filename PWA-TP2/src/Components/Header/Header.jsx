import { useState } from 'react';
import { Bell, User } from 'lucide-react';

export default function Header() {
    const [language, setLanguage] = useState('ES');

    const toggleLanguage = () => {
        setLanguage(language === 'ES' ? 'EN' : 'ES');
    };

    return (
        <>
            <header className="bg-gray-200 h- auto sm:h-16 w-full">
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 max-w-7x1 mx-auto">
                    <h1 className="text-base sm:text-lg font-medium text-teal-600">Dunder Mifflin</h1>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <button className="p-2 hover:bg-slate-1000 rounded-full transition-colors">
                            <Bell className="w-5 h-5 text-slate-600"/>
                        </button>

                        <button className="w-8 h-8 sm:h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center hover:opacity-90 transition-opacity">
                            <User className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
                        </button>

                        <button onClick={toggleLanguage} className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 ml-2 bordeer border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                            <span className="text-[10px] sm:text-xs font-medium text-slate-900">{language}</span>
                            <span className="text-slate-400 text-[10px] sm:text-xs">•</span>
                            <span className="text-[10px] sm:text-xs  text-slate-500">
                                {language === 'ES' ? 'EN' : 'ES'}
                            </span>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}