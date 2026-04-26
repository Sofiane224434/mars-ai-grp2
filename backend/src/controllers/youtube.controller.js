import { google } from 'googleapis';

// Scope minimal pour pouvoir uploader des videos sur YouTube.
const YOUTUBE_UPLOAD_SCOPE = 'https://www.googleapis.com/auth/youtube.upload';

// Construit un client OAuth2 a partir des variables d'environnement.
// Si la configuration est incomplete, on retourne null pour laisser
// les handlers renvoyer un message explicite.
const buildOAuthClient = () => {
  const clientId = process.env.YT_CLIENT_ID;
  const clientSecret = process.env.YT_CLIENT_SECRET;
  const redirectUri = process.env.YT_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return null;
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
};

export const startYouTubeOAuth = (req, res) => {
  // 1) Preparer le client OAuth
  const oauth2Client = buildOAuthClient();

  // 2) Validation de config pour un message d'erreur clair
  if (!oauth2Client) {
    return res.status(500).json({
      error: 'Configuration YouTube OAuth manquante.',
      requiredEnv: ['YT_CLIENT_ID', 'YT_CLIENT_SECRET', 'YT_REDIRECT_URI'],
    });
  }

  // 3) Generer l'URL d'autorisation Google
  // - access_type=offline: permet d'obtenir un refresh token
  // - prompt=consent: force l'ecran de consentement (utile pour recuperer un refresh token)
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    include_granted_scopes: true,
    scope: [YOUTUBE_UPLOAD_SCOPE],
  });

  // 4) Redirection navigateur vers Google
  return res.redirect(authUrl);
};

export const handleYouTubeOAuthCallback = async (req, res) => {
  try {
    // 1) Re-construire le client OAuth avec la meme config
    const oauth2Client = buildOAuthClient();

    if (!oauth2Client) {
      return res.status(500).json({
        error: 'Configuration YouTube OAuth manquante.',
        requiredEnv: ['YT_CLIENT_ID', 'YT_CLIENT_SECRET', 'YT_REDIRECT_URI'],
      });
    }

    // 2) Recuperer le code temporaire envoye par Google
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ error: 'Parametre code manquant dans le callback OAuth.' });
    }

    // 3) Echanger le code contre des tokens OAuth
    const { tokens } = await oauth2Client.getToken(code);
    const refreshToken = tokens?.refresh_token || null;

    // 4) Retourner le refresh token pour qu'il soit copie dans le .env
    // Note: Google peut ne pas renvoyer de refresh_token si deja accorde auparavant.
    return res.status(200).json({
      message: refreshToken
        ? 'OAuth YouTube reussi. Enregistrez ce refresh token dans backend/.env.'
        : 'OAuth YouTube reussi, mais aucun refresh token renvoye. Reessayez avec prompt=consent et le compte correct.',
      refreshToken,
      note: 'Ajoutez la valeur dans YT_REFRESH_TOKEN puis redemarrez le serveur backend.',
    });
  } catch (error) {
    // Erreur reseau/API Google ou code invalide
    console.error('Erreur callback OAuth YouTube:', error);
    return res.status(500).json({
      error: 'Echec de l\'echange OAuth YouTube.',
      details: error?.message || 'Erreur inconnue',
    });
  }
};
