import { PageListInfo } from "../interfaces/SiteInfoInterface";


const pageItemList: PageListInfo[] = [
    {
        groupName: "baidu",
        list: [
            {
                url: 'https://mbd.baidu.com/newspage/data/landingpage?s_type=news&dsp=wise&context=%7B%22nid%22%3A%22news_9031479572335053525%22%7D&pageType=1&n_type=1&p_from=-1&rec_src=52&innerIframe=1#viewportType=virtual&paddingTop=54&pageType=&pageInfo=',
                title: '央视新闻-大党|天下为公',
                data: {
                    ua: 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36 baiduboxapp',
                    ua_tags: ['baiduboxapp', 'baiduboxapp/'],
                    css: '%2F*%E6%82%AC%E6%B5%AE%E6%8F%90%E7%A4%BA%EF%BC%8C%E7%99%BE%E5%BA%A6APP%E5%86%85%E9%98%85%E8%AF%BB*%2F%0A.uukjsi6a_zpZccrqYiI3k%20%7B%0A%20%20display%3A%20none%20!important%3B%0A%7D%0A%2F*%E6%89%93%E5%BC%80APP%E6%9F%A5%E7%9C%8B%E6%9B%B4%E5%A4%9A%E8%AF%84%E8%AE%BA*%2F%0A._1-nFvWd71g07irMlxzeVz_%20%7B%0A%20%20display%3A%20none%20!important%3B%0A%7D',
                    javascript: 'e30=',
                    cases : [
                        {
                          title: '点赞分享',
                          description: '评论区的所有链接，包括用户头像，点赞等功能均需要百度APP支持, 暂时无法完全模拟',
                          resolved: false,
                          images: ['imgs/baidu/20210820164204.png']
                        },
                        {
                          title: '打开APP阅读全文',
                          description: '超长文本下拉时会显示这个按钮，可以通过更改useragent方式不让其显示出来',
                          resolved: true,
                          images: ['imgs/baidu/20210820171006.png'],
                        },
                        {
                          title: '百度APP内阅读',
                          description: '网页内一直有一个悬浮按钮，百度APP内阅读，随着网页下拉，该按钮位置固定不变，可以通过css将其隐藏',
                          resolved: true,
                          images: ['imgs/baidu/20210820171424.png'],
                        },
                        {
                          title: '查看高清图片',
                          description: '文章中内嵌的图片卡，下面会出现 打开百度APP看高清图片的链接， 点击后弹出百度APP调起窗口，此处可以通过更改 useragent 让其隐藏',
                          resolved: true,
                          images: ['imgs/baidu/20210820171822.png'],
                        },
                        {
                          title: '关注作者',
                          description: '用户文章发表类页面，用户头像右侧有关注按钮，将其通过css隐藏后可能会影响页面完整，点击后会显示调起APP窗口',
                          resolved: false,
                          images: ['imgs/baidu/20210820172657.png'],
                        },
                      ],
                    tips: "类似于 baiduboxapp://personalPage/entry?...  这种的APP调用暂无法实现",
                }
            },
            {
                url: 'https://m.baidu.com/from=0/bd_page_type=1/ssid=0/uid=0/pu=usm%400%2Csz%401320_1001%2Cta%40qbase_2_6.0_24_92.0/baiduid=2AE7612480C5DA9D6B00A4A76E68A42A/s?ref=www_iphone&lid=8467395262355118842&word=%E5%AE%A0%E7%89%A9&vslid=8467395262355118842&sa=vs_tab&sectab=video',
                title: '搜索-宠物',
                data: {
                    ua: 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36 baiduboxapp',
                    ua_tags: ['baiduboxapp', 'baiduboxapp/'],
                    css: '',
                    javascript: '',
                    tips: "",
                    cases : [
                        {
                          title: '页面底部弹百度APP广告',
                          description: '可通过useragent 隐藏',
                          resolved: true,
                          images: ['imgs/baidu/20210820173335.png'],
                        },
                    ],
                }
            },
        ]
    },
    {
        groupName: "sina",
        list: [
            {
                url: 'https://sina.cn/',
                title: '新浪首页',
                data: {
                    ua: 'OPPO-PDCM00__sinanews__7.66.0__android__11__860',
                    ua_tags: ['sinanews'],
                    css: '',
                    javascript: '',
                    tips: "",
                    cases : [
                        {
                          title: '悬浮广告',
                          description: '新浪首页有悬浮广告条，点击后会下载新浪新闻APP，可通过useragent 隐藏',
                          resolved: true,
                          images: ['imgs/sina/20210820180555.png'],
                        },
                        {
                          title: '底部评论',
                          description: '底部评论操作区，留言点赞和分享功能，点击后会下载新浪新闻APP， 无法解决',
                          resolved: false,
                          images: ['imgs/sina/20210820181033.png'],
                        },
                    ],
                }
            },
            {
                url: 'https://sports.sina.cn/ligue1/2021-08-20/detail-ikqciyzm2557385.d.html?vt=4&pos=108&his=0',
                title: '新浪体育',
                data: {
                    ua: 'OPPO-PDCM00__sinanews__7.66.0__android__11__860',
                    ua_tags: ['sinanews'],
                    css: '',
                    javascript: '',
                    tips: "进入网页后，javascript后台有时会主动调起 新浪新闻APP",
                    cases : [
                        {
                          title: '悬浮广告',
                          description: '页面顶部和底部都有悬浮广告条，点击后会下载新浪新闻APP，可通过useragent 隐藏',
                          resolved: true,
                          images: ['imgs/sina/20210820181506.png'],
                        },
                        {
                          title: '底部评论',
                          description: '底部评论操作区，留言点赞和分享功能，点击后会下载新浪新闻APP， 无法解决',
                          resolved: false,
                          images: ['imgs/sina/20210820181033.png'],
                        },
                        {
                            title: '阅读全文',
                            description: '可通过更改useragent以显示全文',
                            resolved: true,
                            images: ['imgs/sina/20210820181632.png'],
                          },
                    ],
                }
            },
        ]
    },
    {
        groupName: "csdn",
        list: [
           
        ]
    },
];

export default pageItemList;