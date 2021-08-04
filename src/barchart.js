// 太老的库，很多变量是下滑线开头的，暂时屏蔽先
/* eslint no-underscore-dangle: "off"*/
/* eslint no-param-reassign: ["error", { "props": false }] */

import {
  isType,
  extend,
  deepCopy,
  changeUnit,
  getDataRangeAndStep,
  none,
} from './util.js';

import config from './config/barchart.js';
import Base   from './base/index.js';

/**
 * 小程序折线图绘制组件
 */
export default class BarChart extends Base {
  /**
     * @param { canvasNode } canvasNode: canvas节点句柄
     * @param { Object } cfg: 组件配置
     */
  constructor(canvasNode, cfg = {}) {
    super();

    this.chartType = 'bar';
    this._canvas = canvasNode.node;
    this._canvasNode = canvasNode;
    
    //清晰度调整
    this._canvas.width = canvasNode.width * this._dpr;
    this._canvas.height = canvasNode.height * this._dpr;
    this.ctx = this._canvas.getContext('2d');
    this.ctx.scale(this._dpr,this._dpr);

    /**
         * 约定！所有的内部变量都需要这里先声明
         * 可以大大提高源码阅读性
         */
    // 本实例配置文件
    this._config      = this.getConfig(cfg, deepCopy(config));

    // 线条数据
    this._datasets    = [];
  }

  calLabelDataForItem(x, yStartParam, barLabel) {
    let yStart = yStartParam;
    const labelArr = (isType('array', barLabel) ? barLabel : [barLabel]);
    let height   = 0;
    const arr      = [];

    labelArr.forEach((item) => {
      const labelConfig = deepCopy(this._config.barLabelStyle);
      const obj = isType('object', item) ? item : { name: item, style: labelConfig };
      obj.style = extend(labelConfig, obj.style || {});

      yStart -= obj.style.paddingBottom;
      height += obj.style.paddingBottom;

      arr.push({
        text: obj.name || '',
        color: obj.style.color,
        fontSize: obj.style.fontSize,
        x,
        y: yStart,
        textAlign: 'center',
      });
      yStart -= obj.style.fontSize;
      height += obj.style.fontSize;
    });

    return { arr, height };
  }

  calBarData() {
    const config = this._config;
    const render = this._render;

    const { barWidth } = config.barStyle;

    const { xCenterAxis } = render;
    const first         = this._datasets[0];
    const second        = this._datasets[1];
    const count         = first.points.length;
    const { leftBottom } = this._boundary;
    let totalBarWidth   = this._datasets.length * count * barWidth;

    if (second) {
      totalBarWidth += this._config.barStyle.compareBarMargin * count;
    }

    // 每组柱子的间距
    const padding = this._config.barStyle.leftRightPadding * 2;
    const barPadding    = (xCenterAxis.end.x - xCenterAxis.start.x - totalBarWidth - padding) / (count - 1);

    // 柱子的X轴开始位置
    let xStart = xCenterAxis.start.x + this._config.barStyle.leftRightPadding;

    render.bars         = [];
    render.barLabels    = [];
    render.topbarLabels = [];

    const { xAxis } = config;
    const bottom   = leftBottom.y + xAxis.marginTop + xAxis.fontSize;
    const { barStyle } = config;

    first.points.forEach((point, index) => {
      point.fillColor = first.fillColor || barStyle.fillColor;
      const barArr = [point];
      if (second) {
        const cBar = second.points[index];
        cBar.fillColor = second.fillColor || barStyle.fillColor;
        barArr.push(cBar);
      }

      let centerX = xStart + barWidth / 2;
      barArr.forEach((bar, barIndex) => {
        const height = (bar.value - render.min) * render.unitY * render.yMultiple;
        const y = leftBottom.y - height;
        const rect = {
          fillColor: bar.fillColor,
          x: xStart,
          y,
          width: barWidth,
          height,
        };
        render.bars.push(rect);
        if (bar.barLabel) {
          const { arr } = this.calLabelDataForItem(xStart + barWidth / 2 + 1, y, bar.barLabel);

          render.topbarLabels = this._render.topbarLabels.concat(arr);
        }

        xStart += barWidth;

        if (second && barIndex === 0) {
          xStart += config.barStyle.compareBarMargin;
          centerX += (barWidth / 2 + config.barStyle.compareBarMargin / 2) + 0.5;
        } else {
          xStart += barPadding;
        }
      });

      // X轴的标签
      this._render.barLabels.push({
        text: point.label || '',
        color: xAxis.color,
        fontSize: xAxis.fontSize,
        x: centerX,
        y: bottom,
        textAlign: 'center',
      });
    });
  }

  calXAxisLines() {
    const { yAxisWidth } = this._render;
    const { leftBottom } = this._boundary;
    const { rightBottom } = this._boundary;
    const { xAxisLine } = this._config;

    // 计算X轴中轴线数据
    this._render.xCenterAxis = {
      start: {
        x: leftBottom.x + yAxisWidth,
        y: leftBottom.y,
      },
      end: {
        x: rightBottom.x,
        y: leftBottom.y,
      },
      width: xAxisLine.width,
      color: xAxisLine.color,
    };
  }

  calYAxisLines() {
    const data       = this._render;
    const { yAxisWidth } = data;
    const { leftTop } = this._boundary;
    const { leftBottom } = this._boundary;
    const rightTop   = this._boundary.rightBottom;
    const { yAxisLine } = this._config;

    // 计算Y轴中轴线数据
    this._render.yCenterAxis = {
      start: {
        x: leftTop.x + yAxisWidth,
        y: leftTop.y,
      },
      end: {
        x: leftTop.x + yAxisWidth,
        y: leftBottom.y,
      },
      width: yAxisLine.width,
      color: yAxisLine.color,
    };

    this._render.yAxisLines = [];
    this._render.yAxisData.forEach((item, index) => {
      if (index > 0) {
        this._render.yAxisLines.push({
          start: {
            x: item.x + yAxisWidth,
            y: item.y,
          },
          end: {
            x: rightTop.x,
            y: item.y,
          },
          width: yAxisLine.width,
          color: yAxisLine.color,
        });
      }
    });
  }

  /**
     * 计算Y轴的边界和阶梯值
     */
  calYAxis() {
    const { max, min, yDivider, maxYPoint, longestLine } = this.calYAxisBoundary();

    let maxItem;
    this._datasets.forEach((dataset) => {
      dataset.points.forEach((item) => {
        if (!maxItem) {
          maxItem = item;
        } else {
          if (item.value > maxItem.value) {
            maxItem = item;
          }
        }
      });
    });

    const { height } = this.calLabelDataForItem(0, 0, maxItem.barLabel || []);

    const { yAxis } = this._config;

    // 用于绘制的数据
    const yAxisData  = [];

    // Y轴文案所占据的宽度
    let yAxisWidth = 0;

    const cHeight = this._boundary.leftBottom.y - this._boundary.leftTop.y;
    // 计算Y轴上两个点之间的像素值
    let unitY =  cHeight / (yDivider * this._render.yMultiple  * this._config.yAxis.yAxisCount);

    /**
         * 计算最长的条加上label之后的高度,如果超过绘图边界，将unitY更改成刚好使得最长的条填充满绘图区
         * 这里仍然存在一种可能，很短的条有很多label导致超过绘图边界，不予考虑
         */
    const maxH = (maxItem.value - min) * unitY * this._render.yMultiple;
    if (maxH + height > cHeight) {
      unitY = (cHeight - height) / (maxItem.value - min) / this._render.yMultiple;
    }

    const leftStart   = this._boundary.leftTop.x + yAxis.marginLeft;
    const bottomStart = this._boundary.leftBottom.y;

    const changeFunc  = (this._config.changeUnit && this._config.changeUnit !== none
      ? this._config.changeUnit
      : changeUnit);
    const toFixed     = ((max < 1 || max > 1e7)
      ? 2
      : 1);

    for (let i = 0; i < this._config.yAxis.yAxisCount + 1; i++) {
      const word = {
        text: changeFunc(min + i * yDivider, toFixed) + this._config.yAxis.unit,
        color: yAxis.color,
        fontSize: yAxis.fontSize,
        x: leftStart,
        y: bottomStart - (i * yDivider * unitY * this._render.yMultiple),
      };

      yAxisWidth = Math.max(this.getWordWidth(word), yAxisWidth);

      yAxisData.push(word);
    }

    // 考虑Y轴不需要文案的情况
    yAxisWidth = (yAxis.show
      ? yAxisWidth + yAxis.marginRight
      : 0);

    this._render.unitY               = unitY;
    this._render.yAxisWidth          = yAxisWidth;
    this._render.yAxisData           = yAxisData;
    this._render.longestLinePointCnt = maxYPoint;
    this._render.longestLine         = longestLine;

    this.log('calYAxis');
  }

  getMinY(data) {
    return data.reduce(
      (min, p) => (p.value < min
        ? p.value
        : min),
      data[0].value,
    );
  }

  getMaxY(data) {
    return data.reduce(
      (max, p) => (p.value > max
        ? p.value
        : max),
      data[0].value,
    );
  }

  /**
     * 计算用于Y轴绘制需要的数据
     * https://codeburst.io/javascript-finding-minimum-and-maximum-values-in-an-array-of-objects-329c5c7e22a2
     */
  calYAxisBoundary() {
    const datasets    = this._datasets;
    let maxYPoint   = 0;
    let longestLine = datasets[0];
    const { yAxisCount } = this._config.yAxis;
    let max         = -Infinity;
    let min         = Infinity;

    datasets.forEach((oneline) => {
      const points = oneline.points || [];

      if (points.length > maxYPoint) {
        maxYPoint   = points.length;
        longestLine = oneline;
      }

      max = Math.max(this.getMaxY(points), max);
      min = Math.min(this.getMinY(points), min);
    });

    const formatFunc = this._config.formatY || getDataRangeAndStep;
    const range = formatFunc(max, min, yAxisCount);

    this._render.min       = range.min;
    this._render.max       = range.max;
    this._render.yMultiple = range.multiple || 1;

    return {
      max: range.max,
      min: range.min,
      yDivider: range.divider,
      maxYPoint,
      longestLine,
    };
  }

  // 绘制X轴
  drawXAxis() {
    if (this._config.xAxisLine.centerShow) {
      this.drawLine(this.ctx, this._render.xCenterAxis);
    }
  }

  // 绘制Y轴
  drawYAxis() {
    // 绘制Y轴文案
    if (this._config.yAxis.show) {
      this._render.yAxisData.forEach((item) => {
        this.drawWord(this.ctx, item);
      });
    }

    // 根据配置来决定是否绘制Y中心轴
    if (this._config.yAxis.centerShow) {
      this.drawLine(this.ctx, this._render.yCenterAxis);
    }
  }

  // 绘制Y轴横线
  drawYAxisLine() {
    if (this._config.yAxisLine.show) {
      this._render.yAxisLines.forEach((line) => {
        this.drawLine(this.ctx, line);
      });
    }
  }

  /**
     * 绘制所有的点
     */
  drawPoints() {
    this._render.pointData.forEach((oneline) => {
      if (oneline.points.length > 1) this.drawLongLineWithFill(this.ctx, oneline.points, oneline.style);
    });

    this._render.circlePoints.forEach((point) => {
      this.drawCircle(this.ctx, point);
    });
  }

  drawBars() {
    this._render.bars.forEach((bar) => {
      this.drawRect(this.ctx, bar);
    });
    this._render.barLabels.forEach((label) => {
      this.drawWord(this.ctx, label);
    });
    this._render.topbarLabels.forEach((label) => {
      this.drawWord(this.ctx, label);
    });
  }

  /**
     * 将处理后的合法数据按照配置绘制到canvas上面
     */
  drawToCanvas() {
    //清空画布
    this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height );
    this.drawYAxis();
    this.log('drawYAxis');

    this.drawYAxisLine();
    this.log('drawYAxisLine');

    this.drawXAxis();
    this.log('drawXAxis');

    this.drawBars();
    this.log('drawPoints');
  }

  /**
     * 数据清洗和合法性判断
     * 数据字段比较多，存在后面的函数调用依赖前面的计算结果的情况
     * 因此不能随便调换initData里面的函数顺序
     */
  initData(data) {
    this._datasets = (data.datasets || []).filter(dataset => !!dataset.points && dataset.points.length);

    if (!this._datasets.length) {
      return;
    }

    // 为了绘制精确，首先要计算绘制的边界值，防止样式走位
    this.calBoundaryPoint();

    // 计算Y轴数据
    this.calYAxis();

    // 计算Y轴线条数据
    this.calYAxisLines();

    // 计算X轴线条数据
    this.calXAxisLines();

    this.calBarData();

    this.log('initData');
  }

  
  /**
   *  绘制无数据文案
   * */
  drawEmptyData(){
      const config = this._config.emptyData;
      //清空画布
      this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height );
      this.drawWord(this.ctx, {
        text:config.content,
        fontSize: config.fontSize,
        textAlign: 'center',
        color: config.color,
        x:this._canvasNode.width/2,
        y:this._canvasNode.height/2,
      });
  }

  /**
     * 实际的绘制函数
     */
  draw(data, cfg = {}) {
    this._start = new Date();

    this.getConfig(cfg, this._config);

    this.initData(data);

    if (!this._datasets.length) {
      this.drawEmptyData();
      return;
    }

    this.drawToCanvas();

    // this.ctx.draw();

    this.log('realDraw');

    if (this._config.debug) {
      console.log(this._performance);
    }
  }
}

