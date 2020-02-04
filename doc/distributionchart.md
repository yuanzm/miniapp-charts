## 简单示例

1. 在wxml添加canvas
```
<canvas
    canvas-id="distribution"
    style="width: 414px; height: {{ totalHeight }}px;"
/>
```

2. 在js里面实例化组件
```
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

## DistributionChart参数解析

BarChart构造函数接受两个参数，第一个参数为小程序canvas的Context，第二个参数cfg为配置对象 组件完整的配置可见：[config.js](https://github.com/yuanzm/miniapp-charts/blob/master/src/config/barchart.js)

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| debug    | Boolean  | 是否开启调试模式，调试模式下面会打出一些调试信息，默认为false|
| width    | Number   | canvas的宽度，因为小程序没有DOM，不能获取canvas的样式信息，需要手动传入, 默认为414 |
| height   | Number   | 同width，需要手动传入，默认为200 |
| unit     | String | Y轴标签的单位，默认为'' |
| padding  | Object   | canvas的绘图区域的padding，与canvas本身样式的padding无关|
| xAxisCount | Number | X轴标签的数量(不包含原点标签)，默认为7 |
| yAxis     | Object | Y轴样式配置    |
| yAxisLine | Object | Y轴中轴线样式配置 |
| barStyle  | Object | 柱体的样式配置 |
| compareBarMargin | Number| 每组数据有多个柱体的时候，柱体的间距，默认为3|
| topBottomPadding | Number| Y轴绘图区域的左右间距，默认为10|
| barLabelStyle | Object |柱子上文字的样式配置 |

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

## barStyle配置
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| fillColor| String  |柱体填充色，默认为#6684C7|
| height   | Number  |单个柱体的高度，默认为10|
| padding  | Number |每组柱体的间距，默认为12|

## barLabelStyle配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| color     | String  | 字体颜色，默认为#B8B8B8|
| fontSize  | Number   |  字体大小，默认为11|
| paddingLeft| Number| 和左边元素的间距，默认为5|

