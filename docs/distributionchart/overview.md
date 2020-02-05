# 介绍

横向柱状图

<img :src="$withBase('/imgs/distribution.jpg')" width=600>

## 示例

1. 在wxml添加canvas
``` html
<canvas
    canvas-id="distribution"
    style="width: 414px; height: {{ totalHeight }}px;"
/>
```

2. 在js里面实例化组件
``` js
import DistributionChart from 'miniapp-charts';

Page({
    onLoad() {
        this.init();
    },
    init() {
        let chart = new DistributionChart(
            wx.createCanvasContext('distribution'),
            {
                width : 414,
                height: 200,
                debug : true,
            },
        );

        chart.initData({
            datasets: [
                {
                    name     : '行业',
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

        this.setData({
            totalHeight: chart.totalHeight
        });

        chart.draw();
    },
}
```


