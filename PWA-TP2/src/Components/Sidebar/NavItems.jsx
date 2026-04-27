import React from "react";
import { LayoutGrid, Route, TrendingUp, Settings } from "lucide-react";
import { useTranslation } from 'react-i18next';


export default function NavItems() {
  const { t } = useTranslation();

  const menuItems = [
    { id: 1, name: t('sidebar.dashboard'), icon: LayoutGrid },
    { id: 2, name: t('sidebar.routines'), icon: Route },
    { id: 3, name: t('sidebar.progress'), icon: TrendingUp },
    { id: 4, name: t('sidebar.settings'), icon: Settings },
  ];

  return (
            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.id}>
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