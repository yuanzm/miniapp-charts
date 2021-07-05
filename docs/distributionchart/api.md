# 文档

## 图例
由于配置过多，文字表达可能带来歧义，这里附上图例以供参考

<img :src="$withBase('/imgs/distributiontooltip.jpg')" width=800>

## 构造函数
### DistributionChart(context, [cfg])
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| context  | Object   | 小程序canvas的Context |
| cfg      | Object   | 组件配置对象，cfg的属性值会替换默认配置对应属性的值|

``` js
const distribution = new DistributionChart(
    wx.createCanvasContext('distribution'),
    {
        width : 414,
    },
);
```

### cfg
组件完整的配置可见：[config/distribution.js](https://github.com/yuanzm/miniapp-charts/blob/master/src/config/distribution.js)

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| debug     | Boolean  | 是否开启调试模式，调试模式下面会打出一些调试信息，默认为false|
| width     | Number   | canvas的宽度，因为小程序没有DOM，不能获取canvas的样式信息，需要手动传入, 默认为414 |
| padding   | Object   | canvas的绘图区域的padding，与canvas本身样式的padding无关|
| yAxis     | Object | Y轴样式配置    |
| yAxisLine | Object | Y轴中轴线样式配置 |
| barStyle  | Object | 柱体的样式配置 |
| barLabelStyle | Object |柱子上文字的样式配置 |

### padding配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| left     | Number   | 左边距，默认为10 |
| right    | Number   | 右边距，默认为10 |
| top      | Number   | 上边距，默认为10 |
| bottom   | Number   | 下边距，默认为5  |

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

### barStyle配置
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| fillColor| String  |柱体填充色，默认为#6684C7|
| height   | Number  |单个柱体的高度，默认为10|
| padding  | Number |每组柱体的间距，默认为12|
| compareBarMargin | Number| 每组数据有多个柱体的时候，柱体的间距，默认为3|
| topBottomPadding | Number| Y轴绘图区域的左右间距，默认为10|

### barLabelStyle配置

| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| color     | String  | 字体颜色，默认为#B8B8B8|
| fontSize  | Number   |  字体大小，默认为11|
| paddingLeft| Number| 和左边元素的间距，默认为5|

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
| datasets | Array    | 数组的每一项为一组柱状体，每组柱状体又可以独立配置，见下面dataset配置|

#####  dataset配置
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| points   | Array    | 由数据点构成的数组，points的每一项配置见point|
| barStyle | Object   | 柱状体样式配置，会覆盖组件实例的barStyle对应的属性值|
| independentAxis | Boolean | 该组数据是否需要独立计算最大值，默认为false，该配置为应对不同单位数据放在同一分布图的需求|

###### point
| keyName  | 类型     |  描述    |
|----------|----------| ---------|
| label    | String   | 该数据名称 |
| value    | Number   | 该数据的值 |
| barLabel | String/Object/Array | 配置详情见下面|

###### point.barLabel
| barLabel类型|   描述    |
|----------|----------|
| String   | 在该柱体上面添加一个文案，样式与组件实例的barLabelStyle相同|
| Object   | 在该柱体上面添加一个文案，该对象具有两个属性，第一个为name，为label的值，第二个为style对象，会覆盖组件实例的barLabelStyle的值|
| Array    | 在该柱体上面添加多个文案，数组的每一项可以是String，也可以是Object类型的，与上述两种类型一致|

``` js
// 覆盖上述所有barLabel类型的配置示例
points: [
    {
        label: '活跃',
        value: 77,
        barLabel: '50%',
    },
    {
        label: '留存',
        value: 34,
        barLabel: {
            name: '335',
            style: {
                color: '#6684C7',
            }
        }
    },
    {
        label: '新增',
        value: 120,
        barLabel: [{
            name: '335',
            style: {
                color: '#6684C7',
            }
        }, '50%'],
    }
],
```

### totalHeight
调用组件的draw方法之后，会计算出当前图表的总高度，需要反向设置给小程序canvas。
