
import { createUser, findUserByEmail } from '../dao/user.dao.js';
import { signToken } from '../utils/helper.js';

export const registerUser = async({name,email,password}) => {
    //jwt token generation
    try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) throw new Error('User already exists');
        const user = await createUser({ name, email, password });
        const token = signToken({ id:user._id });
        return token;
    } catch (error) {
        console.error('Error registering user:', error);
        return { error: true, message: error.message || 'Error registering user' };
    }
}

export const loginUser = async (email, password) => {
    try {
    const user = await findUserByEmail(email);

    if (!user || user.password !== password) {
        throw new Error('Invalid Credentials'); // Invalid email or password
    }
     // Generate JWT token
     const token = signToken({ id: user._id });
     return { user, token };
   } catch (error) {
     console.error('Error logging in user:', error);
     return { error: true, message: error.message || 'Error logging in user' };
   }

}