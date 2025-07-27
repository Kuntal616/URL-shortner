import express from 'express';
import { handleGenerateNewShortUrl, handleGetAnalytics} from '../controllers/short_url.controller.js';
const router = express.Router();

router.post('/',handleGenerateNewShortUrl)
router.get('/analytics/:shortId', handleGetAnalytics);
// router.post('/',handleCustomShortUrl);

export default router;