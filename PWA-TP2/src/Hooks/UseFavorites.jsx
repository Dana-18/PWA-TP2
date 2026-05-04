 import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../services/localStorage";

 export const useFavorites = () => {
    const [favorites, setfavorites] = useState(()=> {
        const saved = getLocalStorage('productFavorites');
        return saved ? JSON.parse(saved) : []; 
    });

    useEffect(() => {
        setLocalStorage('productFavorites', JSON.stringify(favorites))
    }, [favorites]);

    const toggleFavorite = (id) => {
        setfavorites((previous) =>
            previous.includes(id) ? previous.filter(favId => favId  !== id)
                                  : [...previous, id]
        );
    };
    return {favorites, toggleFavorite}
 }