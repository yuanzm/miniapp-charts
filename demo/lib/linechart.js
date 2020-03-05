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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LineChart; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _config_linechart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _base_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/**
 * @author: zimyuan
 * @lase-edit-date: 2018-05-18
 */






/**
 * 小程序折线图绘制组件
 */
class LineChart extends _base_index_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
    /**
     * @param { CanvasContext } ctx1: 小程序的绘图上下文
     * @param { CanvasContext } ctx2: 小程序的绘图上下文
     * @param { Object } cfg: 组件配置
     */
    constructor(ctx1, cfg = {}, ctx2) {
        super();

        this.chartType = 'line';

        this.ctx1 = ctx1;

        // 用于绘制tooltip以提高性能，如果没有，则在ctx1上绘制
        this.ctx2 = ctx2 || ctx1;

        /**
         * 约定！所有的内部变量都需要这里先声明
         * 可以大大提高源码阅读性
         */

        // 本实例配置文件
        this._config      = this.getConfig(cfg, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(_config_linechart_js__WEBPACK_IMPORTED_MODULE_1__["default"]));

        // 线条数据
        this._datasets    = [];

        // 用于触摸事件的函数节流
        this._touchTimer  = 0;
    }

    calPointData() {
        let pointData      = [];
        let yAxisWidth     = this._render.yAxisWidth;
        let leftBottom     = this._boundary.leftBottom;
        let startX         = leftBottom.x + yAxisWidth;
        let longestLine    = this._render.longestLine;

        // 为了提高性能，会限制单条线最多圆的数量
        let needCircle     = !!(  this._config.lineStyle.maxCircleCount >= longestLine.points.length )

        // 原点
        let origin     = {
            x: leftBottom.x + yAxisWidth,
            y: leftBottom.y,
        };
        let circlePoints = []

        let second = this._render.second;
        this._alldatasets.forEach((oneline ) => {
            let min       = oneline.axis !== 2 ? this._render.min : second.min;
            let unitY     = oneline.axis !== 2 ? this._render.unitY: second.unitY;
            let yMultiple = oneline.axis !== 2 ? this._render.yMultiple: second.yMultiple;

            let style  = oneline.style;
            let cStyle = style.circle;

            let points   = oneline.points;
            let length   = points.length;
            let _oneline = {
                points     : [],
                style
            };

            points.forEach((item, index) => {
                if ( item.show !== false ) {
                    if ( index < length ) {
                        let temp = {
                            x: startX + index * this._render.unitX,
                            y: leftBottom.y - ( item.y - min) * unitY * yMultiple,
                        };

                        if ( style.circle && style.circle.show && needCircle ) {
                            let circle = {
                                x          : temp.x,
                                y          : temp.y,
                                r          : cStyle.radius      || 2,
                                fillColor  : cStyle.fillColor   || '#FFFFFF',
                                strokeColor: style.lineColor,
                                lineWidth  : style.lineWidth,
                            };

                            circlePoints.push(circle);
                        }

                        _oneline.points.push(temp);
                    }
                }
            });

            if ( points.length > 1 ) {
                // 为了能够实现闭合，增加的辅助点
                _oneline.points.unshift(origin);
                _oneline.points.push({
                    x           : _oneline.points[_oneline.points.length - 1].x,
                    y           : leftBottom.y,
                });

                Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["updateBezierControlPoints"])(_oneline.points, this._area);

                pointData.push(_oneline);
            }
        });

        this._render.circlePoints = circlePoints;
        this._render.pointData    = pointData;
    }

    calXAxisLines() {
        let yAxisWidth  = this._render.yAxisWidth;
        let leftBottom  = this._boundary.leftBottom;
        let rightBottom = this._boundary.rightBottom;
        let xAxisLine   = this._config.xAxisLine;

        // 计算X轴中轴线数据
        this._render.xCenterAxis = {
            start: {
                x: leftBottom.x + yAxisWidth,
                y: leftBottom.y
            },
            end  : {
                x: rightBottom.x,
                y: leftBottom.y
            },
            width: xAxisLine.width,
            color: xAxisLine.color,
        }

        if ( this._render.second ) {
            this._render.xCenterAxis.end.x -= this._render.second.width;
        }
    }

    /**
     * 计算用于X轴绘制需要的数据
     */
    calXAxis() {
        let data        = this._render;

        let length      = this._render.longestLinePointCnt;
        let maxXPoint   = this._config.xAxis.xAxisCount;
        let points      = this._render.longestLine.points;
        let xAxis       = this._config.xAxis;

        let leftBottom  = this._boundary.leftBottom;
        let rightBottom = this._boundary.rightBottom;

        let xAxisData   = [];

        // 计算X轴两个点之间的像素距离
        let realWidth =  rightBottom.x - leftBottom.x - this._render.yAxisWidth;
        if ( this._render.second ) {
            realWidth -= this._render.second.width;
        }

        let pointCount = (  points.length - 1 > 0
                          ? points.length - 1
                          : 1  );
        data.unitX = realWidth  / pointCount;

        let xDivider  = Math.ceil(length / ( maxXPoint ) );

        // 考虑只有一个点的情况
        if ( xDivider === 0 ) {
            xDivider = 1;
        }

        let leftStart = this._render.yAxisWidth + leftBottom.x;
        let bottom    = leftBottom.y + xAxis.marginTop + xAxis.fontSize;

        for ( let i = 0; i < maxXPoint; i++ ) {
            let index = (  i * xDivider >= length
                         ? length - 1
                         : i * xDivider  );

            let word = {
                text    : points[index].x,
                color   : xAxis.color,
                fontSize: xAxis.fontSize,
                x       : leftStart + index * data.unitX,
                y       : bottom
            }

            let width = this.measureText(this.ctx1, word);
            word.x -= width / 2;

            // 防止超边界
            if ( word.x + width > this._config.width )
                word.x = this._config.width - width - 1;

            xAxisData.push(word);
        }

        this._render.xAxisData = xAxisData;
    }

    calYAxisLines() {
        let data       = this._render;
        let yAxisWidth = data.yAxisWidth;
        let leftTop    = this._boundary.leftTop;
        let leftBottom = this._boundary.leftBottom;
        let rightTop   = this._boundary.rightBottom;
        let yAxisLine  = this._config.yAxisLine;

        // 计算Y轴中轴线数据
        this._render.yCenterAxis = {
            start: {
                x: leftTop.x + yAxisWidth,
                y: leftTop.y
            },
            end  : {
                x: leftTop.x + yAxisWidth,
                y: leftBottom.y
            },
            width: yAxisLine.width,
            color: yAxisLine.color,
        }

        this._render.yAxisLines = [];
        let second = this._render.second;
        this._render.yAxisData.forEach((item, index) => {
            if ( index > 0 ) {
                this._render.yAxisLines.push({
                    start: {
                        x: item.x + yAxisWidth,
                        y: item.y
                    },
                    end: {
                        x: rightTop.x - ( second && second.width || 0),
                        y: item.y
                    },
                    width: yAxisLine.width,
                    color: yAxisLine.color,
                });
            }
        });
    }

    calSecondYAxis() {
        let { max, min, yDivider, maxYPoint, longestLine, yMultiple } = this.calYAxisBoundary(this._secondDatasets);

        let second = {};
        this._render.second = second;

        second.min       = min;
        second.max       = max;
        second.yMultiple = yMultiple;

        let yAxis      = this._config.secondYaxis;

        // 用于绘制的数据
        let yAxisData  = [];

        // Y轴文案所占据的宽度
        let yAxisWidth = 0;

        // 计算Y轴上两个点之间的像素值
        let unitY = (  (  this._boundary.leftBottom.y
                        - this._boundary.leftTop.y  )
                     / ( yDivider * yMultiple  * this._config.yAxis.yAxisCount )
                    );

        let changeFunc = this._config.secondChangeUnit || this._config.changeUnit || _util_js__WEBPACK_IMPORTED_MODULE_0__["changeUnit"];
        let toFixed     = (  ( max < 1 || max > 1e7 )
                           ? 2
                           : 1 );

        let bottomStart = this._boundary.leftBottom.y;

        for( let i = 0; i < this._config.yAxis.yAxisCount + 1; i++ ) {
            let word = {
                text     : changeFunc(min + i * yDivider, toFixed) + (yAxis.unit || ''),
                color    : yAxis.color,
                fontSize : yAxis.fontSize,
                y        : bottomStart - ( i * yDivider * unitY * yMultiple ),
                textAlign: yAxis.textAlign,
            };

            yAxisWidth = Math.max(this.measureText(this.ctx1, word), yAxisWidth);

            this.measureText(this.ctx1, word);

            yAxisData.push(word);
        }

        // 考虑Y轴不需要文案的情况
        yAxisWidth = (  yAxis.show
                      ? yAxisWidth
                      : 0  );

        let leftStart = this._boundary.rightTop.x - yAxisWidth;
        if ( yAxis.textAlign === 'right' ) {
            leftStart += yAxisWidth;
        }

        for( let i = 0; i < this._config.yAxis.yAxisCount + 1; i++ ) {
            yAxisData[i].x  = leftStart;
        }

        second.unitY               = unitY;
        second.yAxisWidth          = yAxisWidth;
        second.yAxisData           = yAxisData;
        second.longestLinePointCnt = maxYPoint;
        second.longestLine         = longestLine;
        second.width               = yAxisWidth + yAxis.marginLeft;

        this.log('calSecondYAxis');
    }

    /**
     * 计算Y轴的边界和阶梯值
     */
    calYAxis() {
        let { max, min, yDivider, maxYPoint, longestLine, yMultiple } = this.calYAxisBoundary(this._datasets);

        this._render.min       = min;
        this._render.max       = max;
        this._render.yMultiple = yMultiple;

        let yAxis      = this._config.yAxis;

        // 用于绘制的数据
        let yAxisData  = [];

        // Y轴文案所占据的宽度
        let yAxisWidth = 0;

        // 计算Y轴上两个点之间的像素值
        let unitY = (  (  this._boundary.leftBottom.y
                        - this._boundary.leftTop.y  )
                     / ( yDivider * this._render.yMultiple  * this._config.yAxis.yAxisCount )
                    );

        let leftStart   = this._boundary.leftTop.x + yAxis.marginLeft;
        let bottomStart = this._boundary.leftBottom.y

        let changeFunc  = this._config.changeUnit || _util_js__WEBPACK_IMPORTED_MODULE_0__["changeUnit"];
        let toFixed     = (  ( max < 1 || max > 1e7 )
                           ? 2
                           : 1 );

        for( let i = 0; i < this._config.yAxis.yAxisCount + 1; i++ ) {
            let word = {
                text    : changeFunc(min + i * yDivider, toFixed) + (yAxis.unit || ''),
                color   : yAxis.color,
                fontSize: yAxis.fontSize,
                x       : leftStart,
                y       : bottomStart - ( i * yDivider * unitY * this._render.yMultiple )
            };

            yAxisWidth = Math.max(this.measureText(this.ctx1, word), yAxisWidth);

            yAxisData.push(word);
        }

        // 考虑Y轴不需要文案的情况
        yAxisWidth = ( yAxis.show
                      ? yAxisWidth + yAxis.marginRight
                      : 0  );

        this._render.unitY               = unitY;
        this._render.yAxisWidth          = yAxisWidth;
        this._render.yAxisData           = yAxisData;
        this._render.longestLinePointCnt = maxYPoint;
        this._render.longestLine         = longestLine;

        this.log('calYAxis');
    }

    getMinY(data) {
        return data.reduce(
            (min, p) => (  p.y < min
                         ? p.y
                         : min  ),
            data[0].y
        );
    }

    getMaxY(data) {
        return data.reduce(
            (max, p) => (  p.y > max
                         ? p.y
                         : max  ),
            data[0].y
        );
    }

    /**
     * 计算用于Y轴绘制需要的数据
     * https://codeburst.io/javascript-finding-minimum-and-maximum-values-in-an-array-of-objects-329c5c7e22a2
     */
    calYAxisBoundary(datasets) {
        let maxYPoint   = 0;
        let longestLine = datasets[0];
        let yAxisCount  = this._config.yAxis.yAxisCount;
        let max         = -Infinity;
        let min         = Infinity;

        datasets.forEach((oneline) => {
            let points = oneline.points || [];

            if ( points.length > maxYPoint ) {
                maxYPoint   = points.length;
                longestLine = oneline;
            }

            max = Math.max(this.getMaxY(points), max);
            min = Math.min(this.getMinY(points), min);
        });

        let formatFunc = this._config.formatY !== _util_js__WEBPACK_IMPORTED_MODULE_0__["none"] ? this._config.formatY : _util_js__WEBPACK_IMPORTED_MODULE_0__["getDataRangeAndStep"];
        let range = formatFunc(max, min, yAxisCount);

        return {
            max      : range.max,
            min      : range.min,
            yDivider : range.divider,
            yMultiple: range.multiple || 1,
            maxYPoint,
            longestLine,
        };
    }

    /**
     * 计算tooltip当前点数据和标尺线数据
     */
    calToolTipPointData(e) {
        let touchesx = e.touches[0].x;

        let leftTop    = this._boundary.leftTop;
        let rightTop   = this._boundary.rightTop;
        let leftBottom = this._boundary.leftBottom;

        let longestLine = this._render.longestLine;

        let yAxisWidth = this._render.yAxisWidth;
        let leftDis    = touchesx - ( leftTop.x + yAxisWidth );

        // 边界值场景
        if ( leftDis < 0 ) {
            leftDis = 0;
        }

        else if ( leftDis > rightTop.x ) {
            leftDis = rightTop.x;
        }

        // 取出当前手指对应的点索引
        let pindex = Math.round(leftDis / this._render.unitX );

        if ( pindex > longestLine.points.length - 1 )
            pindex = longestLine.points.length - 1;

        this._render.toolTipData = {
            // 用于突出当前点的圆
            currPoints: [],
            pindex    : pindex,
            leftDis,
        };

        this._alldatasets.forEach(( oneline, index ) => {
            let points = this._render.pointData[index].points;
            let originPoint = oneline.points[pindex];
            // pointData为了将折线图形成封闭，在开始和结束分别增加了一个辅助点
            let curr   = points[pindex + 1];
            let style  = oneline.style;

            // 可能出现有些线比较短的情况
            if ( curr && originPoint && originPoint.show !== false ) {
                let temp = {
                    x          : curr.x,
                    y          : curr.y,
                    st         : 0,
                    ed         : 2 * Math.PI,
                    r          : style.circle.radius,
                    fillColor  : style.lineColor,
                    strokeColor: style.lineColor,
                };

                this._render.toolTipData.currPoints.push(temp);
            }
        });

        let one          = this._render.toolTipData.currPoints[0];
        let toolTipStyle = this._config.toolTip;

        if ( one ) {
            // 标尺
            this._render.toolTipData.currPointsLine = {
                start: {
                    x: one.x,
                    y: leftTop.y,
                },
                end: {
                    x: one.x,
                    y: leftBottom.y
                },
                color: toolTipStyle.lineColor,
                width: toolTipStyle.lineWidth,
            }
            return one;
        } else {
            return false;
        }
    }

    /**
     * 计算tooltip的容器样式数据
     */
    calToolTipWordData() {
        this._render.toolTipData.circles = [];

        let wrapper     = this._render.toolTipData.wrapper;
        let longestLine = this._render.longestLine;
        let style       = this._config.toolTip;
        let baseX       = wrapper.x;
        let baseY       = wrapper.y ;
        let words       = this._render.toolTipData.words;
        let title;

        if ( style.needTitle ) {
            title    = {
                x       : 0,
                y       : baseY + style.fontSize + style.linePadding,
                fontSize: style.fontSize,
                color   : style.color,
                text    : longestLine.points[this._render.toolTipData.pindex].x,
            };

            baseY += style.fontSize + style.linePadding;
        }

        words.forEach((word, index) => {
            word.x = baseX + style.padding.left;

            word.y = (  baseY
                      + style.padding.top
                      // 对于文字而言，是以文字左下角为圆点，所以还需要加上一个行高
                      + style.fontSize
                      + index * (style.fontSize + style.linePadding) );

            let circle = {
                x          : baseX + style.padding.left + style.fontSize / 2,
                y          : word.y - style.fontSize / 2 + 1,
                strokeColor: word.line.style.lineColor,
                fillColor  : word.line.style.lineColor,
                r          : style.fontSize / 2,
            }

            this._render.toolTipData.circles.push(circle);

            word.x += ( style.fontSize + 5);
        });

        if ( title ) {
            title.x = words[0].x;
            words.unshift(title);
        }
    }

    calToolTipWrapperData() {
        let style       = this._config.toolTip;
        let pindex      = this._render.toolTipData.pindex;

        let maxWidth    = 0;

        // tooltip的总宽度
        let width       = (  style.padding.left
                           + style.padding.right
                           // 圆点的直径
                           + style.fontSize
                           // 圆点的右边距
                           + 5  );

        let height     = (  style.padding.top
                          + style.padding.bottom
                          // 第一行用于绘制当前X坐标的坐标值
                          + ( style.needTitle ? style.fontSize + style.linePadding : 0 )
                         );

        this._render.toolTipData.words = [];

        let changeFunc  = this._config.secondChangeUnit || this._config.changeUnit || _util_js__WEBPACK_IMPORTED_MODULE_0__["changeUnit"];
        let toFixed     = (  ( this._render.max < 1 || this._render > 1e7 )
                           ? 2
                           : 1 );

        this._alldatasets.forEach(( oneline ) => {
            let points = oneline.points;
            let curr   = points[pindex];

            let title = (style.needX ? curr && (curr.x + '-') : '');
            title += ( oneline.lineName || '') + ': ';

            if ( curr ) {
                let word = {
                    text    : title + changeFunc(curr.y, toFixed) + (oneline.unit || ''),
                    fontSize: style.fontSize,
                    color   : style.color,
                    x       : 0,
                    y       : 0,
                    // 方便后续引用
                    line    : oneline,
                };

                // 计算当前时刻最长单词的宽度
                maxWidth = Math.max(maxWidth, this.measureText(this.ctx1, word));

                // 加上每行文字的行高和行间距
                height += ( style.fontSize + style.linePadding );

                this._render.toolTipData.words.push(word);
            }
        });

        width += maxWidth;

        let data     = this._render.toolTipData;
        let leftTop  = this._boundary.leftTop;
        let rightTop = this._boundary.rightTop;

        this._render.toolTipData.wrapper = {
            width,
            height,

            x: (  rightTop.x - data.currPointsLine.start.x  > width
                ? data.currPointsLine.start.x + 3
                : data.currPointsLine.start.x - width - 3  ),

            y: leftTop.y + 10,
            fillColor: style.fillColor,
        }
    }

    /**
     * 计算悬浮提示数据
     * 这里的计算其实非常繁琐而不可避免，为了提高阅读性，尽量分成三大步来计算
     * 与initData相同的是，这里的函数调用顺序同样不能随便更改
     */
    calToolTipData(e) {
        let point = this.calToolTipPointData(e);

        if ( point ) {
            this.calToolTipWrapperData(e);
            this.calToolTipWordData(e);
        }
    }

    // 绘制X轴
    drawXAxis() {
        // 绘制Y轴文案
        this._render.xAxisData.forEach((item) => {
            this.drawWord(this.ctx1, item);
        });

        if ( this._config.xAxisLine.centerShow ) {
            this.drawLine(this.ctx1, this._render.xCenterAxis);
        }
    }

    // 绘制Y轴
    drawYAxis() {
        // 绘制Y轴文案
        this._render.yAxisData.forEach((item) => {
            this.drawWord(this.ctx1, item);
        });

        // 根据配置来决定是否绘制Y中心轴
        if ( this._config.yAxis.centerShow ) {
            this.drawLine(this.ctx1, this._render.yCenterAxis);
        }

        if ( this._render.second ) {
            this._render.second.yAxisData.forEach((item) => {
                this.drawWord(this.ctx1, item);
            });
        }
    }

    // 绘制Y轴横线
    drawYAxisLine() {
        if ( this._config.yAxisLine.show ) {
            this._render.yAxisLines.forEach((line) => {
                this.drawLine(this.ctx1, line);
            });
        }
    }

    // 绘制X轴的竖线
    drawXAxisLine() {
    }

    /**
     * 绘制所有的点
     */
    drawPoints() {
        this._render.pointData.forEach((oneline) => {
            if ( oneline.points.length > 1 ) {
                this.drawLongLineWithFill(this.ctx1, oneline.points, oneline.style);
            }
        });

        this._render.circlePoints.forEach((point) => {
            this.drawCircle(this.ctx1, point);
        });
    }

    drawToolTip() {
        let data = this._render.toolTipData;

        data.currPoints.forEach((point) => {
            this.drawCircle(this.ctx2, point);
        });

        this.drawLine(this.ctx2, data.currPointsLine);

        this.drawRect(this.ctx2, data.wrapper);

        data.words.forEach((word) => {
            this.drawWord(this.ctx2, word);
        });

        data.circles.forEach((circle) => {
            this.drawCircle(this.ctx2, circle);
        });
    }



    /**
     * 将处理后的合法数据按照配置绘制到canvas上面
     */
    drawToCanvas() {
        this.drawYAxis();
        this.log('drawYAxis');

        this.drawYAxisLine();
        this.log('drawYAxisLine');

        this.drawXAxis();
        this.log('drawXAxis');

        this.drawPoints();
        this.log('drawPoints');
    }

    initDataSets(data) {
        let datasets = data.datasets || [];

        let _datasets = datasets.filter((item) => item.points && item.points.length);

        _datasets.forEach(( oneline ) => {
            let defaultStyle = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["deepCopy"])(this._config.lineStyle);
            let style        = oneline.style || {};

            if ( !Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(style) )
                throw new Error('[LineChart] TypeMismatch：the style of dataset must be type of Object');

            for ( let key in style ) {
                if ( defaultStyle[key] ) {
                    if ( Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(defaultStyle[key]) )
                        defaultStyle[key] = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["extend"])( defaultStyle[key], style[key]);

                    else
                        defaultStyle[key] = style[key];
                }
            }

            oneline.style = defaultStyle;
        });

        this._alldatasets    = _datasets;
        this._datasets       = _datasets.filter( line => line.axis !== 2);
        this._secondDatasets = _datasets.filter( line => line.axis === 2);
    }

    /**
     * 数据清洗和合法性判断
     * 数据字段比较多，存在后面的函数调用依赖前面的计算结果的情况
     * 因此不能随便调换initData里面的函数顺序
     */
    initData(data) {
        // 原始调用者传入的数据
        this.initDataSets(data);

        // 如果没有有效数据，不执行绘制
        if ( !this._alldatasets.length ) {
            return;
        }

        // 为了绘制精确，首先要计算绘制的边界值，防止样式走位
        this.calBoundaryPoint();

        // 计算Y轴数据
        if ( this._datasets.length ) {
            this.calYAxis();
        }

        // 计算第二Y轴数据
        if ( this._secondDatasets.length ) {
            this.calSecondYAxis();
        }

        // 计算Y轴线条数据
        if ( this._datasets.length ) {
            this.calYAxisLines();
        }

        // 计算X轴数据
        this.calXAxis();

        // 计算X轴线条数据
        this.calXAxisLines();

        // 计算每条线的数据
        this.calPointData();

        this.log('initData');
    }

    clear() {
        this.clearCanvas(this.ctx1, this._config.width, this._config.height);
        this.clearCanvas(this.ctx2, this._config.width, this._config.height);
    }

    /**
     * 实际的绘制函数
     */
    draw(data, cfg = {}) {
        this._start = new Date();

        // this.clear(this.ctx1, this._config.width, this._config.height);
        this.clearCanvas(this.ctx2, this._config.width, this._config.height);

        this.getConfig(cfg, this._config);
        this.initData(data);

        if ( !this._alldatasets.length )
            return;

        this.drawToCanvas();

        this.ctx1.draw();

        this.log('realDraw');

        if ( this._config.debug ) {
            console.log(this, this._performance);
        }
    }

    /**
     * 触摸事件处理，绘制tooltip
     */
    touchHandler(e) {
        // 计算用于绘制tooltip的数据
        this.calToolTipData(e);

        if ( !this._render.toolTipData.currPoints.length ) {
            return;
        }

        /**
         * ctx2本身是为了性能优化存在的，如果没有ctx2，
         * 还是要把所用东西老老实实在ctx1上面绘制一遍
         */
        if ( this.ctx2 === this.ctx1 ) {
            this.drawToCanvas();
        }

        // 将tooltip绘制到对应的canvas
        this.drawToolTip();

        this.ctx2.draw();
    }

    /**
     * 处理触摸事件
     * 因为小程序触发这个事件的频率很高，而且绘制tooltip本身也需要一点时间
     * 这里会简单函数节流，保证触摸平滑
     */
    touch(e) {
        clearTimeout(this._touchTimer);

        /**
         * 小程序的touch频率远远大于5ms/次，这里定5ms是因为在有ctx2的情况下足够完成tooltip绘制
         * 保证触摸的丝滑体验。
         */
        this._touchTimer = setTimeout(() => {
            this.touchHandler(e);
        }, 5);
    }

    /**
     * tooltip在触摸结束之后是否需要保留可以通过是否调用这个函数决定
     */
    touchEnd() {
        /**
         * ctx2本身是为了性能优化存在的，如果没有ctx2，
         * 还是要把所用东西老老实实在ctx1上面绘制一遍
         */
        if ( this.ctx2 === this.ctx1 ) {
            this.drawToCanvas();
        }

        this.ctx2.draw();
    }
}



/***/ }),
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
            0.4
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



let linechartConfig = {
    /**
     * Y轴标签以及toolTip的单位换算函数
     * 组件内置了changeUnit函数，可以自行设置
     */
    changeUnit : _util_js__WEBPACK_IMPORTED_MODULE_1__["changeUnit"],

    secondChangeUnit: _util_js__WEBPACK_IMPORTED_MODULE_1__["changeUnit"],

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
    formatY    : _util_js__WEBPACK_IMPORTED_MODULE_1__["none"],

    // 折线图默认配置
    lineStyle: {
        lineWidth : 1,
        lineColor : '#7587db',
        fillColor : 'rgba(117, 135, 219, 0.3)',
        // 是否需要背景颜色
        needFill  : false,
        curve     : true,
        circle    : {
            show       : true,
            fillColor  : '#FFFFFF',
            strokeColor: '#FFAA00',
            lineWidth  : 1,
            radius     : 1.2,
        }
    },

    /**
     * 在数据点很多的时候，如果每个点都要画个圆圈会大大影响性能
     * 同时圆圈过于多也会影响美观，因此设定阀值，大于此阀值的情况不绘制圆圈
     */
    maxCircleCount: 30,

    // x轴文案的样式配置
    xAxis: {
        show     : true,
        marginTop: 10,
        color    : '#B8B8B8',
        fontSize : 11,
        /**
        * 默认x轴打七个点
        * 可以自行配置，但仍然会有保底逻辑
        */
        xAxisCount   : 7,
    },

    /**
     * X轴轴体的样式配置
     */
    xAxisLine: {
        show      : false,
        centerShow: true,
        width     : 0.6,
        color     : '#C6C6C6',
        style     : 'solid',
    },

    /**
     * y轴的样式配置
     */
    yAxis: {
        show       : true,
        marginLeft : 0,
        marginRight: 10,
        color      : '#B8B8B8',
        fontSize   : 11,
        unit       : '',
        /**
        * 默认Y轴打四个点
        * 也可以自行配置，但仍然会有保底逻辑
        */
        yAxisCount  : 4,
    },

    // 第二Y轴
    secondYaxis: {
        show       : true,
        marginLeft : 5,
        color      : '#B8B8B8',
        fontSize   : 11,
        unit       : '',
        textAlign  : 'right',
    },

    /**
     * Y轴轴体的样式
     */
    secondYAxisLine : {
        show      : true,
        width     : 0.2,
        color     : '#C6C6C6',
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

    toolTip: {
        lineColor  : '#C6C6C6',
        lineWidth  : 0.5,
        fontSize   : 11,
        color      : '#FFFFFF',
        fillColor  : 'rgba(136, 136, 136, 0.6)',
        linePadding: 5,
        needTitle  : false,
        needX      : true,

        padding: {
            left  : 5,
            right : 5,
            top   : 5,
            bottom: 5,
        },
    },

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["extend"])(linechartConfig, _common_js__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),
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

        console.log(this._area)

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
     * 绘制一个矩形
     */
    drawRect(ctx, rect) {
        ctx.beginPath();
        ctx.setStrokeStyle(rect.fillColor);
        ctx.setFillStyle(rect.fillColor);
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        ctx.closePath();
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

            ctx.fill();
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
        ctx.setFillStyle(circle.fillColor);
        ctx.setLineWidth(circle.lineWidth || 1);
        ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);

        ctx.stroke();
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



/***/ })
/******/ ]);
});