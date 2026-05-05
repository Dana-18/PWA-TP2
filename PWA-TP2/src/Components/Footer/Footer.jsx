import { useTranslation } from 'react-i18next';

export default function Footer({
    groupName = "Dunder Mifflin",
    participants = [
        { id: 1, name: "Dana Garcia", icon: "👤", code: "P1" },
        { id: 2, name: "Tomas Mengon", icon: "👤", code: "P2" },
        { id: 3, name: "Jeremias Herrera", icon: "👤", code: "P3" }
    ]
}) {

    const { t } = useTranslation();
    return (
        <footer className="bg-gray-200 rounded-xl p-4 sm:p-6  border-t border-gray-300 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
           
                <div className="text-sm text-gray-700 text-center sm:text-left">
                    <div className="font-semibold">{t("footer.contact")}</div>
                    <div className="text-[13px]">Av. Falsa 123, Palermo, Buenos Aires</div>
                    <a href="mailto:contacto@dundermifflin.example" className="text-teal-600 hover:underline">contacto@dundermifflin.example</a>
                </div>

                <div className="text-xl sm:text-2xl font-mono font-semibold text-gray-900 border-b-2 border-gray-800 pb-1 inline-block md:min-w-max">
                    {groupName}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="text-sm text-gray-700 font-semibold">Redes</div>
                    <div className="flex items-center gap-3">
                        <a href="https://www.facebook.com/dundermifflin-fake" target="_blank" rel="noreferrer" aria-label="Facebook" className="px-3 py-1 rounded-full bg-white/60 hover:bg-white shadow-sm border border-gray-200 text-sm">
                            📘 Facebook
                        </a>
                        <a href="https://www.instagram.com/dundermifflin-fake" target="_blank" rel="noreferrer" aria-label="Instagram" className="px-3 py-1 rounded-full bg-white/60 hover:bg-white shadow-sm border border-gray-200 text-sm">
                            📸 Instagram
                        </a>
                        <a href="https://wa.me/5491123456789" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="px-3 py-1 rounded-full bg-white/60 hover:bg-white shadow-sm border border-gray-200 text-sm">
                            💬 WhatsApp
                        </a>
                    </div>
                </div>
           
        </footer>
    );
}