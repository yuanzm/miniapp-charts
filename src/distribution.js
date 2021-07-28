// 太老的库，很多变量是下滑线开头的，暂时屏蔽先
/* eslint no-underscore-dangle: "off"*/

import {
  isType,
  extend,
  deepCopy,
} from './util.js';

import config from './config/distribution.js';
import Base   from './base/index.js';

/**
 * 小程序折线图绘制组件
 */
export default class DistributionChart extends Base {
  /**
   * @param { canvasNode } canvasNode: canvas节点
   * @param { CanvasContext } ctx2: 小程序的绘图上下文
   * @param { Object } cfg: 组件配置
   */
  constructor(canvasNode, cfg = {}) {
    super();

    this.chartType = 'distribution';
    this._canvas = canvasNode.node;

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

    this.totalHeight  = 0;
    this._height = this._canvas.height;
  }

  /**
   *  当容器的高度需要变更时必须手动实现图表的变更从而实现反拉伸保持图表渲染稳定
   * */
  setHeight(h){
    this.ctx.scale(1, this._height  / this._dpr / h);
    this._height = this._dpr * h;
  }

  calLabelDataForItem(xStartParam, y, barLabel) {
    let xStart = xStartParam;
    const labelArr = (isType('array', barLabel) ? barLabel : [barLabel]);
    let width    = 0;
    const arr      = [];

    labelArr.forEach((item) => {
      const labelConfig = deepCopy(this._config.barLabelStyle);
      const obj = isType('object', item) ? item : { name: item, style: labelConfig };
      obj.style = extend(labelConfig, obj.style || {});

      width  += obj.style.paddingLeft;
      xStart += obj.style.paddingLeft;

      const word = {
        text: obj.name || '',
        color: obj.style.color,
        fontSize: obj.style.fontSize,
        x: xStart,
        y,
        textAlign: 'left',
        baseline: 'middle',
      };
      arr.push(word);
      const w = this.getWordWidth(word);
      xStart += w;
      width  += w;
    });

    return { arr, width };
  }

  calBarData() {
    const config = this._config;
    const render = this._render;
    const { barStyle } = config;

    let yStart = config.padding.top + config.barStyle.topBottomPadding;
    const xStart = config.padding.left + render.yAxisWidth;

    const first  = this._datasets[0];
    const others = this._datasets.slice(1);

    const maxItemMap = this.getMaxItem();

    const barData      = [];
    let barLabelData   = [];

    const maxBarWidthMap = [];

    first.points.forEach((point, index) => {
      const barArr = this._datasets.map((dataset) => {
        const bar = dataset.points[index];
        bar.fillColor = dataset.fillColor || barStyle.fillColor;

        return bar;
      });

      barArr.forEach((bar, barIndex) => {
        const maxItem = maxItemMap[barIndex];
        if (!maxBarWidthMap[barIndex]) {
          const { width } = this.calLabelDataForItem(0, 0, maxItem.barLabel);
          maxBarWidthMap[barIndex] = config.width - config.padding.right - xStart - width;
        }

        const rect = {
          fillColor: bar.fillColor,
          x: xStart,
          y: yStart,
          width: maxItem.value ? (bar.value / maxItem.value) * maxBarWidthMap[barIndex] : 0,
          height: barStyle.height,
        };

        // TODO: fix 0.5
        if (bar.barLabel) {
          // eslint-disable-next-line
          const { arr } = this.calLabelDataForItem(xStart + rect.width, yStart + barStyle.height / 2 - 0.5, bar.barLabel);
          barLabelData = barLabelData.concat(arr);
        }

        yStart += barStyle.height;

        if (others.length && barIndex < barArr.length - 1) {
          yStart += config.barStyle.compareBarMargin;
        } else {
          yStart += barStyle.padding;
        }

        barData.push(rect);
      });

      const centerY = (barArr.length > 1
        ? yStart - barStyle.padding - barStyle.height - config.barStyle.compareBarMargin / 2
        : yStart - barStyle.padding - barStyle.height / 2);

      this._render.yAxisData[index].y = centerY;
    });

    this._render.barData      = barData;
    this._render.barLabelData = barLabelData;
    this._render.totalHeight  = yStart - barStyle.padding + config.padding.bottom + config.barStyle.topBottomPadding;
    this.totalHeight          = this._render.totalHeight;
  }

  calYAxisLines() {
    const config  = this._config;
    const { padding } = config;
    const render  = this._render;
    const { yAxisLine } = config;

    // 计算Y轴中轴线数据
    this._render.yCenterAxis = {
      start: {
        x: padding.left + render.yAxisWidth,
        y: padding.top,
      },
      end: {
        x: padding.left + render.yAxisWidth,
        y: render.totalHeight - padding.bottom,
      },
      width: yAxisLine.width,
      color: yAxisLine.color,
    };
  }

  getDatasetMaxItem(dataset) {
    let maxItem;
    dataset.points.forEach((item) => {
      if (!maxItem) {
        maxItem = item;
      } else {
        if (item.value > maxItem.value) {
          maxItem = item;
        }
      }
    });

    return maxItem;
  }

  getMaxItem() {
    let maxItem;
    const maxItemMap = [];

    this._datasets.forEach((dataset, index) => {
      const item = this.getDatasetMaxItem(dataset);

      maxItemMap[index] = item;

      if (!maxItem) {
        maxItem = item;
      } else {
        if (item.value > maxItem.value) {
          maxItem = item;
        }
      }
    });

    this._datasets.forEach((dataset, index) => {
      if (!dataset.independentAxis) {
        maxItemMap[index] = maxItem;
      }
    });

    return maxItemMap;
  }

  /**
   * 计算Y轴的边界和阶梯值
   */
  calYAxis() {
    const { yAxis } = this._config;
    // 用于绘制的数据
    const yAxisData  = [];
    // Y轴文案所占据的宽度
    let yAxisWidth = 0;
    const leftStart   = this._boundary.leftTop.x + yAxis.marginLeft;

    this._datasets[0].points.forEach((item) => {
      const word = {
        text: item.label || '',
        color: yAxis.color,
        fontSize: yAxis.fontSize,
        x: leftStart,
        y: 0,
        baseline: 'middle',
      };

      yAxisWidth = Math.max(this.getWordWidth(word), yAxisWidth);

      yAxisData.push(word);
    });

    // 考虑Y轴不需要文案的情况
    yAxisWidth = (yAxis.show
      ? yAxisWidth + yAxis.marginRight
      : 0);

    this._render.yAxisData  = yAxisData;
    this._render.yAxisWidth = yAxisWidth;
  }

  // 绘制Y轴
  drawYAxis() {
    // 绘制Y轴文案
    if (this._config.yAxis.show) {
      this._render.yAxisData.forEach((item) => {
        this.drawWord(this.ctx, item);
      });
    }
  }

  // 绘制Y轴横线
  drawYAxisLine() {
    this.drawLine(this.ctx, this._render.yCenterAxis);
  }

  drawBars() {
    this._render.barData.forEach((bar) => {
      this.drawRect(this.ctx, bar);
    });
    this._render.barLabelData.forEach((label) => {
      this.drawWord(this.ctx, label);
    });
  }

  /**
   * 将处理后的合法数据按照配置绘制到canvas上面
   */
  drawToCanvas() {
    this.ctx.clearRect(0, 0, 99999, 99999);
    this.drawYAxis();
    this.drawYAxisLine();
    this.drawBars();
  }

  /**
   * 数据清洗和合法性判断
   * 数据字段比较多，存在后面的函数调用依赖前面的计算结果的情况
   * 因此不能随便调换initData里面的函数顺序
   */
  initData(data, cfg = {}) {
    this.getConfig(cfg, this._config);
    this._datasets = (data.datasets || []).filter(dataset => !!dataset.points && dataset.points.length);

    if (!this._datasets.length) {
      return;
    }

    // 为了绘制精确，首先要计算绘制的边界值，防止样式走位
    this.calBoundaryPoint();

    // 计算Y轴数据
    this.calYAxis();
    this.calBarData();
    // 计算Y轴线条数据
    this.calYAxisLines();
  }

  /**
   * 实际的绘制函数
   */
  draw() {
    if (!this._datasets.length) {
      return;
    }

    this.drawToCanvas();
    // this.ctx.draw();
  }
}

