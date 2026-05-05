import React, { useState } from "react";
import { Play, Plus, Target, Wind, Award, X } from 'lucide-react';
import { useTranslation } from "react-i18next";

const DetailsCard = ({ exercise }) => {
    const [showVideo, setShowVideo] = useState(true);
    const { t } = useTranslation();

    if (!exercise) {
        return <div className="p-8 text-center">No exercise data available</div>;
    }

    const { name, description, image, muscular_group, difficulty, video, details = {} } = exercise;

    return (
        <>
            <div className="w-full max-w-5xl mx-auto bg-[#FCF8F4] p-4 sm:p-6 md:p-10 lg:rounded-[3rem] shadow-sm font-sans text-[#2D2D2D]">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 md:mb-10">
                    <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-[#E8F3F0] text-[#4A7C6D] text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
                                {muscular_group}
                            </span>
                            <span className="px-3 py-1 bg-[#F0F0F0] text-[#707070] text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
                                {t("detailsPage.level")} {difficulty}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight italic uppercase">
                            {name}
                        </h1>
                    </div>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#005F41] hover:bg-[#004a33] text-white 
                    px-6 py-3 rounded-full font-semibold transition-all active:scale-95">
                        <span>{t("detailsPage.button")}</span> <Plus size={18} />
                    </button>
                </div>

                {/* Main Image with Play Button */}
                <div className="relative mb-8 md:mb-12 overflow-hidden rounded-2xl md:rounded-[2.5rem]">
                    {showVideo ? (
                        <div className="relative w-full" style={{ paddingBottom: '56.25%', backgroundColor: '#000' }}>
                            <iframe
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 'none'
                                }}
                                src={`https://www.youtube.com/embed/${video?.split('v=')[1]?.split('&')[0] || video?.split('/').pop() || ''}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Exercise Video"
                            />
                            <button
                                onClick={() => setShowVideo(false)}
                                className="absolute top-4 left-4 bg-white/90 hover:bg-white p-3 rounded-full text-[#005F41] shadow-xl z-10"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    ) : (
                        <div className="relative group cursor-pointer">
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-[250px] sm:h-[400px] md:h-[550px] object-cover brightness-90 group-hover:brightness-75 transition-all duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button 
                                    onClick={() => setShowVideo(true)}
                                    className="bg-white/90 p-3 md:p-5 rounded-full text-[#005F41] shadow-xl transform hover:scale-110 transition-transform"
                                >
                                    <Play fill="currentColor" className="w-6 h-6 md:w-8 md:h-8" />
                                </button>                   
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 md:bottom-7 md:left-8 md:right-8 h-1 bg-white/30 rounded-full overflow-hidden">
                                <div className="w-1/3 h-full bg-[#005F41]"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h3 className="text-lg md:text-2xl font-bold mb-4">{t("detailsPage.subtitle")}</h3>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                                <p>{description}</p>
                                <p className="border-l-4 border-[#005F41]/20 pl-4 italic">
                                    "{details?.technique_masterclass || 'No technique details available'}"
                                </p>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#E9F3F1] p-5 md:p-6 rounded-2xl">
                                <div className="flex items-center gap-2 text-[#4A7C6D] font-bold text-xs md:text-sm mb-3 uppercase tracking-widest">
                                    <Wind size={18} /> {t("detailsPage.breathing")}
                                </div>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                    {details?.breathing || 'No breathing instructions available'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Metrics */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 order-1 lg:order-1">
                            <h3 className="text-lg font-bold mb-6">{t("detailsPage.metrics.title")}</h3>
                            <div className="space-y-4">
                                {[
                                    { label: t("detailsPage.metrics.primary"), value: muscular_group, color: 'text-[#4A7C6D]' },
                                    { label: t("detailsPage.metrics.target"), value: details?.target_intensity || 'N/A' },
                                    { label: t("detailsPage.metrics.equipment"), value: details?.equipment }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center border-b border-gray-50 pb-3 text-xs md:text-sm">
                                        <span className="text-gray-400 font-medium">{item.label}</span>
                                        <span className={`font-bold ${item.color || 'text-gray-800'}`}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailsCard;