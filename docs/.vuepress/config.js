module.exports = {
    title: 'minapp-charts',
    base:".",
    description: '小程序图表组件',
    themeConfig: {
        lastUpdated: 'Last Updated', // string | boolean
        sidebar: [
            {
                title: '概览',   // 必要的
                path: '/',      // 可选的, 应该是一个绝对路径
            },
            {
                title: '折线图',
                path: '/linechart/overview',
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/linechart/overview',
                    '/linechart/api',
                ]
            },
            {
                title: '柱状图',
                path: '/barchart/overview',
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/barchart/overview',
                    '/barchart/api',
                ]
            },
            {
                title: '分布图',
                path: '/distributionchart/overview',
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/distributionchart/overview',
                    '/distributionchart/api',
                ]
            },
            {
                title: '雷达图',
                path: '/radar/overview',
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/radar/overview',
                    '/radar/api',
                ]
            }
        ]
    }
}
