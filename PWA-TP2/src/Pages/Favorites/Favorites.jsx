import React, { useState, useEffect, useMemo } from "react";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Footer from "../../Components/Footer/Footer";
import CardItem from "../../Components/CardItem/CardItem";
import Spinner from "../../Components/Spinner/Spinner";
import { useFavorites } from "../../Hooks/UseFavorites"; 
import { useTranslation } from "react-i18next";

const FavoritesPage = () => {
    const [ allProducts, setfavoritesAllProducts ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { favorites, toggleFavorite } = useFavorites();
    const { t, i18n } = useTranslation();
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const loadFavorites = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://tp-express.vercel.app/api/favorites');
                const data = await response.json();
                if (!Array.isArray(data)) return;

                const normalized = data
                    .filter((fav) => fav.userId === 'miUsuario')
                    .map((fav) => {
                        const exercise = fav.exercise || {};
                        const translation = exercise.translations?.[i18n.language] || exercise.translations?.en || {};

                        return {
                            id: String(exercise.id ?? fav.exerciseId ?? fav.id ?? ""),
                            name: translation.name || exercise.name || "",
                            description: translation.description || translation.equipment || translation.technique || "",
                            image: exercise.image || "",
                            difficulty: Number(exercise.difficulty) || 1,
                            muscleGroup: translation.muscleGroup || exercise.muscleGroup || "",
                            video: exercise.video || "",
                            targetIntensity: exercise.targetIntensity || "",
                            equipment: translation.equipment || exercise.equipment || "",
                            breathing: translation.breathing || "",
                            technique: translation.technique || "",
                        };
                    });

                setfavoritesAllProducts(normalized);
            } catch (error) {
                console.error("Error loading favorites:", error);
                setErrorMessage(t('favorites.errorLoading') || 'Error cargando favoritos');
                setfavoritesAllProducts([]);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [i18n.language, refreshKey]);

    const favoriteProducts = useMemo(() => allProducts, [allProducts]);

    const handleFavoriteToggle = async (item) => {
        setErrorMessage("");
        setSuccessMessage("");
        const result = await toggleFavorite(item);
        if (result && result.success) {
            setSuccessMessage(result.message || t('favorites.success') || 'Operación exitosa');
            setRefreshKey((prev) => prev + 1);
        } else {
            setErrorMessage(result?.message || t('favorites.errorAction') || 'Error en la operación');
        }
        // auto-dismiss messages
        if (result && result.success) {
            setTimeout(() => setSuccessMessage(''), 3000);
        } else {
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    return (
        <>
        <div className="min-h-screen bg-slate-100 text-slate-900 md:grid md:grid-cols-[280px_minmax(0,1fr)]">
            <Sidebar />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className='bg-white gap-4 flex flex-col justify-center p-4 md:px-48 overflow-y-auto flex-1'>
                    <div className="mx-auto p-6">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-4"> {t('favorites.title')}</h1>
                            <h3 className="text-1xl font-bold md-4">{t('favorites.description')}</h3>
                        </div>

                        {errorMessage && (
                            <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
                                {successMessage}
                            </div>
                        )}

                        {favoriteProducts.length === 0 && loading ? (
                            <div className="flex flex-col items-center justify-center mt-8">
                              <Spinner size="lg" />
                              <p className="text-gray-600 mt-4">Cargando favoritos...</p>
                            </div>
                        ) : favoriteProducts.length === 0 ? (
                            <p>{t("favorites.items")}</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {favoriteProducts.map((item) => (
                                    <div key={item.id}>
                                        <CardItem 
                                            item={item}
                                            onAction={() => handleFavoriteToggle(item)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
        </>
    );
};

export default FavoritesPage;