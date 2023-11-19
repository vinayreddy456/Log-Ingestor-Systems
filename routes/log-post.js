import express from 'express'
const router = express.Router()
import {logpostc} from '../controllers/PostC.js'
router.post('/log',logpostc)
export default router;