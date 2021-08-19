
export interface ImageInfo {
    src: string;
    desc: string;
}

export interface WebPageItem {
    url: string;
    title: string;
    data: {
        ua: string;
        ua_tags?: string[];
        css: string;
        javascript: string;
        infoImgs: ImageInfo[];
        tips: string;
    }
}

export interface PageListInfo {
    groupName: string; // baidu, sina, csdn
    list: WebPageItem[];
}


