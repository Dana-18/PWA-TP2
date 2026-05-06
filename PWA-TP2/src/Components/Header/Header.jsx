import { Bell, User } from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher'
import SimpleButton from '../SimpleButton';
import { Routes } from "../../const/routes";
import { House } from 'lucide-react';
import React from "react";

export default function Header() {

    return (
        <header className="bg-white md:h-24 sm:h-16 w-full sticky p-2 border-none flex items-center gap-4">
                <div className="ml-auto gap-2 sm:gap-4">
                    <LanguageSwitcher />
                </div>
        </header>
    );
}
