
import ChartBase from './draw.js';
import {
    deepCopy,
    extend,
    isPlainObject
} from '../util.js';

export default class Base extends ChartBase {
    constructor() {
        super();

        this._start = 0;

        this._render = {};

        this._performance = {};

        this._boundary = {};
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
        this._boundary.rightTop = {
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

    /**
     * 获取本实例的配置
     */
    getConfig(cfg, sourceConfig) {
        if ( !isPlainObject(cfg) )
            throw new Error('options must be type of Object');

        for ( let key in sourceConfig ) {
            if ( cfg[key] !== undefined ) {
                if ( typeof sourceConfig[key] !== typeof cfg[key] )
                    throw new Error(`TypeMismatch：${key} must be type of ${ typeof sourceConfig[key]}`);

                // Object类型的extend而不是直接覆盖
                if ( isPlainObject(cfg[key]) )
                    sourceConfig[key] = extend(sourceConfig[key], cfg[key]);

                else
                    sourceConfig[key] = cfg[key];
            }
        }

        return sourceConfig;
    }
}

