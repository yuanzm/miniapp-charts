
import RadarChart from '../../src/radar.js';
Page({
    onLoad() {
        let context = wx.createCanvasContext('radar');

        this.radarchart = new RadarChart(context,
            {
                width : 250,
                height: 250,
            }
        );

        this.radarchart.draw(
            {
                labels  : ['输出', 'KDA', 'KDA', 'KDA', 'KDA', '推进'],
                datasets: [
                    {
                        data: [50, 80, 75, 90, 100, 67],
                    },
                ]
            },
            {
            }
        );
    }
});

