import { useState } from 'react';
import axios from 'axios';

function InviteJury() {
    const [emails, setEmails] = useState([]);
    const [emailInput, setEmailInput] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    const addEmail = () => {
        const trimmed = emailInput.trim();
        if (!trimmed) return;
        if (emails.includes(trimmed)) {
            setError('Cet email est déjà dans la liste.');
            return;
        }
        setEmails((prev) => [...prev, trimmed]);
        setEmailInput('');
        setError('');
    };

    const removeEmail = (index) => {
        setEmails((prev) => prev.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addEmail();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        if (emails.length === 0) {
            setError('Ajoute au moins un email.');
            setResult(null);
            return;
        }

        setIsLoading(true);
        setError('');
        setResult(null);

        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post(
                'http://localhost:5000/api/admin/jury/invite',
                { emails, message },
                {
                    withCredentials: true,
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );

            setResult({ sent: data?.sent ?? 0, failed: data?.failed ?? 0 });
            setEmails([]);
        } catch (err) {
            const msg = err?.response?.data?.error || 'Impossible d\'envoyer les invitations.';
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="mx-auto w-full max-w-2xl px-4 py-8">
            <h1 className="text-2xl font-semibold text-slate-900">Inviter des membres du jury</h1>

            <form className="mt-6 space-y-4 rounded-lg bg-white p-5 shadow" onSubmit={handleSubmit}>
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Adresses email
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="jury@mail.com"
                            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                        />
                        <button
                            type="button"
                            onClick={addEmail}
                            className="rounded-md bg-slate-200 px-3 py-2 text-lg font-bold text-slate-700 hover:bg-slate-300"
                        >
                            +
                        </button>
                    </div>
                    {emails.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {emails.map((email, i) => (
                                <li key={i} className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800">
                                    {email}
                                    <button
                                        type="button"
                                        onClick={() => removeEmail(i)}
                                        className="ml-1 text-slate-400 hover:text-red-500"
                                    >
                                        ×
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                        Message (optionnel)
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Bienvenue dans le jury..."
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                {result && (
                    <p className="text-sm text-slate-700">
                        Invitations envoyees: <strong>{result.sent}</strong> | Echecs: <strong>{result.failed}</strong>
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? 'Envoi en cours...' : 'Envoyer les invitations'}
                </button>
            </form>
        </section>
    );
}

export default InviteJury;
