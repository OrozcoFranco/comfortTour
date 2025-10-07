import { Link } from "react-router-dom";

export default function MainView() {
    return (
    <div className="flex flex-col min-h-screen bg-slate-800">

    <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Comfort Tour 🧳</h1>
        <div className="flex gap-4">
        <Link
            to="/auth/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
            Iniciar sesión
        </Link>
        <Link
            to="/auth/register"
            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition"
        >
            Registrarse
        </Link>
        </div>
    </header>

    <main className="flex-grow flex items-center justify-center text-center">
        <p className="text-gray-400"></p>
    </main>

    <footer className="bg-blue-700 text-white py-4 text-center">
        <p className="text-sm">
        © {new Date().getFullYear()} Comfort Tour – Todos los derechos
        reservados.
        </p>
    </footer>
    </div>
);
}
