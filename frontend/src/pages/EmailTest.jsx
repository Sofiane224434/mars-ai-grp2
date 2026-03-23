import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { emailService } from '../services/api.js';

function EmailTest() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        to: '',
        name: '',
        subject: 'Test Brevo depuis MarsAI',
        message: 'Ceci est un email de test envoye depuis la page /email-test.',
    });
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    useEffect(() => {
        if (user?.email) {
            setFormData((current) => ({
                ...current,
                to: current.to || user.email,
                name: current.name || user.firstname || '',
            }));
        }
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setFeedback({ type: '', message: '' });

        try {
            const response = await emailService.send(formData);
            setFeedback({
                type: 'success',
                message: response.message || 'Email envoye avec succes.',
            });
        } catch (error) {
            setFeedback({
                type: 'error',
                message: error.message || 'Erreur lors de l\'envoi de l\'email.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 px-4 py-10">
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Test Brevo</h1>
                <p className="mb-6 text-gray-600">Envoyez un email transactionnel depuis l'API backend.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="to" className="mb-1 block text-sm font-medium text-gray-700">Destinataire</label>
                        <input
                            id="to"
                            name="to"
                            type="email"
                            required
                            value={formData.to}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Nom (optionnel)</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">Sujet</label>
                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="7"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>

                    {feedback.message && (
                        <p className={feedback.type === 'success' ? 'rounded-lg bg-green-50 px-4 py-3 text-green-700' : 'rounded-lg bg-red-50 px-4 py-3 text-red-700'}>
                            {feedback.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:bg-gray-400"
                    >
                        {loading ? 'Envoi en cours...' : 'Envoyer le mail'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EmailTest;