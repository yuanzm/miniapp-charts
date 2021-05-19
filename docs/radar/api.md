# 文档

## 图例
由于配置过多，文字表达可能带来歧义，这里附上图例以供参考

<img :src="$withBase('/imgs/radartooltip.jpg')" width=600>

## RadarChart构造函数
### RadarChart(context, [cfg])
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| Content  | Object   | 小程序canvas的Context |
| cfg      | Object   | 组件配置对象，cfg的属性值会替换默认配置对应属性的值|

### cfg
组件完整配置见[config/radar.js](https://github.com/yuanzm/miniapp-charts/blob/master/src/config/radar.js)，下面是详细配置介绍。

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| debug    | Boolean  | 是否开启调试模式，调试模式下面会打出一些调试信息，默认为false|
| width    | Number   | canvas的宽度，因为小程序没有DOM，不能获取canvas的样式信息，需要手动传入, 默认为250 |
| height   | Number   | 同width，需要手动传入，默认为250 |
| padding  | Object   | canvas的绘图区域的padding，与canvas本身样式的padding无关|
| grid     | Object   | 雷达图网状图和边界值等配置 |
| radiationLineStyle  | Object | 从中心点往外辐射的线条配置|
| label    |  Object  | 雷达标签文案配置 |
| datasetStyle | Object | 单个雷达区域配置|
| startAngle | Number | 雷达图的旋转角度，默认是0|
| animation  | Boolean | 是否开启动画，默认为true|
| animationStep  | Number| 动画执行的步骤, 默认为50|
| animationEasing | String| 动画的缓动函数, 所有配置见[easing.js](https://github.com/yuanzm/miniapp-charts/blob/master/src/base/easing.js)|
| toolTip | Object | 悬浮信息框配置 |

::: tip
startAngle配置可以参考[示例](/radar/examples.html#startangle)
:::

### padding配置详情

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| left     | Number   | 左边距，默认为5 |
| right    | Number   | 右边距，默认为5 |
| top      | Number   | 上边距，默认为5 |
| bottom   | Number   | 下边距，默认为5 |

###  grid配置详情
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| display  | Boolean  | 是否展示网状底线，默认为true|
| min      | Number   | 雷达图数据的最小值，默认是0 |
| max      | Number   | 雷达图数据的最大是，默认是100 |
| stepSize | Number   | 每一格的数据间距，默认是20 |
| width    | Number   | 线条宽度，默认是1          |
| color    | String   | 线条的颜色，默认是#e3e3e3 |
| style    | String   | 线条的样式，暂时只支持line和dash，默认为line|
| dashPattern | Array | 线条为虚线的配置，详情可看[小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-line-dash.html)|
| dashOffset  | Number | 线条为虚线的配置，详情可看[小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-line-dash.html)|
| marginLineStyle | String | 网格最外圈的样式，默认为 default（蜘蛛网状），可选配为 circle（圆环状） |
| marginLineColor | Sting | 网格最外圈的颜色，默认为default（跟随内部颜色），可使用颜色字符串自定义颜色 |
| marginLinePointRadius | Number | 网格最外圈与辐射线焦点的“高亮点”半径，默认为2 |
| marginLinePointColor | String | 网格最外圈与辐射线焦点的“高亮点”颜色 |

###  radiationLineStyle配置详情
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| display  | Boolean  |  是否展示从中心点往顶点辐射的线，默认为true|
| width    | Number   | 线条宽度，默认是1          |
| color    | String   | 线条的颜色，默认是#e3e3e3 |
| style    | String   | 线条的样式，暂时只支持line和dash，默认为line|
| dashPattern | Array | 线条为虚线的配置，详情可看[小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-line-dash.html)|
| dashOffset  | Number | 线条为虚线的配置，详情可看[小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-line-dash.html)|

### label配置详情
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| display  | Boolean  |  是否展示label，默认为true|
| color    | String   | 文案的颜色，默认是#888888 |
| fontSize | Number   | 文案的字体大小，默认是12 |
| margin   | Object   | 文案的间距配置，默认margin.left,margin.right,margin.top,margin.bottom = 3 |

### datasetStyle配置详情
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| backgroundColor | String | 区域背景颜色，默认为rgba(232, 245, 223, 0.7) |
| borderColor| String | 区域边界颜色，默认为#99d774 |
| borderWidth | Number | 区域边界线条宽度，默认是2 |
| pointShow   | Boolean | 每个雷达数据点是否需要圆圈展示，默认为true|
| pointBackgroundColor | String | 数据点上圆圈的背景颜色，默认为#8dd364 |
| pointBorderColor | String | 数据点上圆圈圆周线条颜色，默认为#8dd364 |
| pointBorderWidth | Number | 数据点上圆圈圆周线条的宽度，默认为1 |
| pointRadius   | Number | 数据点上圆圈的半径，默认为2 |
| focusStyle | Object | 交互时的焦点样式 |

### focusStyle配置详情

| keyName              | 类型   | 描述                                                   |
| -------------------- | ------ | ------------------------------------------------------ |
| pointBackgroundColor | String | 焦点背景颜色                                           |
| pointBorderColor     | String | 焦点的边框颜色（可配合pointBackgroundColor实现空心圆） |
| pointBorderWidth     | Number | 焦点的边框宽度                                         |
| pointRadius          | Number | 焦点的半径                                             |

### toolTip配置详情

| keyName     | 类型   | 描述                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| lineColor   | Sring  | toolTip中轴线的颜色，默认为#C6C6C6                           |
| lineWidth   | Number | toolTip中轴线的宽度，默认为0.5                               |
| fontSize    | Number | toolTip的字体大小，默认为11                                  |
| color       | String | toolTip的字体颜色，默认为#FFFFFF                             |
| fillColor   | String | toolTip的背景颜色，默认为rgba(136, 136, 136, 0.6)            |
| linePadding | Number | 文案行间距，默认为5                                          |
| padding     | Object | toolTip的padding，默认padding.left = 5, padding.right = 5,padding.top = 5, padding.bottom = 5 |

## RadarChart API

### draw(data, [cfg])
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| data     | Object   | 渲染雷达图需要的数据 |
| cfg      | Object   | 组件配置，cfg每一项属性值会替换组件已有属性值 |

#### data配置详情
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| labels   | Array    | 雷达图顶点的标签数据，Array的每一项称为labelItem，可以是String、Array和Object类型，详见[labelItem](#labelItem)|
| datasets | Array    | Array的每一项为一个Object类型的对象[datasetItem](#datasetitem)，这个Object本身是配置[datasetStyle](#datasetstyle)的结构，增加了一个Array类型的data属性，用于表示雷达图每个顶点的数据 |

### datasetItem
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| backgroundColor | String | 区域背景颜色，默认为rgba(232, 245, 223, 0.7) |
| borderColor| String | 区域边界颜色，默认为#99d774 |
| borderWidth | Number | 区域边界线条宽度，默认是2 |
| pointShow   | Boolean | 每个雷达数据点是否需要圆圈展示，默认为true|
| pointBackgroundColor | String | 数据点上圆圈的背景颜色，默认为#8dd364 |
| pointBorderColor | String | 数据点上圆圈圆周线条颜色，默认为#8dd364 |
| pointBorderWidth | Number | 数据点上圆圈圆周线条的宽度，默认为1 |
| pointRadius   | Number | 数据点上圆圈的半径，默认为2 |
| data          | Array | 数据点数组，该数据的长度必须和labels数组长度一致|

##### labelItem
| 类型|   描述    |
|----------|----------|
| String   | 在该顶点附近添加一个文案，样式与[label配置详情](#label配置详情)相同|
| Object   | 在该柱体上面添加一个文案，该对象属性与[label配置详情](#label配置详情)相同，新增一个text属性表示文案字符串|
| Array    | 在该柱体上面添加多个文案，数组的每一项可以是String，也可以是Object类型的，与上述两种类型一致|

label配置可以参考[示例](/radar/examples.html#一个顶点多个标签)

### touch(e)

处理小程序的触摸事件，e为bindtouchstart和bindtouchmove事件获取到的事件对象。

### touchEnd()

处理bindtouchend的触摸事件