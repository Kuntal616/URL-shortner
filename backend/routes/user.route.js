import express from 'express';
import { handleRegister, handleLogin, handleLogout } from '../controllers/user.controller.js';
const router = express.Router();


router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);


export default router;
