import { Bell, User } from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher'
import SimpleButton from '../SimpleButton';
import { Routes } from "../../const/routes";
import { House } from 'lucide-react';
import React from "react";

export default function Header() {

    return (
        <header className="bg-white md:h-24 h-2 sm:h-16 w-full sticky p-2  flex items-center gap-4 border-none">
                <div className="ml-auto gap-2 sm:gap-4">
                    <LanguageSwitcher />
                </div>
        </header>
    );
}
