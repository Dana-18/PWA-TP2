import { useState } from 'react';
import { Bell, User } from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher'
import SimpleButton from '../SimpleButton';
import { useNavigate } from "react-router";
import { Routes } from "../../const/routes";
import { House } from 'lucide-react';
import React from "react";

export default function Header() {

    return (
        <header className="bg-slate-200 h-auto sm:h-16 w-full sticky top-0 z-50 p-2 border-none">
                <div className="flex items-center ml-auto gap-2 sm:gap-4">
                    <LanguageSwitcher />
                </div>
        </header>
    );
}
