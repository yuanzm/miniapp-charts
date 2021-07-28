# miniapp-chart 2.0
小程序图表组件

[![Build Status](https://travis-ci.com/yuanzm/miniapp-charts.svg?branch=master)](https://travis-ci.com/yuanzm/miniapp-charts)
![npm](https://img.shields.io/npm/v/miniapp-charts)
![GitHub](https://img.shields.io/github/license/yuanzm/miniapp-charts)

## 文档
[点击查看文档](https://yuanzm.github.io/miniapp-charts/)

## 简介

本组件库产生的原因有两个

1. 小程序canvas与浏览器标准canvas并不相同，大部分已有的组件没法直接复用；
2. 大部分开源图表组件都太过强大并且体积庞大，实际上并不需要太强的配置功能；

故将业务中的一套图表组件开源出来，不会很强大，但是该有的配置基本都有，有问题可以提issue，我会尽量修复。

## 设计理念

所有组件设计的时候都会遵循两个简单的理念

1. 尽可能提供详细的配置功能，力求组件的每个部位都是可以配置样式的；
2. **不要**太强大，本组件库的出发点是提供轻量级的图表库，使用者无须理解图形语法；

## 安装使用

``` js
// 通过Git的方式安装，克隆仓库至小程序目录
git clone https://github.com/yuanzm/miniapp-charts

// 也可以通过npm安装，小程序npm使用参考[文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)
npm i miniapp-charts

// 小程序内直接引用miniapp-charts(注意安装路径要正确)
import LineChart         from 'miniapp-charts';
import Barchart          from 'miniapp-charts';
import RadarChart        from 'miniapp-charts';
import DistributionChart from 'miniapp-charts';
```

[点击启动小程序代码片段](https://developers.weixin.qq.com/s/Rb0JWWmo7led)

## Contribution
```
// 1. 安装依赖
npm install

// 2. 在微信开发者工具导入demo

// 3. 开始开发
npm start

// 4. 开发完成后保证通过eslint检查
npm run lint

// 5. 如果需要编辑文档，编辑docs目录，并执行vuepress构建
npm run docs:dev
```



## 1.0至2.0的迁移指南

miniapp-charts1.0 采用微信小程序的原生绘图API实现的图表绘制，但其原生绘图 API 性能较差，目前 miniapp-charts2.0 已全面使用新的 HTML5 Canvas 绘图 API ，因具备了 GPU 加速能力，2.0 将极大提升小程序的渲染性能，但部分调用方法需要进行相应调整。

#### Canvas声明变化

旧：

```html
<canvas
	canvas-id="linechart1"
	style="width:414px;height:200px;"
/>
```

**新：**

```html
<canvas
	type="2d"
	id="linechart1"
	style="width:414px;height:200px;"
/>
```

变化：

- ID声明使用通用字段“id”
- 新增type属性声明，固定填写“2d”

#### 组件构造器变化

旧：

```javascript
let linechart = new LineChart(
	wx.createCanvasContext('linechart1'),
	{
		width : 414,
		height: 200,
	}
);
// others ...
```

**新：**

```javascript
wx.createSelectorQuery()
	.select('#linechart1')
	.fields({ node: true, size: true })
	.exec((res)=>{
  	const canvasNode = res[0];
		let linechart = new LineChart(
			canvasNode,
      {
        width : 414,
        height: 200,
      }
		);
  	// others ...
	});
```

变化：

- Canvas节点需要使用 createSelectorQuery 获取
- 实例过程由同步变成异步
- 组件构造器不再接收绘图上下文（canvas Context），而是传入 CanvasNode



#### Canvas的尺寸修改操作指南

例如 DistributionChart 组件，其数据为纵向排列，因此外部的 Canvas 节点需要由内而外获得渲染后的新高度，但是在 H5 Canvas 模式时，在Canvas上下文实例化后外部直接控制节点的 Style 样式不会影响Canvas自身的渲染“世界”，此时直接改变Style控制高宽将导致图像出现挤压现象，因此组件内部也需要做好相应的伸缩调整以适应这种现象，具体的方法是：

```javascript
	const distributionChart = new DistributionChart( …… )	// 2.0 版本的 DistributionChart 组件实例
	distributionChart.initData({ …… })	//数据填入
	this.setData({
		totalHeight: distributionChart.totalHeight			//修改外部 Canvas Style 样式
	});
	distributionChart.setHeight(chart.totalHeight);		//组件内部也需要相应的适应高度变化
	distributionChart.draw();													//完成渲染
```

```html
<!-- WXML代码 -->
<canvas
	type="2d"
	id="distribution"
	style="width: 300px; height: {{ totalHeight }}px;"
/>
```



## 性能对比报告

为了验证 2.0 版本采用 HTML5 Canvas 绘图 API 是否有效的提升性能，将通过一个简单的实验证明：采用旧版本（原生绘图 API ）以及新版本（ H5 绘图 API ）中的 LineChart 组件分别实现对 5000 个数据点进行渲染，计时整个渲染开始到用户看到图像的耗时情况，分别使用 Android 手机与 iOS 手机进行测试。

新版本的测试 Demo 源码路径：

旧版本测试 Demo 源码路径：

最终得出如下结果：

| 测试机型         | API版本   | 5k双轴数据点渲染耗时 | 100k双轴数据点渲染耗时                 |
| ---------------- | --------- | -------------------- | -------------------------------------- |
| iPhone11 Pro Max | H5 Canvas | 约0.5秒              | 约6秒                                  |
| iPhone11 Pro Max | 原生      | 约9秒                | 4分钟无响应(补充1万个双轴数据点是49秒) |
| 小米10           | H5 Canvas | 约0.5秒              | 约4秒                                  |
| 小米10           | 原生      | 约1秒                | 约7秒                                  |

实验对照组说明：由于5k数据点对比可能不是很明显，增加一组 10 万个数据点进行耗时对照，双轴数据点即 lineChart 的左右双轴数据渲染模式。

实验样本说明：测试 Demo 中虽然在 ctx.draw(..., callback) 中利用 callback 函数作为耗时计算的终点，但是根据实际的测试表现来说，此耗时计算并非是从渲染开始到屏幕呈现的耗时，尤其是在 10 万个数据点测试时，原生模式下的渲染肉眼可见的慢，但最终显示的计算时间却只有 4000 毫秒左右，明显不符合实际情况。对于用户而言组件的渲染更重要的是呈现到用户屏幕的效率，因此本测试关注的是从渲染开始到屏幕呈现的耗时，**使用录屏回放的方式观测取样**。

#### 测试结论

从测试结果可知，H5 Canvas 绘图 API 在 Android 系统下较原生的渲染大约有 1 倍的效率提升，而在 iOS 系统下，原生绘图性能在大量的数据点时表现极差，在少量数据点时性能也并不理想，反而 H5 Canvas 绘图 API 表现十分出色。

因此可以得出结论：2.0 版本的渲染性能优于 1.0 版本，并且在大量数据点时，有明显的渲染效率的提升。
