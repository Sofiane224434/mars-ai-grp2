import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';

function Auth() {
    const [accessToken, setAccessToken] = useState('');
    const isDisabled = accessToken.trim().length === 0;

    return (
        <section className="min-h-screen bg-linear-to-br from-gris-anthracite via-noir-bleute to-reglisse px-4 py-8">
            <div className="mx-auto mt-[12vh] w-full max-w-104 rounded-xl bg-white px-6 py-5 shadow-2xl">
                <h1 className="text-center font-title text-3xl font-semibold text-noir-bleute">Connexion</h1>

                <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="access-token" className="mb-2 block text-sm text-gris-anthracite">
                        Token d&apos;accès
                    </label>

                    <input
                        id="access-token"
                        type="text"
                        autoComplete="off"
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
                        placeholder="Collez ici votre code d'accès reçu par e-mail"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-noir-bleute outline-none transition focus:border-bleu-canard focus:ring-2 focus:ring-bleu-canard/25"
                    />

                    <Button
                        type="submit"
                        interactive
                        variant="gradient-blue"
                        disabled={isDisabled}
                        className="mt-4 h-10 w-full rounded-md text-base"
                    >
                        Connexion
                    </Button>
                </form>
            </div>
        </section>
    );
}

export default Auth;
