# S3 Security — Configuration technique (Issue #39)

Référence : **🚀 ISSUE DO-02: [DEVOPS] Infra - Configuration S3 Bucket et Politiques de Sécurité (IAM)**

> **Contexte étudiant** : Ce document couvre la **livraison du code applicatif**.
> La validation infrastructure est déléguée à l'équipe DevOps/Infra avec accès Scaleway.

---

## 📦 Livrable étudiant — Code applicatif

### ✅ Implémenté et testé

- [x] Upload vers S3 via `POST /api/movies`
- [x] Récupération via `GET /api/movies/images?key=...`
- [x] Config backend `s3.js` avec fonctions `uploadFile()` et `getFileStream()`
- [x] Intégration multer pour gestion des fichiers temporaires
- [x] Gestion d'erreurs (stream errors, NoSuchKey detection)
- [x] Documentation technique complète (`s3_cfg.md` + `README.md`)

**Fichiers contribués** :

- `backend/config/s3.js` — Service S3 (configuration + utilitaires)
- `backend/routes/movie.routes.js` — Endpoints POST + GET
- `backend/controllers/movie.controller.js` — Handlers async avec error handling
- `backend/config/s3_cfg.md` — Doc technique implémentation
- `README.md` — Mise à jour avec endpoints S3

---

## 🔧 Dépendances infrastructure (À compléter par DevOps team)

L'équipe d'infra doit **valider et configurer** les 4 critères ci-dessous sur Scaleway.

### Critère 1 — Bucket S3 créé

**Config attendue**:

- Bucket : `tln`
- Région : `fr-par`
- Endpoint : `https://s3.fr-par.scw.cloud`

**À valider** (access console Scaleway requis):

- [ ] Bucket `tln` existe en fr-par
- [ ] Permissions d'accès OK pour clés API groupe

---

### Critère 2 — CORS publique pour vignettes

**Config attendue** : CORS autorisé pour lecture des médias publics (thumbnails) depuis frontend.

**Règle CORS suggérée** :

```json
[
  {
    "AllowedOrigins": ["http://localhost:5173"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

**À valider** (access console Scaleway requis):

- [ ] Règle CORS appliquée au bucket
- [ ] Test GET /api/movies/images?key=... réussi depuis navigateur

---

## Critère 3 — Politique IAM restreinte (API user)

### Attendu

L'utilisateur API ne doit avoir que les permissions minimales :

- `s3:PutObject`
- `s3:GetObject`

avec restriction de périmètre (bucket + préfixe de dossier groupe -> grp2/\*).

### Exemple de politique (principe)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPutGetOnlyOnGroupPrefix",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": ["arn:aws:s3:::tln/grp2/*"]
    }
  ]
}
```

**À valider** (accès console Scaleway requis):

- [ ] Politique définie et appliquée
- [ ] Test PutObject + GetObject réussis
- [ ] Test DeleteObject bloqué (vérification restriction)

---

## Critère 4 — Variables d’environnement sécurisées sur staging

### Attendu

Secrets S3 stockés dans des variables d’environnement sécurisées (jamais en clair dans le repo).

Variables minimales :

- `SCALEWAY_ACCESS_KEY`
- `SCALEWAY_SECRET_KEY`
- `SCALEWAY_ENDPOINT`
- `SCALEWAY_BUCKET_NAME`
- `SCALEWAY_REGION`
- `SCALEWAY_FOLDER`

### Preuves à fournir

- [ ] Capture de la configuration des variables sur staging (masquées)
- [ ] Confirmation qu’aucun secret n’est commité (`.env` ignoré)
- [ ] Test staging d’upload/récupération réussi

---

## État actuel (code applicatif)

### Implémenté

- [x] Upload vers S3 via `POST /api/movies`
- [x] Récupération via `GET /api/movies/images?key=...`
- [x] Config backend s3.js + `multer`

### Reste à valider côté infra

- [ ] Bucket / CORS / IAM (preuves console)
- [ ] Sécurité des secrets staging

---

## Notes de conformité CDC / MCD

Pour coller au besoin métier :

- vignettes = stockage public (lecture)
- sous-titres = stockage privé (accès contrôlé)

Recommandation : séparer les préfixes S3 :

- `grp2/public/thumbnails/`
- `grp2/private/subtitles/`
