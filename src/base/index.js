
import ChartBase from './draw.js';
import {
    deepCopy,
    extend,
    isPlainObject
} from '../util.js';

import animationOptions from './easing.js';

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
        let easingFunction = animationOptions[config.animationEasing];

        // 动画完成的百分比
        let percentComplete = (  config.animation
                               ? 0
                               : 1  );

        let animationFrame = () => {
            let easeAdjustedAnimationPercent = (  config.animation
                                                ? easingFunction(percentComplete)
                                                : 1  );

            if ( easeAdjustedAnimationPercent > 1 )
                easeAdjustedAnimationPercent = 1;

            draw.call(this, easeAdjustedAnimationPercent);
        }

        let animationLoop = () => {
            percentComplete += animationCount;

            animationFrame();

            if ( percentComplete <= 1 )
                this.requestAnimFrame(animationLoop);

            else
                config.onAnimationComplete && config.onAnimationComplete();
        }

        this.requestAnimFrame(animationLoop);
    }
}

