import { Router } from 'express';

import { getChromeAPK ,downloadChromeAPK} from '../../controller/links/api'

const router = Router();

router.get('/chrome/apk', getChromeAPK);
router.get('/chrome/apk/download', downloadChromeAPK);

export default router;