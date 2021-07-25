import common from './common.js';
import {
  extend,
} from '../util.js';

const radarConfig = {
  width: 250,
  height: 250,

  animation: true,
  animationStep: 0,
  animationEasing: 'linear',

  padding: {
    left: 5,
    right: 5,
    top: 5,
    bottom: 5,
  },

  // 有些雷达图会有Y轴，一般不展示，这里提供功能
  // TODO
  yAxisLine: {
    display: false,
    color: '#B8B8B8',
  },

  grid: {
    display: true,
    min: 0,
    max: 100,
    stepSize: 20,
    width: 1,
    color: '#e3e3e3',
    marginLineStyle: 'circle',   // 最外边网格样式  default: 默认蜘蛛网  circle: 圆环
    marginLineColor: 'rgb(200,200,200)',    // 最外边网格颜色 default: 默认跟随内部颜色  rgb string 自定义颜色
    marginLinePointRadius: 2,         // 最外边网格与辐射线焦点高亮点半径
    marginLinePointColor: 'rgb(140,140,140)',         // 最外边网格与辐射线焦点高亮点颜色
    style: 'line',
    // 线条是虚线的默认配置
    dashPattern: [10, 10],
    dashOffset: 10,
  },

  // 从原点往外辐射线的样式
  radiationLineStyle: {
    display: true,
    dashPattern: [10, 10],
    width: 1,
    dashOffset: 10,
    color: '#e3e3e3',
    style: 'line',
  },

  label: {
    display: true,
    color: '#888888',
    fontSize: 12,
    margin: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 3,
    },
  },

  // 单个雷达区域的配置
  datasetStyle: {
    label: '',
    backgroundColor: 'rgba(108,132,194,0.5)',
    borderColor: 'rgb(108,132,194)',
    borderWidth: 2,
    borderLineStyle: 'line',  // line || dash
    borderDashPattern: [10, 20], // [ [dashPattern] , dashOffset ]
    borderDashOffset: 5,
    pointShow: true,
    pointBackgroundColor: 'rgb(108,132,194)',
    pointBorderColor: 'rgb(108,132,194)',
    pointBorderWidth: 1,
    pointRadius: 5,
    focusStyle: {
      pointBackgroundColor: 'rgb(108,132,194)',
      pointBorderColor: 'rgb(108,132,194)',
      pointBorderWidth: 1,
      pointRadius: 2,
    },
  },

  // 雷达图的旋转角度
  startAngle: 0,

  // 信息框配置
  toolTip: {
    lineColor: '#C6C6C6',
    lineWidth: 0.5,
    fontSize: 11,
    color: '#FFFFFF',
    fillColor: 'rgba(136, 136, 136, 0.6)',
    linePadding: 5,

    padding: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 5,
    },
  },
};

export default extend(radarConfig, common);

