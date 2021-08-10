/**
 *
 * 	原生Canvas绘图上下文胶水层
 * 	支持大部分 H5 Canvas API 直接转化为 原生CanvasAPI
 * 	原生CanvasAPI也可以直接使用
 *
 * 	使用方法：
 *

	import Native2H5CTX from './base/Native2H5CTX.js';
	const ctx = Native2H5CTX(nativeCtx);

	请注意：由于原生API需要 draw() 完成最终渲染，因此开发者需要手动判断并执行 ctx.draw()
 *
 *
 * */

/**
 * 	转化管理器
 * */
class CONVERT {
  /**
	 * 	Font 定义差异
	 * 	原生Canvas仅支持设置 FontSize 因此要读取大小后直接设置，忽略文字字体的定义
	 * */
  font(target, prop, value) {
    const result = /[0-9]+px/i.exec(value);
    if (!result) {
      throw new Error('font 所接收的参数值不符合期望 例: ctx.font = \'23px\'');
    }
    const fontSize = result[0].slice(0, -2);
    target.setFontSize(fontSize);
    return true;
  }

  /**
	 * 	lineWidth 定义差异
	 * 	原生 lineWidth 采用 setLineWidth 进行设置
	 * */
  lineWidth(target, prop, value) {
    target.setLineWidth(value);
    return true;
  }

  /**
	 * 	strokeStyle 定义差异
	 * 	原生 strokeStyle 采用 setStrokeStyle 进行设置
	 * */
  strokeStyle(target, prop, value) {
    target.setStrokeStyle(value);
    return true;
  }

  /**
	 * 	fillStyle 定义差异
	 * 	原生 fillStyle 采用 setFillStyle 进行设置
	 * */
  fillStyle(target, prop, value) {
    target.setFillStyle(value);
    return true;
  }

  /**
	 * 	textBaseline 定义差异
	 * 	原生 textBaseline 采用 setTextBaseline 进行设置
	 * */
  textBaseline(target, prop, value) {
    target.setTextBaseline(value);
    return true;
  }

  /**
	 * 	textAlign 定义差异
	 * 	原生 textAlign 采用 setTextAlign 进行设置
	 * */
  textAlign(target, prop, value) {
    target.setTextAlign(value);
    return true;
  }
}

const convert = new CONVERT();

export default function Native2H5CTX(nativeCtx) {
  const ctx0Proxy = new Proxy(nativeCtx, {
    set(...args) {
      // 属性设置类
      switch (args[1]) {
      case 'font':
        return convert.font.apply(null, args);

      case 'lineWidth':
        return convert.lineWidth.apply(null, args);

      case 'strokeStyle':
        return convert.strokeStyle.apply(null, args);

      case 'fillStyle':
        return convert.fillStyle.apply(null, args);

      case 'textBaseline':
        return convert.textBaseline.apply(null, args);

      case 'textAlign':
        return convert.textAlign.apply(null, args);

      default:
        return Reflect.get.apply(null, args);
      }
    },
    get(...args) {
      if (args[1] === 'clearRect') {	// 原生API没有 clearRect 方法在这里阻止调用 返回一个匿名函数
        return () => {};
      }
      // 函数调用类
      return Reflect.get.apply(null, args);
    },
  });
  return ctx0Proxy;
}
