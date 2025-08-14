import { cookieOptions } from '../config/config.js';
import { getAllShortUrls } from '../dao/short_url.dao.js';
import { registerUser, loginUser } from '../services/user.service.js';
import { deleteShortUrl } from '../dao/short_url.dao.js';
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

export const getCurrentUser =  (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    
    return res.status(200).json({
        success: true,
        user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        }
    });
}

export const getAllUrls = async (req,res)=>{
    const userId = req.user._id;
    const urls = await getAllShortUrls(userId);
    return res.status(200).json({
        success: true,
        urls
    });
    
}

export const handleDeleteUserUrl = async (req, res) => {
    const { id } = req.params;
    const deletedUrl = await deleteShortUrl(id);
    if (!deletedUrl) {
        return res.status(404).json({
            success: false,
            message: "Short URL not found"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Short URL deleted successfully"
    });
}