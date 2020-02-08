import LineChart from '../lib/linechart.js';
import RadarChart from '../lib/rardar.js';
import BarChart from '../lib/barchart.js';
import DistributionChart from '../lib/distributionchart.js';

Page({
    data: {
        totalHeight: 200,
    },
    onLoad() {
        this.axisDemo();
        this.changeUnit();
        this.formatY();
    },

    axisDemo() {
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
        for (let i = 1; i <= 31; i++) {
            points.push({
                x: i,
                y: Math.log2(i)
            });
        }

        let points2= [];
        for (let i = 1; i <= 31; i++) {
            points2.push({
                x: i,
                y: Math.log10(i)
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

    changeUnit() {
        let linechart = new LineChart(
            wx.createCanvasContext('changeUnit'),
            {
                width : 414,
                height: 200,
                changeUnit: function(value) {
                    if ( value <= 10 ) {
                        return '青铜';
                    } else if ( value <= 20 ) {
                        return '白银';
                    } else if ( value <= 30 ) {
                        return '黄金';
                    }

                    return '铂金';
                }
            },
        );

        let points = [];
        for (let i = 1; i <= 31; i++) {
            points.push({
                x: i,
                y: i,
            });
        }

        linechart.draw({
            datasets: [
                {
                    points  : points,
                    lineName: 'test',
                }
            ]
        });
    },

    formatY() {
        let linechart = new LineChart(
            wx.createCanvasContext('formatY'),
            {
                width : 414,
                height: 200,
                formatY: function(max, min, yAxisCount) {
                    return {
                        max: 100,
                        min: 0,
                        divider: 25,
                        multiple: 1,
                    }
                }
            },
        );

        let points = [];
        for (let i = 40; i <= 71; i++) {
            points.push({
                x: i,
                y: i,
            });
        }

        linechart.draw({
            datasets: [
                {
                    points  : points,
                    lineName: 'test',
                }
            ]
        });
    }
});


