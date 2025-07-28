import ShortUrl from "../models/short_url.model.js";

export const saveShortUrl = async (shortId, originalUrl, createdBy) => {
try {
    const short_url = new ShortUrl({
        shortId: shortId,
        originalUrl: originalUrl,
    });
    if(createdBy) {
        short_url.createdBy = createdBy;
    }
    await short_url.save();
} catch (error) {
    if(error.code === 11000) {
        throw new Error('Short URL already exists');
    }
    throw new Error(error.message || 'Error saving short URL');
}
}

export const getShortUrl = async (shortId)=>{
    return await ShortUrl.findOneAndUpdate(
        {
            shortId: shortId
        },
            { 
                $inc: { totalClicks: 1 },
                $set: { lastVisited: new Date() }
            },
            { new: true }
        );
}
export const getCustomShortUrl = async (customShortId)=>{
    return await ShortUrl.findOne({
        shortId: customShortId
    });
}

export const getShortUrlAnalytics = async (shortId) => {
    return await ShortUrl.findOne({ shortId: shortId });
}