# README

## wxapp-line-chart

A line chart component for wxapp

## 安装使用

```text
git clone https://github.com/yuanzm/wxapp-line-chart
// 小程序内直接引用wxapp-line-chart
import LineChart from 'wxapp-line-chart';
```

## 简单示例

1. 在wxml添加canvas
```
   <canvas
    canvas-id="canvas1"
    style="width:414px;height:200px;margin:0;"
    bindtouchstart="bindtouchstart"
    bindtouchmove="bindtouchmove"
    bindtouchend="bindtouchend"
   />
 ```

2. 在js里面实例化组件
```
import LineChart from '../../utils/linechart/index.js';

Page({
    onLoad() {
        this.init();
    },
    init() {
        let linechart = new LineChart(
            wx.createCanvasContext('canvas1'),
            {
                height: 200,
            },
            //wx.createCanvasContext('canvas2'),
        );

        this.linechart = linechart;

        let points = [];
        for ( let i = 0; i < 108;i++) {
            points.push({
                x: i + 1,
                y: Math.ceil(Math.random()*30),
            });
        }

        linechart.draw({
            datasets: [
                {
                    points  : points,
                    lineName: 'test',
                },
            ]
        });
    },
    bindtouchstart(e) {
        this.linechart.touch(e);
    },
    bindtouchmove(e) {
        this.linechart.touch(e);
    },
    bindtouchend(e) {
        this.linechart.touchEnd(e);
    }
});

```

## LineChart参数解析

LineChart构造函数接受三个参数，第一个参数为小程序canvas的Context，第二个参数cfg为配置对象 组件完整的配置可见：[config.js](https://github.com/yuanzm/wxapp-line-chart/blob/master/src/config.js)

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| debug    | Boolean  | 是否开启调试模式，调试模式下面会打出一些调试信息，默认为false|
| width    | Number   | canvas的宽度，因为小程序没有DOM，不能获取canvas的样式信息，需要手动传入, 默认为414 |
| height   | Number   | 同width，需要手动传入，默认为200 |
| padding  | Object   | canvas的绘图区域的padding，与canvas本身样式的padding无关|
| maxCircleCount | Number | 如果单条线的点很少，每个点会带上一个小圆环，当最长线条的点数量大于maxCircleCount的时候，不绘制小圆环，默认为30 |
|xAxisCount | Number | X轴标签的数量(不包含原点标签)，默认为7 |
|xAxis      | Object | X轴标签样式配置 |
|xAxisLine  | Object | X中轴线样式配置 |
|yAxisCount | Number | Y轴标签数(不包含原点标签)，默认为4|
| yAxis     | Object | Y轴样式配置    |
| yAxisLine | Object | Y轴中轴线样式配置 |
| toolTip | Object | tooltip样式配置 |

## padding配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| left     | Number   | 左边距，默认为10 |
| right    | Number   | 右边距，默认为10 |
| top      | Number   | 上边距，默认为10 |
| bottom   | Number   | 下边距，默认为5  |

## xAxis配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| show     | Boolean  | 是否需要展示X轴标签，默认为true|
| marginTop| Number   | X轴标签与X轴中轴线的间距，默认为10 |
| color    | String   | X轴标签字体颜色，默认为#B8B8B8 |
| fontSize | Number   | X轴标签字体大小，默认是11 |

## xAxisLine配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| show     | Boolean | 是否展示X轴标签对应的线条，默认为false |
| centerShow | Boolean | 是否需要展示X轴的中轴线，默认为true |
| width     | Number   | 线条的宽度，默认为0.6 |
| color     | String    | 线条的颜色，默认为#C6C6C6 |
| style     | String    | 线条的样式，默认为solid，可选的为dash |

## yAxis配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| show     | Boolean  | 是否需要展示Y轴标签，默认为true|
| marginLeft | Number | Y轴标签与canvas左边缘的距离(不包含padding里面的设置），默认是0 |
| marginRight | Number | Y轴变迁与Y轴中轴线的距离，默认为10 |
| color     | String  | Y轴标签的字体颜色 |
| fontSize  | Number   | Y轴标签的字体大小 |


## yAxisLine配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| show     | Boolean | 是否展示Y轴标签对应的线条，默认为true|
| centerShow | Boolean | 是否需要展示X轴的中轴线，默认为false|
| width     | Number   | 线条的宽度，默认为0.6 |
| color     | String    | 线条的颜色，默认为#C6C6C6 |
| style     | String    | 线条的样式，默认为solid，可选的为dash |

## toolTip配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| lineColor | Sring | toolTip中轴线的颜色，默认为#C6C6C6 |
| lineWidth | Number | toolTip中轴线的宽度，默认为0.5    |
| fontSize  | Number  | toolTip的字体大小，默认为11 |
| color     | String  | toolTip的字体颜色，默认为#FFFFFF |
| fillColor | String  | toolTip的背景颜色，默认为rgba(136, 136, 136, 0.6) |
| linePadding | Number | 文案行间距，默认为5 |
| padding     | Object | toolTip的padding，默认padding.left = 5, padding.right = 5,padding.top = 5, padding.bottom = 5 |

