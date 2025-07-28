import { isValidUrl } from "../utils/helper.js";
import { getShortUrl, getShortUrlAnalytics } from "../dao/short_url.dao.js";
import { createShortUrlWithUser, createShortUrlWithoutUser } from "../services/short_url.service.js";

export const handleGenerateNewShortUrl = async (req, res) => {
    try {
       
        const body = req.body;
        if (!body.url) return res.status(400).json({ error: "URL is required" });
        if (!isValidUrl(body.url)) return res.status(400).json({ error: "Invalid URL format" });

        let result;

        if (req.user) {
            
            result = await createShortUrlWithUser(body.url, req.user._id, body.customShortId);
        }
        else {
            
            result = await createShortUrlWithoutUser(body.url);
        }

        const { shortId, shortURL, originalUrl } = result;
        return res.status(201).json({ shortId, shortURL, originalUrl });
    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
};


export const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await getShortUrlAnalytics(shortId);

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.status(200).json({
        totalClicks: result.totalClicks,
        lastVisited: result.lastVisited,
        createdAt: result.createdAt,
        originalUrl: result.originalUrl
    });
}

export const handleRedirectToOriginalUrl = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await getShortUrl(shortId);

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Ensure the URL has a protocol
        let redirectUrl = entry.originalUrl;
        if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
            redirectUrl = 'https://' + redirectUrl;
        }

        return res.redirect(redirectUrl);
    } catch (error) {
        console.error('Redirect error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

