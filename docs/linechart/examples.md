# 更多示例

## 双坐标轴
经常会有一些需求需要强行将两个不相关的数据放在一个趋势图里面:
1. 想同时在一个趋势图里面看到收入金额和收入环比数据，它们数据单位不一致；
2. 想同时在一个趋势图里面看到跃用户和新增用户，他们可能数据大小差异很大，导致其中一条线是水平直线；

如下图所示:

<img :src="$withBase('/imgs/linechartdemo/axis.jpg')" width=800>

1. 在wxml添加canvas元素
``` html
<canvas
    canvas-id="axisdemo"
    style="width:414px;height:200px"
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
Y轴标签除了添加单位，本身可能也是有中文标识的，比如王者的段位。

如下图所示:

<img :src="$withBase('/imgs/linechartdemo/changeUnit.jpg')" width=800>

1. 在wxml添加canvas元素
``` html
<canvas
    canvas-id="changeUnit"
    style="width:414px;height:200px"
/>
```

``` js
let linechart = new LineChart(
    wx.createCanvasContext('changeUnit'),
    {
        width : 414,
        height: 200,
        changeUnit: function(value) {
            if ( value <= 10 ) {
                return '青铜';
            } else if ( value <= 20 ) {
                return '白银';
            } else if ( value <= 30 ) {
                return '黄金';
            }

            return '铂金';
        }
    },
);

let points = [];
for (let i = 1; i <= 31; i++) {
    points.push({
        x: i,
        y: i,
    });
}

linechart.draw({
    datasets: [
        {
            points  : points,
            lineName: 'test',
        }
    ]
});
```
## formatY
Y轴的最大最小值是组件自动计算的，针对自定义的场景，可以使用formatY函数。

如下图所示:

<img :src="$withBase('/imgs/linechartdemo/formatY.jpg')" width=800>

1. 在wxml添加canvas元素
``` html
<canvas
    canvas-id="formatY"
    style="width:414px;height:200px"
/>
```

2. 实例化组件并且绘制

``` js
let linechart = new LineChart(
    wx.createCanvasContext('formatY'),
    {
        width : 414,
        height: 200,
        formatY: function(max, min, yAxisCount) {
            return {
                max: 100,
                min: 0,
                divider: 25,
                multiple: 1,
            }
        }
    },
);

let points = [];
for (let i = 40; i <= 71; i++) {
    points.push({
        x: i,
        y: i,
    });
}

linechart.draw({
    datasets: [
        {
            points  : points,
            lineName: 'test',
        }
    ]
});
```
