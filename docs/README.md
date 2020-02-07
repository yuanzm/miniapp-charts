# 介绍

## 简介

本组件库产生的原因有三个

1. 小程序canvas与浏览器标准canvas并不相同，大部分已有的组件没法直接复用；
2. 大部分开源图表组件都太过强大并且体积庞大，实际上并不需要太强的配置功能；
3. 即便开源组件配置强大，也很难满足设计师；

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

