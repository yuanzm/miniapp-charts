
import RadarChart from '../../src/radar.js';
import LineChart  from '../../src/linechart.js';
import BarChart   from '../../src/barchart.js';

Page({
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
            {
            }
        );

        this.renderLineChart();
        this.renderBarChart();
    },

    renderLineChart() {
        let linechart = new LineChart(
            wx.createCanvasContext('linechart1'),
            {
                width: 360,
                height: 200,
                lineStyle: {
                    lineWidth: 1,
                    lineColor: '#7587db',
                    fillColor: 'rgba(0, 135, 219, 0.3)',
                    // 是否需要背景颜色
                    needFill: true,
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
        for (let i = 0; i < 20; i++) {
            points.push({
                x: i + 1,
                y: Math.ceil( 50 + Math.random() * 10),
            });
        }

        linechart.draw({
            datasets: [
                {
                    points: points,
                    lineName: 'test',
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
                            barLabel: '50%',
                        },
                    ],
                },
                {
                    name: '行业',
                    fillColor: '#3AC6D5',
                    points: [
                        {
                            label: '新增',
                            value: 44,
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
    }
});

