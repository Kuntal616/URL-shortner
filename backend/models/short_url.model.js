import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required: true,
        unique: true,
    },
    originalUrl:{
        type:String,
        required: true,
    },
    visitHistory:[{timestamp:{type:String}}]
},{timestamps: true});

export default mongoose.model("ShortUrl", shortUrlSchema);
