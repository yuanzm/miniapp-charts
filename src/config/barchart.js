import common from './common.js';
import {
    extend,
} from '../util.js';

let barchartConfig = {
    /**
     * 给定一组数据，Y轴标签的最大值最小值和每一步的值都是组件自动算出来的
     * 有些场景组件算出来的可能不满足需求，或者调用者就是想自定义Y轴标签的数据，
     * 因此提供自定义的formatY(max, min, yAxisCount)函数，调用者按要求返回数据给组件处理即可
     * @return {
     *      max: 将原始的最大值处理之后的最大值
     *      min: 将原始的最小值处理之后的最小值
     *      divider: 每一步的值
     *      multiple: 如果处理过程中发现divider是小于1的小数，需要将上面三个数值相对应放大一定倍数
     *      似的divider是大于1的数值，同时将放大的倍数告知组件，默认为1
     * }
     */
    formatY    : null,
    maxY       : Infinity,

    // x轴文案的样式配置
    xAxis: {
        show     : true,
        marginTop: 10,
        color    : '#B8B8B8',
        fontSize : 11,
    },

    /**
     * X轴轴体的样式配置
     */
    xAxisLine: {
        show      : false,
        centerShow: true,
        width     : 0.6,
        color     : '#C6C6C6',
        style     : 'solid',
    },

    /**
     * 默认Y轴打四个点
     * 也可以自行配置，但仍然会有保底逻辑
     */
    yAxisCount  : 4,

    /**
     * y轴的样式配置
     */
    yAxis: {
        show       : true,
        marginLeft : 0,
        marginRight: 10,
        color      : '#B8B8B8',
        fontSize   : 11,
    },

    /**
     * Y轴轴体的样式
     */
    yAxisLine : {
        show      : true,
        centerShow: false,
        width     : 0.2,
        color     : '#C6C6C6',
    },

    barStyle: {
        fillColor: '#6684C7',
    },
    barWidth: 30,

    compareBarMargin: 5,

    leftRightPadding: 10,

    barLabelStyle: {
        color      : '#B8B8B8',
        fontSize   : 11,
        paddingBottom: 5,
    }
}

export default extend(barchartConfig, common);

