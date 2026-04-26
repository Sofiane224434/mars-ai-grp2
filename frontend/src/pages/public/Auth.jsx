import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/ui/Button.jsx';

const API_URL = 'http://localhost:5000/api';

function Auth() {
    // Le token saisi manuellement dans le champ
    const [accessToken, setAccessToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    // useSearchParams lit les paramètres GET dans l'URL, ex: /auth?token=xxxxx
    const [searchParams] = useSearchParams();

    // Au chargement de la page, on regarde si l'URL contient ?token=...
    // C'est le cas quand le jury clique sur le lien dans l'email d'invitation
    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
            // On pré-remplit le champ avec le token extrait de l'URL
            setAccessToken(tokenFromUrl);
            // Et on soumet automatiquement pour connecter le jury sans action manuelle
            handleLogin(tokenFromUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogin = async (token) => {
        const tokenToUse = (token || accessToken).trim();
        if (!tokenToUse) return;

        setIsLoading(true);
        setError('');

        try {
            // Appel à POST /api/auth/login avec le token magique
            // Le backend: vérifie le token JWT, crée une session, renvoie { user, token: sessionToken }
            // Il pose aussi un cookie httpOnly "session" (utilisé par les routes protégées)
            const { data } = await axios.post(
                `${API_URL}/auth/login`,
                { token: tokenToUse },
                { withCredentials: true } // nécessaire pour que le cookie session soit accepté
            );

            // On stocke également le session token en localStorage
            // pour les appels axios qui utilisent Authorization: Bearer
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirection selon le rôle de l'utilisateur (status retourné par le backend)
            // jury → son panel personnel /dashboard/jury/:id
            // admin → panel admin
            const { status, id } = data.user;
            if (status === 'jury') {
                navigate(`/dashboard/jury/${id}`);
            } else if (status === 'admin') {
                navigate('/dashboard/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            const msg = err?.response?.data?.error || 'Token invalide ou expiré.';
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    const isDisabled = accessToken.trim().length === 0 || isLoading;

    return (
        <section className="min-h-screen bg-linear-to-br from-gris-anthracite via-noir-bleute to-reglisse px-4 py-8">
            <div className="mx-auto mt-[12vh] w-full max-w-104 rounded-xl bg-white px-6 py-5 shadow-2xl">
                <h1 className="text-center font-title text-3xl font-semibold text-noir-bleute">Connexion</h1>

                {isLoading ? (
                    <p className="mt-8 text-center text-sm text-gris-anthracite">Connexion en cours...</p>
                ) : (
                    <form className="mt-6" onSubmit={handleSubmit}>
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

                        {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}

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
                )}
            </div>
        </section>
    );
}

export default Auth;
