import common from './common.js';
import {
  extend,
  none,
  changeUnit,
} from '../util.js';

const linechartConfig = {
  /**
   * Y轴标签以及toolTip的单位换算函数
   * 组件内置了changeUnit函数，可以自行设置
   */
  changeUnit,

  secondChangeUnit: changeUnit,

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
  formatY: none,

  // 折线图默认配置
  lineStyle: {
    lineWidth: 1.5,
    lineColor: '#7587db',
    fillColor: 'rgba(117, 135, 219, 0.3)',
    // 是否需要背景颜色
    needFill: true,
    curve: true,
    circle: {
      show: true,
      fillColor: '#FFFFFF',
      strokeColor: '#FFAA00',
      lineWidth: 1,
      radius: 1.2,
    },
    /**
     * 在数据点很多的时候，如果每个点都要画个圆圈会大大影响性能
     * 同时圆圈过于多也会影响美观，因此设定阀值，大于此阀值的情况不绘制圆圈
     */
    maxCircleCount: 30,
  },


  // x轴文案的样式配置
  xAxis: {
    show: true,
    marginTop: 10,
    color: '#B8B8B8',
    fontSize: 11,
    /**
     * 默认x轴打七个点
     * 可以自行配置，但仍然会有保底逻辑
     */
    xAxisCount: 7,
  },

  /**
   * X轴轴体的样式配置
   */
  xAxisLine: {
    show: false,
    centerShow: true,
    width: 0.6,
    color: '#C6C6C6',
    style: 'solid',
  },

  /**
   * y轴的样式配置
   */
  yAxis: {
    show: true,
    marginLeft: 0,
    marginRight: 10,
    color: '#B8B8B8',
    fontSize: 11,
    unit: '',
    /**
     * 默认Y轴打四个点
     * 也可以自行配置，但仍然会有保底逻辑
     */
    yAxisCount: 4,
  },

  // 第二Y轴
  secondYaxis: {
    show: true,
    marginLeft: 5,
    color: '#B8B8B8',
    fontSize: 11,
    unit: '',
    textAlign: 'right',
  },

  /**
   * Y轴轴体的样式
   */
  secondYAxisLine: {
    show: true,
    width: 0.2,
    color: '#C6C6C6',
  },

  /**
   * Y轴轴体的样式
   */
  yAxisLine: {
    show: true,
    centerShow: false,
    width: 0.2,
    color: '#C6C6C6',
  },

  toolTip: {
    lineColor: '#C6C6C6',
    lineWidth: 0.5,
    fontSize: 11,
    color: '#FFFFFF',
    fillColor: 'rgba(136, 136, 136, 0.6)',
    linePadding: 5,
    needTitle: false,
    needX: true,

    padding: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 5,
    },
  },

};

export default extend(linechartConfig, common);