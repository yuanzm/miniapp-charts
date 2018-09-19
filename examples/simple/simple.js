
import RadarChart from '../../src/radar.js';
import LineChart  from '../../src/linechart.js';

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
                }
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
    },

    renderLineChart() {
        let linechart = new LineChart(
            wx.createCanvasContext('linechart1'),
            {
                height: 200,
            },
            //wx.createCanvasContext('canvas2'),
        );

        this.linechart = linechart;

        let points = [];
        for ( let i = 0; i < 108;i++) {
            points.push({
                x: i + 1,
                y: Math.ceil(Math.random()*30),
            });
        }

        linechart.draw({
            datasets: [
                {
                    points  : points,
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
    }
});

