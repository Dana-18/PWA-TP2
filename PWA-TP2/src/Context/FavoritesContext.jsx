import { createContext, useState, useEffect, useCallback } from "react";

const API_FAVORITES_URL = "https://tp-express.vercel.app/api/favorites";
const CURRENT_USER_ID = "miUsuario";

export const FavoritesContext = createContext({
    favorites: [],
    toggleFavorite: async () => {},
    refreshFavorites: async () => {},
    loadingFavorites: false,
});

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(false);

    const refreshFavorites = useCallback(async () => {
        setLoadingFavorites(true);
        try {
            const response = await fetch(API_FAVORITES_URL);
            const data = await response.json();
            if (!Array.isArray(data)) {
                setFavorites([]);
                return;
            }

            const favoriteIds = data
                .filter((item) => item.userId === CURRENT_USER_ID)
                .map((item) => String(item.exerciseId));

            setFavorites(favoriteIds);
        } catch (error) {
            console.error("Error loading favorites from backend:", error);
        } finally {
            setLoadingFavorites(false);
        }
    }, []);

    useEffect(() => {
        refreshFavorites();
    }, [refreshFavorites]);

    const toggleFavorite = useCallback(
        async (exercise) => {
            const exerciseId = String(exercise.id);
            const isFavorite = favorites.includes(exerciseId);

            try {
                if (isFavorite) {
                    // DELETE 
                    const deleteUrl = new URL(API_FAVORITES_URL);
                    deleteUrl.searchParams.append('exerciseId', exerciseId);
                    deleteUrl.searchParams.append('userId', CURRENT_USER_ID);
                    
                    const response = await fetch(deleteUrl.toString(), {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    
                    if (response.ok) {
                        setFavorites((prev) => prev.filter((id) => id !== exerciseId));
                    }
                } else {
                    // POST 
                    const response = await fetch(API_FAVORITES_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId: CURRENT_USER_ID,
                            exerciseId: exerciseId,
                            exercise: exercise, 
                        }),
                    });
                    
                    if (response.ok) {
                        setFavorites((prev) => [...prev, exerciseId]);
                    }
                }
            } catch (error) {
                console.error("Error toggling favorite on backend:", error);
            }
        },
        [favorites]
    );

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, refreshFavorites, loadingFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
