# 文档

## 图例
由于配置过多，文字表达可能带来歧义，这里附上图例以供参考

<img :src="$withBase('/imgs/linecharttooltip.jpg')" width=800>

## 构造函数
### Linechart(context, [cfg], [context2])
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| context  | Object   | 小程序canvas的Context |
| cfg      | Object   | 组件配置对象，cfg的属性值会替换默认配置对应属性的值|
| context2  | Object   | 小程序canvas的Context，当需要响应触摸事件，传入context2具有更好的性能，注意，两个canvas应该重叠并且第二个canvas的层级更高 |

### cfg
组件完整的配置可见：[config/linechart.js](https://github.com/yuanzm/miniapp-charts/blob/master/src/config/linechart.js)

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| debug    | Boolean  | 是否开启调试模式，调试模式下面会打出一些调试信息，默认为false|
| width    | Number   | canvas的宽度，因为小程序没有DOM，不能获取canvas的样式信息，需要手动传入, 默认为414 |
| height   | Number   | 同width，需要手动传入，默认为200 |
| unit     | String | Y轴标签的单位，默认为'' |
| padding  | Object   | canvas的绘图区域的padding，与canvas本身样式的padding无关|
| maxCircleCount | Number | 如果单条线的点很少，每个点会带上一个小圆环，当最长线条的点数量大于maxCircleCount的时候，不绘制小圆环，默认为30 |
| xAxisCount | Number | X轴标签的数量(不包含原点标签)，默认为7 |
| xAxis      | Object | X轴标签样式配置 |
| xAxisLine  | Object | X中轴线样式配置 |
| yAxisCount | Number | Y轴标签数(不包含原点标签)，默认为4|
| yAxis     | Object | Y轴样式配置    |
| yAxisLine | Object | Y轴中轴线样式配置 |
| toolTip | Object | tooltip样式配置 |
| formatY  | Function |详细见下面formatY配置|
| lineStyle| Object |单条曲线默认配置|

### padding配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| left     | Number   | 左边距，默认为10 |
| right    | Number   | 右边距，默认为10 |
| top      | Number   | 上边距，默认为10 |
| bottom   | Number   | 下边距，默认为5  |

### xAxis配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| show     | Boolean  | 是否需要展示X轴标签，默认为true|
| marginTop| Number   | X轴标签与X轴中轴线的间距，默认为10 |
| color    | String   | X轴标签字体颜色，默认为#B8B8B8 |
| fontSize | Number   | X轴标签字体大小，默认是11 |

### xAxisLine配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| show     | Boolean | 是否展示X轴标签对应的线条，默认为false |
| centerShow | Boolean | 是否需要展示X轴的中轴线，默认为true |
| width     | Number   | 线条的宽度，默认为0.6 |
| color     | String    | 线条的颜色，默认为#C6C6C6 |
| style     | String    | 线条的样式，默认为solid，可选的为dash |

### yAxis配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| show     | Boolean  | 是否需要展示Y轴标签，默认为true|
| marginLeft | Number | Y轴标签与canvas左边缘的距离(不包含padding里面的设置），默认是0 |
| marginRight | Number | Y轴变迁与Y轴中轴线的距离，默认为10 |
| color     | String  | Y轴标签的字体颜色 |
| fontSize  | Number   | Y轴标签的字体大小 |


### yAxisLine配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| show     | Boolean | 是否展示Y轴标签对应的线条，默认为true|
| centerShow | Boolean | 是否需要展示X轴的中轴线，默认为false|
| width     | Number   | 线条的宽度，默认为0.6 |
| color     | String    | 线条的颜色，默认为#C6C6C6 |
| style     | String    | 线条的样式，默认为solid，可选的为dash |

### toolTip配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| lineColor | Sring | toolTip中轴线的颜色，默认为#C6C6C6 |
| lineWidth | Number | toolTip中轴线的宽度，默认为0.5    |
| fontSize  | Number  | toolTip的字体大小，默认为11 |
| color     | String  | toolTip的字体颜色，默认为#FFFFFF |
| fillColor | String  | toolTip的背景颜色，默认为rgba(136, 136, 136, 0.6) |
| linePadding | Number | 文案行间距，默认为5 |
| padding     | Object | toolTip的padding，默认padding.left = 5, padding.right = 5,padding.top = 5, padding.bottom = 5 |

### changeUnit
单位转换函数，组件内置了默认的单位转换函数，如果想采用自己的函数替换即可。

### formatY
给定一组数据，Y轴标签的最大值最小值和每一步的值都是组件自动算出来的
有些场景组件算出来的可能不满足需求，或者调用者就是想自定义Y轴标签的数据，
因此提供自定义的formatY(max, min, yAxisCount)函数，调用者按要求返回数据给组件处理即可
``` js
@return {
    max: 将原始的最大值处理之后的最大值
    min: 将原始的最小值处理之后的最小值
    divider: 每一步的值
    multiple: 如果处理过程中发现divider是小于1的小数，需要将上面三个数值相对应放大一定倍数
    似的divider是大于1的数值，同时将放大的倍数告知组件，默认为1
}
```
### lineStyle
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| lineWidth | Number| 线条的粗细，默认为1|
| lineColor |String| 线条的颜色，默认为#7587db|
| needFill |Boolean| 是否需要闭合填充颜色，默认为true|
| fillColor |String| 闭合填充颜色，默认为rgba(117, 135, 219, 0.3)|
| circle   |Object| 如果数据点为圆，圆样式的配置|

#### circle
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| show     | Boolean| 是否展示圆，默认为true|
| fillColor | String| 圆的填充色，默认为#FFFFFF|
| strokeColor| String| 圆周的颜色，默认为#FFAA00|
| lineWidth | Number| 圆周的粗细，默认为1|
| radius| Number| 圆的半径，默认为1.2|

## API

### draw(data, [cfg])
给定数据，执行真正的绘制操作。

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| data     | Object   | 正确绘制图表需要的数据对象|
| cfg      | Object   | 组件配置对象，cfg的属性值会替换组件示例已有配置的属性值 |

#### data
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| datasets | Array    | 数组的每一项为一条曲线，曲线又可以独立配置，见下面dataset配置|

#####  dataset配置
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| points   | Array    | 由数据点构成的数组，points的每一项配置见point|
| lineName | String   | 曲线的名称，绘制toolTip需要用到，默认为空|
| style    | Object   | 曲线的样式配置，会覆盖组件实的lineStyle对应的属性值|
| axis     | Number   | 最多支持两个坐标轴，如果axis为2，代表改曲线使用右边的坐标轴|

###### point
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| x | String/Number  | X轴标签字符串|
| y | Number | 数据点的值|

### touch(e)
处理小程序的触摸事件，e为bindtouchstart和bindtouchmove事件获取到的事件对象。

### touchEnd()
处理bindtouchend的触摸事件

