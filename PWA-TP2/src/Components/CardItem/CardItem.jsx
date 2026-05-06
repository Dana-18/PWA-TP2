import React from 'react';
import { useNavigate } from "react-router";
import { Routes } from '../../const/routes';
import { Heart } from "lucide-react";
import { useFavorites } from '../../Hooks/UseFavorites';
import { useTranslation } from 'react-i18next';

const CardItem = ({ item, onAction }) => {
    const {t} = useTranslation();
    const { favorites, toggleFavorite } = useFavorites();
    const navigate = useNavigate();
    
     const { id, name, description, image, difficulty, muscular_group } = item;

     const isFavorite = favorites.includes(id);

    const handleFavoriteClick = () => {
          if (onAction) {
            onAction();
        } else {
            toggleFavorite(id);
        }
    };

    const getDifficultyColor = (level) => {
        const colors = {
            1: 'bg-green-100 text-green-800',
            2: 'bg-yellow-100 text-yellow-800',
            3: 'bg-red-100 text-red-800'
        };
        return colors[level] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
                className="w-full h-48 object-cover"
                src={image || "https://via.placeholder.com/400x200"}
                alt={name}
            />
            <div className="p-5  border border-gray-200 shadow-sm ">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getDifficultyColor(difficulty)}`}>
                    Difficulty: {difficulty}
                </span>
                
                <div className="flex justify-between items-center mb-2 mt-2">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 truncate">
                        {name}
                    </h5>
                </div>

                <p className="text-sm font-bold text-gray-400 mb-2 truncate">
                    {muscular_group}
                </p>

                <p className="mb-3 font-normal text-gray-700 line-clamp-3 text-sm">
                    {description}
                </p>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate(Routes.details.replace(':id', id), { state: { exercise: item } })}
                        className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300"
                    >
                        {t("catalog.button")}
                        <svg className="rtl:rotate-170 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>

                    <button 
                        onClick={handleFavoriteClick}
                        className={`cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none transition-colors 
                            ${isFavorite 
                                ? 'bg-red-100 text-red-600 focus:ring-red-300' 
                                : 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-300'
                            }`}
                    >
                        <Heart 
                            size={20} 
                            color={isFavorite ? "#dc2626" : "currentColor"} 
                            fill={isFavorite ? "#dc2626" : "none"} 
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardItem;
