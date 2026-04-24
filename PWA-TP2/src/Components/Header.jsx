import { useState } from 'react';
import { Bell, User } from 'lucide-react';

export default function Header() {
    const [language, setLanguage] = useState('ES');

    const toggleLanguage = () => {
        setLanguage(language === 'ES' ? 'EN' : 'ES');
    };

    return (
        <>
            <header className="bg-gray-200 h-16 ">
                <div className="flex items-center justify-between px-6 py-4 max-w-7x1 mx-auto">
                    <h1 className="text-base font-medium text-teal-600">Dunder Mifflin</h1>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-slate-1000 rounded-full transition-colors">
                            <Bell className="w-5 h-5 text-slate-600"/>
                        </button>

                        <button className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center hover:opacity-90 transition-opacity">
                            <User className="w-6 h-6 text-white"/>
                        </button>

                        <button onClick={toggleLanguage} className="flex items-center gap-1 px-3 py-2 ml-2 bordeer border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                            <span className="text-xs font-medium text-slate-900">{language}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-xs text-slate-500">
                                {language === 'ES' ? 'EN' : 'ES'}
                            </span>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}