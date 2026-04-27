import React from "react";
import { useTranslation } from 'react-i18next';
import { setLocalStorage } from '../services/localStorage';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (newLanguage) => {
        i18n.changeLanguage(newLanguage);
        setLocalStorage("language", newLanguage);
    }

    return (
        <div className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 ml-2 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <button
                type="button"
                className={`text-[10px] sm:text-xs font-medium rounded-md px-2 py-1 transition-colors duration-150 ${i18n.language === 'es' ? 'bg-slate-200 text-slate-900' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200'}`}
                onClick={() => changeLanguage("es")}
            >
                ES
            </button>
            <span className="text-slate-400 text-[10px] sm:text-xs">•</span>
            <button
                type="button"
                className={`text-[10px] sm:text-xs font-medium rounded-md px-2 py-1 transition-colors duration-150 ${i18n.language === 'en' ? 'bg-slate-200 text-slate-900' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200'}`}
                onClick={() => changeLanguage("en")}
            >
                EN
            </button>
        </div>
    )
}


