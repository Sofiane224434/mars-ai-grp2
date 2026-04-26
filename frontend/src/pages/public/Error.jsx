import { Link } from 'react-router-dom';
import Button from "../../components/ui/Button.jsx";

function Error() {
    return (
        <section className="min-h-screen bg-linear-to-br from-gris-anthracite via-noir-bleute to-reglisse px-6 py-16 text-white">
            <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur-sm md:p-12">
                <p className="text-lg font-semibold uppercase tracking-[0.4em] text-jaune-simpson md:text-2xl">Erreur 404</p>

                <h1 className="mt-4 font-title text-3xl font-black uppercase md:text-5xl">Page introuvable</h1>

                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60 md:text-sm">Page not found</p>

                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
                    La page que vous cherchez n&apos;existe pas ou a été déplacée.
                </p>

                <Link to="/" className="mt-8">
                    <Button variant="filled-yellow" interactive className="h-12 px-8 min-w-[250px] text-base font-semibold">
                        Retour à l&apos;accueil
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export default Error;
