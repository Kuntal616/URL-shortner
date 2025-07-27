import jwt from 'jsonwebtoken';
import {nanoid} from 'nanoid';


export const generateShortId = () => nanoid(8);

export const isValidUrl = (url) => {
    try {
        // Add protocol if missing
        const urlToTest = url.startsWith('http://') || url.startsWith('https://') 
            ? url 
            : 'https://' + url;
        
        const urlObject = new URL(urlToTest);
        const hostname = urlObject.hostname;
        
        // Must have at least one dot
        if (!hostname.includes('.')) return false;
        
        // Split by dots to check structure
        const parts = hostname.split('.');
        if (parts.length < 2) return false;
        
        const tld = parts[parts.length - 1];
        const domain = parts[parts.length - 2];
        
        // TLD validation - must be at least 2 characters and only letters
        if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) return false;
        
        // Domain validation - must be at least 2 characters
        if (!domain || domain.length < 2) return false;
        
        // Check against common valid TLDs
        const validTlds = [
            'com', 'org', 'net', 'edu', 'gov', 'mil', 'int', 'co', 'io', 'ai',
            'uk', 'us', 'ca', 'au', 'de', 'fr', 'jp', 'cn', 'in', 'br',
            'info', 'biz', 'name', 'pro', 'tv', 'me', 'cc', 'ws', 'to'
        ];
        
        if (!validTlds.includes(tld.toLowerCase())) return false;
        
        // Additional hostname length check
        if (hostname.length < 4) return false;
        
        // Domain part should not be just numbers
        if (/^\d+$/.test(domain)) return false;
        
        return true;
    } catch (error) {
        return false;
    }
};

export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, process.env.JWT_EXPIRATION ? { expiresIn: process.env.JWT_EXPIRATION } : {});
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET); 
}