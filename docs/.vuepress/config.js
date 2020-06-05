module.exports = {
    title: 'Hello VuePress',
    description: 'Hello, my friend!',
    base: '/blog-demo/',
    head: [
        ['link', {
            rel: 'icon',
            href: `/favicon.ico`
        }]
    ],
    dest: './docs/.vuepress/dist',
    ga: '',
    evergreen: true,
    themeConfig: {
        nav: [{
                text: '主页',
                link: '/'
            },
            {
                text: '测试',
                link: '/guide/'
            },
            {
                text: '笔记',
                items: [{
                        text: 'git笔记',
                        link: '/note/git_note/'
                    },
                    {
                        text: 'vue笔记',
                        link: '/note/vue_note/'
                    }
                ]
            },
            {
                text: 'External',
                link: 'https://www.baidu.com'
            },
        ],
        sidebarDepth: 2,
        sidebar: [{
            title: 'Guide',
            collapsable: false,
            children: ['/guide/']
        }]
    }
}