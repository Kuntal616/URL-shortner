import { generateShortId } from "../utils/unique_id_generate.js";
import ShortUrl from "../models/short_url.model.js";

export const handleGenerateNewShortUrl = async(req,res)=>{
const body = req.body;
if(!body.url) return res.status(400).json({error: "URL is required"});
const shortID = generateShortId();
const short_url = new ShortUrl({
    shortId: shortID,
    originalUrl: body.url,
    visitHistory: []
});
await short_url.save();
return res.status(201).json({shortId: shortID, originalUrl: body.url});
}

export const handleGetAnalytics = async(req, res) => {
    const shortId = req.params.shortId;
    const result = await ShortUrl.findOne({ shortId: shortId });

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.status(200).json({
    totalClicks: result.visitHistory.length,
    originalUrl: result.originalUrl,
    visitHistory: result.visitHistory
    });
}   

export const handleRedirectToOriginalUrl = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await ShortUrl.findOneAndUpdate({
        shortId: shortId
    }, 
    {
        $push: { visitHistory: { timestamp: new Date().toISOString() } }
    })

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.json({ originalUrl: entry.originalUrl });
}