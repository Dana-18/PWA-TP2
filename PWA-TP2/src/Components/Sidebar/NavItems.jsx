import React from "react";
import { LayoutGrid, Route, TrendingUp, Settings } from "lucide-react";

export const menuItems = [
    //cambiar aca el name para lo del idioma
        {id: 1, name: 'Dashboard', icon: LayoutGrid},
        {id: 2, name: 'Routines', icon: Route},
        {id: 3, name: 'Progress', icon: TrendingUp},
        {id: 4, name: 'Settings', icon: Settings},
    ];

    export default function NavItems() {
        return (
            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.name}>
                                <a
                                  href="#"
                                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                >
                                    <Icon className="w-5 h-5"/>
                                    <span className="text-sm">{item.name}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }