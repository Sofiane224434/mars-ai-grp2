import { google } from 'googleapis';

const YOUTUBE_UPLOAD_SCOPE = 'https://www.googleapis.com/auth/youtube.upload';

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
  const oauth2Client = buildOAuthClient();

  if (!oauth2Client) {
    return res.status(500).json({
      error: 'Configuration YouTube OAuth manquante.',
      requiredEnv: ['YT_CLIENT_ID', 'YT_CLIENT_SECRET', 'YT_REDIRECT_URI'],
    });
  }

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    include_granted_scopes: true,
    scope: [YOUTUBE_UPLOAD_SCOPE],
  });

  return res.redirect(authUrl);
};

export const handleYouTubeOAuthCallback = async (req, res) => {
  try {
    const oauth2Client = buildOAuthClient();

    if (!oauth2Client) {
      return res.status(500).json({
        error: 'Configuration YouTube OAuth manquante.',
        requiredEnv: ['YT_CLIENT_ID', 'YT_CLIENT_SECRET', 'YT_REDIRECT_URI'],
      });
    }

    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ error: 'Parametre code manquant dans le callback OAuth.' });
    }

    const { tokens } = await oauth2Client.getToken(code);
    const refreshToken = tokens?.refresh_token || null;

    return res.status(200).json({
      message: refreshToken
        ? 'OAuth YouTube reussi. Enregistrez ce refresh token dans backend/.env.'
        : 'OAuth YouTube reussi, mais aucun refresh token renvoye. Reessayez avec prompt=consent et le compte correct.',
      refreshToken,
      note: 'Ajoutez la valeur dans YT_REFRESH_TOKEN puis redemarrez le serveur backend.',
    });
  } catch (error) {
    console.error('Erreur callback OAuth YouTube:', error);
    return res.status(500).json({
      error: 'Echec de l\'echange OAuth YouTube.',
      details: error?.message || 'Erreur inconnue',
    });
  }
};
