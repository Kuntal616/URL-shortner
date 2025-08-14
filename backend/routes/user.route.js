import express from 'express';
import { handleRegister, handleLogin, handleLogout, getCurrentUser, getAllUrls,handleDeleteUserUrl } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();


router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);
router.get('/me', authMiddleware, getCurrentUser);
router.get('/urls', authMiddleware, getAllUrls);
router.delete('/urls/:id', authMiddleware, handleDeleteUserUrl);

export default router;
