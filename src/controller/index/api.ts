import { Request, Response } from 'express';
import axios from 'axios';
export async function index(req: Request, res: Response) {
    const ret = await axios.get("https://chromedriver.storage.googleapis.com/LATEST_RELEASE");

    return res.status(200).send(ret.data);
}