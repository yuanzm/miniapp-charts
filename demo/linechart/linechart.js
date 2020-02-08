import LineChart from '../lib/linechart.js';
import RadarChart from '../lib/rardar.js';
import BarChart from '../lib/barchart.js';
import DistributionChart from '../lib/distributionchart.js';

Page({
    data: {
        totalHeight: 200,
    },
    onLoad() {
        this.renderLineChart();
    },

    renderLineChart() {
        let linechart = new LineChart(
            wx.createCanvasContext('axisdemo'),
            {
                width : 414,
                height: 200,
                secondYaxis: {
                    unit: '%',
                },
            },
        );

        let points = [];
        for (let i = 0; i < 24; i++) {
            points.push({
                x: i + 1,
                y: Math.ceil( 50 + Math.random() * 10),
            });
        }

        let points2= [];
        for (let i = 0; i < 24; i++) {
            points2.push({
                x: i + 1,
                y: Math.ceil( 60 + Math.random() * 10),
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
                    style   : {
                        lineColor: '#FBBC3B',
                        fillColor: 'rgba(251,188,59,0.4)'
                    },
                    axis    : 2,
                }
            ]
        });
    },
});


