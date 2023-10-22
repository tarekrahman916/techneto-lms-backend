import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

router.post('/sign-up', authController.signUp);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

export const AuthRoutes = router;
