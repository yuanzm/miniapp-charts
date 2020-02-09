# 更多示例

## startAngle
如下图所示:

<img :src="$withBase('/imgs/radardemo/startangle.jpg')" width=400>

1. 在wxml添加canvas元素
``` html
<canvas
    canvas-id="radar"
    style="width:300px;height:300px;"
/>
```

2. 实例化组件并且绘制
``` js
const radarchart = new RadarChart(
    wx.createCanvasContext('radar'),
    {
        width : 300,
        height: 300,
        startAngle: 30,
    }
);

radarchart.draw(
    {
        labels  : ['输出', 'KDA', '发育', '团战', '生存', '得分'],
        datasets: [ {
                data: [71, 65, 67, 63, 72, 89],
            },
        ]
    },
);
```

## 一个顶点多个标签
如下图所示:

<img :src="$withBase('/imgs/radardemo/multilabels.jpg')" width=400>

1. 在wxml添加canvas元素
``` html
<canvas
    canvas-id="multiLabels"
    style="width:300px;height:300px;"
/>
```

2. 实例化组件并且绘制
``` js

const radarchart = new RadarChart(
    wx.createCanvasContext('multiLabels'),
    {
        width : 300,
        height: 300,
    }
);

radarchart.draw(
    {
        labels  : [
            '输出',
            ['KDA', 'KDA2'],
            {
                text: '发育',
            },
            {
                text: '团战',
                color  : '#3eaf7c',
                fontSize: 15,
            },
            [
                '生存',
                {
                    text: '发育',
                    color  : '#3eaf7c',
                },
            ],
            '得分'
            ],
        datasets: [ {
                data: [71, 65, 67, 63, 72, 89],
            },
        ]
    },
);
```

