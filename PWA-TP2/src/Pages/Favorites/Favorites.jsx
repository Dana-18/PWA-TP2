import React, { useEffect } from "react";
import Header from "../../Components/Header/Header";
import NavBar from "../../Components/Sidebar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useFavorites } from "../../Hooks/UseFavorites"; 
import { useTranslation } from "react-i18next";
import { useState } from "react";

const FavoritesPage = () => {
    const [ allProducts, setfavoritesAllProducts ] = useState([]);
    const { favorites, toggleFavorite } = useFavorites();
    const { t } = useTranslation();

    useEffect(() => {
        fetch('https://69e6e0ca68208c1debe8004e.mockapi.io/api/v1/ejercicios')
        .then(res => res.json())
        .then(data => setfavoritesAllProducts(data));
    }, []);

    const favoriteProducts = useMemo (() => {
        return allProducts.filter(product => favorites.includes(product.id));
    }, [allProducts, favorites]);

    return (
        <>
        <div className="min-h-screen bg-slate-100 text-slate-900 md:grid md:grid-cols-[280px_minmax(0,1fr)]">
            <NavBar />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className='bg-[#e0dbc5] gap-4 flex flex-col justify-center p-4 md:px-48 overflow-y-auto flex-1'>
                    <div className="mx-auto p-6">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-4"> {t('favorites.title')}</h1>
                            <h3 className="text-1xl font-bold md-4">{t('favorites.description')}</h3>
                        </div>

                        {favoriteProducts.length === 0 ? (
                            <p>{t("favorites.items")}</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {favoriteProducts.map((item) => (
                                    <div key={item.id}>
                                        <CardItem 
                                        key={item.id}
                                        item={item}/>
                                        <button 
                                            onClick={() => toggleFavorite(product.id)}
                                            className="mt-2 text-red-500 hover:underline"
                                        >
                                            Quitar de favoritos
                                        </button>
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