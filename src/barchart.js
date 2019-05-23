import {
    isType,
    extend,
    deepCopy,
    changeUnit,
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
        // 本实例配置文件
        this._config      = this.getConfig(cfg, deepCopy(config));

        // 线条数据
        this._datasets    = [];
    }

    calLabelDataForItem(x, yStart, barLabel) {
        let labelArr = ( isType('array', barLabel) ? barLabel : [barLabel]);
        let height   = 0;
        let arr      = [];

        labelArr.forEach( item => {
            let labelConfig = deepCopy(this._config.barLabelStyle);
            let obj = isType('object', item) ? item : { name: item, style: labelConfig };
            obj.style = extend(labelConfig, obj.style || {});

            yStart -= obj.style.paddingBottom;
            height += obj.style.paddingBottom;

            arr.push({
                text    : obj.name || '',
                color   : obj.style.color,
                fontSize: obj.style.fontSize,
                x       : x,
                y       : yStart,
                textAlign: 'center',
            });
            yStart -= obj.style.fontSize;
            height += obj.style.fontSize;
        });

        return { arr, height };
    }

    // TODO: 重构
    calBarData() {
        const xCenterAxis   = this._render.xCenterAxis;
        const first         = this._datasets[0];
        const second        = this._datasets[1];
        const count         = first.points.length;
        let leftBottom      = this._boundary.leftBottom;
        let totalBarWidth   = this._datasets.length * count * this._config.barWidth

        if ( second ) {
            totalBarWidth += this._config.compareBarMargin * count;
        }

        // 每组柱子的间距
        const barPadding    = ( xCenterAxis.end.x - xCenterAxis.start.x - totalBarWidth - this._config.leftRightPadding * 2 ) / (count - 1);

        // 柱子的X轴开始位置
        let xStart = xCenterAxis.start.x + this._config.leftRightPadding;

        this._render.bars         = [];
        this._render.barLabels    = [];
        this._render.topbarLabels = [];

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

            if ( bar.barLabel ) {
                let { arr } = this.calLabelDataForItem(xStart + this._config.barWidth / 2 + 1, y, bar.barLabel);

                this._render.topbarLabels = this._render.topbarLabels.concat(arr);
            }

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

                centerX += barWidth / 2 + this._config.compareBarMargin / 2;

                if ( cBar.barLabel ) {
                    let { arr } = this.calLabelDataForItem(xStart + this._config.barWidth / 2 + 1, cy, bar.barLabel);
                    this._render.topbarLabels = this._render.topbarLabels.concat(arr);
                }
                xStart += ( this._config.barWidth + barPadding );
            } else {
                xStart += barPadding;
            }

            // X轴的标签
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

            /*const height = ( bar.value - this._render.min) * this._render.unitY * this._render.yMultiple;
            const y = leftBottom.y - height;*/

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

        const { height } = this.calLabelDataForItem(0, 0, maxItem.barLabel || []);

        let yAxis      = this._config.yAxis;

        // 用于绘制的数据
        let yAxisData  = [];

        // Y轴文案所占据的宽度
        let yAxisWidth = 0;

        let cHeight = this._boundary.leftBottom.y - this._boundary.leftTop.y;
        // 计算Y轴上两个点之间的像素值
        let unitY =  cHeight / ( yDivider * this._render.yMultiple  * this._config.yAxisCount );

        /**
         * 计算最长的条加上label之后的高度,如果超过绘图边界，将unitY更改成刚好使得最长的条填充满绘图区
         * 这里仍然存在一种可能，很短的条有很多label导致超过绘图边界，不予考虑
         */
        const maxH = ( maxItem.value - min) * unitY * this._render.yMultiple;
        if ( maxH + height > cHeight ) {
            unitY = (cHeight - height ) / (maxItem.value - min) / this._render.yMultiple;
        }

        let leftStart   = this._boundary.leftTop.x + yAxis.marginLeft;
        let bottomStart = this._boundary.leftBottom.y

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
        /*if ( max > this._config.maxY ) {
            max = maxY;
        }*/
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
        if ( this._config.xAxisLine.centerShow ) {
            this.drawLine(this.ctx1, this._render.xCenterAxis);
        }
    }

    // 绘制Y轴
    drawYAxis() {
        // 绘制Y轴文案
        if ( this._config.yAxis.show ) {
            this._render.yAxisData.forEach((item) => {
                this.drawWord(this.ctx1, item);
            });
        }

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
        this._render.topbarLabels.forEach(label => {
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

