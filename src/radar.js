import { isType, deepCopy } from "./util.js";

import config from "./config/radar.js";
import Base from "./base/index.js";

export default class RadarChart extends Base {
  constructor(ctx, cfg = {}) {
    super();

    this._touchTimer = 0;
    this.chartType = "radar";
    this.ctx = ctx;

    this._config = this.getConfig(cfg, deepCopy(config));

    this._render.center = this.getCenterPoint();
  }

  /**
   * 雷达图的画图是从中心点开始扩散画的，首先求出中心点
   */
  getCenterPoint() {
    return {
      x: this._config.width / 2,
      y: this._config.height / 2,
    };
  }

  /**
   * 计算辐射状的线条角度数据
   */
  calAngleLineData() {
    let center = this._render.center;
    let radius = this._render.radius;
    let labels = this._render.labels;
    let oneAngel = 360 / labels.length;

    let baseX = center.x;
    let baseY = center.y;

    let style = this._config.radiationLineStyle;
    let startAngle = this._config.startAngle;

    return labels.map((item, index) => {
      let rad = (Math.PI * (startAngle + oneAngel * index)) / 180;

      let x = baseX + radius * Math.sin(rad);
      let y = baseY - radius * Math.cos(rad);

      return {
        start: center,
        end: { x, y },
        width: style.width,
        color: style.color,
        isDash: !!(style.style === "dash"),
        dashPattern: style.dashPattern,
        dashOffset: style.dashOffset,

        angel: startAngle + oneAngel * index,
      };
    });
  }

  /**
   * 计算网格线数据
   */
  calGridLineData() {
    let grid = this._config.grid;
    let center = this._render.center;

    let steps = parseInt((grid.max - grid.min) / grid.stepSize);

    let lines = [];

    for (let i = 1; i <= steps; i++) {
      let oneline = {
        color: grid.color,
        width: grid.width,
        isDash: !!(grid.style == "dash"),
        dashPattern: grid.dashPattern,
        dashOffset: grid.dashOffset,
        points: [],
        r: 0,
        marginLineColor:
          this._config.grid.marginLineColor == "default"
            ? this._config.grid.color
            : this._config.grid.marginLineColor,
      };

      this._render.angelLineData.forEach((angel) => {
        let x = center.x + (angel.end.x - center.x) * (i / steps);
        let y = center.y - (center.y - angel.end.y) * (i / steps);

        oneline.points.push({ x, y });
      });

      // 形成一个闭环
      oneline.points.push(oneline.points[0]);
      oneline.r = Math.sqrt(
        this.calEuclideanDistance(
          this._render.center.x,
          this._render.center.y,
          oneline.points[0].x,
          oneline.points[0].y
        )
      );
      lines.push(oneline);
    }

    this._render.steps = steps;

    return lines;
  }

  calDatasetsData(animationPercent = 1) {
    let datasets = this._datasets;
    let angelLineData = this._render.angelLineData;
    let center = this._render.center;
    let grid = this._config.grid;
    let lines = [];
    let style = this._config.datasetStyle;

    datasets.forEach((oneset) => {
      let points = [];

      let lineStyle = this.getConfig(oneset || {}, deepCopy(style));
      oneset.style = lineStyle;

      oneset.data.forEach((point, index) => {
        let angel = angelLineData[index];
        let percent = (point * animationPercent) / (grid.max - grid.min);

        let x = center.x + (angel.end.x - center.x) * percent;
        let y = center.y - (center.y - angel.end.y) * percent;

        points.push({ x, y });
      });

      points.push(points[0]);

      lines.push({
        points,
        style: lineStyle,
        width: lineStyle.borderWidth,
        color: lineStyle.borderColor,
        fill: true,
        fillColor: lineStyle.backgroundColor,
        isDash: !!(lineStyle.borderLineStyle === "dash"),
        dashPattern: lineStyle.borderDashPattern,
        dashOffset: lineStyle.borderDashOffset,
      });
    });

    return lines;
  }

  // 计算单个label的size
  calOneLabelSize(label, style = {}) {
    this.ctx.setFontSize(style.fontSize);

    let width = this.ctx.measureText(label).width;
    let height = style.fontSize;

    width += style.margin.left + style.margin.right;
    height += style.margin.top + style.margin.bottom;

    return { width, height, style };
  }

  calLabelSize() {
    let style = this._config.label;
    let labels = this._render.labels;

    return labels.map((label, index) => {
      let width = 0;
      let height = 0;
      let subSize;

      if (isType("array", label)) {
        label.forEach((item, lIndex) => {
          // 本身就是一个完整的label配置
          if (isType("object", item)) {
            // 覆盖默认配置得到新的配置
            let newItem = this.getConfig(item, deepCopy(style));

            // 直接替换掉原始数据的值，方便后续使用
            newItem.text = item.text;
            label[lIndex] = newItem;

            subSize = this.calOneLabelSize(item.text, newItem);
          } else if (isType("string", item)) {
            subSize = this.calOneLabelSize(item, style);
          } else subSize = { width: 0, height: 0 };

          width = Math.max(subSize.width, width);
          height += subSize.height;
        });
      }

      // 不是数组，但是自带样式等配置
      else if (isType("object", label)) {
        let newLabel = this.getConfig(label, deepCopy(style));

        newLabel.text = label.text || "";
        labels[index] = newLabel;

        subSize = this.calOneLabelSize(label.text || "", newLabel);

        width = subSize.width;
        height = subSize.height;
      } else {
        let size = this.calOneLabelSize(label, style);

        width = size.width;
        height = size.height;
      }

      return { width, height, style };
    });
  }

  /**
   * 先假想一个半径值，雷达区域的边界点
   */
  calRadius() {
    let { left, right, top, bottom } = this.calGridBoundary();

    let min = Math.min(this._config.width, this._config.height) / 2;
    let padding = this._config.padding;
    let size = this._render.labelsSizeData;

    let arr = [
      {
        value: min - size[left].width - padding.left,
        index: left,
      },
      {
        value: min - size[right].width - padding.right,
        index: right,
      },
      {
        value: min - size[top].height - padding.top,
        index: top,
      },
      {
        value: min - size[bottom].height - padding.bottom,
        index: bottom,
      },
    ];

    arr.sort((a, b) => {
      return a.value - b.value;
    });

    let minR = arr[0].value;
    let maxR = arr[arr.length - 1].value;

    let minAngel =
      this._config.startAngle +
      (360 / this._render.labels.length) * arr[0].index;
    let tmp = Math.cos((Math.PI * (minAngel % 45)) / 180);

    return minR / tmp > maxR ? maxR : minR / tmp;
  }

  /**
   * 计算雷达图的半径
   * 为了最大化利用绘图面积，需要考虑多种因素来计算
   * 1. 每一个点的label可以设置多行
   * 2. 每一个label都是可以有样式设置的
   * 3. 需要知道多行的label是都在最上面或者最下面
   */
  calGridBoundary() {
    let radiusGuess = 100;
    let center = this._render.center;
    let startAngle = this._config.startAngle;
    let oneAngel = 360 / this._render.labels.length;
    let temp = [];

    let sizeData = this._render.labelsSizeData;

    this._render.labels.forEach((label, index) => {
      let rad = (Math.PI * (startAngle + oneAngel * index)) / 180;

      let x = center.x + radiusGuess * Math.sin(rad);
      let y = center.y - radiusGuess * Math.cos(rad);

      temp.push({ x, y, index, size: sizeData[index] });
    });

    temp.sort((a, b) => {
      let v1 = parseFloat(parseFloat(a.x).toFixed(2));
      let v2 = parseFloat(parseFloat(b.x).toFixed(2));

      return v1 - v2 || a.size.width - b.size.width;
    });

    let left = temp[0].index;
    let right = temp[temp.length - 1].index;

    temp.sort((a, b) => {
      let v1 = parseFloat(parseFloat(a.y).toFixed(2));
      let v2 = parseFloat(parseFloat(b.y).toFixed(2));

      return v1 - v2 || a.size.height - b.size.height;
    });

    let top = temp[0].index;
    let bottom = temp[temp.length - 1].index;

    return { left, right, top, bottom };
  }

  /**
   * 计算label数据
   */
  calLabelPosData() {
    let angelLineData = this._render.angelLineData;
    let center = this._render.center;
    let labelsSizeData = this._render.labelsSizeData;

    return this._render.labels.map((label, index) => {
      let base = angelLineData[index].end;
      let { width, height } = labelsSizeData[index];
      let baseX = parseInt(base.x);
      let baseY = parseInt(base.y);
      let centerX = parseInt(center.x);
      let centerY = parseInt(center.y);

      let startX, startY;

      if (baseX === centerX) startX = baseX - width / 2;
      else if (baseX > centerX) startX = baseX;
      else if (baseX < centerX) startX = baseX - width;

      if (baseY === centerY) startY = baseY + height / 2;
      else if (baseY < centerY) startY = baseY - height;
      else startY = baseY;

      return { startX, startY };
    });
  }

  calOneLabel(style, label, x, y) {
    return {
      display: style.display,
      fontSize: style.fontSize,
      color: style.color,
      text: label,
      x: x,
      y: y,
      isbottom: true,
    };
  }

  calLabelData() {
    let result = [];
    let style = this._config.label;
    let posData = this._render.labelPosData;

    this._render.labels.forEach((label, index) => {
      let pos = posData[index];
      if (isType("string", label)) {
        result.push(
          this.calOneLabel(
            style,
            label,
            pos.startX + style.margin.left,
            pos.startY + style.fontSize + style.margin.top
          )
        );
      } else if (isType("array", label)) {
        label.forEach((item, index) => {
          if (isType("string", item)) {
            result.push(
              this.calOneLabel(
                style,
                item,
                pos.startX + style.margin.left,
                pos.startY + (style.fontSize + style.margin.top) * (index + 1)
              )
            );
          } else if (isType("object", item)) {
            result.push(
              this.calOneLabel(
                Object.assign(deepCopy(style), item),
                item.text,
                pos.startX + style.margin.left,
                pos.startY + (style.fontSize + style.margin.top) * (index + 1)
              )
            );
          }
        });
      } else if (isType("object", label)) {
        result.push(
          this.calOneLabel(
            Object.assign(deepCopy(style), label),
            label.text,
            pos.startX + label.margin.left,
            pos.startY + (label.fontSize + label.margin.top)
          )
        );
      }
    });

    return result;
  }

  calPointData() {
    let circles = [];
    this._datasets.forEach((dataset, index) => {
      if (!dataset.pointShow) return;
      let points = this._render.datasetsData[index].points;
      let style = dataset.style || this._config.datasetStyle;
      for (let i = 0; i < points.length - 1; i++) {
        let point = points[i];
        let focus = !this._render.toolTipData
          ? false
          : this._render.toolTipData.focusIndex == i;
        circles.push({
          x: point.x,
          y: point.y,
          r: focus ? style.focusStyle.pointRadius || 2 : style.pointRadius || 2,
          fillColor: focus
            ? style.focusStyle.pointBackgroundColor || "#FFFFFF"
            : style.pointBackgroundColor || "#FFFFFF",
          strokeColor: focus
            ? style.focusStyle.pointBorderColor || style.pointBorderColor
            : style.pointBorderColor,
          lineWidth: focus
            ? style.focusStyle.pointBorderWidth || style.pointBorderWidth
            : style.pointBorderWidth,
        });
      }
    });

    return circles;
  }

  /**
   *  配置信息框
   */
  calToolTipData(e) {
    let _config = this._config.toolTip;
    let touches = e.touches[0]; // .x .y
    //根据辐射线顶点计算出 焦点 索引
    let angelLineData = this._render.angelLineData;
    let d_min = 99999,
      index_min = -1;
    for (let i = 0; i < angelLineData.length; i++) {
      let d = this.calEuclideanDistance(
        touches.x,
        touches.y,
        angelLineData[i].end.x,
        angelLineData[i].end.y
      );
      if (d < d_min) {
        d_min = d;
        index_min = i;
      }
    }
    if (index_min == -1) {
      this._render.toolTipData = null;
      return;
    }
    //定义信息框各项信息
    let info = {
      focusIndex: index_min, //焦点索引
      title: this._render.labels[index_min], //大标题 取决于 Label
      subTitleData: [
        //子标题数据
        /*
                    {
                        title : '',
                        pointStyle : {}, //来源与 数据图层 焦点样式
                        dataStr : '', //数据文本
                    }
                */
      ],
      width: 0, //尺寸与定位
      height: 0,
      x: 0,
      y: 0,
    };

    //parser subTitle
    let datasetsData = this._render.datasetsData;
    for (let i in datasetsData) {
      let raw = datasetsData[i];
      let rawData = this._datasets[i];
      let _sub = {
        title: raw.style.label,
        pointStyle: raw.style.focusStyle,
        dataStr: !rawData.dataStr
          ? rawData.data[index_min]
          : rawData.dataStr[index_min],
        content: "",
      };
      _sub.content = _sub.title + "：" + _sub.dataStr;
      info.subTitleData.push(_sub);
    }

    //外边框 wrapper
    info.wrapper = {
      fillColor: _config.fillColor,
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      r: 6,
    };

    //大标题
    let wordStyle = {
      text: info.title,
      fontSize: _config.fontSize,
    };
    let _title0_width = this.measureText(this.ctx, wordStyle);

    //小标题
    let _subtitle_width = [];
    for (let i in info.subTitleData) {
      let r = info.subTitleData[i];
      wordStyle.text = r.content;
      _subtitle_width.push(
        this.measureText(this.ctx, wordStyle) + _config.fontSize * 2
      );
    }

    //选取宽度最大值作为
    let maxwidth = 0;
    for (let i in _subtitle_width) {
      if (_subtitle_width[i] > maxwidth) maxwidth = _subtitle_width[i];
    }
    if (_title0_width > maxwidth) maxwidth = _title0_width;

    info.wrapper.width =
      maxwidth + _config.padding.left + _config.padding.right;
    info.wrapper.height = _config.padding.top + _config.padding.bottom;
    let lineHeight = _config.linePadding + _config.fontSize;
    info.wrapper.height += (_subtitle_width.length + 1) * lineHeight;

    //各个文字位置信息
    let _top = _config.padding.top + 5;
    let _top0 = _config.fontSize / 2;
    info.titleStyle = {
      color: _config.color,
      left: _config.padding.left,
      top: _top + _top0,
      size: _config.fontSize,
      text: info.title,
    };
    info.words = [];
    info.icons = [];

    for (let i = info.subTitleData.length - 1; i >= 0; i--) {
      // *** 请注意这里采用倒序渲染 ***  因为列表第一行是 上层数据涂层
      _top += lineHeight;
      info.words.push({
        color: _config.color,
        left: _config.padding.left + _config.fontSize * 2,
        top: _top + _top0,
        size: _config.fontSize,
        text: info.subTitleData[i].content,
      });
      //数据涂层对应的小圆点颜色 （颜色为焦点状态颜色）
      info.icons.push({
        pointBackgroundColor: this._render.datasetsData[i].style.focusStyle
          .pointBackgroundColor,
        pointBorderColor: this._render.datasetsData[i].style.focusStyle
          .pointBackgroundColor,
        pointBorderWidth: this._render.datasetsData[i].style.focusStyle
          .pointBorderWidth,
        pointRadius: _config.fontSize / 2,
        left: _config.padding.left + _config.fontSize / 2,
        top: _top,
      });
    }

    //自适应位置
    //位置跟随
    info.wrapper.x = touches.x - info.wrapper.width - 30;
    info.wrapper.y = touches.y - info.wrapper.height - 30;

    if (info.wrapper.x < _config.padding.left) {
      info.wrapper.x = _config.padding.left;
    }
    if (info.wrapper.y < _config.padding.top) {
      info.wrapper.y = _config.padding.top;
    }
    if (info.wrapper.x > this._config.width - _config.padding.right) {
      info.wrapper.x = this._config.width - _config.padding.right;
    }
    if (info.wrapper.y > this._config.height - _config.padding.bottom) {
      info.wrapper.y = this._config.height - _config.padding.bottom;
    }
    this._render.toolTipData = info;
  }

  /**
   *  计算欧式距离 由于本算法中只比距离大小 该函数没有开平方
   */
  calEuclideanDistance(x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
  }

  /**
   *  绘制信息框
   */
  drawToolTip() {
    let _toolTipData = this._render.toolTipData;
    // console.log(_toolTipData);
    //先绘制背景矩形
    this.drawRect(this.ctx, _toolTipData.wrapper);

    let offsetX = _toolTipData.wrapper.x;
    let offsetY = _toolTipData.wrapper.y;

    //再绘制大标题
    this.drawWord(this.ctx, {
      text: _toolTipData.titleStyle.text,
      isbottom: false,
      baseline: false,
      fontSize: _toolTipData.titleStyle.size,
      color: _toolTipData.titleStyle.color,
      textAlign: "left",
      x: _toolTipData.titleStyle.left + offsetX,
      y: _toolTipData.titleStyle.top + offsetY,
    });

    //再绘制各个小标题 以及 前面的小圆点
    for (let i in _toolTipData.words) {
      let _r = _toolTipData.words[i];
      let _icon = _toolTipData.icons[i];
      //文字
      this.drawWord(this.ctx, {
        text: _r.text,
        isbottom: false,
        baseline: false,
        fontSize: _r.size,
        color: _r.color,
        textAlign: "left",
        x: _r.left + offsetX,
        y: _r.top + offsetY,
      });
      //小圆点
      this.drawCircle(this.ctx, {
        strokeColor: "#FFFFFF",
        fillColor: _icon.pointBackgroundColor,
        lineWidth: 2,
        x: _icon.left + offsetX,
        y: _icon.top + offsetY,
        r: _icon.pointRadius,
      });
    }
  }

  /**
   * 绘制网格线
   */
  drawGrid(ctx, grid) {
    //判断最外圈要求样式
    if (this._config.grid.marginLineStyle == "circle") {
      //默认
      //最外圈圆环
      for (let i = 0; i < grid.length - 1; i++) {
        this.drawLongLine(this.ctx, grid[i]);
      }
      //最外圈
      let _ps = grid[grid.length - 1];
      this.drawCircle(this.ctx, {
        strokeColor: _ps.marginLineColor,
        fillColor: null,
        lineWidth: this._config.grid.width,
        x: this._render.center.x,
        y: this._render.center.y,
        r: _ps.r,
      });
      //最外圈的高亮点
      if (this._config.grid.marginLinePointRadius > 0)
        //高亮点半径 > 0时
        for (let i in _ps.points) {
          let item = _ps.points[i];
          this.drawCircle(this.ctx, {
            strokeColor: this._config.grid.marginLinePointColor,
            fillColor: this._config.grid.marginLinePointColor,
            lineWidth: 1,
            x: item.x,
            y: item.y,
            r: this._config.grid.marginLinePointRadius,
          });
        }
    } else {
      this._render.gridLineData.forEach((line) => {
        this.drawLongLine(this.ctx, line);
      });
    }
  }

  /**
   * 初始化所有数据
   */
  initData(data) {
    this._datasets = data.datasets || [];
    this._render.labels = data.labels || [];

    this._config.startAngle = this._config.startAngle % 360;

    // 数据的计算会有前后依赖关系，不可随意更改函数调用关系
    this._render.labelsSizeData = this.calLabelSize();
    this._render.radius = this.calRadius();
    this._render.angelLineData = this.calAngleLineData();
    this._render.gridLineData = this.calGridLineData();
    this._render.labelPosData = this.calLabelPosData();
    this._render.labelData = this.calLabelData();

    this._render.datasetsData = this.calDatasetsData();
    this._render.pointData = this.calPointData();

    // console.log(this._render)
    // console.log(this._datasets)
    // console.log(this._config)
  }

  drawToCanvas(percent = 1) {
    // 辐射状的线条
    if (this._config.radiationLineStyle.display) {
      this._render.angelLineData.forEach((line) => {
        this.drawLine(this.ctx, line);
      });
    }

    // 网格线
    if (this._config.grid.display) {
      this.drawGrid(this.ctx, this._render.gridLineData);
    }

    // 标签数据
    this._render.labelData.forEach((label) => {
      if (label.display) this.drawWord(this.ctx, label);
    });

    if (this._config.animation) {
      this._render.datasetsData = this.calDatasetsData(percent);
      this._render.pointData = this.calPointData();
    }

    // 区域数据
    this._render.datasetsData.forEach((line) => {
      this.drawLongLine(this.ctx, line);
    });

    this._render.pointData.forEach((point) => {
      this.drawCircle(this.ctx, point);
    });

    //信息框
    if (this._render.toolTipData) {
      this.drawToolTip();
    }

    this.ctx.draw();
  }

  draw(data, cfg = {}) {
    this._start = new Date();

    this._config = this.getConfig(cfg, this._config);

    this.initData(data);

    this.animationLopp(this._config, this.drawToCanvas);

    if (this._config.debug) {
      console.log("time cost:", new Date() - this._start, "ms");
      console.log("render data:", this._render);
      console.log("config:", this._config);
    }
  }

  /**
   *  用户Touch事件 / 焦点产生事件
   *  节流器
   */
  touch(e) {
    if (!this._touchTimer) {
      this._touchTimer = setTimeout(() => {
        this._touchTimer = 0;
      }, 50);
      this.touchHandler(e);
    }
  }

  /**
   *  用户TouchEnd事件 / 娇嗲你移除事件
   */
  touchEnd(e) {
    //取消信息框
    this._render.toolTipData = null;
    //重绘
    this.drawToCanvas();
  }

  touchHandler(e) {
    //计算 ToolTip的相关数据
    this.calToolTipData(e);
    //重绘制现有雷达图内容
    this.drawToCanvas();
  }
}
