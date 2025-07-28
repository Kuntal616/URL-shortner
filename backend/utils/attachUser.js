import { verifyToken } from './helper.js';
import { findUserById } from '../dao/user.dao.js';

export const attachUser = async (req, res, next) => {
    try {
        
        // Get token from cookie or Authorization header
        const token = req.cookies?.token || 
                     req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            // No token provided - continue without user (for guest URLs)
            req.user = null;
            return next();
        }

        // Verify token
        const decoded = verifyToken(token);
        
        // Find user by ID
        const user = await findUserById(decoded.id);
        if (!user) {
            // User not found - clear invalid cookie and continue without user
            res.clearCookie('token');
            req.user = null;
            return next();
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        // Handle token errors gracefully
        if (error.name === 'TokenExpiredError') {
            console.log('JWT token expired, clearing cookie');
            res.clearCookie('token');
            req.user = null;
            return next(); // Continue without user
        } else if (error.name === 'JsonWebTokenError') {
            console.log('Invalid JWT token, clearing cookie');
            res.clearCookie('token');
            req.user = null;
            return next(); // Continue without user
        } else {
            console.error('Error in attachUser middleware:', error);
            req.user = null;
            return next(); // Continue without user
        }
    }
};