
import RadarChart from '../../src/radar.js';
Page({
    onLoad() {
        let context = wx.createCanvasContext('radar');

        this.radarchart = new RadarChart(context,
            {
                width : 250,
                height: 250,
                debug : true,
                padding: {
                    left: 5, right: 5, top:5, bottom: 5
                }
            }
        );

        this.radarchart.draw(
            {
                labels  : [
                {
                    text: 'KDA',
                    color: 'red',
                },
                //'kda',
                ['输出', 'KDA'],'KDA', 'KDA', 'KDA', '推进'],
                datasets: [
                    {
                        data: [50, 80, 75, 90,  67, 77],
                    },
                ]
            },
            {
            }
        );
    }
});

