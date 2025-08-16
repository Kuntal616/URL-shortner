import { saveShortUrl } from "../dao/short_url.dao.js";
import { generateShortId } from "../utils/helper.js";

export const createShortUrlWithoutUser = async (originalUrl)=>{
     const shortId = generateShortId();
     if(!shortId) {
         throw new Error('Short ID is required');
     }
     await saveShortUrl(shortId, originalUrl);
     return { shortId, shortURL: `https://url-shortner-5mo4.onrender.com/${shortId}`, originalUrl };
}

export const createShortUrlWithUser = async(originalUrl, createdBy, customShortId=null)=>{
    const shortId = customShortId || generateShortId();
    if(!shortId) {
        throw new Error('Short ID is required');
    }
    await saveShortUrl(shortId, originalUrl, createdBy);
    return { shortId, shortURL: `https://url-shortner-5mo4.onrender.com/${shortId}`, originalUrl };
}