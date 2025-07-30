import { cookieOptions } from '../config/config.js';
import { registerUser, loginUser } from '../services/user.service.js';
export const handleRegister = async (req, res) => {
    const {name,email,password} = req.body;
    const token = await registerUser({name,email,password});
    if(!token){
        return res.status(400).json({
            success: false,
            message: "User registration failed"
        });
    }
    return res.status(201).cookie("token", token, cookieOptions).json({
        success: true,
        message: "User registered successfully"
    });
}

export const handleLogin = async (req, res) => {

    const { email, password } = req.body;
    
    const {token, user} = await loginUser(email, password);
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }
    
    return res.cookie("token", token, cookieOptions).status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
        }
    });
}

export const handleLogout = async (req, res) => {
    try {
        // Clear both cookies (in case there's a typo in old cookie)
        res.clearCookie('token'); 
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error logging out"
        });
    }
}