import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const API_FAVORITES_URL = "https://tp-express.vercel.app/api/favorites";

export const useFavorites = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setfavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            if (!user?.token) {
                setfavorites([]);
                return;
            }

            try {
                const response = await fetch(API_FAVORITES_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                if (!Array.isArray(data)) return;

                const favoriteIds = data.map((item) => String(item.exerciseId));

                setfavorites(favoriteIds);
            } catch (error) {
                console.error("Error loading favorites from backend:", error);
            }
        };

        loadFavorites();
    }, [user?.token]);

    const toggleFavorite = async (exercise) => {
        const exerciseId = String(exercise.id);
        const isFavorite = favorites.includes(exerciseId);

        try {
            if (!user?.token) {
                return { success: false, message: "Usuario no autenticado" };
            }

            if (isFavorite) {
                const deleteUrl = new URL(API_FAVORITES_URL);
                deleteUrl.searchParams.append('exerciseId', exerciseId);

                const response = await fetch(deleteUrl.toString(), {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
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
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
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