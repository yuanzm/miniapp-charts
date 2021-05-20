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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RadarChart; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _config_radar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _base_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);





class RadarChart extends _base_index_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor(ctx, cfg = {}) {
        super();

        this._touchTimer = 0;
        this.chartType = 'radar';
        this.ctx = ctx;

        this._config = this.getConfig(cfg, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(_config_radar_js__WEBPACK_IMPORTED_MODULE_1__["default"]));

        this._render.center = this.getCenterPoint();
    }

    /**
     * 雷达图的画图是从中心点开始扩散画的，首先求出中心点
     */
    getCenterPoint() {
        return {
            x: this._config.width / 2,
            y: this._config.height / 2,
        };
    }

    /**
     * 计算辐射状的线条角度数据
     */
    calAngleLineData() {
        let center = this._render.center;
        let radius = this._render.radius;
        let labels = this._render.labels;
        let oneAngel = 360 / labels.length;

        let baseX = center.x;
        let baseY = center.y;

        let style = this._config.radiationLineStyle;
        let startAngle = this._config.startAngle;

        return labels.map((item, index) => {
            let rad = Math.PI * (startAngle + oneAngel * index) / 180;

            let x = baseX + radius * Math.sin(rad);
            let y = baseY - radius * Math.cos(rad);

            return {
                start: center,
                end: { x, y },
                width: style.width,
                color: style.color,
                isDash: !!(style.style === 'dash'),
                dashPattern: style.dashPattern,
                dashOffset: style.dashOffset,

                angel: startAngle + oneAngel * index
            };
        });
    }

    /**
     * 计算网格线数据
     */
    calGridLineData() {
        let grid = this._config.grid;
        let center = this._render.center;

        let steps = parseInt((grid.max - grid.min) / grid.stepSize);

        let lines = [];

        for (let i = 1; i <= steps; i++) {
            let oneline = {
                color: grid.color,
                width: grid.width,
                isDash: !!(grid.style == 'dash'),
                dashPattern: grid.dashPattern,
                dashOffset: grid.dashOffset,
                points: [],
                r: 0,
                marginLineColor: this._config.grid.marginLineColor == 'default' ? this._config.grid.color : this._config.grid.marginLineColor
            }

            this._render.angelLineData.forEach(angel => {
                let x = center.x + (angel.end.x - center.x) * (i / steps);
                let y = center.y - (center.y - angel.end.y) * (i / steps);

                oneline.points.push({ x, y });
            });

            // 形成一个闭环
            oneline.points.push(oneline.points[0]);
            oneline.r = Math.sqrt(this.calEuclideanDistance(this._render.center.x, this._render.center.y,
                oneline.points[0].x,
                oneline.points[0].y,
            ))
            lines.push(oneline);
        }

        this._render.steps = steps;

        return lines;
    }

    calDatasetsData(animationPercent = 1) {
        let datasets = this._datasets;
        let angelLineData = this._render.angelLineData;
        let center = this._render.center;
        let grid = this._config.grid;
        let lines = [];
        let style = this._config.datasetStyle;

        datasets.forEach((oneset) => {
            let points = [];

            let lineStyle = this.getConfig(oneset || {}, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(style));
            oneset.style = lineStyle;

            oneset.data.forEach((point, index) => {
                let angel = angelLineData[index];
                let percent = (point * animationPercent) / (grid.max - grid.min)

                let x = center.x + (angel.end.x - center.x) * percent;
                let y = center.y - (center.y - angel.end.y) * percent;

                points.push({ x, y });
            });

            points.push(points[0]);

            lines.push({
                points,
                style: lineStyle,
                width: lineStyle.borderWidth,
                color: lineStyle.borderColor,
                fill: true,
                fillColor: lineStyle.backgroundColor,
                isDash: !!(lineStyle.borderLineStyle === 'dash'),
                dashPattern: lineStyle.borderDashPattern,
                dashOffset: lineStyle.borderDashOffset,
            });
        });

        return lines;
    }

    // 计算单个label的size
    calOneLabelSize(label, style = {}) {
        this.ctx.setFontSize(style.fontSize);

        let width = this.ctx.measureText(label).width;
        let height = style.fontSize;

        width += (style.margin.left + style.margin.right);
        height += (style.margin.top + style.margin.bottom);

        return { width, height, style };
    }

    calLabelSize() {
        let style = this._config.label;
        let labels = this._render.labels;

        return labels.map((label, index) => {
            let width = 0;
            let height = 0;
            let subSize;

            if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('array', label)) {
                label.forEach((item, lIndex) => {

                    // 本身就是一个完整的label配置
                    if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('object', item)) {
                        // 覆盖默认配置得到新的配置
                        let newItem = this.getConfig(item, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(style));

                        // 直接替换掉原始数据的值，方便后续使用
                        newItem.text = item.text;
                        label[lIndex] = newItem;

                        subSize = this.calOneLabelSize(item.text, newItem);
                    } else if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('string', item)) {
                        subSize = this.calOneLabelSize(item, style);
                    } else
                        subSize = { width: 0, height: 0 };

                    width = Math.max(subSize.width, width);
                    height += subSize.height;
                });
            }

            // 不是数组，但是自带样式等配置
            else if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('object', label)) {
                let newLabel = this.getConfig(label, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(style));

                newLabel.text = label.text || '';
                labels[index] = newLabel;

                subSize = this.calOneLabelSize(label.text || '', newLabel);

                width = subSize.width;
                height = subSize.height;
            } else {
                let size = this.calOneLabelSize(label, style);

                width = size.width;
                height = size.height;
            }

            return { width, height, style }
        });
    }

    /**
     * 先假想一个半径值，雷达区域的边界点
     */
    calRadius() {
        let { left, right, top, bottom } = this.calGridBoundary();

        let min = Math.min(this._config.width, this._config.height) / 2
        let padding = this._config.padding;
        let size = this._render.labelsSizeData;

        let arr = [{
                value: min - size[left].width - padding.left,
                index: left,
            },
            {
                value: min - size[right].width - padding.right,
                index: right,
            },
            {
                value: min - size[top].height - padding.top,
                index: top,
            },
            {
                value: min - size[bottom].height - padding.bottom,
                index: bottom,
            },
        ];

        arr.sort((a, b) => {
            return a.value - b.value;
        });

        let minR = arr[0].value;
        let maxR = arr[arr.length - 1].value

        let minAngel = this._config.startAngle + (360 / this._render.labels.length) * arr[0].index;
        let tmp = Math.cos(Math.PI * (minAngel % 45) / 180);

        return (minR / tmp > maxR ?
            maxR :
            minR / tmp);
    }

    /**
     * 计算雷达图的半径
     * 为了最大化利用绘图面积，需要考虑多种因素来计算
     * 1. 每一个点的label可以设置多行
     * 2. 每一个label都是可以有样式设置的
     * 3. 需要知道多行的label是都在最上面或者最下面
     */
    calGridBoundary() {
        let radiusGuess = 100;
        let center = this._render.center;
        let startAngle = this._config.startAngle;
        let oneAngel = 360 / this._render.labels.length;
        let temp = [];

        let sizeData = this._render.labelsSizeData;

        this._render.labels.forEach((label, index) => {
            let rad = Math.PI * (startAngle + oneAngel * index) / 180;

            let x = center.x + radiusGuess * Math.sin(rad);
            let y = center.y - radiusGuess * Math.cos(rad);

            temp.push({ x, y, index, size: sizeData[index] });
        });

        temp.sort((a, b) => {
            let v1 = parseFloat(parseFloat(a.x).toFixed(2));
            let v2 = parseFloat(parseFloat(b.x).toFixed(2));

            return v1 - v2 || a.size.width - b.size.width;
        });

        let left = temp[0].index;
        let right = temp[temp.length - 1].index;

        temp.sort((a, b) => {
            let v1 = parseFloat(parseFloat(a.y).toFixed(2));
            let v2 = parseFloat(parseFloat(b.y).toFixed(2));

            return v1 - v2 || a.size.height - b.size.height;
        });

        let top = temp[0].index;
        let bottom = temp[temp.length - 1].index;

        return { left, right, top, bottom };
    }

    /**
     * 计算label数据
     */
    calLabelPosData() {
        let angelLineData = this._render.angelLineData;
        let center = this._render.center;
        let labelsSizeData = this._render.labelsSizeData;

        return this._render.labels.map((label, index) => {
            let base = angelLineData[index].end;
            let { width, height } = labelsSizeData[index];
            let baseX = parseInt(base.x);
            let baseY = parseInt(base.y);
            let centerX = parseInt(center.x);
            let centerY = parseInt(center.y);

            let startX, startY;

            if (baseX === centerX)
                startX = baseX - width / 2;

            else if (baseX > centerX)
                startX = baseX;

            else if (baseX < centerX)
                startX = baseX - width;

            if (baseY === centerY)
                startY = baseY + height / 2;

            else if (baseY < centerY)
                startY = baseY - height;

            else
                startY = baseY;

            return { startX, startY };
        });
    }

    calOneLabel(style, label, x, y) {
        return {
            display: style.display,
            fontSize: style.fontSize,
            color: style.color,
            text: label,
            x: x,
            y: y,
            isbottom: true,
        };
    }

    calLabelData() {
        let result = [];
        let style = this._config.label;
        let posData = this._render.labelPosData;

        this._render.labels.forEach((label, index) => {
            let pos = posData[index];
            if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('string', label)) {
                result.push(this.calOneLabel(
                    style,
                    label,
                    pos.startX + style.margin.left,
                    pos.startY + style.fontSize + style.margin.top,
                ));
            } else if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('array', label)) {
                label.forEach((item, index) => {
                    if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('string', item)) {
                        result.push(this.calOneLabel(
                            style,
                            item,
                            pos.startX + style.margin.left,
                            pos.startY + (style.fontSize + style.margin.top) * (index + 1),
                        ));
                    } else if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('object', item)) {
                        result.push(this.calOneLabel(
                            Object.assign(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(style), item),
                            item.text,
                            pos.startX + style.margin.left,
                            pos.startY + (style.fontSize + style.margin.top) * (index + 1),
                        ));
                    }
                });
            } else if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isType"])('object', label)) {
                result.push(this.calOneLabel(
                    Object.assign(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(style), label),
                    label.text,
                    pos.startX + label.margin.left,
                    pos.startY + (label.fontSize + label.margin.top),
                ));
            }
        });

        return result;
    }

    calPointData() {
        let circles = [];
        this._datasets.forEach((dataset, index) => {
            if (!dataset.pointShow)
                return;
            let points = this._render.datasetsData[index].points;
            let style = dataset.style || this._config.datasetStyle;
            for (let i = 0; i < points.length - 1; i++) {
                let point = points[i];
                let focus = !this._render.toolTipData ? false : (this._render.toolTipData.focusIndex == i);
                circles.push({
                    x: point.x,
                    y: point.y,
                    r: focus ? style.focusStyle.pointRadius || 2 : style.pointRadius || 2,
                    fillColor: focus ? style.focusStyle.pointBackgroundColor || '#FFFFFF' : style.pointBackgroundColor || '#FFFFFF',
                    strokeColor: focus ? style.focusStyle.pointBorderColor || style.pointBorderColor : style.pointBorderColor,
                    lineWidth: focus ? style.focusStyle.pointBorderWidth || style.pointBorderWidth : style.pointBorderWidth,
                });
            }
        });

        return circles;
    }

    /**
     *  配置信息框
     */
    calToolTipData(e) {
        let _config = this._config.toolTip;
        let touches = e.touches[0]; // .x .y
        //根据辐射线顶点计算出 焦点 索引
        let angelLineData = this._render.angelLineData;
        let d_min = 99999,
            index_min = -1;
        for (let i = 0; i < angelLineData.length; i++) {
            let d = this.calEuclideanDistance(touches.x, touches.y, angelLineData[i].end.x, angelLineData[i].end.y);
            if (d < d_min) {
                d_min = d;
                index_min = i;
            }
        }
        if (index_min == -1) {
            this._render.toolTipData = null;
            return;
        }
        //定义信息框各项信息
        let info = {
            focusIndex: index_min, //焦点索引
            title: this._render.labels[index_min], //大标题 取决于 Label
            subTitleData: [ //子标题数据
                /*
                    {
                        title : '',
                        pointStyle : {}, //来源与 数据图层 焦点样式
                        dataStr : '', //数据文本
                    }
                */
            ],
            width: 0, //尺寸与定位
            height: 0,
            x: 0,
            y: 0,

        }

        //parser subTitle
        let datasetsData = this._render.datasetsData;
        for (let i in datasetsData) {
            let raw = datasetsData[i];
            let rawData = this._datasets[i];
            let _sub = {
                title: raw.style.label,
                pointStyle: raw.style.focusStyle,
                dataStr: !rawData.dataStr ? rawData.data[index_min] : rawData.dataStr[index_min],
                content: '',
            }
            _sub.content = _sub.title + '：' + _sub.dataStr;
            info.subTitleData.push(_sub);
        }

        //外边框 wrapper
        info.wrapper = {
            fillColor: _config.fillColor,
            x: 0,
            y: 0,
            width: 100,
            height: 40,
            r: 6
        }

        //大标题
        let wordStyle = {
            text: info.title,
            fontSize: _config.fontSize
        };
        let _title0_width = this.measureText(this.ctx, wordStyle);

        //小标题
        let _subtitle_width = [];
        for (let i in info.subTitleData) {
            let r = info.subTitleData[i];
            wordStyle.text = r.content;
            _subtitle_width.push(
                this.measureText(this.ctx, wordStyle) + _config.fontSize * 2
            )
        }

        //选取宽度最大值作为
        let maxwidth = 0;
        for (let i in _subtitle_width) {
            if (_subtitle_width[i] > maxwidth)
                maxwidth = _subtitle_width[i];
        }
        if (_title0_width > maxwidth)
            maxwidth = _title0_width;

        info.wrapper.width = maxwidth + _config.padding.left + _config.padding.right;
        info.wrapper.height = _config.padding.top + _config.padding.bottom;
        let lineHeight = _config.linePadding + _config.fontSize;
        info.wrapper.height += (_subtitle_width.length + 1) * lineHeight;

        //各个文字位置信息
        let _top = _config.padding.top + 5;
        let _top0 = _config.fontSize / 2;
        info.titleStyle = {
            color: _config.color,
            left: _config.padding.left,
            top: _top + _top0,
            size: _config.fontSize,
            text: info.title,
        }
        info.words = [];
        info.icons = [];

        for (let i = info.subTitleData.length - 1; i >= 0; i--) { // *** 请注意这里采用倒序渲染 ***  因为列表第一行是 上层数据涂层
            _top += lineHeight;
            info.words.push({
                color: _config.color,
                left: _config.padding.left + _config.fontSize * 2,
                top: _top + _top0,
                size: _config.fontSize,
                text: info.subTitleData[i].content,
            })
            //数据涂层对应的小圆点颜色 （颜色为焦点状态颜色）
            info.icons.push({
                pointBackgroundColor: this._render.datasetsData[i].style.focusStyle.pointBackgroundColor,
                pointBorderColor: this._render.datasetsData[i].style.focusStyle.pointBackgroundColor,
                pointBorderWidth: this._render.datasetsData[i].style.focusStyle.pointBorderWidth,
                pointRadius: _config.fontSize / 2,
                left: _config.padding.left + _config.fontSize / 2,
                top: _top,
            })
        }

        //自适应位置
        //位置跟随
        info.wrapper.x = touches.x - info.wrapper.width - 30;
        info.wrapper.y = touches.y - info.wrapper.height - 30;

        if (info.wrapper.x < _config.padding.left) {
            info.wrapper.x = _config.padding.left;
        }
        if (info.wrapper.y < _config.padding.top) {
            info.wrapper.y = _config.padding.top;
        }
        if (info.wrapper.x > this._config.width - _config.padding.right) {
            info.wrapper.x = this._config.width - _config.padding.right;
        }
        if (info.wrapper.y > this._config.height - _config.padding.bottom) {
            info.wrapper.y = this._config.height - _config.padding.bottom;
        }
        this._render.toolTipData = info;
    }

    /**
     *  计算欧式距离 由于本算法中只比距离大小 该函数没有开平方
     */
    calEuclideanDistance(x1, y1, x2, y2) {
        return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    }

    /**
     *  绘制信息框
     */
    drawToolTip() {
        let _toolTipData = this._render.toolTipData;
        // console.log(_toolTipData);
        //先绘制背景矩形
        this.drawRect(this.ctx, _toolTipData.wrapper);

        let offsetX = _toolTipData.wrapper.x;
        let offsetY = _toolTipData.wrapper.y;

        //再绘制大标题
        this.drawWord(this.ctx, {
            text: _toolTipData.titleStyle.text,
            isbottom: false,
            baseline: false,
            fontSize: _toolTipData.titleStyle.size,
            color: _toolTipData.titleStyle.color,
            textAlign: 'left',
            x: _toolTipData.titleStyle.left + offsetX,
            y: _toolTipData.titleStyle.top + offsetY,
        });

        //再绘制各个小标题 以及 前面的小圆点
        for (let i in _toolTipData.words) {
            let _r = _toolTipData.words[i];
            let _icon = _toolTipData.icons[i];
            //文字
            this.drawWord(this.ctx, {
                text: _r.text,
                isbottom: false,
                baseline: false,
                fontSize: _r.size,
                color: _r.color,
                textAlign: 'left',
                x: _r.left + offsetX,
                y: _r.top + offsetY,
            });
            //小圆点
            this.drawCircle(this.ctx, {
                strokeColor: '#FFFFFF',
                fillColor: _icon.pointBackgroundColor,
                lineWidth: 2,
                x: _icon.left + offsetX,
                y: _icon.top + offsetY,
                r: _icon.pointRadius
            });
        }

    }

    /**
     * 绘制网格线
     */
    drawGrid(ctx, grid) {
        //判断最外圈要求样式
        if (this._config.grid.marginLineStyle == 'circle') { //默认
            //最外圈圆环
            for (let i = 0; i < grid.length - 1; i++) {
                this.drawLongLine(this.ctx, grid[i]);
            }
            //最外圈
            let _ps = grid[grid.length - 1];
            this.drawCircle(this.ctx, {
                strokeColor: _ps.marginLineColor,
                fillColor: null,
                lineWidth: this._config.grid.width,
                x: this._render.center.x,
                y: this._render.center.y,
                r: _ps.r,

            });
            //最外圈的高亮点
            if (this._config.grid.marginLinePointRadius > 0) //高亮点半径 > 0时
                for (let i in _ps) {
                    let item = _ps[i];
                    this.drawCircle(this.ctx, {
                        strokeColor: this._config.grid.marginLinePointColor,
                        fillColor: this._config.grid.marginLinePointColor,
                        lineWidth: 1,
                        x: item.x,
                        y: item.y,
                        r: this._config.grid.marginLinePointRadius,
                    });
                }

        } else {
            this._render.gridLineData.forEach((line) => {
                this.drawLongLine(this.ctx, line);
            });
        }
    }

    /**
     * 初始化所有数据
     */
    initData(data) {
        this._datasets = data.datasets || [];
        this._render.labels = data.labels || [];

        this._config.startAngle = this._config.startAngle % 360;

        // 数据的计算会有前后依赖关系，不可随意更改函数调用关系
        this._render.labelsSizeData = this.calLabelSize();
        this._render.radius = this.calRadius();
        this._render.angelLineData = this.calAngleLineData();
        this._render.gridLineData = this.calGridLineData();
        this._render.labelPosData = this.calLabelPosData();
        this._render.labelData = this.calLabelData();

        this._render.datasetsData = this.calDatasetsData();
        this._render.pointData = this.calPointData();

        console.log(this._render)
        console.log(this._datasets)
        console.log(this._config)
    }

    drawToCanvas(percent = 1) {
        // 辐射状的线条
        if (this._config.radiationLineStyle.display) {
            this._render.angelLineData.forEach((line) => {
                this.drawLine(this.ctx, line);
            });
        }

        // 网格线
        if (this._config.grid.display) {
            this.drawGrid(this.ctx, this._render.gridLineData);
        }

        // 标签数据
        this._render.labelData.forEach(label => {
            if (label.display)
                this.drawWord(this.ctx, label)
        });

        if (this._config.animation) {
            this._render.datasetsData = this.calDatasetsData(percent);
            this._render.pointData = this.calPointData();
        }

        // 区域数据
        this._render.datasetsData.forEach(line => {
            this.drawLongLine(this.ctx, line);
        });


        this._render.pointData.forEach(point => {
            this.drawCircle(this.ctx, point);
        });

        //信息框
        if (this._render.toolTipData) {
            this.drawToolTip();
        }

        this.ctx.draw();
    }

    draw(data, cfg = {}) {
        this._start = new Date();

        this._config = this.getConfig(cfg, this._config);

        this.initData(data);

        this.animationLopp(
            this._config,
            this.drawToCanvas
        );

        if (this._config.debug) {
            console.log('time cost:', new Date() - this._start, 'ms');
            console.log('render data:', this._render);
            console.log('config:', this._config);
        }
    }

    /**
     *  用户Touch事件 / 焦点产生事件
     *  节流器
     */
    touch(e) {
        if (!this._touchTimer) {
            this._touchTimer = setTimeout(() => {
                this._touchTimer = 0;
            }, 50);
            this.touchHandler(e);
        }
    }

    /**
     *  用户TouchEnd事件 / 娇嗲你移除事件
     */
    touchEnd(e) {
        //取消信息框
        this._render.toolTipData = null;
        //重绘
        this.drawToCanvas();
    }

    touchHandler(e) {
        //计算 ToolTip的相关数据
        this.calToolTipData(e);
        //重绘制现有雷达图内容
        this.drawToCanvas();
    }

}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



let radarConfig = {
    width : 250,
    height: 250,

    animation      : true,
    animationStep  : 0,
    animationEasing: 'linear',

    padding: {
        left  : 5,
        right : 5,
        top   : 5,
        bottom: 5
    },

    // 有些雷达图会有Y轴，一般不展示，这里提供功能
    // TODO
    yAxisLine: {
        display: false,
        color  : '#B8B8B8',
    },

    grid: {
        display    : true,
        min        : 0,
        max        : 100,
        stepSize   : 20,
        width      : 1,
        color      : '#e3e3e3',
        marginLineStyle : 'circle',   //最外边网格样式  default: 默认蜘蛛网  circle: 圆环
        marginLineColor : 'rgb(200,200,200)',    //最外边网格颜色 default: 默认跟随内部颜色  rgb string 自定义颜色
        marginLinePointRadius : 2,         //最外边网格与辐射线焦点高亮点半径
        marginLinePointColor : 'rgb(140,140,140)',         //最外边网格与辐射线焦点高亮点颜色
        style      : 'line',
        // 线条是虚线的默认配置
        dashPattern: [10,10],
        dashOffset : 10,
    },

    // 从原点往外辐射线的样式
    radiationLineStyle: {
        display    : true,
        dashPattern: [10,10],
        width      : 1,
        dashOffset : 10,
        color      : '#e3e3e3',
        style      : 'line',
    },

    label: {
        display   : true,
        color   : '#888888',
        fontSize: 12,
        margin: {
            left  : 3,
            right : 3,
            top   : 3,
            bottom: 3,
        }
    },

    // 单个雷达区域的配置
    datasetStyle: {
        label               : '',
        backgroundColor     : 'rgba(108,132,194,0.5)',
        borderColor         : 'rgb(108,132,194)',
        borderWidth         : 2,
        borderLineStyle     : 'line',  //line || dash
        borderDashPattern   : [10,20], // [ [dashPattern] , dashOffset ]
        borderDashOffset    : 5 ,
        pointShow           : true,
        pointBackgroundColor: 'rgb(108,132,194)',
        pointBorderColor    : 'rgb(108,132,194)',
        pointBorderWidth    : 1,
        pointRadius         : 5,
        focusStyle          :{
                            pointBackgroundColor: 'rgb(108,132,194)',
                            pointBorderColor    : 'rgb(108,132,194)',
                            pointBorderWidth    : 1,
                            pointRadius         : 2,
        }
    },

    // 雷达图的旋转角度
    startAngle: 0,

    //信息框配置
    toolTip: {
        lineColor  : '#C6C6C6',
        lineWidth  : 0.5,
        fontSize   : 11,
        color      : '#FFFFFF',
        fillColor  : 'rgba(136, 136, 136, 0.6)',
        linePadding: 5,

        padding: {
            left  : 5,
            right : 5,
            top   : 5,
            bottom: 5,
        },
    },
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(radarConfig, _common_js__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ })
/******/ ]);
});