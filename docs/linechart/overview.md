# 介绍

折线图组件用于绘制一条或者多条曲线。

<img src="/imgs/linechart.jpg" width=400>

## 示例

1. 在wxml添加canvas
``` html
   <canvas
    canvas-id="canvas1"
    style="width:414px;height:200px;margin:0;"
    bindtouchstart="bindtouchstart"
    bindtouchmove="bindtouchmove"
    bindtouchend="bindtouchend"
   />
```

2. 在js里面实例化组件
``` js
import LineChart         from 'miniapp-charts';

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

