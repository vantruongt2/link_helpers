import { Request, Response } from 'express';
import axios from 'axios';
const cheerio = require("cheerio");
const baseUrl = "https://www.apkmirror.com";

export async function getChromeAPK(req: Request, res: Response) {
    let link = await getChromeAPKLink();
    return res.send(link);
}
export async function downloadChromeAPK(req: Request, res: Response) { 
    let link = await getChromeAPKLink();
    return res.redirect(link);
}

async function getChromeAPKLink() {
    let response = await axios.get("https://chromiumdash.appspot.com/fetch_releases?channel=Stable&platform=Android&num=1&offset=0");
    let version = await response.data[0].version;
    version = version.replace(".", "-");
    let link = await getLinkFromHtml(version);
    if(!link) {
        let response = await axios.get("https://chromiumdash.appspot.com/fetch_releases?channel=Stable&platform=Android&num=1&offset=1");
        let version = await response.data[0].version;
        version = version.replace(".", "-");
        link = await getLinkFromHtml(version);
    }
    return link;
}

async function getLinkFromHtml(version: string) {
    const url = `${baseUrl}/apk/google-inc/chrome/chrome-${version}-release/`;
    console.log(url);
    let response = await axios.get(url)
    const $ = await cheerio.load(response.data);
    const elms = await $("div[class='table-row headerFont']");
    let link = undefined;
    
    elms.each(function (i: any, elm: any) {
        const span = $(elm).find("span[class='apkm-badge']");
        //console.log(span);
        if (span.length === 1) {
            const div = $(elm).find("div:contains('x86')");
            if (div.length === 1) {
                link = $(elm).find("a").attr("href");
                return;
            }
        }
    });
    if (link) {
        const apkmirror = `${baseUrl}${link}/download/`;
        response = await axios.get(apkmirror);
        const url = await response.data.match(/\/wp-content\/themes\/APKMirror\/download\.php\?id=\d*/);
        if (url) {
            return `${baseUrl}${url[0]}`;
        }
    }
    return undefined;
}