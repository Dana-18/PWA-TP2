import { Bell, User } from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher'
import SimpleButton from '../Button/SimpleButton';
import { Routes } from "../../const/routes";
import { House } from 'lucide-react';
import React from "react";

export default function Header() {

    return (
        <header className="bg-white h-14 sm:h-16 md:h-28 w-full sticky top-0 z-50 p-3 sm:p-4 flex items-center gap-4 border-none">
                <div className="ml-auto gap-2 sm:gap-4">
                    <LanguageSwitcher />
                </div>
        </header>
    );
}
