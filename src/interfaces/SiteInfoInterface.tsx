export interface WebPageItem {
    url: string;
    title: string;
    data: {
        ua: string;
        ua_tags: string[];
        css: string;
        javascript: string;
        tips: string;
        cases: string;
    }
}

export interface PageListInfo {
    groupName: string; // baidu, sina, csdn
    list: WebPageItem[];
}


