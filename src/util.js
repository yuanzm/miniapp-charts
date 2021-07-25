/* eslint no-param-reassign: ["error", { "props": false }]*/

/*
 * @author: zimyuan
 */
/*
 * 判断JavaScript对象类型的函数
 * @param {}
 */
function is(obj, type) {
  const { toString } = Object.prototype; let undefined;

  return (type === 'Null' && obj === null)
    || (type === 'Undefined' && obj === undefined)
    || toString.call(obj).slice(8, -1) === type;
}

/*
 * 深拷贝函数
 * @param {Object} oldObj: 被拷贝的对象
 * @param {Object} newObj: 需要拷贝的对象
 * @ return {Object} newObj: 拷贝之后的对象
 */
function deepCopy(oldObj = {}, newObj = {}) {
  for (const key in oldObj) {
    const copy = oldObj[key];
    if (oldObj === copy) continue; // 如window.window === window，会陷入死循环，需要处理一下
    if (is(copy, 'Object')) {
      newObj[key] = deepCopy(copy, newObj[key] || {});
    } else if (is(copy, 'Array')) {
      newObj[key] = [];
      newObj[key] = deepCopy(copy, newObj[key] || []);
    } else {
      newObj[key] = copy;
    }
  }
  return newObj;
}

function isType(type, value) {
  const _type = Object.prototype.toString.call(value).match(/\s(\w+)/)[1].toLowerCase();

  return _type === type;
}

function isPlainObject(value) {
  return (!!value && isType('object', value));
}

function extend(destination, source) {
  if (!isPlainObject(destination) || !isPlainObject(source)) throw 'destination and source must be type of object';

  for (const property in source) destination[property] = source[property];

  return destination;
}

/**
 * 数字取整逻辑
 * 在计算坐标轴的最大最小值和区间的时候，预期的效果是最大最小值都是“整数”
 * 这里根据数字的大小定义取整逻辑
 */
function getRoundForNumber(number) {
  let round;

  // 计算出当前数组位数减一的最小数字
  if (number  >= 100) round = String(number).split('')
    .reduce(sum => sum * 10, 0.01);

  // 数字介于10-100之间，逢5为整
  else if (number >= 10) round = 5;

  else if (number > 1) round = 1;

  else round = 0.1;

  return round;
}

function roundForNumber(number, direction) {
  let result;
  const round = getRoundForNumber(number);

  if (number === 0) return 0;

  if (direction === 'up') result = number + (round - (number % round));

  else if (direction === 'down') result = number - (number % round);

  return result;
}

/**
 * 给定最大值最小值和区间个数，给出优化后的最大最小值和单step值
 */
function getDataRangeAndStep(maxSource, minSource, step) {
  let max = maxSource;
  let min = minSource;

  if (max === 0) {
    return {
      max: 4,
      min: 0,
      divider: 1,
      multiple: 1,
    };
  }

  if (max === min) {
    return {
      max: max + 2,
      min: (min - 2 >= 0 ? min - 2 : 0),
      divider: 1,
      multiple: 1,
    };
  }

  // console.log(1, max, min, step);
  let multiple = 1;

  // 每一步的值小于1的情况，先放大100倍方便计算
  if ((max - min) / step < 1) {
    multiple = 10000;
    max *= multiple;
    min *= multiple;
  }

  const originMax = max;
  // console.log(2, max, min, step);

  let divider = Math.round((max - min) / step);

  // 如果divider为0，说明值放大后，最大值和最小值差值过小；后续过程没有意义，直接返回
  if (divider === 0) {
    return {
      max: 4,
      min: 0,
      divider: 1,
      multiple: 1,
    };
  }

  // console.log(3, divider);

  // 先将divider降低一点，后面慢慢增加逼近满意值
  divider = roundForNumber(divider, 'down');
  // console.log(4, divider);

  // 尽量保证整个图是居中而不是贴边的
  max = max + (max % divider);
  min = min - (min % divider);

  // console.log(5, max, min);

  // 最小值取整，因为divider也是取整的，所以最后max也是取整的
  min = roundForNumber(min, 'down');

  // console.log(6, min);

  // 逼近求理想值
  const round = getRoundForNumber(divider);

  // console.log(8, round)
  let flag = true;
  while (flag) {
    // console.log( min + divider * step , originMax, max, );
    const temp = min + divider * step;
    if (temp >= max || temp - originMax >= round * 10) flag = false;

    divider += round;
  }

  // console.log(9, max, min, divider);

  return {
    max: (min + divider * step) / multiple,
    min: min / multiple,
    divider: divider / multiple,
    multiple,
  };
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function changeUnit(value, fixedParam = 1) {
  let fixed = fixedParam;
  // value是非数字的情况，直接返回value
  if (!isNumeric(value)) return value;

  const number  = parseFloat(value);
  let unit    = '';
  let divider = 1;

  // 小于1000的值，保留小数点
  if (isFloat(value) && number < 1000) return number.toFixed(fixed);

  if (number < 1e3) {
    unit    = '';
    divider = 1;
  } else if (number >= 1e3 &&  number < 1e4) {
    unit    = 'k';
    divider = 1e3;
  } else if (number < 1e7) {
    unit    = 'w';
    divider = 1e4;
  } else {
    unit    = 'kw';
    divider = 1e7;
  }

  const temp = number / divider;

  // 如果达不到保留小数的基本要求，取整
  if (temp - Math.floor(temp) < 0.5 * (0.1 ** fixed)) {
    fixed = 0;
  }

  return temp.toFixed(fixed) + unit;
}

function none() {
}

function formatX(length, maxXPoint) {
  let step  = Math.ceil(length /  maxXPoint);
  let start = 0;

  // 记录原始的step长度
  const origin = step;

  while (step * (maxXPoint - 1) >= length) {
    step -= 1;
  }

  if (step < origin) {
    start = Math.floor((length - step * (maxXPoint - 1)) / 2);
  }


  return { step, start: start > 1 ? start - 1 : start };
}

export function splineCurve(firstPoint, middlePoint, afterPoint, t) {
  // Props to Rob Spencer at scaled innovation for his post on splining between points
  // http://scaledinnovation.com/analytics/splines/aboutSplines.html

  // This function must also respect "skipped" points

  const previous = firstPoint.skip ? middlePoint : firstPoint;
  const current = middlePoint;
  const next = afterPoint.skip ? middlePoint : afterPoint;

  const d01 = Math.sqrt((current.x - previous.x) ** 2 + (current.y - previous.y) ** 2);
  const d12 = Math.sqrt((next.x - current.x) ** 2 + (next.y - current.y) ** 2);

  let s01 = d01 / (d01 + d12);
  let s12 = d12 / (d01 + d12);

  // If all points are the same, s01 & s02 will be inf
  s01 = isNaN(s01) ? 0 : s01;
  s12 = isNaN(s12) ? 0 : s12;

  const fa = t * s01; // scaling factor for triangle Ta
  const fb = t * s12;

  return {
    previous: {
      x: current.x - fa * (next.x - previous.x),
      y: current.y - fa * (next.y - previous.y),
    },
    next: {
      x: current.x + fb * (next.x - previous.x),
      y: current.y + fb * (next.y - previous.y),
    },
  };
}


/**
 * @private
 */
export function bezierCurveTo(ctx, previous, target, flip) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  ctx.bezierCurveTo(
    flip ? previous.controlPointPreviousX : previous.controlPointNextX,
    flip ? previous.controlPointPreviousY : previous.controlPointNextY,
    flip ? target.controlPointNextX : target.controlPointPreviousX,
    flip ? target.controlPointNextY : target.controlPointPreviousY,
    target.x,
    target.y,
  );
}


function capControlPoint(pt, min, max) {
  return Math.max(Math.min(pt, max), min);
}

/**
 * Returns true if the point is inside the rectangle
 * @param {object} point - The point to test
 * @param {object} area - The rectangle
 * @returns {boolean}
 * @private
 */
export function isPointInArea(point, area) {
  const epsilon = 0.5; // margin - to match rounded decimals

  return point.x > area.left - epsilon && point.x < area.right + epsilon
    && point.y > area.top - epsilon && point.y < area.bottom + epsilon;
}

function capBezierPoints(points, area) {
  let i; let ilen; let point;
  for (i = 0, ilen = points.length; i < ilen; ++i) {
    point = points[i];
    if (!isPointInArea(point, area)) {
      continue;
    }
    if (i > 0 && isPointInArea(points[i - 1], area)) {
      point.controlPointPreviousX = capControlPoint(point.controlPointPreviousX, area.left, area.right);
      point.controlPointPreviousY = capControlPoint(point.controlPointPreviousY, area.top, area.bottom);
    }
    if (i < points.length - 1 && isPointInArea(points[i + 1], area)) {
      point.controlPointNextX = capControlPoint(point.controlPointNextX, area.left, area.right);
      point.controlPointNextY = capControlPoint(point.controlPointNextY, area.top, area.bottom);
    }
  }
}

export function updateBezierControlPoints(points, area) {
  let i; let ilen; let point; let controlPoints;
  const loop = false;

  let prev = loop ? points[points.length - 1] : points[0];
  for (i = 0, ilen = points.length; i < ilen; ++i) {
    point = points[i];
    controlPoints = splineCurve(
      prev,
      point,
      points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen],
      /* options.tension*/
      0.1,
    );
    point.controlPointPreviousX = controlPoints.previous.x;
    point.controlPointPreviousY = controlPoints.previous.y;
    point.controlPointNextX = controlPoints.next.x;
    point.controlPointNextY = controlPoints.next.y;
    prev = point;
  }

  capBezierPoints(points, area);
}

export {
  none,
  isType,
  deepCopy,
  isPlainObject,
  extend,
  getDataRangeAndStep,
  changeUnit,
  formatX,
};

