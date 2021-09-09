import common from './common.js';
import {
  extend,
} from '../util.js';

const distributionConfig = {
  /**
   * y轴的样式配置
   */
  yAxis: {
    show: true,
    marginLeft: 0,
    marginRight: 10,
    color: '#888888',
    fontSize: 11,
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

  barStyle: {
    fillColor: '#6684C7',
    height: 10,
    padding: 12,
    topBottomPadding: 5,
    compareBarMargin: 3,
  },

  barLabelStyle: {
    color: '#B8B8B8',
    fontSize: 11,
    paddingLeft: 5,
  },
};

export default extend(distributionConfig, common);