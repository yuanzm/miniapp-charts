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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splineCurve", function() { return splineCurve; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_bezierCurveTo", function() { return _bezierCurveTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_isPointInArea", function() { return _isPointInArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateBezierControlPoints", function() { return updateBezierControlPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "none", function() { return none; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isType", function() { return isType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepCopy", function() { return deepCopy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataRangeAndStep", function() { return getDataRangeAndStep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeUnit", function() { return changeUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatX", function() { return formatX; });
/*
 * @author: zimyuan
 */
/*
 * 判断JavaScript对象类型的函数
 * @param {}
 */
function is(obj, type) {
	var toString = Object.prototype.toString, undefined;

	return (type === 'Null' && obj === null) ||
		(type === "Undefined" && obj === undefined) ||
		toString.call(obj).slice(8, -1) === type;
}

/*
 * 深拷贝函数
 * @param {Object} oldObj: 被拷贝的对象
 * @param {Object} newObj: 需要拷贝的对象
 * @ return {Object} newObj: 拷贝之后的对象
 */
function deepCopy(oldObj = {}, newObj={}) {
    for (var key in oldObj) {
        var copy = oldObj[key];
        if (oldObj === copy) continue; //如window.window === window，会陷入死循环，需要处理一下
        if (is(copy, "Object")) {
            newObj[key] = deepCopy(copy, newObj[key] || {});
        } else if (is(copy, "Array")) {
            newObj[key] = []
            newObj[key] = deepCopy(copy, newObj[key] || []);
        } else {
            newObj[key] = copy;
        }
    }
    return newObj;
}

function isType (type, value) {
	let _type = Object.prototype.toString.call(value).match(/\s(\w+)/)[1].toLowerCase();

    return _type === type;
}

function isPlainObject (value) {
	return ( !!value && isType('object', value) );
}

function extend(destination, source) {
	if ( !isPlainObject(destination) || !isPlainObject(source) )
		throw 'destination and source must be type of object';

	for ( let property in source )
		destination[property] = source[property];

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
    if ( number  >= 100 )
        round = String(number).split('')
                              .reduce((sum) => sum * 10, 0.01);

    // 数字介于10-100之间，逢5为整
    else if ( number >= 10 )
        round = 5;

    else if ( number > 1 )
        round = 1;

    else
        round = 0.1;

    return round;
}

function roundForNumber(number, direction) {
    let result;
    let round = getRoundForNumber(number);

    if( number === 0 )
        return 0;

    if ( direction === 'up' )
        result = number + ( round - ( number % round ));

    else if ( direction === 'down' )
        result = number  - number % round;

    return result;
}

/**
 * 给定最大值最小值和区间个数，给出优化后的最大最小值和单step值
 */
function getDataRangeAndStep(max, min, step) {
    if ( max === 0 ) {
        return {
            max     : 4,
            min     : 0,
            divider : 1,
            multiple: 1
        }
    }

    if ( max === min ) {
        return {
            max: max + 2,
            min: ( min - 2 >= 0 ? min - 2 : 0 ),
            divider: 1,
            multiple: 1
        }
    }

    //console.log(1, max, min, step);
    let multiple = 1;

    // 每一步的值小于1的情况，先放大100倍方便计算
    if (  ( max - min ) / step < 1 ) {
        multiple = 10000;
        max *= multiple;
        min *= multiple;
    }

    let originMax = max;
    //console.log(2, max, min, step);

    let divider = Math.round(( max - min ) / step);

    // 如果divider为0，说明值放大后，最大值和最小值差值过小；后续过程没有意义，直接返回
    if (divider === 0) {
        return {
            max     : 4,
            min     : 0,
            divider : 1,
            multiple: 1
        }
    }

    //console.log(3, divider);

    // 先将divider降低一点，后面慢慢增加逼近满意值
    divider = roundForNumber(divider, 'down');
    //console.log(4, divider);

    // 尽量保证整个图是居中而不是贴边的
    max = max + ( max % divider );
    min = min - ( min % divider );

    //console.log(5, max, min);

    // 最小值取整，因为divider也是取整的，所以最后max也是取整的
    min = roundForNumber(min, 'down');

    //console.log(6, min);

    // 逼近求理想值
    let round = getRoundForNumber(divider);

    //console.log(8, round)
    let flag = true;
    while ( flag ) {
        //console.log( min + divider * step , originMax, max, );
        let temp = min + divider * step;
        if ( temp >= max || temp - originMax >= round * 10 )
            flag = false;

        divider += round;
    }

    //console.log(9, max, min, divider);

    return {
        max    :( min + divider * step ) / multiple,
        min    : min / multiple,
        divider: divider / multiple,
        multiple
    };
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function changeUnit(value, fixed = 1) {
    // value是非数字的情况，直接返回value
    if ( !isNumeric(value) )
        return value;

    let number  = parseFloat(value);
    let unit    = '';
    let divider = 1;

    // 小于1000的值，保留小数点
    if ( isFloat(value) && number < 1000 )
        return number.toFixed(fixed);

    if ( number < 1e3 ) {
        unit    = '';
        divider = 1;
    }

    else if (number >= 1e3 &&  number < 1e4) {
        unit    = 'k';
        divider = 1e3;
    }

    else if ( number < 1e7 ) {
        unit    = 'w';
        divider = 1e4;
    }

    else {
        unit    = 'kw';
        divider = 1e7;
    }

    let temp = number / divider;

    // 如果达不到保留小数的基本要求，取整
    if ( temp - Math.floor(temp) < 0.5 * Math.pow(0.1, fixed) )
        fixed = 0;

    return temp.toFixed(fixed) + unit;
}

function none() {
}

function formatX(length, maxXPoint) {
    let step  = Math.ceil(length /  maxXPoint );
    let start = 0;

    // 记录原始的step长度
    let origin = step;

    while ( step * ( maxXPoint - 1 ) >= length ) {
        step--;
    }

    if ( step < origin ) {
        start = Math.floor(( length - step * ( maxXPoint - 1 ) ) / 2);
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

	const d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
	const d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));

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
			y: current.y - fa * (next.y - previous.y)
		},
		next: {
			x: current.x + fb * (next.x - previous.x),
			y: current.y + fb * (next.y - previous.y)
		}
	};
}


/**
 * @private
 */
function _bezierCurveTo(ctx, previous, target, flip) {
	if (!previous) {
		return ctx.lineTo(target.x, target.y);
	}
	ctx.bezierCurveTo(
		flip ? previous.controlPointPreviousX : previous.controlPointNextX,
		flip ? previous.controlPointPreviousY : previous.controlPointNextY,
		flip ? target.controlPointNextX : target.controlPointPreviousX,
		flip ? target.controlPointNextY : target.controlPointPreviousY,
		target.x,
		target.y);
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
function _isPointInArea(point, area) {
	const epsilon = 0.5; // margin - to match rounded decimals

	return point.x > area.left - epsilon && point.x < area.right + epsilon &&
		point.y > area.top - epsilon && point.y < area.bottom + epsilon;
}

function capBezierPoints(points, area) {
	let i, ilen, point;
	for (i = 0, ilen = points.length; i < ilen; ++i) {
		point = points[i];
		if (!_isPointInArea(point, area)) {
			continue;
		}
		if (i > 0 && _isPointInArea(points[i - 1], area)) {
			point.controlPointPreviousX = capControlPoint(point.controlPointPreviousX, area.left, area.right);
			point.controlPointPreviousY = capControlPoint(point.controlPointPreviousY, area.top, area.bottom);
		}
		if (i < points.length - 1 && _isPointInArea(points[i + 1], area)) {
			point.controlPointNextX = capControlPoint(point.controlPointNextX, area.left, area.right);
			point.controlPointNextY = capControlPoint(point.controlPointNextY, area.top, area.bottom);
		}
	}
}

function updateBezierControlPoints(points, area ) {
	let i, ilen, point, controlPoints;
    const loop = false;

    let prev = loop ? points[points.length - 1] : points[0];
    for (i = 0, ilen = points.length; i < ilen; ++i) {
        point = points[i];
        controlPoints = splineCurve(
            prev,
            point,
            points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen],
            /*options.tension*/
            0.1
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
    changeUnit : _util_js__WEBPACK_IMPORTED_MODULE_0__["changeUnit"],

    /**
     * 图表内本身的padding
     */
    padding: {
        left  : 10,
        right : 10,
        top   : 10,
        bottom: 5
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






class Base extends _draw_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();

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
        if ( !Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(cfg) )
            throw new Error('options must be type of Object');

        for ( let key in sourceConfig ) {
            if ( cfg[key] !== undefined ) {
                if ( typeof sourceConfig[key] !== typeof cfg[key] )
                    throw new Error(`TypeMismatch：${key} must be type of ${ typeof sourceConfig[key]}`);

                // 对于对象类型的属性，递归调用来替换
                if ( Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(cfg[key]) )
                    this.getConfig(cfg[key], sourceConfig[key]);

                else
                    sourceConfig[key] = cfg[key];
            }
        }

        return sourceConfig;
    }

    /**
     * 因为可以设置padding样式，所以需要维护真实的边界点
     * 才可以实现精确绘制
     */
    calBoundaryPoint() {
        let _config = this._config;
        let padding = this._config.padding;

        // 实际绘图区域的左上角
        this._boundary.leftTop = {
            x: padding.left,
            y: padding.top
        };

        // 计算实际绘图区域的左下角信息
        this._boundary.leftBottom = {
            x: padding.left,
            y: (   _config.height
                - padding.bottom  )
        };

        if ( _config.xAxis ) {
            this._boundary.leftBottom.y -= ( _config.xAxis.fontSize + _config.xAxis.marginTop  );
        }

        // 计算实际绘图区域的右上角信息
        this._boundary.rightTop =  {
            x: _config.width - padding.right,
            y: padding.top
        };

        this._boundary.rightBottom = {
            x: _config.width - padding.right,
            y: this._boundary.leftBottom.y
        };

        this._boundary.size = {
            width : this._boundary.rightTop.x - this._boundary.leftTop.x,
            height: this._boundary.leftBottom.y - this._boundary.leftTop.y,
        };

        this._area = {
            ...this._boundary.size,
            left: this._boundary.leftTop.x,
            top: this._boundary.leftTop.y,
            right: this._boundary.rightBottom.x,
            bottom: this._boundary.rightBottom.y
        }

        this.log('calBoundaryPoint');

        return this._boundary;
    }

    // 计算用于绘制的点的信息

    requestAnimFrame(callback) {
        if ( typeof requestAnimationFrame !== 'undefined' ) {
            requestAnimationFrame(callback);
        }

        else {
            setTimeout(callback, 1000 / 60);
        }
    }

    animationLopp(config, draw) {
        let animationCount = 1 / ( config.animationStep || 1 );
        let easingFunction = _easing_js__WEBPACK_IMPORTED_MODULE_2__["default"][config.animationEasing];

        // 动画完成的百分比
        let percentComplete = (  config.animation
                               ? 0
                               : 1  );

        let animationFrame = () => {
            let easeAdjustedAnimationPercent = (  config.animation
                                                ? easingFunction(percentComplete)
                                                : 1  );

            if ( easeAdjustedAnimationPercent > 1 ) {
                easeAdjustedAnimationPercent = 1;
            }

            draw.call(this, easeAdjustedAnimationPercent);
        }

        let animationLoop = () => {
            percentComplete += animationCount;

            animationFrame();

            if ( percentComplete <= 1 ) {
                this.requestAnimFrame(animationLoop);
            } else {
                config.onAnimationComplete && config.onAnimationComplete();
            }
        }

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
/**
 * 图表组件基础类，封装一些canvas画图的基本方法
 * 这里可用于兼容H5和小程序
 * 因为小程序和H5的绘图API并不是完全一致的，通过基础类来兼容是最合适的
 */



class ChartBase {
    wordWidth(words, fontSize) {
        if ( words === undefined || words === null )
            return 0;

        let totLength = 0;

        for ( let i = 0; i < words.length; i++ ) {
            let strCode = words.charCodeAt(i);

            if ( strCode > 128 )
                totLength += fontSize;

            else
                totLength += fontSize / 2;
        }

        return totLength;
    }

    measureText(ctx, word) {
        // 低版本兼容处理
        if ( !ctx.measureText ) {
            return this.getWordWidth(word);
        }

        ctx.save();
        if ( typeof(word.text) === 'number' ) {
            word.text = word.text.toString();
        }
        ctx.font = word.fontSize + 'px sans-serif';
        const metrics = ctx.measureText(word.text);

        ctx.restore();

        return metrics.width;
    }

    getWordWidth(word) {
        if ( typeof(word.text) === 'number' ) {
            word.text = word.text.toString();
        }

        let w = this.wordWidth(word.text, word.fontSize);

        return Math.ceil(w);
    }

    /**
     * 根据给定样式绘制文字
     */
    drawWord(ctx, word) {
        if ( typeof(word.text) === 'number' )
            word.text = word.text.toString();

        ctx.beginPath();

        if ( word.isbottom )
            ctx.setTextBaseline('bottom')

        if ( word.baseline ) {
            ctx.setTextBaseline(word.baseline)
        }

        ctx.setFontSize(word.fontSize);
        ctx.setFillStyle(word.color);
        ctx.setTextAlign(word.textAlign || 'left');
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
        if(rect['r'] && rect['r'] > 0){
            ctx.save()
            ctx.beginPath()
        
            // 左上弧线
            ctx.arc(rect.x + rect.r, rect.y + rect.r, rect.r, 1 * Math.PI, 1.5 * Math.PI)
            // 左直线
            ctx.moveTo(rect.x, rect.y + rect.r)
            ctx.lineTo(rect.x, rect.y + rect.height - rect.r)
            // 左下弧线
            ctx.arc(rect.x + rect.r, rect.y + rect.height - rect.r, rect.r, 0.5 * Math.PI, 1 * Math.PI)
            // 下直线
            ctx.lineTo(rect.x + rect.r, rect.y + rect.height)
            ctx.lineTo(rect.x + rect.width - rect.r, rect.y + rect.height)
            // 右下弧线
            ctx.arc(rect.x + rect.width - rect.r, rect.y + rect.height - rect.r, rect.r, 0 * Math.PI, 0.5 * Math.PI)
            // 右直线
            ctx.lineTo(rect.x + rect.width, rect.y + rect.height - rect.r)
            ctx.lineTo(rect.x + rect.width, rect.y + rect.r)
            // 右上弧线
            ctx.arc(rect.x + rect.width - rect.r, rect.y + rect.r, rect.r, 1.5 * Math.PI, 2 * Math.PI)
            // 上直线
            ctx.lineTo(rect.x + rect.width - rect.r, rect.y)
            ctx.lineTo(rect.x + rect.r, rect.y)
        
            ctx.setFillStyle(rect.fillColor)
            ctx.fill()
        }else{
            ctx.beginPath();
            ctx.setStrokeStyle(rect.fillColor);
            ctx.setFillStyle(rect.fillColor);
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
            ctx.closePath();
        }

    }

    /**
     * 根据给定样式绘制线条
     */
    drawLine(ctx, line) {
        ctx.beginPath();
        ctx.setLineWidth(line.width || 1);
        ctx.setStrokeStyle(line.color);

        if ( line.isDash )
            ctx.setLineDash(line.dashPattern, line.dashOffset);

        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);

        ctx.stroke();
        ctx.closePath();

        ctx.setLineDash([0], 0);
    }

    drawLongLine(ctx, line) {
        ctx.beginPath();
        ctx.setLineWidth(line.width || 1);
        ctx.setStrokeStyle(line.color);

        if ( line.isDash )
            ctx.setLineDash(line.dashPattern, line.dashOffset);

        let points = line.points || [];

        for ( let index = 0; index < points.length; index++ ) {
            let point = points[index];
            if ( index === 0 )
                ctx.moveTo(point.x, point.y);

            else
                ctx.lineTo(point.x, point.y);
        }

        // 需要填充背景颜色要在stroke之前填充，否则边界线会发虚
        if ( line.fill ) {
            ctx.setFillStyle(line.fillColor);
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
        needFill : false,
    }) {
        ctx.save();

        ctx.beginPath();
        ctx.setFillStyle(opts.fillColor);
        ctx.setLineWidth(opts.lineWidth);
        ctx.setStrokeStyle(opts.lineColor);

        let start = points[0];
        let end   = points[points.length - 1];

        ctx.moveTo(start.x, start.y);
        let prev;

        for ( let index = 1; index < points.length - 1; index++ ) {
            let point = points[index];
            if ( index === 1 ) {
                ctx.moveTo(point.x, point.y);
            }

            else {
                if (opts.curve ) {
                    Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["_bezierCurveTo"])(ctx, prev, point);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            }

            prev = point;
        }

        ctx.stroke();

        // 闭合区域
        ctx.lineTo(end.x, end.y);
        ctx.lineTo(start.x, start.y);

        if ( opts.needFill !== false ) {
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

        ctx.setStrokeStyle(circle.strokeColor);
        if(circle.fillColor)
            ctx.setFillStyle(circle.fillColor);
        ctx.setLineWidth(circle.lineWidth || 1);
        ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);

        ctx.stroke();
        if(circle.fillColor)
            ctx.fill();
        ctx.closePath();
    }

    clearCanvas(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
        ctx.draw();
    }
}



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//Easing functions adapted from Robert Penner's easing equations
//http://www.robertpenner.com/easing/

/* harmony default export */ __webpack_exports__["default"] = ({
    linear: function (t) {
        return t;
    },
    easeInQuad: function (t) {
        return t * t;
    },
    easeOutQuad: function (t) {
        return -1 * t * (t - 2);
    },
    easeInOutQuad: function (t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
        return -1 / 2 * ((--t) * (t - 2) - 1);
    },
    easeInCubic: function (t) {
        return t * t * t;
    },
    easeOutCubic: function (t) {
        return 1 * ((t = t / 1 - 1) * t * t + 1);
    },
    easeInOutCubic: function (t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
        return 1 / 2 * ((t -= 2) * t * t + 2);
    },
    easeInQuart: function (t) {
        return t * t * t * t;
    },
    easeOutQuart: function (t) {
        return -1 * ((t = t / 1 - 1) * t * t * t - 1);
    },
    easeInOutQuart: function (t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
        return -1 / 2 * ((t -= 2) * t * t * t - 2);
    },
    easeInQuint: function (t) {
        return 1 * (t /= 1) * t * t * t * t;
    },
    easeOutQuint: function (t) {
        return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
    },
    easeInOutQuint: function (t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
        return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
    },
    easeInSine: function (t) {
        return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
    },
    easeOutSine: function (t) {
        return 1 * Math.sin(t / 1 * (Math.PI / 2));
    },
    easeInOutSine: function (t) {
        return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
    },
    easeInExpo: function (t) {
        return (t == 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
    },
    easeOutExpo: function (t) {
        return (t == 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
    },
    easeInOutExpo: function (t) {
        if (t == 0) return 0;
        if (t == 1) return 1;
        if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
        return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
    },
    easeInCirc: function (t) {
        if (t >= 1) return t;
        return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
    },
    easeOutCirc: function (t) {
        return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
    },
    easeInOutCirc: function (t) {
        if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
        return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    easeInElastic: function (t) {
        var s = 1.70158; var p = 0; var a = 1;
        if (t == 0) return 0; if ((t /= 1) == 1) return 1; if (!p) p = 1 * .3;
        if (a < Math.abs(1)) { a = 1; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
    },
    easeOutElastic: function (t) {
        var s = 1.70158; var p = 0; var a = 1;
        if (t == 0) return 0; if ((t /= 1) == 1) return 1; if (!p) p = 1 * .3;
        if (a < Math.abs(1)) { a = 1; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
    },
    easeInOutElastic: function (t) {
        var s = 1.70158; var p = 0; var a = 1;
        if (t == 0) return 0; if ((t /= 1 / 2) == 2) return 1; if (!p) p = 1 * (.3 * 1.5);
        if (a < Math.abs(1)) { a = 1; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(1 / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * .5 + 1;
    },
    easeInBack: function (t) {
        var s = 1.70158;
        return 1 * (t /= 1) * t * ((s + 1) * t - s);
    },
    easeOutBack: function (t) {
        var s = 1.70158;
        return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
    },
    easeInOutBack: function (t) {
        var s = 1.70158;
        if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
        return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
    },
    easeInBounce: function (t) {
        return 1 - animationOptions.easeOutBounce(1 - t);
    },
    easeOutBounce: function (t) {
        if ((t /= 1) < (1 / 2.75)) {
            return 1 * (7.5625 * t * t);
        } else if (t < (2 / 2.75)) {
            return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
        } else if (t < (2.5 / 2.75)) {
            return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
        } else {
            return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
        }
    },
    easeInOutBounce: function (t) {
        if (t < 1 / 2) return animationOptions.easeInBounce(t * 2) * .5;
        return animationOptions.easeOutBounce(t * 2 - 1) * .5 + 1 * .5;
    }
});



/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DistributionChart; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _config_distribution_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _base_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);





/**
 * 小程序折线图绘制组件
 */
class DistributionChart extends _base_index_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
    /**
     * @param { CanvasContext } ctx: 小程序的绘图上下文
     * @param { CanvasContext } ctx2: 小程序的绘图上下文
     * @param { Object } cfg: 组件配置
     */
    constructor(ctx, cfg = {}) {
        super();

        this.chartType = 'distribution';
        this.ctx       = ctx;

        /**
         * 约定！所有的内部变量都需要这里先声明
         * 可以大大提高源码阅读性
         */
        // 本实例配置文件
        this._config      = this.getConfig(cfg, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(_config_distribution_js__WEBPACK_IMPORTED_MODULE_1__["default"]));

        // 线条数据
        this._datasets    = [];

        this.totalHeight  = 0;
    }

    calLabelDataForItem(xStart, y, barLabel) {
        let labelArr = ( Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('array', barLabel) ? barLabel : [barLabel]);
        let width    = 0;
        let arr      = [];

        labelArr.forEach( item => {
            let labelConfig = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(this._config.barLabelStyle);
            let obj = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('object', item) ? item : { name: item, style: labelConfig };
            obj.style = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(labelConfig, obj.style || {});

            width  += obj.style.paddingLeft;
            xStart += obj.style.paddingLeft;

            let word = {
                text     : obj.name || '',
                color    : obj.style.color,
                fontSize : obj.style.fontSize,
                x        : xStart,
                y        : y,
                textAlign: 'left',
                baseline : 'middle',
            }
            arr.push(word);
            let w = this.getWordWidth(word);
            xStart += w;
            width  += w;
        });

        return { arr, width };
    }

    calBarData() {
        const config = this._config;
        const render = this._render;
        const barStyle = config.barStyle;

        let yStart = config.padding.top + config.barStyle.topBottomPadding;
        let xStart = config.padding.left + render.yAxisWidth;

        let first  = this._datasets[0];
        let second = this._datasets[1];

        const maxItem   = this.getMaxItem();
        const { width } = this.calLabelDataForItem(0, 0, maxItem.barLabel);

        const maxBarWidth = config.width - config.padding.right - xStart - width;

        const barData      = [];
        let barLabelData   = [];

        first.points.forEach((point, index) => {
            point.fillColor = first.fillColor || barStyle.fillColor;
            const barArr = [point];
            if ( second ) {
                let cBar = second.points[index];
                cBar.fillColor = second.fillColor || barStyle.fillColor;
                barArr.push(cBar);
            }

            barArr.forEach( (bar, barIndex)  => {
                const rect = {
                    fillColor: bar.fillColor,
                    x        : xStart,
                    y        : yStart,
                    width    : maxItem.value ? (bar.value / maxItem.value) * maxBarWidth : 0,
                    height   : barStyle.height,
                }

                // TODO: fix 0.5
                if ( bar.barLabel ) {
                    let { arr } = this.calLabelDataForItem(xStart + rect.width, yStart + barStyle.height / 2 - 0.5, bar.barLabel);
                    barLabelData = barLabelData.concat(arr);
                }

                yStart += barStyle.height;

                if ( second && barIndex === 0 ) {
                    yStart += config.barStyle.compareBarMargin;
                } else {
                    yStart += barStyle.padding;
                }

                barData.push(rect);
            });

            let centerY = (  barArr.length > 1
                           ? yStart - barStyle.padding - barStyle.height - config.barStyle.compareBarMargin / 2
                           : yStart - barStyle.padding - barStyle.height / 2  );

            this._render.yAxisData[index].y = centerY;
        });

        this._render.barData      = barData;
        this._render.barLabelData = barLabelData;
        this._render.totalHeight  = yStart - barStyle.padding + config.padding.bottom + config.barStyle.topBottomPadding;
        this.totalHeight          = this._render.totalHeight;
    }

    calYAxisLines() {
        const config  = this._config;
        const padding = config.padding;
        const render  = this._render;
        const yAxisLine = config.yAxisLine;

        // 计算Y轴中轴线数据
        this._render.yCenterAxis = {
            start: {
                x: padding.left + render.yAxisWidth,
                y: padding.top,
            },
            end  : {
                x: padding.left + render.yAxisWidth,
                y: render.totalHeight - padding.bottom,
            },
            width: yAxisLine.width,
            color: yAxisLine.color,
        }
    }

    getMaxItem() {
        let maxItem;
        this._datasets.forEach(dataset => {
            dataset.points.forEach(item => {
                if ( !maxItem ) {
                    maxItem = item;
                } else {
                    if ( item.value > maxItem.value ) {
                        maxItem = item;
                    }
                }
            });
        });

        return maxItem;
    }

    /**
     * 计算Y轴的边界和阶梯值
     */
    calYAxis() {
        let yAxis      = this._config.yAxis;
        // 用于绘制的数据
        let yAxisData  = [];
        // Y轴文案所占据的宽度
        let yAxisWidth = 0;
        let leftStart   = this._boundary.leftTop.x + yAxis.marginLeft;

        this._datasets[0].points.forEach( item => {
            let word = {
                text    : item.label || '',
                color   : yAxis.color,
                fontSize: yAxis.fontSize,
                x       : leftStart,
                y       : 0,
                baseline: 'middle',
            };

            yAxisWidth = Math.max(this.getWordWidth(word), yAxisWidth);

            yAxisData.push(word);
        });

        // 考虑Y轴不需要文案的情况
        yAxisWidth = ( yAxis.show
                      ? yAxisWidth + yAxis.marginRight
                      : 0  );

        this._render.yAxisData  = yAxisData;
        this._render.yAxisWidth = yAxisWidth;
    }

    // 绘制Y轴
    drawYAxis() {
        // 绘制Y轴文案
        if ( this._config.yAxis.show ) {
            this._render.yAxisData.forEach((item) => {
                this.drawWord(this.ctx, item);
            });
        }
    }

    // 绘制Y轴横线
    drawYAxisLine() {
        this.drawLine(this.ctx,this._render.yCenterAxis);
    }

    drawBars() {
        this._render.barData.forEach(bar => {
            this.drawRect(this.ctx, bar);
        });
        this._render.barLabelData.forEach(label => {
            this.drawWord(this.ctx, label);
        });
    }

    /**
     * 将处理后的合法数据按照配置绘制到canvas上面
     */
    drawToCanvas() {
        this.drawYAxis();
        this.drawYAxisLine();
        this.drawBars();
    }

    /**
     * 数据清洗和合法性判断
     * 数据字段比较多，存在后面的函数调用依赖前面的计算结果的情况
     * 因此不能随便调换initData里面的函数顺序
     */
    initData(data, cfg = {}) {
        this.getConfig(cfg, this._config);
        this._datasets = (data.datasets || []).filter( dataset => !!dataset.points && dataset.points.length);

        if ( !this._datasets.length ) {
            return;
        }

        // 为了绘制精确，首先要计算绘制的边界值，防止样式走位
        this.calBoundaryPoint();

        // 计算Y轴数据
        this.calYAxis();
        this.calBarData();
        // 计算Y轴线条数据
        this.calYAxisLines();
    }

    /**
     * 实际的绘制函数
     */
    draw() {
        if ( !this._datasets.length ) {
            return;
        }

        this.drawToCanvas();
        this.ctx.draw();
    }
}



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



let distributionConfig = {
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
        height   : 10,
        padding  : 12,
        topBottomPadding: 5,
        compareBarMargin: 3,
    },

    barLabelStyle: {
        color        : '#B8B8B8',
        fontSize     : 11,
        paddingLeft  : 5,
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(distributionConfig, _common_js__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ })
/******/ ]);
});