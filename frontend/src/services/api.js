// services/api.js
const defaultApiUrl = `${window.location.protocol}//${window.location.hostname}:5000/api`;
const API_URL = import.meta.env.VITE_API_URL || defaultApiUrl;

async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        //'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });
        const contentType = response.headers.get('content-type') || '';
        const data = contentType.includes('application/json')
            ? await response.json()
            : null;

        if (!response.ok) {
            throw { status: response.status, message: data?.error || 'Erreur' };
        }

        return data;
    } catch (error) {
        if (!error.status) {
            throw { status: 0, message: 'Serveur inaccessible' };
        }
        throw error;
    }
}

// export const authService = {
//     register: (userData) => fetchAPI('/auth/register', {
//         method: 'POST',
//         body: JSON.stringify(userData)
//     }),
//     login: (email, password) => fetchAPI('/auth/login', {
//         method: 'POST',
//         body: JSON.stringify({ email, password })
//     }),
//     getProfile: () => fetchAPI('/auth/me')
// }

export const movieService = {
    savedata: (moviedata) => fetchAPI('/movies', {
        method: 'POST',
        // body: JSON.stringify(moviedata)
        body: moviedata
    })
}