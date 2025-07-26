import { generateShortId, isValidUrl } from "../utils/helper.js";
import ShortUrl from "../models/short_url.model.js";

export const handleGenerateNewShortUrl = async (req, res) => {
    const body = req.body;
    console.log('Received URL:', body.url);
    if (!body.url) return res.status(400).json({ error: "URL is required" });
    if(!isValidUrl(body.url)) return res.status(400).json({ error: "Invalid URL format" });
    const shortID = generateShortId();
    const short_url = new ShortUrl({
        shortId: shortID,
        originalUrl: body.url,
        visitHistory: []
    });
    await short_url.save();
  
    return res.status(201).json({ shortId: shortID, shortURL: process.env.DEFAULT_URL + shortID, originalUrl: body.url });
}

export const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await ShortUrl.findOne({ shortId: shortId });

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        // originalUrl: result.originalUrl,
        visitHistory: result.visitHistory
    });
}

export const handleRedirectToOriginalUrl = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await ShortUrl.findOneAndUpdate({
            shortId: shortId
        },
            {
                $push: { visitHistory: { timestamp: new Date().toISOString() } }
            },
            { new: true }
        );

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