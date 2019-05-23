import common from './common.js';
import {
    extend,
    none
} from '../util.js';

let distributionConfig = {
    // Y轴标签的单位
    unit       : '',

    /**
     * Y轴标签以及toolTip的单位换算函数
     * 组件内置了changeUnit函数，可以自行设置
     */
    changeUnit : none,

    /**
     * y轴的样式配置
     */
    yAxis: {
        show       : true,
        marginLeft : 0,
        marginRight: 10,
        color      : '#888888',
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
        height   : 8,
        padding  : 20,
    },
    compareBarMargin: 3,

    topBottomPadding: 10,

    barLabelStyle: {
        color        : '#B8B8B8',
        fontSize     : 11,
        paddingLeft  : 5,
    }
}

export default extend(distributionConfig, common);

