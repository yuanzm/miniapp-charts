import RadarChart from '../../src/radar.js';
import LineChart from '../../src/linechart.js';
import DistributionChart from '../../src/distribution.js';
import BarChart  from '../../src/barchart.js';

Page({
    data: {
        totalHeight: 200,
    },
    onLoad() {
        let context = wx.createCanvasContext('radar');

        this.radarchart = new RadarChart(context,
            {
                width : 200,
                height: 200,
                debug : true,
                padding: {
                    left: 5, right: 5, top:5, bottom: 5
                },
                grid    : {
                    stepSize: 25,
                    color : '#c8c8c8',
                },
                datasetStyle: {
                    borderWidth: 1.5,
                    pointRadius: 1.5

                },
                label: {
                    fontSize: 10,
                    color   : '#676768',
                },
            }
        );

        this.radarchart.draw(
            {
                labels  : ['输出', 'KDA', '发育', '团战', '生存'],
                datasets: [ {
                        data: [71, 65, 67, 63, 72],
                    },
                ]
            },
        );

        this.renderLineChart();
        this.renderBarChart();
        this.renderDistribution();
    },

    renderLineChart() {
        let linechart = new LineChart(
            wx.createCanvasContext('linechart1'),
            {
                width : 414,
                height: 200,
                xAxisCount: 6,
                lineStyle: {
                    lineWidth: 1,
                    lineColor: '#7587db',
                    fillColor: 'rgba(0, 135, 219, 0.3)',
                    // 是否需要背景颜色
                    needFill : true,
                    circle: {
                        show: true,
                        fillColor: '#FFFFFF',
                        strokeColor: '#FFAA00',
                        radius: 1.2,
                    }
                },
            },
        );

        this.linechart = linechart;

        let points = [];
        for (let i = 0; i < 7; i++) {
            points.push({
                x: i + 1,
                y: Math.ceil( 50 + Math.random() * 10),
            });
        }

        let points2 = [];
        for (let i = 0; i < 7; i++) {
            points2.push({
                x: i + 1,
                y: Math.ceil( 80 + Math.random() * 10),
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
                    axis    : 2,
                },
            ]
        });

    },

    bindtouchstart(e) {
        this.linechart.touch(e);
    },

    bindtouchmove(e) {
        this.linechart.touch(e);
    },

    bindtouchend(e) {
        this.linechart.touchEnd(e);
    },

    renderBarChart() {
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

    renderDistribution(){
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
    }
});

