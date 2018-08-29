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

        console.log(this._render);
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
        let labels = this._render.labels;

        let oneAngel = 360 / labels.length;

        return labels.map((item, index) => {

        });
    }

    /**
     * 计算网格线数据
     */
    calGridLineData() {
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

        // function in base/index.js
        this.calBoundaryPoint();

        console.log(this._boundary);
    }

    drawLabel() {
    }

    drawAngelLine() {
    }

    drawGridLine() {
    }

    drawYAxis() {
    }

    drawDataSets() {
    }

    drawToCanvas() {

    }

    draw(data) {
    }
}

