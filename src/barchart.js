/**
 * @author: zimyuan
 */

import {
    isType,
    extend,
    deepCopy,
    changeUnit,
    isPlainObject,
    getDataRangeAndStep,
    none
} from './util.js';

import config from './config/barchart.js';
import Base   from './base/index.js';

/**
 * 小程序折线图绘制组件
 */
export default class BarChart extends Base {
    /**
     * @param { CanvasContext } ctx1: 小程序的绘图上下文
     * @param { CanvasContext } ctx2: 小程序的绘图上下文
     * @param { Object } cfg: 组件配置
     */
    constructor(ctx1, cfg = {}) {
        super();

        this.chartType = 'bar';
        this.ctx1      = ctx1;

        /**
         * 约定！所有的内部变量都需要这里先声明
         * 可以大大提高源码阅读性
         */
        // 用于性能数据打点
        this._start       = 0;

        // 为了方便调试，在调试模式下会打出性能信息
        this._performance = {};

        // 本实例配置文件
        this._config      = this.getConfig(cfg);

        // 实际绘图区域边界点信息
        this._boundary    = {};

        // 线条数据
        this._datasets    = [];

        // 寄存最终用于渲染的数据
        this._render      = {};
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
        if ( !isPlainObject(cfg) )
            throw new Error('options must be type of Object');

        // 所有的实例先深拷贝一份默认配置文件，避免不同实例之间的配置相互影响
        let copyConfig = sourceConfig || deepCopy(config);

        for ( let key in copyConfig ) {
            if ( cfg[key] !== undefined ) {
                if ( typeof copyConfig[key] !== typeof cfg[key] )
                    throw new Error(`[BarChart] TypeMismatch：${key} must be type of ${ typeof copyConfig[key]}`);

                // Object类型的extend而不是直接覆盖
                if ( isPlainObject(cfg[key]) )
                    copyConfig[key] = extend(copyConfig[key], cfg[key]);

                else
                    copyConfig[key] = cfg[key];
            }
        }

        return copyConfig;
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
                - padding.bottom
                - _config.xAxis.fontSize
                - _config.xAxis.marginTop  )
        };

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

        this.log('calBoundaryPoint');

        return this._boundary;
    }

    calBarData() {
        const xCenterAxis   = this._render.xCenterAxis;
        const first         = this._datasets[0];
        const second        = this._datasets[1];
        const count         = first.points.length;
        let totalBarWidth = this._datasets.length * count * this._config.barWidth

        if ( second ) {
            totalBarWidth += this._config.compareBarMargin * count;
        }

        // 每组柱子的间距
        const barPadding    = ( xCenterAxis.end.x - xCenterAxis.start.x - totalBarWidth ) / (count + 1);

        let leftBottom     = this._boundary.leftBottom;
        console.log(xCenterAxis, totalBarWidth, barPadding);
        /*y: leftBottom.y - ( item.y - this._render.min) * this._render.unitY * this._render.yMultiple,*/

        // 柱子的X轴开始位置
        let xStart = xCenterAxis.start.x + barPadding;

        this._render.bars      = [];
        this._render.barLabels = [];

        const barWidth = this._config.barWidth;
        const xAxis    = this._config.xAxis;
        const bottom   = leftBottom.y + xAxis.marginTop + xAxis.fontSize;

        first.points.forEach((bar, index) => {
            const height = ( bar.value - this._render.min) * this._render.unitY * this._render.yMultiple;
            const y = leftBottom.y - height;
            let centerX = xStart + barWidth / 2;

            const rect = {
                fillColor: first.fillColor || this._config.barStyle.fillColor,
                x        : xStart,
                y        : y,
                width    : this._config.barWidth,
                height   : height,
            }
            this._render.bars.push(rect);

            xStart += this._config.barWidth;

            if ( second ) {
                xStart += this._config.compareBarMargin;
                let cBar = second.points[index];
                const cHeight = ( cBar.value - this._render.min) * this._render.unitY * this._render.yMultiple;
                const cy = leftBottom.y - cHeight;

                const rect = {
                    fillColor: second.fillColor || this._config.barStyle.fillColor,
                    x        : xStart,
                    y        : cy,
                    width    : this._config.barWidth,
                    height   : cHeight,
                }

                this._render.bars.push(rect);
                xStart += ( this._config.barWidth + barPadding );

                centerX += barWidth / 2 + this._config.compareBarMargin / 2;
            }

            this._render.barLabels.push({
                text    : bar.label || '',
                color   : xAxis.color,
                fontSize: xAxis.fontSize,
                x       : centerX,
                y       : bottom,
                textAlign: 'center',
            });
        });
    }

    // 计算用于绘制的点的信息
    calPointData() {
        let pointData      = [];
        let yAxisWidth     = this._render.yAxisWidth;
        let leftBottom     = this._boundary.leftBottom;
        let startX         = leftBottom.x + yAxisWidth;
        let longestLine    = this._render.longestLine;

        // 为了提高性能，会限制单条线最多圆的数量
        let needCircle     = (  this._config.maxCircleCount >= longestLine.points.length
                              ? true
                              : false  );
        // 原点
        let origin     = {
            x: leftBottom.x + yAxisWidth,
            y: leftBottom.y,
        };
        let circlePoints = []

        this._datasets.forEach((oneline ) => {
            let style  = oneline.style;
            let cStyle = style.circle;

            let points   = oneline.points;
            let length   = points.length;
            let _oneline = {
                points     : [],
                style
            };

            points.forEach((item, index) => {
                if ( index < length ) {
                    let temp = {
                        x: startX + index * this._render.unitX,
                        y: leftBottom.y - ( item.y - this._render.min) * this._render.unitY * this._render.yMultiple,
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
            });

            if ( points.length > 1 ) {
                // 为了能够实现闭合，增加的辅助点
                _oneline.points.unshift(origin);
                _oneline.points.push({
                    x           : _oneline.points[_oneline.points.length - 1].x,
                    y           : leftBottom.y,
                });

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
    }

    /**
     * 计算用于X轴绘制需要的数据
     */
    calXAxis() {
        let datasets    = this._datasets;
        let data        = this._render;

        let length      = this._render.longestLinePointCnt;
        let maxXPoint   = this._config.xAxisCount;
        let points      = this._render.longestLine.points;
        let xAxis       = this._config.xAxis;

        let leftBottom  = this._boundary.leftBottom;
        let rightBottom = this._boundary.rightBottom;

        let xAxisData   = [];

        // 计算X轴两个点之间的像素距离
        let realWidth =  rightBottom.x - leftBottom.x - this._render.yAxisWidth;
        let pointCount = (  points.length - 1 > 0
                          ? points.length - 1
                          : 1  );
        data.unitX = realWidth  / pointCount;

        let xDivider  = parseInt(length / ( maxXPoint) );
        if ( xDivider === 0 ) {
            xDivider = 1;
        }

        let leftStart = this._render.yAxisWidth + leftBottom.x;
        let bottom    = leftBottom.y + xAxis.marginTop + xAxis.fontSize;

        for ( let i = 0; i < length; i += xDivider ) {
            let word = {
                text    : points[i].x,
                color   : xAxis.color,
                fontSize: xAxis.fontSize,
                x       : leftStart + i * data.unitX,
                y       : bottom
            }

            let width = this.getWordWidth(word);
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
        this._render.yAxisData.forEach((item, index) => {
            if ( index > 0 ) {
                this._render.yAxisLines.push({
                    start: {
                        x: item.x + yAxisWidth,
                        y: item.y
                    },
                    end: {
                        x: rightTop.x,
                        y: item.y
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
        let { max, min, yDivider, maxYPoint, longestLine } = this.calYAxisBoundary();

        let yAxis      = this._config.yAxis;
        let yAxisLine  = this._config.yAxisLine;

        // 用于绘制的数据
        let yAxisData  = [];

        // Y轴文案所占据的宽度
        let yAxisWidth = 0;

        // 计算Y轴上两个点之间的像素值
        let unitY = (  (  this._boundary.leftBottom.y
                        - this._boundary.leftTop.y  )
                     / ( yDivider * this._render.yMultiple  * this._config.yAxisCount )
                    );

        let leftStart   = this._boundary.leftTop.x + yAxis.marginLeft;
        let bottomStart = this._boundary.leftBottom.y

        //let changeFunc  = this._config.changeUnit || changeUnit;
        let changeFunc  = (  this._config.changeUnit && this._config.changeUnit !== none
                           ? this._config.changeUnit
                           : changeUnit  );
        let toFixed     = (  ( max < 1 || max > 1e7 )
                           ? 2
                           : 1 );

        for( let i = 0; i < this._config.yAxisCount + 1; i++ ) {
            let word = {
                text    : changeFunc(min + i * yDivider, toFixed) + this._config.unit,
                color   : yAxis.color,
                fontSize: yAxis.fontSize,
                x       : leftStart,
                y       : bottomStart - ( i * yDivider * unitY * this._render.yMultiple )
            };

            yAxisWidth = Math.max(this.getWordWidth(word), yAxisWidth);

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
            (min, p) => (  p.value < min
                         ? p.value
                         : min  ),
            data[0].value
        );
    }

    getMaxY(data) {
        return data.reduce(
            (max, p) => (  p.value > max
                         ? p.value
                         : max  ),
            data[0].value
        );
    }

    /**
     * 计算用于Y轴绘制需要的数据
     * https://codeburst.io/javascript-finding-minimum-and-maximum-values-in-an-array-of-objects-329c5c7e22a2
     */
    calYAxisBoundary() {
        let datasets    = this._datasets;
        let maxYPoint   = 0;
        let longestLine = datasets[0];
        let yAxisCount  = this._config.yAxisCount;
        let max         = -Infinity;
        let min         = Infinity;

        let start = new Date();
        datasets.forEach((oneline) => {
            let points = oneline.points || [];

            if ( points.length > maxYPoint ) {
                maxYPoint   = points.length;
                longestLine = oneline;
            }

            max = Math.max(this.getMaxY(points), max);
            min = Math.min(this.getMinY(points), min);
        });

        let formatFunc = this._config.formatY || getDataRangeAndStep;
        let range = formatFunc(max, min, yAxisCount);

        this._render.min       = range.min;
        this._render.max       = range.max;
        this._render.yMultiple = range.multiple || 1;

        return {
            max     : range.max,
            min     : range.min,
            yDivider: range.divider,
            maxYPoint,
            longestLine
        };
    }

    // 绘制X轴
    drawXAxis() {
        // 绘制X轴文案
        /*this._render.xAxisData.forEach((item) => {
            this.drawWord(this.ctx1, item);
        });*/

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
            if ( oneline.points.length > 1 )
                this.drawLongLineWithFill(this.ctx1, oneline.points, oneline.style);
        });

        this._render.circlePoints.forEach((point) => {
            this.drawCircle(this.ctx1, point);
        });
    }

    drawBars() {
        this._render.bars.forEach(bar => {
            this.drawRect(this.ctx1, bar);
        });
        this._render.barLabels.forEach(label => {
            this.drawWord(this.ctx1, label);
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

        /*this.drawPoints();*/
        this.drawBars();
        this.log('drawPoints');
    }

    /**
     * 数据清洗和合法性判断
     * 数据字段比较多，存在后面的函数调用依赖前面的计算结果的情况
     * 因此不能随便调换initData里面的函数顺序
     */
    initData(data) {
        this._datasets = data.datasets || [];

        if ( !this._datasets.length ) {
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

        // 计算X轴数据
        /*this.calXAxis();*/

        // 计算每条线的数据
        /*this.calPointData();*/

        this.log('initData');
    }

    /**
     * 实际的绘制函数
     */
    draw(data, cfg = {}) {
        this._start = new Date();

        this.getConfig(cfg, this._config);

        this.initData(data);

        if ( !this._datasets.length ) {
            return;
        }

        this.drawToCanvas();

        this.ctx1.draw();

        this.log('realDraw');

        if ( this._config.debug ) {
            console.log(this._performance);
        }
    }
}

