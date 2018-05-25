
# wxapp-line-chart
A line chart component for wxapp

# 安装使用
```
git clone https://github.com/yuanzm/wxapp-line-chart
// 小程序内直接引用wxapp-line-chart
import LineChart from 'wxapp-line-chart';
```
# 简单示例
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
            {},
            wx.createCanvasContext('canvas2'),
        );

        this.linechart = linechart;

        let points = [];
        for ( let i = 0; i < 100;i++) {
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

# LineChart参数解析
LineChart构造函数接受三个参数，第一个参数为小程序canvas的Context，第二个参数cfg为配置对象
组件完整的配置可见：[config.js](https://github.com/yuanzm/wxapp-line-chart/blob/master/src/config.js)

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| debug    | Boolean  | 是否开启调试模式，调试模式下面会打出一些调试信息，默认为false|
| width    | Number   | canvas的宽度，因为小程序没有DOM，不能获取canvas的样式信息，需要手动传入 |
| height   | Number   | 同width，需要手动传入 |
| padding  | Object   | canvas的绘图区域的padding，与canvas本身样式的padding无关|
| maxCircleCount | Number | 如果单条线的点很少，每个点会带上一个小圆环，当最长线条的点数量大于maxCircleCount的时候，不绘制小圆环，默认为30 |
|xAxisCount | Number | X轴标签的数量 |
|xAxis      | Object | X轴标签样式配置 |
|xAxisLine  | Object | X中轴线样式配置 |
|yAxisCount | Number | Y轴标签数，默认为4|
| yAxis     | Object | Y轴样式配置    |
| yAxisLine | Object | Y轴中轴线样式配置 |
|toolTip    | Object | tooltip样式配置  |

