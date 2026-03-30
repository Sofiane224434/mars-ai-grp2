# 🚀 MarsAI Festival — Application Fullstack

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5-lightgrey)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Application web fullstack pour le festival MarsAI : soumission de films, accès jury/admin, et diffusion publique.

## Table des matières

- [Démarrage rapide](#-démarrage-rapide)
- [Architecture du projet](#-architecture-du-projet)
- [Stack technique](#-stack-technique)
- [Variables d'environnement](#-variables-denvironnement)
- [API Endpoints](#-api-endpoints)
- [Stockage médias (Scaleway S3)](#-stockage-médias-scaleway-s3)
- [Scripts disponibles](#-scripts-disponibles)
- [Troubleshooting](#-troubleshooting)
- [Conventions de commit](#-conventions-de-commit)
- [Licence](#-licence)

---

## ⚡ Démarrage rapide

### Prérequis

- Node.js 18+
- MySQL 8+
- npm

### Installation

```bash
# Copier les variables d'environnement
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Installation de concurrently (racine du projet)
npm install

# Installation des dépendances Backend
cd backend && npm install

# Installation des dépendances Frontend
cd ../frontend && npm install
```

### Lancement

```powershell
# Lancer Backend et Frontend simultanément (depuis la racine)
npm run dev

# Lancer tous les tests (backend + frontend)
npm test

# Ou séparément
npm run dev:backend   # Backend uniquement
npm run dev:frontend  # Frontend uniquement
npm run test:backend  # Tests backend uniquement
npm run test:frontend # Tests frontend uniquement
```

> Tous les tests utilisent Jest avec Testing Library côté frontend.

> `concurrently` permet de démarrer le backend et le frontend en une seule commande depuis la racine du projet.

> Le backend et le frontend disposent chacun de leur propre `node_modules` et de leur propre `package-lock.json`.

- **Backend** : `http://localhost:5000`
- **Frontend** : `http://localhost:5173`

---

## ✨ Fonctionnalités

### Authentification et Sécurité

- ✅ Authentification JWT (JSON Web Tokens)
- ✅ Protection des routes backend avec middleware
- ✅ Protection des routes frontend avec `PrivateRoute`
- ✅ Hashage sécurisé des mots de passe avec bcrypt
- ✅ Gestion de session utilisateur

### Architecture Frontend

- ✅ Architecture React moderne avec Hooks
- ✅ Gestion d'état global avec Context API
- ✅ Routing avec React Router
- ✅ Composants réutilisables et layouts modulaires
- ✅ Build optimisé avec Vite
- ✅ Qualité de code avec ESLint

### Architecture Backend

- ✅ API REST avec Express.js
- ✅ Architecture MVC (Models, Views, Controllers)
- ✅ Connexion base de données MySQL
- ✅ Middlewares personnalisés
- ✅ Gestion des erreurs centralisée
- ✅ CORS configuré pour le développement

### Développement

- ✅ Hot reload (Frontend et Backend)
- ✅ Variables d'environnement (.env)
- ✅ Code modulaire et maintenable
- ✅ Prêt pour la production

---

## 🛠️ Technologies

### Backend

| Technologie | Description | Version |
|-------------|-------------|---------|
| **Node.js** | Environnement d'exécution JavaScript | 18+ |
| **Express.js** | Framework web minimaliste et flexible | 5.2.1 |
| **MySQL** | Système de gestion de base de données | 8.x |
| **JWT** | Authentification par tokens | - |
| **bcrypt** | Hashage sécurisé des mots de passe | - |
| **dotenv** | Gestion des variables d'environnement | - |
| **CORS** | Middleware pour les requêtes cross-origin | - |
| **Zod** | Validation de schémas TypeScript-first | 3.x |

### Frontend

| Technologie | Description | Version |
|-------------|-------------|---------|
| **React** | Bibliothèque UI pour construire des interfaces | 19.2.0 |
| **Vite** | Build tool ultra-rapide pour le développement | 5.x |
| **React Router** | Bibliothèque de routing pour React | 7.13.0 |
| **Axios** | Client HTTP pour les appels API | - |
| **ESLint** | Linter pour maintenir la qualité du code | - |
| **Zod** | Validation de schémas partagés avec le backend | 4.3.6 |

### Outils de Développement

- **npm/yarn** : Gestionnaires de paquets
- **Nodemon** : Auto-restart du serveur backend
- **Git** : Contrôle de version

---

## 🏗️ Architecture du Projet

Le projet est organisé en deux parties principales :

```markdown
marsai/
├── backend/          # API REST Node.js
├── frontend/         # Application React
└── README.md
```

---

## �🔧 Backend

### Structure du Dossier

```markdown
backend/
├── config/               # Configuration de l'application
│   └── db.js            # Configuration et connexion MySQL
├── controllers/          # Logique métier des routes
│   └── auth.controller.js    # Gestion authentification
├── middlewares/          # Middlewares Express personnalisés
│   └── auth.middleware.js    # Vérification JWT
├── models/              # Modèles de données
│   └── user.model.js        # Modèle utilisateur
├── routes/              # Définition des endpoints API
│   └── auth.routes.js       # Routes d'authentification
├── .env                 # Variables d'environnement (à créer)
├── .env.example         # Exemple de configuration
├── package.json         # Dépendances et scripts
├── schema.sql           # Schéma de la base de données
└── server.js            # Point d'entrée du serveur
```

### Responsabilités des Dossiers

| Dossier | Responsabilité |
|---------|----------------|
| **config/** | Configuration de la base de données et autres services |
| **controllers/** | Logique métier : traitement des requêtes et formatage des réponses |
| **middlewares/** | Fonctions intermédiaires : validation, authentification, logging |
| **models/** | Interaction avec la base de données et définition des schémas |
| **routes/** | Définition des endpoints API et association avec les controllers |

### Variables d'Environnement Backend

Créer un fichier `.env` dans le dossier `backend/` :

```env
# Serveur
PORT=5000
NODE_ENV=development

# Base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_password
DB_NAME=marsai

# JWT
JWT_SECRET=votre_secret_jwt_tres_securise
JWT_EXPIRES_IN=24h
```

---

## 🎨 Frontend

### Structure du Dossier

```markdown
frontend/
├── public/              # Fichiers statiques publics
│   └── assets/          # Images, icônes statiques
├── src/
│   ├── assets/          # Ressources (images, fonts, icônes)
│   │   ├── fonts/       # Polices personnalisées
│   │   └── icons/       # Icônes de l'application
│   ├── components/      # Composants React réutilisables
│   │   ├── layout/
│   │   │   ├── Footer.jsx   # Pied de page
│   │   │   ├── Header.jsx   # En-tête avec logo + navbar
│   │   │   └── Navbar.jsx   # Barre de navigation principale
│   │   └── PrivateRoute.jsx # HOC protection routes
│   ├── contexts/        # Contextes React (state global)
│   │   └── AuthContext.jsx  # État authentification
│   ├── hooks/          # Hooks personnalisés
│   │   └── useAuth.js      # Hook accès authentification
│   ├── layouts/        # Layouts de pages
│   │   ├── AuthLayout.jsx   # Layout auth (Login/Register)
│   │   └── MainLayout.jsx   # Layout principal avec Header/Footer
│   ├── pages/          # Pages de l'application
│   │   ├── Dashboard.jsx    # Page tableau de bord (privée)
│   │   ├── Home.jsx         # Page d'accueil (publique)
│   │   ├── Login.jsx        # Page connexion
│   │   └── Register.jsx     # Page inscription
│   ├── services/       # Services et configuration API
│   │   └── api.js          # Configuration Axios et intercepteurs
│   ├── App.jsx         # Composant racine et routing
│   ├── main.jsx        # Point d'entrée React
│   └── index.css       # Styles globaux
├── .env                # Variables d'environnement (à créer)
├── .env.example        # Exemple de configuration
├── eslint.config.js    # Configuration ESLint
├── index.html          # Template HTML
├── package.json        # Dépendances et scripts
└── vite.config.js      # Configuration Vite
```

### Architecture des Composants

#### 📦 Components (`components/`)

Composants réutilisables et génériques :

- **Header** : Barre de navigation avec liens et état d'authentification
- **Footer** : Pied de page avec informations et liens
- **PrivateRoute** : Composant HOC pour protéger les routes nécessitant une authentification

#### 🌐 Contexts (`contexts/`)

Gestion d'état global avec Context API :

- **AuthContext** : Fournit l'état d'authentification (user, login, logout, register)

#### 🪝 Hooks (`hooks/`)

Hooks personnalisés pour la réutilisabilité :

- **useAuth** : Simplifie l'accès au AuthContext dans les composants

#### 📐 Layouts (`layouts/`)

Templates de mise en page :

- **AuthLayout** : Layout minimaliste pour les pages d'authentification
- **MainLayout** : Layout complet avec Header et Footer pour les pages principales
- **AdminLayout** : Layout dashboard admin avec `HeaderAdmin` + `Outlet` + `Footer`
- **JuryLayout** : Layout dashboard jury avec `HeaderJury` + `Outlet` + `Footer`

#### 🧭 Routing des Dashboards

Les pages dashboard doivent être déclarées comme routes enfants de leurs layouts pour charger correctement les en-têtes dédiés :

- Routes admin sous `AdminLayout` pour afficher `HeaderAdmin`
- Routes jury sous `JuryLayout` pour afficher `HeaderJury`

Exemple dans `App.jsx` :

```jsx
<Route element={<AdminLayout />}>
  <Route path="/dashboard/adminpanel" element={<AdminPanel />} />
  {/* ...autres routes admin */}
</Route>

<Route element={<JuryLayout />}>
  <Route path="/dashboard/jury/:id" element={<JuryPanel />} />
  {/* ...autres routes jury */}
</Route>
```

#### 📄 Pages (`pages/`)

Composants de pages complètes :

- **Home** : Page d'accueil accessible à tous
- **Login** : Formulaire de connexion
- **Register** : Formulaire d'inscription
- **Dashboard** : Page privée pour utilisateurs authentifiés

#### 🔌 Services (`services/`)

Communication avec le backend :

- **api.js** : Instance Axios configurée avec intercepteurs pour gérer les tokens JWT

### Variables d'Environnement Frontend

Créer un fichier `.env` dans le dossier `frontend/` :

```env
VITE_API_URL=http://localhost:5000
```

---

## 🔐 Système d'Authentification

### Flow d'Authentification

```markdown
┌─────────────┐          ┌─────────────┐          ┌──────────────┐
│   Frontend  │          │   Backend   │          │   Database   │
│   (React)   │          │  (Express)  │          │    (MySQL)   │
└──────┬──────┘          └──────┬──────┘          └──────┬───────┘
       │                        │                        │
       │  1. POST /register     │                        │
       │  {email, password}     │                        │
       ├───────────────────────>│                        │
       │                        │                        │
       │                        │  2. Hash password      │
       │                        │     (bcrypt)           │
       │                        │                        │
       │                        │  3. Save user          │
       │                        ├───────────────────────>│
       │                        │                        │
       │                        │  4. User created       │
       │                        │<───────────────────────┤
       │                        │                        │
       │                        │  5. Generate JWT token │
       │                        │                        │
       │  6. Return JWT token   │                        │
       │<───────────────────────┤                        │
       │                        │                        │
       │  7. Store token        │                        │
       │     (localStorage)     │                        │
       │                        │                        │
       │  8. Authenticated      │                        │
       │     requests with      │                        │
       │     Authorization      │                        │
       │     header             │                        │
       ├───────────────────────>│                        │
       │                        │                        │
       │                        │  9. Verify token       │
       │                        │                        │
       │  10. Protected data    │                        │
       │<───────────────────────┤                        │
       │                        │                        │
```

### Étapes Détaillées

#### 1️⃣ Inscription (Register)

- L'utilisateur remplit le formulaire sur la page [Register.jsx](frontend/src/pages/Register.jsx)
- Le frontend envoie `POST /api/auth/register` avec `{ email, password, name }`
- Le backend hash le mot de passe avec **bcrypt**
- L'utilisateur est créé dans la base de données
- Un token JWT est généré et retourné
- Le token est stocké dans `localStorage`
- L'utilisateur est automatiquement connecté

#### 2️⃣ Connexion (Login)

- L'utilisateur remplit le formulaire sur [Login.jsx](frontend/src/pages/Login.jsx)
- Le frontend envoie `POST /api/auth/login` avec `{ email, password }`
- Le backend vérifie les credentials
- Si valide, un token JWT est généré et retourné
- Le token est stocké et l'utilisateur est connecté

#### 3️⃣ Accès aux Routes Protégées
- **Backend** : Le middleware [auth.middleware.js](backend/middlewares/auth.middleware.js) vérifie le token JWT dans les en-têtes
- **Frontend** : Le composant [PrivateRoute.jsx](frontend/src/components/PrivateRoute.jsx) vérifie l'état d'authentification
- L'[AuthContext.jsx](frontend/src/contexts/AuthContext.jsx) maintient l'état global d'authentification

#### 4️⃣ Déconnexion (Logout)

- Le token est supprimé du `localStorage`
- L'état d'authentification est réinitialisé
- L'utilisateur est redirigé vers la page d'accueil

### Sécurité Implémentée

| Mesure de Sécurité | Description |
|---------------------|-------------|
| **Hashage bcrypt** | Les mots de passe ne sont jamais stockés en clair |
| **JWT signé** | Les tokens sont signés avec un secret sécurisé |
| **Expiration token** | Les tokens ont une durée de vie limitée |
| **Middleware auth** | Vérification systématique des tokens sur les routes protégées |
| **CORS configuré** | Contrôle des origines autorisées |
| **Validation données** | Validation côté serveur des données entrantes |

---

## � API Endpoints

### Authentification

| Méthode | Endpoint             | Description                    | Protection | Body |
|---------|----------------------|--------------------------------|------------|------|
| POST    | `/api/auth/register` | Inscription nouvel utilisateur | 🌐 Public  | `{ "name": "string", "email": "string", "password": "string" }` |
| POST    | `/api/auth/login`    | Connexion utilisateur          | 🌐 Public  | `{ "email": "string", "password": "string" }` |
| GET     | `/api/auth/profile`  | Récupérer profil utilisateur   | 🔒 Privé   | - |
| PUT     | `/api/auth/profile`  | Mettre à jour profil           | 🔒 Privé   | `{ "name": "string", "email": "string" }` |

### Médias (S3)

| Méthode | Endpoint                              | Description                               | Protection |
|---------|---------------------------------------|-------------------------------------------|------------|
| POST    | `/api/movies`                         | Upload fichier vers S3 (`video_file`)     | Public*    |
| GET     | `/api/movies/images?key=<s3Key>`      | Lecture d’un fichier depuis S3            | Public*    |

### Réponses API

#### Succès (200/201)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Utilisateur créé avec succès"
}
```

#### Erreur (400/401/404/500)

```json
{
  "success": false,
  "error": "Description de l'erreur",
  "message": "Email déjà utilisé"
}
```

### Authentification des Requêtes

Pour les routes protégées, incluez le token JWT dans l'en-tête :

```http
Authorization: Bearer <votre_token_jwt>
```

## 🗂️ Stockage médias (Scaleway S3)

Le backend utilise Scaleway Object Storage (compatible S3) pour les uploads de fichiers.

### Variables d’environnement backend

À définir dans `backend/.env` :

- `SCALEWAY_ACCESS_KEY`
- `SCALEWAY_SECRET_KEY`
- `SCALEWAY_ENDPOINT` (ex: `https://s3.fr-par.scw.cloud`)
- `SCALEWAY_BUCKET_NAME` (ex: `tln`)
- `SCALEWAY_REGION` (ex: `fr-par`)
- `SCALEWAY_FOLDER` (ex: `grp2`)

### Endpoints S3 implémentés

- `POST /api/movies`  
  Upload d’un fichier via `multipart/form-data` avec le champ `video_file`.
- `GET /api/movies/images?key=<s3KeyEncodée>`  
  Récupération d’un fichier depuis S3 via la clé (`key`) encodée URL.

Exemple :
`/api/movies/images?key=grp2%2Fdbccbef00084f21c17278c94d5158294`

### Dépendances backend liées

- `aws-sdk`
- `multer`
- `dotenv`
  
---

## 🛠️ Scripts Disponibles

### Backend (`cd backend`)

| Commande | Description | Usage |
|----------|-------------|-------|
| `npm start` | Lance le serveur en mode production | Production |
| `npm run dev` | Lance le serveur avec nodemon (hot reload) | Développement |
| `npm test` | Exécute les tests | Test |

### Frontend (`cd frontend`)

| Commande | Description | Usage |
|----------|-------------|-------|
| `npm run dev` | Lance le serveur Vite de développement | Développement |
| `npm run build` | Crée un build optimisé pour la production | Production |
| `npm run preview` | Prévisualise le build de production localement | Test production |
| `npm run lint` | Vérifie le code avec ESLint | Quality |

---

## 📦 Dépendances Principales

### Backend Dependencies

```json
{
  "express": "^5.18.0",           // Framework web
  "mysql2": "^3.0.0",             // Driver MySQL
  "jsonwebtoken": "^9.0.0",       // Génération et vérification JWT
  "bcrypt": "^2.4.3",           // Hashage mots de passe
  "dotenv": "^16.0.0",            // Variables d'environnement
  "cors": "^2.8.5",               // Middleware CORS
  "express-validator": "^7.0.0",  // Validation des données
  "zod": "^3.0.0"                 // Validation schémas partagés
}
```

### Frontend Dependencies

```json
{
  "react": "^18.2.0",             // Bibliothèque UI
  "react-dom": "^18.2.0",         // Rendu React pour le web
  "react-router-dom": "^6.8.0",   // Routing
  "axios": "^1.3.0",              // Client HTTP
  "zod": "^3.0.0"                 // Validation schémas partagés
}
```

### Dev Dependencies

**Backend:**

- `node --watch` : Redémarrage automatique du serveur 

**Frontend:**

- `vite` : Build tool et dev server
- `eslint` : Linter JavaScript/React
- `@vitejs/plugin-react` : Plugin React pour Vite

---

## 🎯 Bonnes Pratiques

### Architecture et Organisation

- ✅ **Séparation des préoccupations** : Backend et Frontend totalement découplés
- ✅ **Architecture MVC** : Models, Controllers, Routes clairement séparés
- ✅ **Composants modulaires** : Components React réutilisables et testables
- ✅ **Single Responsibility** : Chaque fichier a une responsabilité unique

### Sécurité

- ✅ **Hashage sécurisé** : Bcrypt pour les mots de passe
- ✅ **JWT tokens** : Authentification stateless et sécurisée
- ✅ **Validation Zod** : Schémas partagés entre frontend et backend pour une cohérence garantie
- ✅ **CORS configuré** : Protection contre les requêtes non autorisées
- ✅ **Variables d'environnement** : Secrets jamais commités dans le code

### Code Quality

- ✅ **ESLint** : Maintien de la qualité et cohérence du code
- ✅ **Structure claire** : Dossiers et fichiers organisés logiquement
- ✅ **Nommage explicite** : Variables et fonctions avec des noms descriptifs
- ✅ **Comments** : Documentation des parties complexes

### Performance

- ✅ **Vite build tool** : Build et HMR ultra-rapides
- ✅ **Code splitting** : Chargement optimisé avec React Router
- ✅ **Async/Await** : Gestion asynchrone propre
- ✅ **Connection pooling** : Optimisation des connexions DB

---

## 🐛 Troubleshooting

### Problèmes Courants

#### ❌ Erreur de connexion à la base de données

```bash
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution :**

- Vérifiez que MySQL est démarré
- Vérifiez les credentials dans `.env`
- Assurez-vous que la base de données existe

#### ❌ CORS Error

```markdown
Access to XMLHttpRequest blocked by CORS policy
```

**Solution :**

- Vérifiez que le backend accepte l'origine du frontend
- Vérifiez `VITE_API_URL` dans le `.env` du frontend

#### ❌ JWT Token invalide

```markdown
401 Unauthorized: Invalid token
```

**Solution :**

- Vérifiez que `JWT_SECRET` est identique dans votre environnement
- Reconnectez-vous pour obtenir un nouveau token
- Vérifiez que le token est bien envoyé dans les headers

#### ❌ Port déjà utilisé

```markdown
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution :**

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment vous pouvez contribuer :

### 1. Fork le projet

```bash
git clone https://github.com/votre-username/mars-ai-grp2.git
cd mars-ai-grp2
```

### 2. Créer une branche

```bash
git checkout -b feature/nouvelle-fonctionnalite
```

### 3. Commiter vos changements

```bash
git add .
git commit -m "feat: ajout d'une nouvelle fonctionnalité"
```

### 4. Pousser vers la branche

```bash
git push origin feature/nouvelle-fonctionnalite
```

### 5. Ouvrir une Pull Request

### Convention de Commits

Nous suivons les [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` : Nouvelle fonctionnalité
- `fix:` : Correction de bug
- `docs:` : Documentation
- `style:` : Formatage, point-virgules manquants, etc.
- `refactor:` : Refactoring du code
- `test:` : Ajout ou modification de tests
- `chore:` : Maintenance du code

---

## 📚 Ressources et Documentation

### Documentation Officielle

- [React](https://react.dev/) - Documentation React
- [Express.js](https://expressjs.com/) - Documentation Express
- [Vite](https://vitejs.dev/) - Documentation Vite
- [React Router](https://reactrouter.com/) - Documentation React Router
- [MySQL](https://dev.mysql.com/doc/) - Documentation MySQL
- [Zod](https://zod.dev/) - Documentation Zod

### Tutoriels Recommandés

- [JWT Authentication Best Practices](https://jwt.io/introduction)
- [React Context API](https://react.dev/reference/react/useContext)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

---

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

```markdown
MIT License

Copyright (c) 2026 Marsai

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Auteurs

Développé avec ❤️ par l'équipe MarsAI.

---

## ⭐ Support

Si ce projet vous a été utile, n'hésitez pas à lui donner une étoile ⭐ sur GitHub !

Pour toute question ou suggestion, ouvrez une issue sur le dépôt GitHub.
