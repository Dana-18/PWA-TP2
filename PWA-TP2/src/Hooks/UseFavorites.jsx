import { useState, useEffect } from "react";

const API_FAVORITES_URL = "https://tp-express.vercel.app/api/favorites";
const CURRENT_USER_ID = "miUsuario";

export const useFavorites = () => {
    const [favorites, setfavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const response = await fetch(API_FAVORITES_URL);
                const data = await response.json();
                if (!Array.isArray(data)) return;

                const favoriteIds = data
                    .filter((item) => item.userId === CURRENT_USER_ID)
                    .map((item) => String(item.exerciseId));

                setfavorites(favoriteIds);
            } catch (error) {
                console.error("Error loading favorites from backend:", error);
            }
        };

        loadFavorites();
    }, []);

    const toggleFavorite = async (exercise) => {
        const exerciseId = String(exercise.id);
        const isFavorite = favorites.includes(exerciseId);

        try {
            if (isFavorite) {
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
                    setfavorites((previous) => previous.filter((favId) => favId !== exerciseId));
                    return { success: true, message: "Favorito eliminado" };
                }
                const errText = await response.text().catch(() => null);
                return { success: false, message: errText || "Error eliminando favorito" };
            } else {
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
                    setfavorites((previous) => [...previous, exerciseId]);
                    return { success: true, message: "Favorito agregado" };
                }
                const errText = await response.text().catch(() => null);
                return { success: false, message: errText || "Error agregando favorito" };
            }
        } catch (error) {
            console.error("Error toggling favorite on backend:", error);
            return { success: false, message: error?.message || "Error de red al actualizar favorito" };
        }
    };

    return { favorites, toggleFavorite };
};