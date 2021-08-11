/**
 *
 *  原生Canvas绘图上下文胶水层
 *  支持大部分 H5 Canvas API 直接转化为 原生CanvasAPI
 *  原生CanvasAPI也可以直接使用
 *
 *  使用方法：
 *

  import Native2H5CTX from './base/Native2H5CTX.js';
  const ctx = Native2H5CTX(nativeCtx);

  请注意：由于原生API需要 draw() 完成最终渲染，因此开发者需要手动判断并执行 ctx.draw()
 *
 *
 * */

/**
 *  转化管理器
 * */
class CONVERT {
  /**
   *  Font 定义差异
   *  原生Canvas仅支持设置 FontSize 因此要读取大小后直接设置，忽略文字字体的定义
   * */
  font(target, value) {
    const result = /[0-9]+px/i.exec(value);
    if (!result) {
      throw new Error('font 所接收的参数值不符合期望 例: ctx.font = \'23px\'');
    }
    const fontSize = result[0].slice(0, -2);
    target.setFontSize(fontSize);
    return true;
  }

  /**
   *  lineWidth 定义差异
   *  原生 lineWidth 采用 setLineWidth 进行设置
   * */
  lineWidth(target, value) {
    target.setLineWidth(value);
    return true;
  }

  /**
   *  strokeStyle 定义差异
   *  原生 strokeStyle 采用 setStrokeStyle 进行设置
   * */
  strokeStyle(target, value) {
    target.setStrokeStyle(value);
    return true;
  }

  /**
   *  fillStyle 定义差异
   *  原生 fillStyle 采用 setFillStyle 进行设置
   * */
  fillStyle(target, value) {
    target.setFillStyle(value);
    return true;
  }

  /**
   *  textBaseline 定义差异
   *  原生 textBaseline 采用 setTextBaseline 进行设置
   * */
  textBaseline(target, value) {
    target.setTextBaseline(value);
    return true;
  }

  /**
   *  textAlign 定义差异
   *  原生 textAlign 采用 setTextAlign 进行设置
   * */
  textAlign(target, value) {
    target.setTextAlign(value);
    return true;
  }
}

const convert = new CONVERT();


export default function Native2H5CTX(nativeCtx) {
  Object.defineProperty(nativeCtx, 'font', {
    set(v) {
      convert.font.apply(null, [nativeCtx, v]);
    },
  });

  Object.defineProperty(nativeCtx, 'lineWidth', {
    set(v) {
      convert.lineWidth.apply(null, [nativeCtx, v]);
    },
  });

  Object.defineProperty(nativeCtx, 'strokeStyle', {
    set(v) {
      convert.strokeStyle.apply(null, [nativeCtx, v]);
    },
  });

  Object.defineProperty(nativeCtx, 'fillStyle', {
    set(v) {
      convert.fillStyle.apply(null, [nativeCtx, v]);
    },
  });

  Object.defineProperty(nativeCtx, 'textBaseline', {
    set(v) {
      convert.textBaseline.apply(null, [nativeCtx, v]);
    },
  });

  Object.defineProperty(nativeCtx, 'textAlign', {
    set(v) {
      convert.textAlign.apply(null, [nativeCtx, v]);
    },
  });

  return nativeCtx;
}