/**
 * @author: zimyuan
 * @lase-edit-date: 2018-08-30
 */

import {
    isType,
    deepCopy,
    changeUnit,
} from './util.js';

import config  from './config/radar.js';
import Base    from './base/index.js';

export default class RadarChart extends Base {
    constructor(ctx, cfg = {}) {
        super();

        this.chartType = 'radar';
        this.ctx       = ctx;

        this._config        = this.getConfig(cfg, deepCopy(config));

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
        let center   = this._render.center;
        let radius   = this._render.radius;
        let labels   = this._render.labels;
        let oneAngel = 360 / labels.length;

        let baseX = center.x;
        let baseY = center.y;

        let style = this._config.radiationLineStyle;
        let startAngle = this._config.startAngle;

        return labels.map((item, index) => {
            let rad = Math.PI * ( startAngle + oneAngel * index) / 180;

            let x = baseX + radius * Math.sin(rad);
            let y = baseY - radius * Math.cos(rad);

            return {
                start: center,
                end        : { x, y },
                width      : style.width,
                color      : style.color,
                isDash     : !!(  style.style === 'dash' ),
                dashPattern: style.dashPattern,
                dashOffset : style.dashOffset,

                angel : startAngle + oneAngel * index
            };
        });
    }

    /**
     * 计算网格线数据
     */
    calGridLineData() {
        let grid   = this._config.grid;
        let center = this._render.center;

        let steps = parseInt( (grid.max - grid.min) / grid.stepSize );

        let lines = [];

        for ( let i = 1; i <= steps; i++ ) {
            let oneline = {
                color : grid.color,
                width : grid.width,
                isDash: !!(grid.style == 'dash'),
                dashPattern: grid.dashPattern,
                dashOffset : grid.dashOffset,
                points: [],
            }

            this._render.angelLineData.forEach(angel => {
                let x = center.x + ( angel.end.x - center.x ) * ( i / steps);
                let y = center.y - ( center.y - angel.end.y) * ( i / steps);

                oneline.points.push({ x, y });
            });

            // 形成一个闭环
            oneline.points.push(oneline.points[0]);

            lines.push(oneline);
        }

        this._render.steps = steps;

        return lines;
    }

    calDatasetsData(animationPercent = 1) {
        let datasets      = this._datasets;
        let steps         = this._render.steps;
        let angelLineData = this._render.angelLineData;
        let center        = this._render.center;
        let grid          = this._config.grid;
        let lines         = [];
        let style         = this._config.datasetStyle;

        datasets.forEach((oneset) => {
            let points = [];

            let lineStyle = this.getConfig(oneset.style || {}, deepCopy(style));
            oneset.style = lineStyle;

            oneset.data.forEach( (point, index) =>{
                let angel   = angelLineData[index];
                let percent = ( point * animationPercent ) / (grid.max - grid.min)

                let x = center.x + ( angel.end.x - center.x ) * percent;
                let y = center.y - ( center.y - angel.end.y) * percent;

                points.push({ x, y });
            });

            points.push(points[0]);

            lines.push({
                points,
                style: lineStyle,
                width: lineStyle.borderWidth,
                color: lineStyle.borderColor,
                fill : true,
                fillColor: lineStyle.backgroundColor,
            });
        });

        return lines;
    }

    // 计算单个label的size
    calOneLabelSize(label, style = {}) {
        this.ctx.setFontSize(style.fontSize);

        let width  = this.ctx.measureText(label).width;
        let height = style.fontSize;

        width  += ( style.margin.left + style.margin.right );
        height += ( style.margin.top  + style.margin.bottom );

        return { width, height, style };
    }

    calLabelSize() {
        let style  = this._config.label;
        let labels = this._render.labels;

        return labels.map((label, index) => {
            let width  = 0;
            let height = 0;
            let subSize;

            if ( isType('array', label ) ) {
                label.forEach( (item, lIndex) => {

                    // 本身就是一个完整的label配置
                    if ( isType('object', item) ) {
                        // 覆盖默认配置得到新的配置
                        let newItem = this.getConfig(item, deepCopy(style));

                        // 直接替换掉原始数据的值，方便后续使用
                        newItem.text  = item.text;
                        label[lIndex] = label;

                        subSize  = this.calOneLabelSize(item.text, newItem);
                    }

                    else if ( isType('string', item) ) {
                        subSize = this.calOneLabelSize(item, style);
                    }

                    else
                        subSize = { width: 0, height: 0 };

                    width  = Math.max(subSize.width, width);
                    height += subSize.height;
                });
            }

            // 不是数组，但是自带样式等配置
            else if ( isType('object', label) ) {
                let newLabel = this.getConfig(label, deepCopy(style));

                newLabel.text = label.text || '';
                labels[index] = newLabel;

                subSize  = this.calOneLabelSize(label.text || '', newLabel);

                width  = subSize.width;
                height = subSize.height;
            }

            else {
                let size = this.calOneLabelSize(label, style);

                width  = size.width;
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

        let min     = Math.min(this._config.width, this._config.height) / 2
        let padding = this._config.padding;
        let size    = this._render.labelsSizeData;

        let arr = [
            {
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

        let minAngel = this._config.startAngle + ( 360 / this._render.labels.length ) * arr[0].index;
        let tmp = Math.cos(Math.PI * ( minAngel % 45 ) / 180);

        return (  minR / tmp > maxR
                ? maxR
                : minR / tmp );
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
        let center      = this._render.center;
        let startAngle  = this._config.startAngle;
        let oneAngel    = 360 / this._render.labels.length;
        let temp        = [];

        let sizeData    = this._render.labelsSizeData;

        this._render.labels.forEach((label, index) => {
            let rad = Math.PI * ( startAngle + oneAngel * index) / 180;

            let x = center.x + radiusGuess * Math.sin(rad);
            let y = center.y - radiusGuess * Math.cos(rad);

            temp.push({ x, y, index, size: sizeData[index] });
        });

        temp.sort((a, b) => {
            let v1 = parseFloat(parseFloat(a.x).toFixed(2));
            let v2 = parseFloat(parseFloat(b.x).toFixed(2));

            return v1 - v2 || a.size.width - b.size.width;
        });

        let left  = temp[0].index;
        let right = temp[temp.length - 1].index;

        temp.sort((a, b) => {
            let v1 = parseFloat(parseFloat(a.y).toFixed(2));
            let v2 = parseFloat(parseFloat(b.y).toFixed(2));

            return v1 - v2 || a.size.height- b.size.height;
        });

        let top    = temp[0].index;
        let bottom = temp[temp.length - 1].index;

        return { left, right, top, bottom };
    }

    /**
     * 计算label数据
     */
    calLabelPosData() {
        let angelLineData  = this._render.angelLineData;
        let center         = this._render.center;
        let labelsSizeData = this._render.labelsSizeData;

        return this._render.labels.map((label, index) => {
            let base              = angelLineData[index].end;
            let { width, height, style } = labelsSizeData[index];
            let baseX   = parseInt(base.x);
            let baseY   = parseInt(base.y);
            let centerX = parseInt(center.x);
            let centerY = parseInt(center.y);

            let startX, startY;

            if ( baseX === centerX )
                startX = baseX - width / 2;

            else if ( baseX > centerX )
                startX = baseX;

            else if ( baseX < centerX )
                startX = baseX - width;

            if ( baseY === centerY )
                startY = baseY + height / 2;

            else if ( baseY < centerY )
                startY = baseY - height;

            else
                startY = baseY;

            return { startX, startY };
        });
    }

    /**
     * 计算Y轴数据
     */
    calYAxisData() {
    }

    calLabelData() {
        let result = [];
        let style  = this._config.label;
        let posData = this._render.labelPosData;

        this._render.labels.forEach((label, index) => {
            let pos = posData[index];
            if ( isType('string', label) ) {
                result.push({
                    display : style.display,
                    fontSize: style.fontSize,
                    color   : style.color,
                    text    : label,
                    x       : pos.startX + style.margin.left,
                    y       : pos.startY + style.fontSize + style.margin.top,
                    isbottom: true,
                });
            }

            else if ( isType('array', label) ) {
                label.forEach(( item, index) => {
                    if ( isType('string', item ) ) {
                        result.push({
                            display : style.display,
                            fontSize: style.fontSize,
                            color   : style.color,
                            text    : item,
                            x       : pos.startX + style.margin.left,
                            y       : pos.startY + ( style.fontSize +  style.margin.top ) * (index + 1 ),
                            isbottom: true,
                        });
                    }
                });
            }

            else if ( isType('object', label) ) {
                result.push({
                    display : label.display,
                    fontSize: label.fontSize,
                    color   : label.color,
                    text    : label.text,
                    x       : pos.startX + label.margin.left,
                    y       : pos.startY + ( label.fontSize +  label.margin.top ),
                    isbottom: true,
                });
            }
        });

        return result;
    }

    calPointData() {
        let circles = [];

        this._datasets.forEach((dataset, index) => {
            let points = this._render.datasetsData[index].points;
            let style  = dataset.style || this._config.datasetStyle;

            points.forEach((point) => {
                circles.push({
                    x          : point.x,
                    y          : point.y,
                    r          : style.pointRadius || 2,
                    fillColor  : style.pointBackgroundColor || '#FFFFFF',
                    strokeColor: style.pointBorderColor,
                    lineWidth  : style.pointBorderWidth,
                });
            });
        });

        return circles;;
    }

    /**
     * 初始化所有数据
     */
    initData(data) {
        this._datasets              = data.datasets || [];
        this._render.labels         = data.labels || [];

        this._config.startAngle     = this._config.startAngle % 360;

        // 数据的计算会有前后依赖关系，不可随意更改函数调用关系
        this._render.labelsSizeData = this.calLabelSize();
        this._render.radius         = this.calRadius();
        this._render.angelLineData  = this.calAngleLineData();
        this._render.gridLineData   = this.calGridLineData();
        this._render.labelPosData   = this.calLabelPosData();
        this._render.labelData      = this.calLabelData();

        this._render.datasetsData   = this.calDatasetsData();
        this._render.pointData      = this.calPointData();
    }

    drawToCanvas(percent) {
        // 辐射状的线条
        if ( this._config.radiationLineStyle.display ) {
            this._render.angelLineData.forEach((line) => {
                this.drawLine(this.ctx, line);
            });
        }

        // 网格线
        if ( this._config.grid.display ) {
            this._render.gridLineData.forEach((line, index) => {
                this.drawLongLine(this.ctx, line);
            });
        }

        // 标签数据
        this._render.labelData.forEach(label => {
            if ( label.display )
                this.drawWord(this.ctx, label)
        });

        if ( this._config.animation ) {
            this._render.datasetsData   = this.calDatasetsData(percent);
            this._render.pointData      = this.calPointData();
        }

        // 区域数据
        this._render.datasetsData.forEach(line => {
            this.drawLongLine(this.ctx, line);
        });

        this._render.pointData.forEach(point => {
            this.drawCircle(this.ctx, point);
        });

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

        if ( this._config.debug ) {
            console.log('time cost:', new Date() - this._start, 'ms');
            console.log('render data:', this._render);
            console.log('config:', this._config);
        }
    }
}

