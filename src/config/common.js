/**
 * 所有组件通用配置
 */
export default {
    debug: false,

    /**
     * 默认的图表宽度
     */
    width : 414,

    /**
     * 默认的图表高度
     */
    height: 200,

    // Y轴标签的单位
    unit  : '',

    /**
     * Y轴标签以及toolTip的单位换算函数
     * 组件内置了changeUnit函数，可以自行设置
     */
    changeUnit : null,

    /**
     * 图表内本身的padding
     */
    padding: {
        left  : 10,
        right : 10,
        top   : 10,
        bottom: 5
    },

    // 折线图默认配置
    lineStyle: {
        lineWidth : 1,
        lineColor : '#7587db',
        fillColor : 'rgba(117, 135, 219, 0.3)',
        // 是否需要背景颜色
        needFill  : true,
        circle    : {
            show       : true,
            fillColor  : '#FFFFFF',
            strokeColor: '#FFAA00',
            radius     : 1.2,
        }
    },
}

