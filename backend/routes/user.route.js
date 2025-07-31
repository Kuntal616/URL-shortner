import express from 'express';
import { handleRegister, handleLogin, handleLogout, getCurrentUser, getAllUrls } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();


router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);
router.get('/me', authMiddleware, getCurrentUser);
router.get('/urls', authMiddleware, getAllUrls);

export default router;
