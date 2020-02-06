const moment = require('moment');

module.exports = {
    title: 'miniapp-charts',
    base:"/miniapp-charts/",
    description: '小程序图表组件',
    head: [
        // meta
        ["meta", {name: "robots", content: "all"}],
        ["meta", {name: "author", content: "yuanzm"}],
        ["meta", {name: "keywords", content: "miniapp-charts, charts, miniapp, js, canvas, github, components"}],
    ],
    plugins: [
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    // 不要忘了安装 moment
                    const moment = require('moment')
                    moment.locale(lang)
                    return moment(timestamp).fromNow()
                }
            }
        ]
    ],
    themeConfig: {
        repo: 'yuanzm/miniapp-charts',
        editLinks: true,
        editLinkText:'在 GitHub 上编辑此页',
        lastUpdated: '上次更新', // string | boolean
        sidebar: [
            {
                title: '概览',   // 必要的
                path: '/',      // 可选的, 应该是一个绝对路径
            },
            {
                title: '折线图',
                path: '/linechart/overview',
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    '/linechart/overview',
                    '/linechart/api',
                ]
            },
            {
                title: '柱状图',
                path: '/barchart/overview',
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    '/barchart/overview',
                    '/barchart/api',
                ]
            },
            {
                title: '分布图',
                path: '/distributionchart/overview',
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    '/distributionchart/overview',
                    '/distributionchart/api',
                ]
            },
            {
                title: '雷达图',
                path: '/radar/overview',
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    '/radar/overview',
                    '/radar/api',
                ]
            }
        ]
    }
}
