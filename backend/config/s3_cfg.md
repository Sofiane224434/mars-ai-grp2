# Configuration S3 Scaleway

Ce répertoire contient les fichiers de configuration pour l'intégration de Scaleway Object Storage (compatible S3) dans le backend de l'application.

## `s3.js`

Ce fichier configure le client AWS S3 pour interagir avec Scaleway Object Storage. Il utilise les variables d'environnement définies dans votre fichier `.env` pour l'authentification et la spécification du bucket.

### Variables d'environnement requises dans `.env`

Assurez-vous que les variables suivantes sont définies dans votre fichier `backend/.env` :

*   `SCALEWAY_ACCESS_KEY` : Clé d'accès fournie par Scaleway.
*   `SCALEWAY_SECRET_KEY` : Clé secrète fournie par Scaleway.
*   `SCALEWAY_ENDPOINT` : Point d'accès (endpoint) du service S3 Scaleway (par exemple, `https://s3.fr-par.scw.cloud`).
*   `SCALEWAY_BUCKET_NAME` : Nom du bucket S3 (par exemple, `tln`).
*   `SCALEWAY_REGION` : Région du bucket S3 (par exemple, `fr-par`).
*   `SCALEWAY_FOLDER` : Nom du dossier spécifique à votre groupe dans le bucket (par exemple, `grp2`).

Ces variables sont chargées via `dotenv` et utilisées pour initialiser le client S3.

### Fonctions exportées

Le fichier `s3.js` exporte les fonctions suivantes pour gérer les interactions avec S3 :

*   `uploadFile(file)` : Permet d'uploader un fichier vers le bucket S3, en le plaçant dans le `SCALEWAY_FOLDER` spécifié et en lui attribuant des permissions de lecture publique (`public-read`).
*   `getFileStream(fileKey)` : Permet de récupérer un flux de lecture pour un fichier donné depuis le bucket S3.
*   `s3` : L'instance configurée du client AWS S3.

---

## Intégration de l'upload et de la récupération de films

### `routes/movie.routes.js`

Ce fichier définit les routes liées aux films :
*   `POST /api/movies` : Endpoint pour la soumission de nouveaux films. Il utilise le middleware `multer` pour gérer le traitement des fichiers `multipart/form-data`.
*   `GET /api/movies/images/*` : Endpoint pour récupérer une image (ou un fichier) depuis Scaleway S3 en utilisant sa clé.
> *ex* : `GET /api/movies/images/grp2/dbccbef00084f21c17278c94d5158294
### `controllers/movie.controller.js`

Ce contrôleur implémente la logique métier pour les opérations liées aux films :
*   `addMovie` : Reçoit le fichier uploadé via `multer`, le transfère vers Scaleway Object Storage via `uploadFile`, supprime le fichier temporaire local et renvoie la localisation S3 du fichier.
*   `getMovieImage` : Récupère un fichier depuis Scaleway S3 en utilisant la fonction `getFileStream` et le renvoie en tant que réponse HTTP.

### `server.js`

Le fichier `server.js` a été mis à jour pour inclure les `movieRoutes`, permettant à l'application d'écouter les requêtes sur ces endpoints. La configuration générale du serveur a également été améliorée (CORS, connexion BDD, logger, 404).

### Dossier `uploads/`

Un dossier `uploads/` est créé à la racine du répertoire `backend` pour servir de stockage temporaire pour les fichiers traités par `multer` avant leur transfert vers Scaleway S3.

## Installation des dépendances

Pour utiliser le client S3 et le middleware d'upload, assurez-vous d'avoir installé les dépendances nécessaires dans votre projet backend. Exécutez les commandes suivantes depuis le répertoire `backend` :

```bash
npm install aws-sdk dotenv multer
```
