import express from 'express'
import { FulltextSearch, Multisearch } from '../controllers/logsearchC.js';
const router = express.Router()
router.get('/search', FulltextSearch);
router.get('/advance', Multisearch);
export default router