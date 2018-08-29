import common from './common.js';
import {
    extend
} from '../util.js';

let radarConfig = {
    // 有些雷达图会有Y轴，一般不展示，这里提供功能
    yAxisLine: {
        show  : false,
        color : '#B8B8B8',
    },

    grid: {
        display    : false,
        beginAtZero: true,
        min        : 0,
        max        : 100,
        stepSize   : 25,
        fontSize   : 15,
        fontColor  : '#888888'
    },

    // 从原点往外辐射线的样式
    radiationLineStyle: {
        color: '#888888',
        style: 'dash',
    },

    gridLineStyle: {
        color: '#888888',
        style: 'line',
    },

    // 单个雷达区域的配置
    lineStyle: {
        label               : '',
        backgroundColor     : 'rgba(232, 245, 223, 0.7)',
        borderColor         : '#99d774',
        borderWidth         : 1.5,
        pointBackgroundColor: '#8dd364',
        pointBorderColor    : '#8dd364',
        pointBorderWidth    : 0,
        pointRadius         : 1.8
    },

    // 雷达图的旋转角度
    startAngle: 0,
}

export default extend(radarConfig, common);

