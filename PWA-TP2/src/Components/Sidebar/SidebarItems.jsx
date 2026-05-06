import React from "react";
import { Home, Route, Heart, Newspaper } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router";
import { Routes } from "../../const/routes";


export default function SidebarItems() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, name: t('sidebar.dashboard'), icon: Home, route: Routes.home },
    { id: 2, name: t('sidebar.routines'), icon: Route, route: Routes.catalog },
    { id: 3, name: t('sidebar.favorites'), icon: Heart, route: Routes.favorites },
    { id: 4, name: t('sidebar.catalog'), icon: Newspaper, route: Routes.catalog },
  ];

  return (
    <nav className="p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => item.route && navigate(item.route)}
                disabled={!item.route}
                className="cursor-pointer w-full text-white text-left flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon className="w-7 h-7" />
                <span className="text-medium  hover:text-emerald-500 hover:scale-110 font-medium">{item.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
