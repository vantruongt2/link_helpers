import { Request, Response, Router } from 'express';
import links from './links/index';

// export class IndexRoute {
//     public routes(app: any): void {
//         app.route('/')
//             .get((req: Request, res: Response) => {
//                 res.status(403).send('Access Denied');
//             });
//     }
// }

const router = Router();
async function index(req: Request, res: Response) {
    const info = "/links/chrome/apk: get latest chrome apk download link </br>" +
        "/links/chrome/apk/download: download chrome apk latest link";
    return res.send(info);
};
//router.use('/', index);
router.use('/links', links);

export default router;