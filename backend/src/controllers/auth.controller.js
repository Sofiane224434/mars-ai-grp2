// controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
// Génère un token JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};
// POST /api/auth/register
export const register = async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' });
        }
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'Email déjà utilisé' });
        }
        const user = await User.create({ email, password, firstname, lastname });
        const token = generateToken(user);
        res.status(201).json({ message: 'Inscription réussie', user, token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
// POST /api/auth/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user || !(await User.verifyPassword(password, user.password))) {
            return res.status(401).json({ error: 'Identifiants incorrects' });
        }
        const token = generateToken(user);
        res.json({
            user: { id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname },
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
// GET /api/auth/me
export const getProfile = async (req, res) => {
    res.json({ user: req.user });
};