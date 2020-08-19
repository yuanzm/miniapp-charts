import LineChart from '../lib/linechart.js';
import RadarChart from '../lib/rardar.js';
import BarChart from '../lib/barchart.js';
import DistributionChart from '../lib/distributionchart.js';

Page({
    data: {
        totalHeight: 200,
    },
    onLoad() {
        this.startAngle();
        this.multiLabels();
    },

    startAngle() {
        const radarchart = new RadarChart(
            wx.createCanvasContext('radar'),
            {
                width : 300,
                height: 300,
                startAngle: 30,
            }
        );

        radarchart.draw(
            {
                labels  : ['输出', 'KDA', '发育', '团战', '生存', '得分'],
                datasets: [ {
                        data: [71, 65, 67, 63, 72, 89],
                    },
                ]
            },
        );
    },

    multiLabels() {
        const radarchart = new RadarChart(
            wx.createCanvasContext('multiLabels'),
            {
                width : 300,
                height: 300,
            }
        );

        radarchart.draw(
            {
                labels  : [
                    '输出',
                    ['KDA', 'KDA2'],
                    {
                        text: '发育',
                    },
                    {
                        text: '团战',
                        color  : '#3eaf7c',
                        fontSize: 15,
                    },
                    [
                        '生存',
                        {
                            text: '发育',
                            color  : '#3eaf7c',
                        },
                    ],
                    '得分'
                 ],
                datasets: [ {
                        data: [71, 65, 67, 63, 72, 89],
                    },
                ]
            },
        );
    }
});


