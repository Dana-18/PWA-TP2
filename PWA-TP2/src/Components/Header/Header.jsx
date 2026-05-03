import { useState } from 'react';
import { Bell, User } from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher'
import SimpleButton from '../SimpleButton';
import { useNavigate } from "react-router";
import { Routes } from "../../const/routes";
import { House } from 'lucide-react';
import React from "react";

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="bg-slate-100 h-auto sm:h-16 w-full sticky top-0 z-50 border-b border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <House className="-mr-60 -ml-45 md:h-fit rounded-xl hover:bg-gray-300 active:bg-gray-400 hover:shadow-md active:scale-95 rounded-md text-gray-800 transition-all duration-300 ease-in-out cursor-pointer" 
                onClick={() => {
                    navigate(Routes.home)
                }}/>
                <h1 className="text-base sm:text-lg font-medium text-teal-600 -ml-50 ">Dunder Mifflin</h1>


                <SimpleButton
                    text="Catalogo"
                    onClick={() => {
                        navigate(Routes.catalog);
                    }}
                    className="w-12"
                    type="submit"
                />

                

                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                        <Bell className="w-5 h-5 text-slate-600" />
                    </button>

                    <button className="w-8 h-8 sm:h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center hover:opacity-90 transition-opacity">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </button>
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}
