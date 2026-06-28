import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import SimpleButton from "../Button/SimpleButton";

export default function AuthModal() {
    const {
        authModalVisible,
        authMode,
        loadingAuth,
        error,
        closeAuthModal,
        login,
        register,
        setAuthMode,
    } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (!authModalVisible) return null;

    const submitHandler = async (event) => {
        event.preventDefault();
        if (authMode === "login") {
            await login(email, password);
        } else {
            await register(name, email, password);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl shadow-slate-800/10 ring-1 ring-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            {authMode === "login" ? "Iniciar sesión" : "Registrarse"}
                        </h2>
                        <p className="text-sm text-slate-500">
                            {authMode === "login"
                                ? "Ingrese sus datos para continuar"
                                : "Cree una cuenta para acceder"}
                        </p>
                    </div>
                    <button
                        className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200"
                        type="button"
                        onClick={closeAuthModal}
                    >
                        Cerrar
                    </button>
                </div>

                <form onSubmit={submitHandler} className="space-y-4">
                    {authMode === "register" ? (
                        <label className="block text-sm font-medium text-slate-700">
                            Nombre
                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                type="text"
                                placeholder="Tu nombre"
                                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                                required
                            />
                        </label>
                    ) : null}
                    <label className="block text-sm font-medium text-slate-700">
                        Email
                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            placeholder="usuario@example.com"
                            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            required
                        />
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                        Contraseña
                        <input
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="********"
                            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            required
                        />
                    </label>

                    {error ? (
                        <p className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">
                            {error}
                        </p>
                    ) : null}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <SimpleButton
                            text={loadingAuth ? "Procesando..." : authMode === "login" ? "Iniciar sesión" : "Registrarse"}
                            size="md"
                            type="submit"
                        />
                        <div className="text-sm text-slate-600">
                            {authMode === "login" ? (
                                <>
                                    ¿No tienes cuenta?{' '}
                                    <button
                                        type="button"
                                        className="font-semibold text-slate-900 underline"
                                        onClick={() => setAuthMode("register")}
                                    >
                                        Regístrate
                                    </button>
                                </>
                            ) : (
                                <>
                                    ¿Ya tienes cuenta?{' '}
                                    <button
                                        type="button"
                                        className="font-semibold text-slate-900 underline"
                                        onClick={() => setAuthMode("login")}
                                    >
                                        Iniciar sesión
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
