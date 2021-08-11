// 太老的库，很多变量是下滑线开头的，暂时屏蔽先
/* eslint no-underscore-dangle: "off"*/
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-restricted-syntax: "off"*/

import ChartBase from './draw.js';
import {
  isPlainObject,
} from '../util.js';

import animationOptions from './easing.js';

const dpr = wx.getSystemInfoSync().pixelRatio;

export default class Base extends ChartBase {
  constructor() {
    super();

    this._dpr = dpr;

    // 用于性能数据打点
    this._start = 0;

    // 寄存最终用于渲染的数据
    this._render = {};

    // 为了方便调试，在调试模式下会打出性能信息
    this._performance = {};

    // 实际绘图区域边界点信息
    this._boundary = {};

    this.aniTimer = null;
  }

  /**
   * 性能数据打点
   */
  log(performancePointName) {
    this._performance[performancePointName] = new Date() - this._start;
  }

  /**
   * 获取本实例的配置
   */
  getConfig(cfg, sourceConfig) {
    if (!isPlainObject(cfg)) throw new Error('options must be type of Object');

    for (const key in sourceConfig) {
      if (cfg[key] !== undefined) {
        if (typeof sourceConfig[key] !== typeof cfg[key]) throw new Error(`TypeMismatch：${key} must be type of ${typeof sourceConfig[key]}`);

        // 对于对象类型的属性，递归调用来替换
        if (isPlainObject(cfg[key])) this.getConfig(cfg[key], sourceConfig[key]);

        else sourceConfig[key] = cfg[key];
      }
    }

    return sourceConfig;
  }

  /**
   * 因为可以设置padding样式，所以需要维护真实的边界点
   * 才可以实现精确绘制
   */
  calBoundaryPoint() {
    const { _config } = this;
    const { padding } = this._config;

    // 实际绘图区域的左上角
    this._boundary.leftTop = {
      x: padding.left,
      y: padding.top,
    };

    // 计算实际绘图区域的左下角信息
    this._boundary.leftBottom = {
      x: padding.left,
      y: (_config.height -
        padding.bottom),
    };

    if (_config.xAxis) {
      this._boundary.leftBottom.y -= (_config.xAxis.fontSize + _config.xAxis.marginTop);
    }

    // 计算实际绘图区域的右上角信息
    this._boundary.rightTop = {
      x: _config.width - padding.right,
      y: padding.top,
    };

    this._boundary.rightBottom = {
      x: _config.width - padding.right,
      y: this._boundary.leftBottom.y,
    };

    this._boundary.size = {
      width: this._boundary.rightTop.x - this._boundary.leftTop.x,
      height: this._boundary.leftBottom.y - this._boundary.leftTop.y,
    };

    this._area = {
      ...this._boundary.size,
      left: this._boundary.leftTop.x,
      top: this._boundary.leftTop.y,
      right: this._boundary.rightBottom.x,
      bottom: this._boundary.rightBottom.y,
    };

    this.log('calBoundaryPoint');

    return this._boundary;
  }

  // 计算用于绘制的点的信息

  requestAnimFrame(callback) {
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(callback);
    } else {
      setTimeout(callback, 1000 / 60);
    }
  }

  animationLopp(config, draw) {
    const animationCount = 1 / (config.animationStep || 1);
    const easingFunction = animationOptions[config.animationEasing];

    // 动画完成的百分比
    let percentComplete = (config.animation ?
      0 :
      1);

    const animationFrame = () => {
      let easeAdjustedAnimationPercent = (config.animation ?
        easingFunction(percentComplete) :
        1);

      if (easeAdjustedAnimationPercent > 1) {
        easeAdjustedAnimationPercent = 1;
      }

      draw.call(this, easeAdjustedAnimationPercent);
    };

    const animationLoop = () => {
      percentComplete += animationCount;

      animationFrame();

      if (percentComplete <= 1) {
        this.requestAnimFrame(animationLoop);
      } else {
        config.onAnimationComplete && config.onAnimationComplete();
      }
    };

    this.requestAnimFrame(animationLoop);
  }
}