// Easing functions adapted from Robert Penner's easing equations
// http://www.robertpenner.com/easing/
/* eslint-disable */

export default {
  linear(t) {
    return t;
  },
  easeInQuad(t) {
    return t * t;
  },
  easeOutQuad(t) {
    return -1 * t * (t - 2);
  },
  easeInOutQuad(t) {
    if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
    return -1 / 2 * ((--t) * (t - 2) - 1);
  },
  easeInCubic(t) {
    return t * t * t;
  },
  easeOutCubic(t) {
    return 1 * ((t = t / 1 - 1) * t * t + 1);
  },
  easeInOutCubic(t) {
    if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
    return 1 / 2 * ((t -= 2) * t * t + 2);
  },
  easeInQuart(t) {
    return t * t * t * t;
  },
  easeOutQuart(t) {
    return -1 * ((t = t / 1 - 1) * t * t * t - 1);
  },
  easeInOutQuart(t) {
    if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
    return -1 / 2 * ((t -= 2) * t * t * t - 2);
  },
  easeInQuint(t) {
    return 1 * (t /= 1) * t * t * t * t;
  },
  easeOutQuint(t) {
    return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
  },
  easeInOutQuint(t) {
    if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
    return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
  },
  easeInSine(t) {
    return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
  },
  easeOutSine(t) {
    return 1 * Math.sin(t / 1 * (Math.PI / 2));
  },
  easeInOutSine(t) {
    return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
  },
  easeInExpo(t) {
    return (t == 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
  },
  easeOutExpo(t) {
    return (t == 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
  },
  easeInOutExpo(t) {
    if (t == 0) return 0;
    if (t == 1) return 1;
    if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
    return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
  },
  easeInCirc(t) {
    if (t >= 1) return t;
    return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
  },
  easeOutCirc(t) {
    return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
  },
  easeInOutCirc(t) {
    if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
    return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
  },
  easeInElastic(t) {
    let s = 1.70158;
    let p = 0;
    let a = 1;
    if (t == 0) return 0;
    if ((t /= 1) == 1) return 1;
    if (!p) p = 1 * .3;
    if (a < Math.abs(1)) {
      a = 1;
      s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(1 / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
  },
  easeOutElastic(t) {
    let s = 1.70158;
    let p = 0;
    let a = 1;
    if (t == 0) return 0;
    if ((t /= 1) == 1) return 1;
    if (!p) p = 1 * .3;
    if (a < Math.abs(1)) {
      a = 1;
      s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(1 / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
  },
  easeInOutElastic(t) {
    let s = 1.70158;
    let p = 0;
    let a = 1;
    if (t == 0) return 0;
    if ((t /= 1 / 2) == 2) return 1;
    if (!p) p = 1 * (.3 * 1.5);
    if (a < Math.abs(1)) {
      a = 1;
      s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(1 / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * .5 + 1;
  },
  easeInBack(t) {
    const s = 1.70158;
    return 1 * (t /= 1) * t * ((s + 1) * t - s);
  },
  easeOutBack(t) {
    const s = 1.70158;
    return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
  },
  easeInOutBack(t) {
    let s = 1.70158;
    if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
    return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
  },
  easeInBounce(t) {
    return 1 - animationOptions.easeOutBounce(1 - t);
  },
  easeOutBounce(t) {
    if ((t /= 1) < (1 / 2.75)) {
      return 1 * (7.5625 * t * t);
    }
    if (t < (2 / 2.75)) {
      return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
    }
    if (t < (2.5 / 2.75)) {
      return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
    }
    return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
  },
  easeInOutBounce(t) {
    if (t < 1 / 2) return animationOptions.easeInBounce(t * 2) * .5;
    return animationOptions.easeOutBounce(t * 2 - 1) * .5 + 1 * .5;
  },
};