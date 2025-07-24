import express from 'express';
import { handleGenerateNewShortUrl, handleGetAnalytics, handleRedirectToOriginalUrl } from '../controllers/short_url.controller.js';
const router = express.Router();

router.post('/',handleGenerateNewShortUrl)
router.get('/analytics/:shortId', handleGetAnalytics);
router.get('/:shortId', handleRedirectToOriginalUrl);

export default router;