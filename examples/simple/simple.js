
import RadarChart from '../../src/radar.js';
Page({
    onLoad() {
        let context = wx.createCanvasContext('radar');

        this.radarchart = new RadarChart(context,
            {
                width : 200,
                height: 200,
            }
        );

        this.radarchart.draw(
            {
                datasets: [
                    {
                        data: [10, 80, 75, 90, 100],
                    }
                ]
            },
            {
                width : 200,
                height: 200,
            }
        );
    }
});

