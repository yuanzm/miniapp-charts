(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splineCurve", function() { return splineCurve; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bezierCurveTo", function() { return bezierCurveTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPointInArea", function() { return isPointInArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateBezierControlPoints", function() { return updateBezierControlPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "none", function() { return none; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isType", function() { return isType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepCopy", function() { return deepCopy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataRangeAndStep", function() { return getDataRangeAndStep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeUnit", function() { return changeUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatX", function() { return formatX; });
/* eslint no-param-reassign: ["error", { "props": false }]*/

/*
 * @author: zimyuan
 */
/*
 * 判断JavaScript对象类型的函数
 * @param {}
 */
function is(obj, type) {
  const { toString } = Object.prototype; let undefined;

  return (type === 'Null' && obj === null)
    || (type === 'Undefined' && obj === undefined)
    || toString.call(obj).slice(8, -1) === type;
}

/*
 * 深拷贝函数
 * @param {Object} oldObj: 被拷贝的对象
 * @param {Object} newObj: 需要拷贝的对象
 * @ return {Object} newObj: 拷贝之后的对象
 */
function deepCopy(oldObj = {}, newObj = {}) {
  /* eslint-disable */
  for (const key in oldObj) {
    const copy = oldObj[key];
    if (oldObj === copy) continue; // 如window.window === window，会陷入死循环，需要处理一下
    if (is(copy, 'Object')) {
      newObj[key] = deepCopy(copy, newObj[key] || {});
    } else if (is(copy, 'Array')) {
      newObj[key] = [];
      newObj[key] = deepCopy(copy, newObj[key] || []);
    } else {
      newObj[key] = copy;
    }
  }
  /* eslint-disable */
  return newObj;
}

function isType(type, value) {
  return Object.prototype.toString.call(value).match(/\s(\w+)/)[1].toLowerCase() === type;
}

function isPlainObject(value) {
  return (!!value && isType('object', value));
}

function extend(destination, source) {
  if (!isPlainObject(destination) || !isPlainObject(source)) throw 'destination and source must be type of object';

  for (const property in source) destination[property] = source[property];

  return destination;
}

/**
 * 数字取整逻辑
 * 在计算坐标轴的最大最小值和区间的时候，预期的效果是最大最小值都是“整数”
 * 这里根据数字的大小定义取整逻辑
 */
function getRoundForNumber(number) {
  let round;

  // 计算出当前数组位数减一的最小数字
  if (number  >= 100) round = String(number).split('')
    .reduce(sum => sum * 10, 0.01);

  // 数字介于10-100之间，逢5为整
  else if (number >= 10) round = 5;

  else if (number > 1) round = 1;

  else round = 0.1;

  return round;
}

function roundForNumber(number, direction) {
  let result;
  const round = getRoundForNumber(number);

  if (number === 0) return 0;

  if (direction === 'up') result = number + (round - (number % round));

  else if (direction === 'down') result = number - (number % round);

  return result;
}

/**
 * 给定最大值最小值和区间个数，给出优化后的最大最小值和单step值
 */
function getDataRangeAndStep(maxSource, minSource, step) {
  let max = maxSource;
  let min = minSource;

  if (max === 0) {
    return {
      max: 4,
      min: 0,
      divider: 1,
      multiple: 1,
    };
  }

  if (max === min) {
    return {
      max: max + 2,
      min: (min - 2 >= 0 ? min - 2 : 0),
      divider: 1,
      multiple: 1,
    };
  }

  // console.log(1, max, min, step);
  let multiple = 1;

  // 每一步的值小于1的情况，先放大100倍方便计算
  if ((max - min) / step < 1) {
    multiple = 10000;
    max *= multiple;
    min *= multiple;
  }

  const originMax = max;
  // console.log(2, max, min, step);

  let divider = Math.round((max - min) / step);

  // 如果divider为0，说明值放大后，最大值和最小值差值过小；后续过程没有意义，直接返回
  if (divider === 0) {
    return {
      max: 4,
      min: 0,
      divider: 1,
      multiple: 1,
    };
  }

  // console.log(3, divider);

  // 先将divider降低一点，后面慢慢增加逼近满意值
  divider = roundForNumber(divider, 'down');
  // console.log(4, divider);

  // 尽量保证整个图是居中而不是贴边的
  max = max + (max % divider);
  min = min - (min % divider);

  // console.log(5, max, min);

  // 最小值取整，因为divider也是取整的，所以最后max也是取整的
  min = roundForNumber(min, 'down');

  // console.log(6, min);

  // 逼近求理想值
  const round = getRoundForNumber(divider);

  // console.log(8, round)
  let flag = true;
  while (flag) {
    // console.log( min + divider * step , originMax, max, );
    const temp = min + divider * step;
    if (temp >= max || temp - originMax >= round * 10) flag = false;

    divider += round;
  }

  // console.log(9, max, min, divider);

  return {
    max: (min + divider * step) / multiple,
    min: min / multiple,
    divider: divider / multiple,
    multiple,
  };
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function changeUnit(value, fixedParam = 1) {
  let fixed = fixedParam;
  // value是非数字的情况，直接返回value
  if (!isNumeric(value)) return value;

  const number  = parseFloat(value);
  let unit    = '';
  let divider = 1;

  // 小于1000的值，保留小数点
  if (isFloat(value) && number < 1000) return number.toFixed(fixed);

  if (number < 1e3) {
    unit    = '';
    divider = 1;
  } else if (number >= 1e3 &&  number < 1e4) {
    unit    = 'k';
    divider = 1e3;
  } else if (number < 1e7) {
    unit    = 'w';
    divider = 1e4;
  } else {
    unit    = 'kw';
    divider = 1e7;
  }

  const temp = number / divider;

  // 如果达不到保留小数的基本要求，取整
  if (temp - Math.floor(temp) < 0.5 * (0.1 ** fixed)) {
    fixed = 0;
  }

  return temp.toFixed(fixed) + unit;
}

function none() {
}

function formatX(length, maxXPoint) {
  let step  = Math.ceil(length /  maxXPoint);
  let start = 0;

  // 记录原始的step长度
  const origin = step;

  while (step * (maxXPoint - 1) >= length) {
    step -= 1;
  }

  if (step < origin) {
    start = Math.floor((length - step * (maxXPoint - 1)) / 2);
  }


  return { step, start: start > 1 ? start - 1 : start };
}

function splineCurve(firstPoint, middlePoint, afterPoint, t) {
  // Props to Rob Spencer at scaled innovation for his post on splining between points
  // http://scaledinnovation.com/analytics/splines/aboutSplines.html

  // This function must also respect "skipped" points

  const previous = firstPoint.skip ? middlePoint : firstPoint;
  const current = middlePoint;
  const next = afterPoint.skip ? middlePoint : afterPoint;

  const d01 = Math.sqrt((current.x - previous.x) ** 2 + (current.y - previous.y) ** 2);
  const d12 = Math.sqrt((next.x - current.x) ** 2 + (next.y - current.y) ** 2);

  let s01 = d01 / (d01 + d12);
  let s12 = d12 / (d01 + d12);

  // If all points are the same, s01 & s02 will be inf
  s01 = isNaN(s01) ? 0 : s01;
  s12 = isNaN(s12) ? 0 : s12;

  const fa = t * s01; // scaling factor for triangle Ta
  const fb = t * s12;

  return {
    previous: {
      x: current.x - fa * (next.x - previous.x),
      y: current.y - fa * (next.y - previous.y),
    },
    next: {
      x: current.x + fb * (next.x - previous.x),
      y: current.y + fb * (next.y - previous.y),
    },
  };
}


/**
 * @private
 */
function bezierCurveTo(ctx, previous, target, flip) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  ctx.bezierCurveTo(
    flip ? previous.controlPointPreviousX : previous.controlPointNextX,
    flip ? previous.controlPointPreviousY : previous.controlPointNextY,
    flip ? target.controlPointNextX : target.controlPointPreviousX,
    flip ? target.controlPointNextY : target.controlPointPreviousY,
    target.x,
    target.y,
  );
}


function capControlPoint(pt, min, max) {
  return Math.max(Math.min(pt, max), min);
}

/**
 * Returns true if the point is inside the rectangle
 * @param {object} point - The point to test
 * @param {object} area - The rectangle
 * @returns {boolean}
 * @private
 */
function isPointInArea(point, area) {
  const epsilon = 0.5; // margin - to match rounded decimals

  return point.x > area.left - epsilon && point.x < area.right + epsilon
    && point.y > area.top - epsilon && point.y < area.bottom + epsilon;
}

function capBezierPoints(points, area) {
  let i; let ilen; let point;
  for (i = 0, ilen = points.length; i < ilen; ++i) {
    point = points[i];
    if (!isPointInArea(point, area)) {
      continue;
    }
    if (i > 0 && isPointInArea(points[i - 1], area)) {
      point.controlPointPreviousX = capControlPoint(point.controlPointPreviousX, area.left, area.right);
      point.controlPointPreviousY = capControlPoint(point.controlPointPreviousY, area.top, area.bottom);
    }
    if (i < points.length - 1 && isPointInArea(points[i + 1], area)) {
      point.controlPointNextX = capControlPoint(point.controlPointNextX, area.left, area.right);
      point.controlPointNextY = capControlPoint(point.controlPointNextY, area.top, area.bottom);
    }
  }
}

function updateBezierControlPoints(points, area) {
  let i; let ilen; let point; let controlPoints;
  const loop = false;

  let prev = loop ? points[points.length - 1] : points[0];
  for (i = 0, ilen = points.length; i < ilen; ++i) {
    point = points[i];
    controlPoints = splineCurve(
      prev,
      point,
      points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen],
      /* options.tension*/
      0.1,
    );
    point.controlPointPreviousX = controlPoints.previous.x;
    point.controlPointPreviousY = controlPoints.previous.y;
    point.controlPointNextX = controlPoints.next.x;
    point.controlPointNextY = controlPoints.next.y;
    prev = point;
  }

  capBezierPoints(points, area);
}





/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

/**
 * 所有组件通用配置
 */
/* harmony default export */ __webpack_exports__["default"] = ({
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
  changeUnit: _util_js__WEBPACK_IMPORTED_MODULE_0__["changeUnit"],

  /**
   * 图表内本身的padding
   */
  padding: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 5,
  },
});



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _draw_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _easing_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);

// 太老的库，很多变量是下滑线开头的，暂时屏蔽先
/* eslint no-underscore-dangle: "off"*/
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-restricted-syntax: "off"*/






const dpr = wx.getSystemInfoSync().pixelRatio;

class Base extends _draw_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(cfg)) throw new Error('options must be type of Object');

    for (const key in sourceConfig) {
      if (cfg[key] !== undefined) {
        if (typeof sourceConfig[key] !== typeof cfg[key]) throw new Error(`TypeMismatch：${key} must be type of ${typeof sourceConfig[key]}`);

        // 对于对象类型的属性，递归调用来替换
        if (Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(cfg[key])) this.getConfig(cfg[key], sourceConfig[key]);

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
      y: (_config.height
        - padding.bottom),
    };

    if (_config.xAxis) {
      this._boundary.leftBottom.y -= (_config.xAxis.fontSize + _config.xAxis.marginTop);
    }

    // 计算实际绘图区域的右上角信息
    this._boundary.rightTop =  {
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
    const easingFunction = _easing_js__WEBPACK_IMPORTED_MODULE_2__["default"][config.animationEasing];

    // 动画完成的百分比
    let percentComplete = (config.animation
      ? 0
      : 1);

    const animationFrame = () => {
      let easeAdjustedAnimationPercent = (config.animation
        ? easingFunction(percentComplete)
        : 1);

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



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChartBase; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* eslint no-param-reassign: ["error", { "props": false }] */

/**
 * 图表组件基础类，封装一些canvas画图的基本方法
 * 这里可用于兼容H5和小程序
 * 因为小程序和H5的绘图API并不是完全一致的，通过基础类来兼容是最合适的
 */



class ChartBase {
  wordWidth(words, fontSize) {
    if (words === undefined || words === null) return 0;

    let totLength = 0;

    for (let i = 0; i < words.length; i++) {
      const strCode = words.charCodeAt(i);

      if (strCode > 128) totLength += fontSize;

      else totLength += fontSize / 2;
    }

    return totLength;
  }

  measureText(ctx, word) {
    // 低版本兼容处理
    if (!ctx.measureText) {
      return this.getWordWidth(word);
    }

    ctx.save();
    if (typeof(word.text) === 'number') {
      word.text = word.text.toString();
    }
    ctx.font = `${word.fontSize}px sans-serif`;
    const metrics = ctx.measureText(word.text);

    ctx.restore();

    return metrics.width;
  }

  getWordWidth(word) {
    if (typeof(word.text) === 'number') {
      word.text = word.text.toString();
    }

    const w = this.wordWidth(word.text, word.fontSize);

    return Math.ceil(w);
  }

  /**
   * 根据给定样式绘制文字
   */
  drawWord(ctx, word) {
    if (typeof(word.text) === 'number') word.text = word.text.toString();

    ctx.beginPath();

    if (word.isbottom) {
      // ctx.setTextBaseline('bottom');
      ctx.textBaseline = 'bottom';
    }

    if (word.baseline) {
      // ctx.setTextBaseline(word.baseline);
      ctx.textBaseline = word.baseline;
    }

    // ctx.setFontSize(word.fontSize);
    ctx.font = `${word.fontSize}px sans-serif`;
    // ctx.setFillStyle(word.color);
    ctx.fillStyle = word.color;
    // ctx.setTextAlign(word.textAlign || 'left');
    ctx.textAlign = word.textAlign || 'left';
    ctx.fillText(word.text, word.x, word.y);

    ctx.stroke();
    ctx.closePath();
  }

  /**
   * 绘制一个矩形 支持圆角矩形
   * rect = {
   *      fillColor
   *      x
   *      y
   *      widht
   *      height
   *      r
   * }
   */
  drawRect(ctx, rect) {
    if (rect.r && rect.r > 0) {
      ctx.save();
      ctx.beginPath();

      // 左上弧线
      ctx.arc(rect.x + rect.r, rect.y + rect.r, rect.r, 1 * Math.PI, 1.5 * Math.PI);
      // 左直线
      ctx.moveTo(rect.x, rect.y + rect.r);
      ctx.lineTo(rect.x, rect.y + rect.height - rect.r);
      // 左下弧线
      ctx.arc(rect.x + rect.r, rect.y + rect.height - rect.r, rect.r, 0.5 * Math.PI, 1 * Math.PI);
      // 下直线
      ctx.lineTo(rect.x + rect.r, rect.y + rect.height);
      ctx.lineTo(rect.x + rect.width - rect.r, rect.y + rect.height);
      // 右下弧线
      ctx.arc(rect.x + rect.width - rect.r, rect.y + rect.height - rect.r, rect.r, 0 * Math.PI, 0.5 * Math.PI);
      // 右直线
      ctx.lineTo(rect.x + rect.width, rect.y + rect.height - rect.r);
      ctx.lineTo(rect.x + rect.width, rect.y + rect.r);
      // 右上弧线
      ctx.arc(rect.x + rect.width - rect.r, rect.y + rect.r, rect.r, 1.5 * Math.PI, 2 * Math.PI);
      // 上直线
      ctx.lineTo(rect.x + rect.width - rect.r, rect.y);
      ctx.lineTo(rect.x + rect.r, rect.y);

      // ctx.setFillStyle(rect.fillColor);
      ctx.fillStyle = rect.fillColor;
      ctx.fill();
    } else {
      ctx.beginPath();
      // ctx.setStrokeStyle(rect.fillColor);
      ctx.strokeStyle = rect.fillColor;
      // ctx.setFillStyle(rect.fillColor);
      ctx.fillStyle = rect.fillColor;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      ctx.closePath();
    }
  }

  /**
   * 根据给定样式绘制线条
   */
  drawLine(ctx, line) {
    ctx.beginPath();
    // ctx.setLineWidth(line.width || 1);
    ctx.lineWidth = line.width || 1;
    ctx.strokeStyle = line.color;

    if (line.isDash) ctx.setLineDash(line.dashPattern, line.dashOffset);

    ctx.moveTo(line.start.x, line.start.y);
    ctx.lineTo(line.end.x, line.end.y);

    ctx.stroke();
    ctx.closePath();

    ctx.setLineDash([0], 0);
  }

  drawLongLine(ctx, line) {
    ctx.beginPath();
    // ctx.setLineWidth(line.width || 1);
    // ctx.setStrokeStyle(line.color);
    ctx.lineWidth = line.width || 1;
    ctx.strokeStyle = line.color;

    if (line.isDash) ctx.setLineDash(line.dashPattern, line.dashOffset);

    const points = line.points || [];

    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      if (index === 0) ctx.moveTo(point.x, point.y);

      else ctx.lineTo(point.x, point.y);
    }

    // 需要填充背景颜色要在stroke之前填充，否则边界线会发虚
    if (line.fill) {
      // ctx.setFillStyle(line.fillColor);
      ctx.fillStyle = line.fillColor;
      ctx.fill();
    }

    ctx.stroke();
    ctx.closePath();

    ctx.setLineDash([0], 0);
  }

  /**
   * 绘制一条由线段连接在一起的长线
   * 绘制多个线条时，效率更高的做法是，创建一个包含所有线条的路径，
   * 然后通过单个绘制调用进行绘制。也就是说，无需分别绘制各个线条。
   * 当这条线由很多线段组成的时候，可以非常显著提升性能!
   */
  drawLongLineWithFill(ctx, points, opts = {
    lineWidth: 1,
    lineColor: '#7587db',
    fillColor: 'rgba(117, 135, 219, 0.3)',
    needFill: false,
  }) {
    ctx.save();

    ctx.beginPath();
    // ctx.setFillStyle(opts.fillColor);
    ctx.fillStyle = opts.fillColor;
    // ctx.setLineWidth(opts.lineWidth);
    ctx.lineWidth = opts.lineWidth;
    // ctx.setStrokeStyle(opts.lineColor);
    ctx.strokeStyle = opts.lineColor;

    const start = points[0];
    const end   = points[points.length - 1];

    ctx.moveTo(start.x, start.y);
    let prev;

    for (let index = 1; index < points.length - 1; index++) {
      const point = points[index];
      // if ( index === 1 ) {
      //   ctx.moveTo(point.x, point.y);
      // } else {
      if (points[index - 1].show === false) {
        ctx.moveTo(point.x, point.y);
      } else {
        if (point.show !== false) {
          if (opts.curve) {
            Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["bezierCurveTo"])(ctx, prev, point);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }
      }
      // }

      prev = point;
    }

    ctx.stroke();

    // 闭合区域
    ctx.lineTo(end.x, end.y);
    ctx.lineTo(start.x, start.y);

    if (opts.needFill !== false) {
      ctx.fill();
    }

    ctx.closePath();

    ctx.restore();
  }

  /**
   * 根据给定样式绘制一个圆
   */
  drawCircle(ctx, circle) {
    ctx.beginPath();

    // ctx.setStrokeStyle(circle.strokeColor);
    ctx.strokeStyle = circle.strokeColor;
    if (circle.fillColor) {
      // ctx.setFillStyle(circle.fillColor);
      ctx.fillStyle = circle.fillColor;
    }
    // ctx.setLineWidth(circle.lineWidth || 1);
    ctx.lineWidth = circle.lineWidth || 1;
    ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);

    ctx.stroke();
    if (circle.fillColor) ctx.fill();
    ctx.closePath();
  }

  clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    // ctx.draw();
  }
}



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Easing functions adapted from Robert Penner's easing equations
// http://www.robertpenner.com/easing/
/* eslint-disable */ 

/* harmony default export */ __webpack_exports__["default"] = ({
  linear(t) {
    return t;
  },
  easeInQuad(t) {
    return t * t;
  },
  easeOutQuad(t) {
    return -1 * t * (t - 2);
  },
  easeInOutQuad(t) {
    if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
    return -1 / 2 * ((--t) * (t - 2) - 1);
  },
  easeInCubic(t) {
    return t * t * t;
  },
  easeOutCubic(t) {
    return 1 * ((t = t / 1 - 1) * t * t + 1);
  },
  easeInOutCubic(t) {
    if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
    return 1 / 2 * ((t -= 2) * t * t + 2);
  },
  easeInQuart(t) {
    return t * t * t * t;
  },
  easeOutQuart(t) {
    return -1 * ((t = t / 1 - 1) * t * t * t - 1);
  },
  easeInOutQuart(t) {
    if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
    return -1 / 2 * ((t -= 2) * t * t * t - 2);
  },
  easeInQuint(t) {
    return 1 * (t /= 1) * t * t * t * t;
  },
  easeOutQuint(t) {
    return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
  },
  easeInOutQuint(t) {
    if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
    return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
  },
  easeInSine(t) {
    return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
  },
  easeOutSine(t) {
    return 1 * Math.sin(t / 1 * (Math.PI / 2));
  },
  easeInOutSine(t) {
    return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
  },
  easeInExpo(t) {
    return (t == 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
  },
  easeOutExpo(t) {
    return (t == 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
  },
  easeInOutExpo(t) {
    if (t == 0) return 0;
    if (t == 1) return 1;
    if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
    return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
  },
  easeInCirc(t) {
    if (t >= 1) return t;
    return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
  },
  easeOutCirc(t) {
    return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
  },
  easeInOutCirc(t) {
    if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
    return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
  },
  easeInElastic(t) {
    let s = 1.70158; let p = 0; let a = 1;
    if (t == 0) return 0; if ((t /= 1) == 1) return 1; if (!p) p = 1 * .3;
    if (a < Math.abs(1)) {
      a = 1; s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(1 / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
  },
  easeOutElastic(t) {
    let s = 1.70158; let p = 0; let a = 1;
    if (t == 0) return 0; if ((t /= 1) == 1) return 1; if (!p) p = 1 * .3;
    if (a < Math.abs(1)) {
      a = 1; s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(1 / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
  },
  easeInOutElastic(t) {
    let s = 1.70158; let p = 0; let a = 1;
    if (t == 0) return 0; if ((t /= 1 / 2) == 2) return 1; if (!p) p = 1 * (.3 * 1.5);
    if (a < Math.abs(1)) {
      a = 1; s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(1 / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * .5 + 1;
  },
  easeInBack(t) {
    const s = 1.70158;
    return 1 * (t /= 1) * t * ((s + 1) * t - s);
  },
  easeOutBack(t) {
    const s = 1.70158;
    return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
  },
  easeInOutBack(t) {
    let s = 1.70158;
    if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
    return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
  },
  easeInBounce(t) {
    return 1 - animationOptions.easeOutBounce(1 - t);
  },
  easeOutBounce(t) {
    if ((t /= 1) < (1 / 2.75)) {
      return 1 * (7.5625 * t * t);
    } if (t < (2 / 2.75)) {
      return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
    } if (t < (2.5 / 2.75)) {
      return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
    }
    return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
  },
  easeInOutBounce(t) {
    if (t < 1 / 2) return animationOptions.easeInBounce(t * 2) * .5;
    return animationOptions.easeOutBounce(t * 2 - 1) * .5 + 1 * .5;
  },
});



/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BarChart; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _config_barchart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _base_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
// 太老的库，很多变量是下滑线开头的，暂时屏蔽先
/* eslint no-underscore-dangle: "off"*/
/* eslint no-param-reassign: ["error", { "props": false }] */






/**
 * 小程序折线图绘制组件
 */
class BarChart extends _base_index_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
     * @param { canvasNode } canvasNode: canvas节点句柄
     * @param { Object } cfg: 组件配置
     */
  constructor(canvasNode, cfg = {}) {
    super();

    this.chartType = 'bar';
    this._canvas = canvasNode.node;
    this._canvasNode = canvasNode;
    
    //清晰度调整
    this._canvas.width = canvasNode.width * this._dpr;
    this._canvas.height = canvasNode.height * this._dpr;
    this.ctx = this._canvas.getContext('2d');
    this.ctx.scale(this._dpr,this._dpr);

    /**
         * 约定！所有的内部变量都需要这里先声明
         * 可以大大提高源码阅读性
         */
    // 本实例配置文件
    this._config      = this.getConfig(cfg, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(_config_barchart_js__WEBPACK_IMPORTED_MODULE_1__["default"]));

    // 线条数据
    this._datasets    = [];
  }

  calLabelDataForItem(x, yStartParam, barLabel) {
    let yStart = yStartParam;
    const labelArr = (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('array', barLabel) ? barLabel : [barLabel]);
    let height   = 0;
    const arr      = [];

    labelArr.forEach((item) => {
      const labelConfig = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(this._config.barLabelStyle);
      const obj = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('object', item) ? item : { name: item, style: labelConfig };
      obj.style = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(labelConfig, obj.style || {});

      yStart -= obj.style.paddingBottom;
      height += obj.style.paddingBottom;

      arr.push({
        text: obj.name || '',
        color: obj.style.color,
        fontSize: obj.style.fontSize,
        x,
        y: yStart,
        textAlign: 'center',
      });
      yStart -= obj.style.fontSize;
      height += obj.style.fontSize;
    });

    return { arr, height };
  }

  calBarData() {
    const config = this._config;
    const render = this._render;

    const { barWidth } = config.barStyle;

    const { xCenterAxis } = render;
    const first         = this._datasets[0];
    const second        = this._datasets[1];
    const count         = first.points.length;
    const { leftBottom } = this._boundary;
    let totalBarWidth   = this._datasets.length * count * barWidth;

    if (second) {
      totalBarWidth += this._config.barStyle.compareBarMargin * count;
    }

    // 每组柱子的间距
    const padding = this._config.barStyle.leftRightPadding * 2;
    const barPadding    = (xCenterAxis.end.x - xCenterAxis.start.x - totalBarWidth - padding) / (count - 1);

    // 柱子的X轴开始位置
    let xStart = xCenterAxis.start.x + this._config.barStyle.leftRightPadding;

    render.bars         = [];
    render.barLabels    = [];
    render.topbarLabels = [];

    const { xAxis } = config;
    const bottom   = leftBottom.y + xAxis.marginTop + xAxis.fontSize;
    const { barStyle } = config;

    first.points.forEach((point, index) => {
      point.fillColor = first.fillColor || barStyle.fillColor;
      const barArr = [point];
      if (second) {
        const cBar = second.points[index];
        cBar.fillColor = second.fillColor || barStyle.fillColor;
        barArr.push(cBar);
      }

      let centerX = xStart + barWidth / 2;
      barArr.forEach((bar, barIndex) => {
        const height = (bar.value - render.min) * render.unitY * render.yMultiple;
        const y = leftBottom.y - height;
        const rect = {
          fillColor: bar.fillColor,
          x: xStart,
          y,
          width: barWidth,
          height,
        };
        render.bars.push(rect);
        if (bar.barLabel) {
          const { arr } = this.calLabelDataForItem(xStart + barWidth / 2 + 1, y, bar.barLabel);

          render.topbarLabels = this._render.topbarLabels.concat(arr);
        }

        xStart += barWidth;

        if (second && barIndex === 0) {
          xStart += config.barStyle.compareBarMargin;
          centerX += (barWidth / 2 + config.barStyle.compareBarMargin / 2) + 0.5;
        } else {
          xStart += barPadding;
        }
      });

      // X轴的标签
      this._render.barLabels.push({
        text: point.label || '',
        color: xAxis.color,
        fontSize: xAxis.fontSize,
        x: centerX,
        y: bottom,
        textAlign: 'center',
      });
    });
  }

  calXAxisLines() {
    const { yAxisWidth } = this._render;
    const { leftBottom } = this._boundary;
    const { rightBottom } = this._boundary;
    const { xAxisLine } = this._config;

    // 计算X轴中轴线数据
    this._render.xCenterAxis = {
      start: {
        x: leftBottom.x + yAxisWidth,
        y: leftBottom.y,
      },
      end: {
        x: rightBottom.x,
        y: leftBottom.y,
      },
      width: xAxisLine.width,
      color: xAxisLine.color,
    };
  }

  calYAxisLines() {
    const data       = this._render;
    const { yAxisWidth } = data;
    const { leftTop } = this._boundary;
    const { leftBottom } = this._boundary;
    const rightTop   = this._boundary.rightBottom;
    const { yAxisLine } = this._config;

    // 计算Y轴中轴线数据
    this._render.yCenterAxis = {
      start: {
        x: leftTop.x + yAxisWidth,
        y: leftTop.y,
      },
      end: {
        x: leftTop.x + yAxisWidth,
        y: leftBottom.y,
      },
      width: yAxisLine.width,
      color: yAxisLine.color,
    };

    this._render.yAxisLines = [];
    this._render.yAxisData.forEach((item, index) => {
      if (index > 0) {
        this._render.yAxisLines.push({
          start: {
            x: item.x + yAxisWidth,
            y: item.y,
          },
          end: {
            x: rightTop.x,
            y: item.y,
          },
          width: yAxisLine.width,
          color: yAxisLine.color,
        });
      }
    });
  }

  /**
     * 计算Y轴的边界和阶梯值
     */
  calYAxis() {
    const { max, min, yDivider, maxYPoint, longestLine } = this.calYAxisBoundary();

    let maxItem;
    this._datasets.forEach((dataset) => {
      dataset.points.forEach((item) => {
        if (!maxItem) {
          maxItem = item;
        } else {
          if (item.value > maxItem.value) {
            maxItem = item;
          }
        }
      });
    });

    const { height } = this.calLabelDataForItem(0, 0, maxItem.barLabel || []);

    const { yAxis } = this._config;

    // 用于绘制的数据
    const yAxisData  = [];

    // Y轴文案所占据的宽度
    let yAxisWidth = 0;

    const cHeight = this._boundary.leftBottom.y - this._boundary.leftTop.y;
    // 计算Y轴上两个点之间的像素值
    let unitY =  cHeight / (yDivider * this._render.yMultiple  * this._config.yAxis.yAxisCount);

    /**
         * 计算最长的条加上label之后的高度,如果超过绘图边界，将unitY更改成刚好使得最长的条填充满绘图区
         * 这里仍然存在一种可能，很短的条有很多label导致超过绘图边界，不予考虑
         */
    const maxH = (maxItem.value - min) * unitY * this._render.yMultiple;
    if (maxH + height > cHeight) {
      unitY = (cHeight - height) / (maxItem.value - min) / this._render.yMultiple;
    }

    const leftStart   = this._boundary.leftTop.x + yAxis.marginLeft;
    const bottomStart = this._boundary.leftBottom.y;

    const changeFunc  = (this._config.changeUnit && this._config.changeUnit !== _util_js__WEBPACK_IMPORTED_MODULE_0__["none"]
      ? this._config.changeUnit
      : _util_js__WEBPACK_IMPORTED_MODULE_0__["changeUnit"]);
    const toFixed     = ((max < 1 || max > 1e7)
      ? 2
      : 1);

    for (let i = 0; i < this._config.yAxis.yAxisCount + 1; i++) {
      const word = {
        text: changeFunc(min + i * yDivider, toFixed) + this._config.yAxis.unit,
        color: yAxis.color,
        fontSize: yAxis.fontSize,
        x: leftStart,
        y: bottomStart - (i * yDivider * unitY * this._render.yMultiple),
      };

      yAxisWidth = Math.max(this.getWordWidth(word), yAxisWidth);

      yAxisData.push(word);
    }

    // 考虑Y轴不需要文案的情况
    yAxisWidth = (yAxis.show
      ? yAxisWidth + yAxis.marginRight
      : 0);

    this._render.unitY               = unitY;
    this._render.yAxisWidth          = yAxisWidth;
    this._render.yAxisData           = yAxisData;
    this._render.longestLinePointCnt = maxYPoint;
    this._render.longestLine         = longestLine;

    this.log('calYAxis');
  }

  getMinY(data) {
    return data.reduce(
      (min, p) => (p.value < min
        ? p.value
        : min),
      data[0].value,
    );
  }

  getMaxY(data) {
    return data.reduce(
      (max, p) => (p.value > max
        ? p.value
        : max),
      data[0].value,
    );
  }

  /**
     * 计算用于Y轴绘制需要的数据
     * https://codeburst.io/javascript-finding-minimum-and-maximum-values-in-an-array-of-objects-329c5c7e22a2
     */
  calYAxisBoundary() {
    const datasets    = this._datasets;
    let maxYPoint   = 0;
    let longestLine = datasets[0];
    const { yAxisCount } = this._config.yAxis;
    let max         = -Infinity;
    let min         = Infinity;

    datasets.forEach((oneline) => {
      const points = oneline.points || [];

      if (points.length > maxYPoint) {
        maxYPoint   = points.length;
        longestLine = oneline;
      }

      max = Math.max(this.getMaxY(points), max);
      min = Math.min(this.getMinY(points), min);
    });

    const formatFunc = this._config.formatY || _util_js__WEBPACK_IMPORTED_MODULE_0__["getDataRangeAndStep"];
    const range = formatFunc(max, min, yAxisCount);

    this._render.min       = range.min;
    this._render.max       = range.max;
    this._render.yMultiple = range.multiple || 1;

    return {
      max: range.max,
      min: range.min,
      yDivider: range.divider,
      maxYPoint,
      longestLine,
    };
  }

  // 绘制X轴
  drawXAxis() {
    if (this._config.xAxisLine.centerShow) {
      this.drawLine(this.ctx, this._render.xCenterAxis);
    }
  }

  // 绘制Y轴
  drawYAxis() {
    // 绘制Y轴文案
    if (this._config.yAxis.show) {
      this._render.yAxisData.forEach((item) => {
        this.drawWord(this.ctx, item);
      });
    }

    // 根据配置来决定是否绘制Y中心轴
    if (this._config.yAxis.centerShow) {
      this.drawLine(this.ctx, this._render.yCenterAxis);
    }
  }

  // 绘制Y轴横线
  drawYAxisLine() {
    if (this._config.yAxisLine.show) {
      this._render.yAxisLines.forEach((line) => {
        this.drawLine(this.ctx, line);
      });
    }
  }

  /**
     * 绘制所有的点
     */
  drawPoints() {
    this._render.pointData.forEach((oneline) => {
      if (oneline.points.length > 1) this.drawLongLineWithFill(this.ctx, oneline.points, oneline.style);
    });

    this._render.circlePoints.forEach((point) => {
      this.drawCircle(this.ctx, point);
    });
  }

  drawBars() {
    this._render.bars.forEach((bar) => {
      this.drawRect(this.ctx, bar);
    });
    this._render.barLabels.forEach((label) => {
      this.drawWord(this.ctx, label);
    });
    this._render.topbarLabels.forEach((label) => {
      this.drawWord(this.ctx, label);
    });
  }

  /**
     * 将处理后的合法数据按照配置绘制到canvas上面
     */
  drawToCanvas() {
    //清空画布
    this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height );
    this.drawYAxis();
    this.log('drawYAxis');

    this.drawYAxisLine();
    this.log('drawYAxisLine');

    this.drawXAxis();
    this.log('drawXAxis');

    this.drawBars();
    this.log('drawPoints');
  }

  /**
     * 数据清洗和合法性判断
     * 数据字段比较多，存在后面的函数调用依赖前面的计算结果的情况
     * 因此不能随便调换initData里面的函数顺序
     */
  initData(data) {
    this._datasets = (data.datasets || []).filter(dataset => !!dataset.points && dataset.points.length);

    if (!this._datasets.length) {
      return;
    }

    // 为了绘制精确，首先要计算绘制的边界值，防止样式走位
    this.calBoundaryPoint();

    // 计算Y轴数据
    this.calYAxis();

    // 计算Y轴线条数据
    this.calYAxisLines();

    // 计算X轴线条数据
    this.calXAxisLines();

    this.calBarData();

    this.log('initData');
  }

  
  /**
   *  绘制无数据文案
   * */
  drawEmptyData(){
      const config = this._config.emptyData;
      this.drawWord(this.ctx, {
        text:config.content,
        fontSize: config.fontSize,
        textAlign: 'center',
        color: config.color,
        x:this._canvasNode.width/2,
        y:this._canvasNode.height/2,
      });
  }

  /**
     * 实际的绘制函数
     */
  draw(data, cfg = {}) {
    this._start = new Date();

    this.getConfig(cfg, this._config);

    this.initData(data);

    if (!this._datasets.length) {
      this.drawEmptyData();
      return;
    }

    this.drawToCanvas();

    // this.ctx.draw();

    this.log('realDraw');

    if (this._config.debug) {
      console.log(this._performance);
    }
  }
}



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



const barchartConfig = {
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
  formatY: null,

  // x轴文案的样式配置
  xAxis: {
    show: true,
    marginTop: 10,
    color: '#B8B8B8',
    fontSize: 11,
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
    compareBarMargin: 5,
    barWidth: 30,
    leftRightPadding: 10,
  },

  barLabelStyle: {
    color: '#B8B8B8',
    fontSize: 11,
    paddingBottom: 5,
  },

  /**
   *  无数据时的文案配置
   * */
  emptyData: {
    content: '暂无数据',
    color: 'rgb(200,200,200)',
    fontSize: 16,
  },
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(barchartConfig, _common_js__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ })
/******/ ]);
});