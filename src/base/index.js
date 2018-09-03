
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
     * 获取本实例的配置
     */
    getConfig(cfg, sourceConfig) {
        if ( !isPlainObject(cfg) )
            throw new Error('options must be type of Object');

        for ( let key in sourceConfig ) {
            if ( cfg[key] !== undefined ) {
                if ( typeof sourceConfig[key] !== typeof cfg[key] )
                    throw new Error(`TypeMismatch：${key} must be type of ${ typeof sourceConfig[key]}`);

                // 对于对象类型的属性，递归调用来替换
                if ( isPlainObject(cfg[key]) )
                    this.getConfig(cfg[key], sourceConfig[key]);

                else
                    sourceConfig[key] = cfg[key];
            }
        }

        return sourceConfig;
    }
}

