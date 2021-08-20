

// 问题汇总列表，一行
export interface CaseItem {
    title: string;
    description: string;
    resolved: boolean;
    images: string[];
}

export interface WebPageItem {
    url: string;
    title: string;
    data: {
        ua: string;
        ua_tags: string[];
        css: string;
        javascript: string;
        tips: string;
        cases: CaseItem[];
    }
}

export interface PageListInfo {
    groupName: string; // baidu, sina, csdn
    list: WebPageItem[];
}


