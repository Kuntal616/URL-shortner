import { findUserById } from "../dao/user.dao";
import { verifyToken } from "../utils/helper";

 export const authMiddleware = async(req, res, next) => {
     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
     if (!token) {
         return res.status(401).json({ message: 'Unauthorized' });
     }

     try {
         const decoded = verifyToken(token);
         const userId = decoded.id || decoded._id; // Handle both id and _id
         const user =  await findUserById(userId);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
         req.user = user;
         next();
     } catch (error) {
         return res.status(403).json({ message: 'Forbidden' });
     }
 }