import {
  changeUnit,
} from '../util.js';
/**
 * 所有组件通用配置
 */
export default {
  debug: false,

  /**
   * 默认的图表宽度
   */
  width: 414,

  /**
   * 默认的图表高度
   */
  height: 200,

  // Y轴标签的单位
  unit: '',

  /**
   * Y轴标签以及toolTip的单位换算函数
   * 组件内置了changeUnit函数，可以自行设置
   */
  changeUnit,

  /**
   * 图表内本身的padding
   */
  padding: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 5,
  },
};

