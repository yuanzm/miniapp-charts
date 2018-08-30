/**
 * @author: zimyuan
 * @lase-edit-date: 2018-05-18
 */

import {
    isType,
    extend,
    deepCopy,
    changeUnit,
    isPlainObject,
    getDataRangeAndStep
} from './util.js';

import config  from './config/radar.js';
import Base    from './base/index.js';

export default class RadarChart extends Base {
    constructor(ctx, cfg = {}) {
        super();

        this.chartType = 'radar';

        this.ctx = ctx;

        // function in base/index.js
        this._config = this.getConfig(cfg, deepCopy(config));

        this._render.center = this.getCenterPoint();

        console.log(this._render, this._config);
    }

    /**
     * 雷达图的画图是从中心点开始扩散画的，首先求出中心点
     */
    getCenterPoint() {
        return {
            x: this._config.width / 2,
            y: this._config.height / 2,
        }; }

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

        return labels.map((item, index) => {
            let rad = Math.PI * (oneAngel * index) / 180;

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

        return lines;
    }

    /**
     * 计算label数据
     */
    calLabelData() {
    }

    /**
     * 计算Y轴数据
     */
    calYAxisData() {
    }

    /**
     * 初始化所有数据
     */
    initData(data) {
        this._render.labels = data.labels || [];

        this._render.radius = 170;

        // function in base/index.js
        // this.calBoundaryPoint();

        this._render.angelLineData = this.calAngleLineData();

        this._render.gridLineData  = this.calGridLineData();

        console.log(this._render)
    }

    drawLabel() {
    }

    drawAngelLine() {
        this._render.angelLineData.forEach((line) => {
            this.drawLine(this.ctx, line);
        });
    }

    drawGridLine() {
        this._render.gridLineData.forEach((line, index) => {
            this.drawLongLine(this.ctx, line);
        });
    }

    drawYAxis() {
    }

    drawDataSets() {
    }

    drawToCanvas() {
        this.drawAngelLine();

        this.drawGridLine();

        this.ctx.draw();
    }

    draw(data) {
        this.initData(data);

        this.drawToCanvas();
    }
}

