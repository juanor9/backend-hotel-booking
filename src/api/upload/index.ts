import Router from 'express';
import multer from 'multer';

import { handleUploadMultiple, handleUploadSingle } from './upload.controller';

const router = Router();
const upload = multer({ dest: './temp'});

router.post('/file', upload.single('file'), handleUploadSingle);
router.post('/files', upload.array('files'), handleUploadMultiple)

export default router;
