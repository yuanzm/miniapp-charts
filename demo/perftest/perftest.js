import LineChart from '../lib/linechart.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        time:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },

    
    draw() {
        let start = new Date().getTime();
        console.log(start);
        let linechart = new LineChart(
            wx.createCanvasContext('linechart1'),
            {
                width : 414,
                height: 200,
            }
        );

        this.linechart = linechart;

        let points = [];
        let n = 0;
        for (let i = 0; i < 5000; i++) {
            points.push({
                x: i + 1,
                y: Math.ceil( 150 + n),
            });
            n++;
            n%=10;
        }

        let points2 = [];
        for (let i = 0; i < 5000; i++) {
            points2.push({
                x: i + 1,
                y: Math.ceil( 150 + n),
            });
            n++;
            n%=10;
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
                    axis:2
                },
            ],
            sublinesets: [
                {
                    y: 100,
                    lineName:'行业标准',
                    effectDataRange:true,
                    style:{
                        lineColor:'#f6c444',
                        lineWidth: 1
                    },
                    axis:2
                }
            ]
        },{},()=>{
            let end = new Date().getTime();
            console.log(end,end - start);
            this.setData({
                time:end - start
            })
        });
    
    }
})