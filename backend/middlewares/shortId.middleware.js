export const validateShortId = (req,res,next)=>{
    const {shortId} = req.params;
    const shortIdPattern = /^[a-zA-Z0-9_-]{2,}$/;
    if(!shortIdPattern.test(shortId)){
        return res.status(400).json({error: 'Invalid shortId format'});
    }
    next();
}