# 介绍

通过使用水平或垂直方向柱子的高度来显示不同类别的数值。
<img :src="$withBase('/imgs/barchart.jpg')" width=400>

## 示例

1. 在wxml添加canvas
``` html
   <canvas
    canvas-id="bar"
    style="width:414px;height:200px;margin:0;"
   />
```

2. 在js里面实例化组件
``` js
import BarChart from 'miniapp-charts';

Page({
    onLoad() {
        this.init();
    },
    init() {
        let context = wx.createCanvasContext('bar');

        let barchart = new BarChart(
            wx.createCanvasContext('bar'),
            {
                width : 414,
                height: 200,
                unit  : '%',
                debug : true,
            },
        );

        barchart.draw({
            datasets: [
                {
                    name: '行业',
                    fillColor: '#6684C7',
                    points: [
                        {
                            label: '新增',
                            value: 20,
                            barLabel: '20%',
                        },
                        {
                            label: '活跃',
                            value: 100,
                            barLabel: '100%',
                        },
                        {
                            label: '留存',
                            value: 5,
                            barLabel: [{
                                name: '335',
                                style: {
                                    color: '#6684C7',
                                }
                            }, '50%'],
                        },
                    ],
                },
                {
                    name: '行业',
                    fillColor: '#3AC6D5',
                    points: [
                        {
                            label: '新增',
                            value: 120,
                            barLabel: [{
                                name: '335',
                                style: {
                                    color: '#6684C7',
                                }
                            }, '50%'],
                        },
                        {
                            label: '活跃',
                            value: 77,
                        },
                        {
                            label: '留存',
                            value: 34,
                        },
                    ],
                }
            ]
        });
   },
}
```


