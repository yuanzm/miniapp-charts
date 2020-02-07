# 更多示例

## 双坐标轴
经常会有一些需求需要强行将两个不相关的数据放在一个趋势图里面，比如活跃用户数和当前活跃用户与上周的环比数据。这时候需要左右两个坐标轴，他们互不影响，只是共用绘图区域。

1. 在wxml添加canvas元素
``` html
<canvas
    canvas-id="axisdemo"
    style="width:414px;height:200px"
    bindtouchstart="bindtouchstart"
    bindtouchmove="bindtouchmove"
    bindtouchend="bindtouchend"
/>

```

2. 实例化组件并且绘制
``` js
let linechart = new LineChart(
    wx.createCanvasContext('axisdemo'),
    {
        width : 414,
        height: 200,
    },
);

let points = [];
for (let i = 0; i < 30; i++) {
    points.push({
        x: i + 1,
        y: Math.ceil( 50 + Math.random() * 10),
    });
}

let points2= [];
for (let i = 0; i < 30; i++) {
    points2.push({
        x: i + 1,
        y: Math.ceil( 100 + Math.random() * 10),
    });
}

linechart.draw({
    datasets: [
        {
            points  : points,
            lineName: 'test',
        },
        {
            points  : points2,
            lineName: 'test2',
            style   : {
                lineColor: '#FBBC3B',
                fillColor: 'rgba(251,188,59,0.4)'
            },
            axis    : 2,
        }
    ]
});

```
## changeUnit

## formatY
