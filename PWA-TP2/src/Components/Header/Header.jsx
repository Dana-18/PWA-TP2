import { User } from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import SimpleButton from '../Button/SimpleButton';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import AuthModal from './AuthModal';

export default function Header() {
    const { user, openAuthModal, logout } = useContext(AuthContext);

    return (
        <header className="bg-white h-14 sm:h-16 md:h-28 w-full sticky top-0 z-50 p-3 sm:p-4 flex items-center gap-4 border-none">
            <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <LanguageSwitcher />
                {user ? (
                    <>
                        <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-slate-800">
                            <User className="h-5 w-5" />
                            <span className="text-sm font-medium truncate">{user.email}</span>
                        </div>
                        <SimpleButton text="Cerrar sesión" size="sm" onClick={logout} />
                    </>
                ) : (
                    <SimpleButton text="Iniciar sesión" size="sm" onClick={() => openAuthModal('login')} />
                )}
            </div>
            <AuthModal />
        </header>
    );
}
