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
    totalClicks: {
        type: Number,
        default: 0
    },
    lastVisited: {
        type: Date,
        default: null
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true});

export default mongoose.model("ShortUrl", shortUrlSchema);
