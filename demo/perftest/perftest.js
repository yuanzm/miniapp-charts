import LineChart from '../lib/linechart.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    draw(){
        wx.createSelectorQuery()
            .select('#linechart1')
            .fields({ node: true, size: true })
            .exec((res)=>{
                this.renderLineChart(res[0]);
            })
    },
    renderLineChart(ctx) {
        let start = new Date().getTime();
        let linechart = new LineChart(
            ctx,
            // ctx,
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
        });
        


        let end = new Date().getTime();
        this.setData({
            time:end - start
        })
    }
})