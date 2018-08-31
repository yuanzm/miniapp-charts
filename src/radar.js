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

        // function in base/index.js
        this._config = this.getConfig(cfg, deepCopy(config));

        this._render.center = this.getCenterPoint();

        this.calBoundaryPoint();

        console.log(this._render, this._config);
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
                end  : { x, y },
                width: 1,
                color: style.color,
                isDash: true,
            };
        });
    }

    /**
     * 计算网格线数据
     */
    calGridLineData() {
        let grid   = this._config.grid;
        let center = this._render.center;

        // TODO: steps的边缘情况
        let steps = parseInt( (grid.max - grid.min) / grid.stepSize );

        let lines = [];

        for ( let i = 1; i <= steps; i++ ) {
            let oneline = {
                color : grid.color,
                width : grid.width,
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

    calDatasetsData(data) {
        let datasets      = data.datasets || [];
        let steps         = this._render.steps;
        let angelLineData = this._render.angelLineData;
        let center        = this._render.center;
        let grid          = this._config.grid;
        let lines         = [];

        datasets.forEach((oneset) => {
            let oneLinePoints = [];
            oneset.data.forEach( (point, index) =>{
                let angel   = angelLineData[index];
                let percent = point / (grid.max - grid.min)

                let x = center.x + ( angel.end.x - center.x ) * percent;
                let y = center.y - ( center.y - angel.end.y) * percent;

                oneLinePoints.push({ x, y });
            });

            oneLinePoints.push(oneLinePoints[0]);

            lines.push(oneLinePoints);
        });

        return lines;
    }

    calOneLabelSize(label) {
        let style  = this._config.label;
        let width  = 0;
        let height = 0;

        if ( isType('array', label ) ) {

        }

        // 不是数组，但是自带样式等配置
        else if ( isType('object', label) ) {
        }

        else {
            width = this.getWordWidth({
                text    : label,
                fontSize: style.fontSize,
            });

            height = style.fontSize;
        }

        width  += ( style.margin.left + style.margin.right );
        height += ( style.margin.top  + style.margin.bottom );

        console.log(width, height);

        return { width, height };
    }

    /**
     * 先假想一个半径值，雷达区域的边界点
     */
    calRadius() {
        let { left, right, top, bottom } = this.calGridBoundary();

        let min     = Math.min(this._config.width, this._config.height);
        let labels  = this._render.labels;

        let effectSize = Math.min(
            min - this.calOneLabelSize(labels[left]).width - this.calOneLabelSize(labels[right]).width,
            min - this.calOneLabelSize(labels[top]).height - this.calOneLabelSize(labels[bottom]).height,
        );

        return parseInt(effectSize / 2);
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

        this._render.labels.forEach((label, index) => {
            let rad = Math.PI * ( startAngle + oneAngel * index) / 180;

            let x = center.x + radiusGuess * Math.sin(rad);
            let y = center.y - radiusGuess * Math.cos(rad);

            temp.push({ x, y, index });
        });

        temp.sort((a, b) => {
            return a.x - b.x;
        });

        let left  = temp[0].index;
        let right = temp[temp.length - 1].index;

        temp.sort((a, b) => {
            return a.y - b.y;
        });

        let top    = temp[0].index;
        let bottom = temp[temp.length - 1].index;

        return { left, right, top, bottom };
    }

    /**
     * 计算label数据
     */
    calLabelData() {
        let labels        = this._render.labels;
        let angelLineData = this._render.angelLineData;
        let center        = this._render.center;

        labels.forEach((label, index) => {
            let base              = angelLineData[index].end;
            let { width, height } = this.calOneLabelSize(label);

            let startX, startY;

            if ( base.x === center.x )
                startX = base.x - width / 2;

            else if ( base.x > center.x )
                startX = base.x + width;

            else if ( base.x < center.x )
                startX = base.x - width;

            if ( base.y === center.y )
                startY = base.y + height / 2;

            else if ( base.y < center.y )
                startY = base.y - height;

            else
                startY = base.y + height;

            console.log(startX, startY);
        });
    }

    /**
     * 计算Y轴数据
     */
    calYAxisData() {
    }

    calBoundaryPoint() {
        let _config = this._config;
        let padding = _config.padding;

        this._boundary.leftTop = {
            x: padding.left,
            y: padding.top,
        }

        this._boundary.leftBottom = {
            x: padding.left,
            y: _config.height - padding.bottom,
        }

        this._boundary.rightTop = {
            x: _config.width - padding.right,
            y: padding.top,
        }

        this._boundary.rightBottom = {
            x: _config.width - padding.right,
            y: _config.height - padding.bottom,
        }
    }

    /**
     * 初始化所有数据
     * @TODO: label参数校验
     */
    initData(data) {
        this._datasets             = data.datasets || [];
        this._render.labels        = data.labels || [];
        this._render.radius        = this.calRadius();
        this._render.angelLineData = this.calAngleLineData();
        this._render.gridLineData  = this.calGridLineData();
        this._render.datasetsData  = this.calDatasetsData(data);

        this.calLabelData();

        console.log(this._render)
    }

    drawToCanvas() {
        // 辐射状的线条
        this._render.angelLineData.forEach((line) => {
            this.drawLine(this.ctx, line);
        });

        // 网格线
        this._render.gridLineData.forEach((line, index) => {
            this.drawLongLine(this.ctx, line);
        });

        // 区域数据
        this._render.datasetsData.forEach(line => {
            this.drawLongLine(this.ctx, {
                points: line,
                color : '#7587db',
            });
            // 每条线画完之后手动fill一下
            this.ctx.setFillStyle('rgba(117, 135, 219, 0.3)');
            this.ctx.fill()
        });

        this.ctx.draw();
    }

    draw(data) {
        this.initData(data);
        this.drawToCanvas();
    }
}

