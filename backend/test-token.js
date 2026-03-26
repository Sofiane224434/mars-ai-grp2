import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

// Remplace par la vraie clé secrète de ton fichier .env si tu en as déjà une
const SECRET = process.env.JWT_SECRET || "ma_cle_secrete_super_robuste_123"; 

// On crée un faux utilisateur de test
const fauxJury = {
  id: 42, // On dit que tu es le membre du jury numéro 42
  role: 'jury' // Le mot magique que le douanier attend
};

// On génère le token
const token = jwt.sign(fauxJury, SECRET, { expiresIn: '1h' });

console.log("====================================");
console.log("TON TOKEN DE TEST :");
console.log(token);
console.log("====================================");