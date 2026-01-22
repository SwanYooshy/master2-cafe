import { Head, Link } from '@inertiajs/react';

interface WelcomeProps {
    canRegister: boolean;
}

export default function Welcome({ canRegister }: WelcomeProps) {
    return (
        <>
            <Head title="Accueil" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center space-y-6 p-8">
                    <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
                        Bienvenue sur Smart Café
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Système de gestion de café intelligent
                    </p>
                    <div className="flex gap-4 justify-center mt-8">
                        <Link
                            href="/login"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Se connecter
                        </Link>
                        {canRegister && (
                            <Link
                                href="/register"
                                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                            >
                                S'inscrire
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
