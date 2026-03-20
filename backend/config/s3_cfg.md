# Configuration S3 Scaleway

Ce répertoire contient les fichiers de configuration pour l'intégration de Scaleway Object Storage (compatible S3) dans le backend de l'application.

## `s3.js`

Ce fichier configure le client AWS S3 pour interagir avec Scaleway Object Storage. Il utilise les variables d'environnement définies dans votre fichier `.env` pour l'authentification et la spécification du bucket.

### Variables d'environnement requises dans `.env`

Assurez-vous que les variables suivantes sont définies dans votre fichier `backend/.env` :

- `SCALEWAY_ACCESS_KEY` : Clé d'accès fournie par Scaleway.
- `SCALEWAY_SECRET_KEY` : Clé secrète fournie par Scaleway.
- `SCALEWAY_ENDPOINT` : Point d'accès (endpoint) du service S3 Scaleway (par exemple, `https://s3.fr-par.scw.cloud`).
- `SCALEWAY_BUCKET_NAME` : Nom du bucket S3 (par exemple, `tln`).
- `SCALEWAY_REGION` : Région du bucket S3 (par exemple, `fr-par`).
- `SCALEWAY_FOLDER` : Nom du dossier spécifique à votre groupe dans le bucket (par exemple, `grp2`).

Ces variables sont chargées via `dotenv` et utilisées pour initialiser le client S3.

### Fonctions exportées

Le fichier `s3.js` exporte les fonctions suivantes pour gérer les interactions avec S3 :

- `uploadFile(file)` : Permet d'uploader un fichier vers le bucket S3, en le plaçant dans le `SCALEWAY_FOLDER` spécifié et en lui attribuant des permissions de lecture publique (`public-read`).
- `getFileStream(fileKey)` : Permet de récupérer un flux de lecture pour un fichier donné depuis le bucket S3.
- `s3` : L'instance configurée du client AWS S3.

---

## Intégration de l'upload de films

### `routes/movie.routes.js`

Ce fichier définit les routes liées aux films, notamment l'endpoint `POST /api/movies` pour la soumission de nouveaux films. Il utilise le middleware `multer` pour gérer le traitement des fichiers `multipart/form-data` avant que le contrôleur ne prenne le relais.

### `controllers/movie.controller.js`

Ce contrôleur implémente la logique métier pour les opérations liées aux films. La fonction `addMovie` est responsable de :

1.  Recevoir le fichier uploadé via `multer`.
2.  Appeler la fonction `uploadFile` du service S3 (`backend/config/s3.js`) pour transférer le fichier vers Scaleway Object Storage.
3.  Supprimer le fichier temporaire stocké localement par `multer`.
4.  Renvoyer la localisation S3 du fichier au client.

### `server.js`

Le fichier `server.js` a été mis à jour pour inclure les `movieRoutes`, permettant à l'application d'écouter les requêtes sur ces endpoints.

### Dossier `uploads/`

Un dossier `uploads/` est créé à la racine du répertoire `backend` pour servir de stockage temporaire pour les fichiers traités par `multer` avant leur transfert vers Scaleway S3.

## Installation des dépendances

Pour utiliser le client S3 et le middleware d'upload, assurez-vous d'avoir installé les dépendances nécessaires dans votre projet backend. Exécutez la commande suivante depuis le répertoire `backend` :

```bash
npm install aws-sdk dotenv multer
```
