/**
 * @author: zimyuan
 */

/*
 * 判断JavaScript对象类型的函数
 * @param {}
 */
function is(obj, type) {
	let toString = Object.prototype.toString, undefined;

	return (type === 'Null' && obj === null) ||
		(type === "Undefined" && obj === undefined) ||
		toString.call(obj).slice(8, -1) === type;
};

/*
 * 深拷贝函数
 * @param {Object} oldObj: 被拷贝的对象
 * @param {Object} newObj: 需要拷贝的对象
 * @ return {Object} newObj: 拷贝之后的对象
 */

function deepCopy(oldObj, newObj = {}) {
    for ( let key in oldObj ) {
 		let copy = oldObj[key];

        //如window.window === window，会陷入死循环，需要处理一下
 		if ( oldObj === copy )
            continue;

 		if ( is(copy, "Object") ) {
 			newObj[key] = deepCopy(copy, newObj[key] || {});
 		}

        else if ( is(copy, "Array") ) {
 			newObj[key] = []
			newObj[key] = deepCopy(copy, newObj[key] || []);
 		}

        else
 			newObj[key] = copy;
 	}

 	return newObj;
}

function isType (type, value) {
	let _type = Object
		   		.prototype
		   		.toString
		   		.call(value)
		   		.match(/\s(\w+)/)[1]
		   		.toLowerCase();

	return _type === type;
}

function isPlainObject (value) {
	return ( !!value && isType('object', value) );
}

function extend(destination, source) {
	if ( !isPlainObject(destination) || !isPlainObject(source) )
		throw 'destination and source must be type of object';

	for ( let property in source )
		destination[property] = source[property];

	return destination;
}

/**
 * 数字取整逻辑
 * 在计算坐标轴的最大最小值和区间的时候，预期的效果是最大最小值都是“整数”
 * 这里根据数字的大小定义取整逻辑
 */
function getRoundForNumber(number, direction) {
    let round;

    // 计算出当前数组位数减一的最小数字
    if ( number  >= 100 )
        round = String(number).split('')
                              .reduce((sum, item) => sum * 10, 0.01);

    // 数字介于10-100之间，逢5为整
    else if ( number >= 10 )
        round = 5;

    else if ( number > 1 )
        round = 1;

    else
        round = 0.1;

    return round;
}

function roundForNumber(number, direction) {
    let result;
    let round = getRoundForNumber(number);

    if( number === 0 )
        return 0;

    if ( direction === 'up' )
        result = number + ( round - ( number % round ));

    else if ( direction === 'down' )
        result = number  - number % round;

    return result;
}

/**
 * 给定最大值最小值和区间个数，给出优化后的最大最小值和单step值
 */
function getDataRangeAndStep(max, min, step) {
    if ( max === 0 )
        return {
            max     : 4,
            min     : 0,
            divider : 1,
            multiple: 1
        }

    //console.log(1, max, min, step);
    let multiple = 1;

    // 每一步的值小于1的情况，先放大100倍方便计算
    if (  ( max - min ) / step < 1 ) {
        multiple = 100;
        max *= multiple;
        min *= multiple;
    }

    let originMax = max;
    //console.log(2, max, min, step);

    let divider = Math.round(( max - min ) / step);

    //console.log(3, divider);

    // 先将divider降低一点，后面慢慢增加逼近满意值
    divider = roundForNumber(divider, 'down');
    //console.log(4, divider);

    // 尽量保证整个图是居中而不是贴边的
    max = max + ( max % divider );
    min = min - ( min % divider );

    //console.log(5, max, min);

    // 最小值取整，因为divider也是取整的，所以最后max也是取整的
    min = roundForNumber(min, 'down');

    //console.log(6, min);

    // 逼近求理想值
    let round = getRoundForNumber(divider);

    //console.log(8, round)
    for ( let i = 0; i < 20; i++ ) {
        //console.log( min + divider * step , originMax, max, );
        let temp = min + divider * step;
        if ( temp >= max || temp - originMax >= round * 3 )
            break;

        divider += round;
    }

    return {
        max    :( min + divider * step ) / multiple,
        min    : min / multiple,
        divider: divider / multiple,
        multiple
    };
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function changeUnit(value, fixed = 1) {
    // value是非数字的情况，直接返回value
    if ( !isNumeric(value) )
        return value;

    let number  = parseFloat(value);
    let unit    = '';
    let divider = 1;

    // 小于1000的值，保留小数点
    if ( isFloat(value) && number < 1000 )
        return number.toFixed(fixed);

    if ( number < 1e3 ) {
    }

    else if ( number < 1e4) {
        unit    = 'k';
        divider = 1e3;
    }

    else if ( number < 1e7 ) {
        unit    = 'w';
        divider = 1e4;
    }

    else {
        unit    = 'kw';
        divider = 1e7;
    }

    let temp = number / divider;

    // 如果达不到保留小数的基本要求，取整
    if ( temp - Math.floor(temp) < 0.5 * Math.pow(0.1, fixed) )
        fixed = 0;

    return temp.toFixed(fixed) + unit;
}

export {
    is,
    isType,
    deepCopy,
    isPlainObject,
    extend,
    getDataRangeAndStep,
    changeUnit,
}

