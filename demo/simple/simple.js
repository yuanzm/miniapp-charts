import LineChart from '../lib/linechart.js';
import RadarChart from '../lib/rardar.js';
import BarChart from '../lib/barchart.js';
import DistributionChart from '../lib/distributionchart.js';

Page({
    data: {
        totalHeight: 1000,
    },
    onLoad() {
        // let context = wx.createCanvasContext('radar');

        wx.createSelectorQuery()
            .select('#radar')
            .fields({ node: true, size: true })
            .exec((res)=>{
                this.renderRadar(res[0]);
            });

        
        wx.createSelectorQuery()
            .select('#linechart1')
            .fields({ node: true, size: true })
            .exec((res)=>{
                this.renderLineChart(res[0]);
            })
    
        wx.createSelectorQuery()
            .select('#bar')
            .fields({ node: true, size: true })
            .exec((res)=>{
                this.renderBarChart(res[0]);
            })
        
        wx.createSelectorQuery()
            .select('#distribution')
            .fields({ node: true, size: true })
            .exec((res)=>{
                this.renderDistribution(res[0]);
            })
        
        // wx.createSelectorQuery()
        //     .select('#linechart1')
        //     .fields({ node: true, size: true })
        //     .exec((res)=>{
        //         const canvas = res[0].node;
        //         const ctx = canvas.getContext('2d');
        //         const dpr = wx.getSystemInfoSync().pixelRatio;
        //         canvas.width = res[0].width * dpr;
        //         canvas.height = res[0].height * dpr;
        //         ctx.scale(dpr, dpr)
        //         this.renderLineChart(ctx);
        //     })

        // this.renderLineChart();
        // this.renderBarChart();
        // this.renderDistribution();
    },

    renderRadar(node) {
         this.radarchart = new RadarChart(node,
                {
                    width : 300,
                    height: 300,
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
                    labels  : ['输出', 'KDA', '发育', '团战', '生存' ,'随便写'],
                    datasets: [ {
                      data                : [71, 100, 13, 15, 82, 10],
                      dataStr                : ['71s', '100s', '13s', '15s', '82s', '10s'],
                      label               : '同段位',
                      backgroundColor     : 'rgba(255,255,255,0)',
                      borderColor         : 'rgb(242,190,86)',
                      borderWidth         : 2,
                      borderLineStyle     : 'dash',  //line || dash
                      borderDashPattern   : [5,5], // [ [dashPattern] , dashOffset ]
                      borderDashOffset    : 5 ,
                      pointShow           : false,
                      pointBackgroundColor: 'rgb(108,132,194)',
                      pointBorderColor    : 'rgb(108,132,194)',
                      pointBorderWidth    : 1,
                      pointRadius         : 5,
                      focusStyle          :{
                                          pointBackgroundColor: 'rgb(242,190,86)',
                                          pointBorderColor    : 'rgb(242,190,86)',
                                          pointBorderWidth    : 1,
                                          pointRadius         : 2,
                      }
                  },{
                            data                : [71, 65, 67, 63, 72, 100],
                            // dataStr             : ['71s', '100s', '13s', '15s', '82s', '10s'],
                            label               : '本人',
                            backgroundColor     : 'rgba(108,132,194,0.5)',
                            borderColor         : 'rgb(108,132,194)',
                            borderWidth         : 2,
                            borderLineStyle     : 'line',  //line || dash
                            borderDashPattern   : [10,20], // [ [dashPattern] , dashOffset ]
                            borderDashOffset    : 5 ,
                            pointShow           : true,
                            pointBackgroundColor: 'rgb(255,255,255)',
                            pointBorderColor    : 'rgb(108,132,194)',
                            pointBorderWidth    : 3,
                            pointRadius         : 5,
                            focusStyle          :{
                                                pointBackgroundColor: 'rgb(108,132,194)',
                                                pointBorderColor    : 'rgb(108,132,194)',
                                                pointBorderWidth    : 1,
                                                pointRadius         : 5,
                            }
                        },
                    ]
                },
            );


    },

    renderLineChart(ctx) {
        let linechart = new LineChart(
            ctx,
            // ctx,
        );

        this.linechart = linechart;

        let points = [];
        for (let i = 0; i < 50; i++) {
            points.push({
                x: i + 1,
                y: Math.ceil( 150 + Math.random() * 10),
            });
        }

        let points2 = [];
        for (let i = 0; i < 50; i++) {
            points2.push({
                x: i + 1,
                y: Math.ceil( 50 + Math.random() * 10),
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
    bindtouchstart2(e) {
        this.radarchart.touch(e);
    },
    bindtouchmove2(e) {
        this.radarchart.touch(e);
    },
    bindtouchend2(e) {
        this.radarchart.touchEnd(e);
    },

    renderBarChart(ctx) {

        let barchart = new BarChart(
            ctx,
            {
                width : 414,
                height: 200,
                unit  : '%',
                debug : true,
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
                            barLabel: [{
                                name: '335',
                                style: {
                                    color: '#6684C7',
                                }
                            }, '50%'],
                        },
                    ],
                },
                {
                    name: '行业',
                    fillColor: '#3AC6D5',
                    points: [
                        {
                            label: '新增',
                            value: 120,
                            barLabel: [{
                                name: '335',
                                style: {
                                    color: '#6684C7',
                                }
                            }, '50%'],
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
    },

    renderDistribution(ctx){
        let chart = new DistributionChart(
            ctx,
            {
                width : 414,
                height: 200,
                debug : true,
            },
        );

        chart.initData({
            datasets: [
                {
                    name     : '行业',
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
                            barLabel: [{
                                name: '335',
                                style: {
                                    color: '#6684C7',
                                }
                            }, '50%'],
                        },
                    ],
                },
                {
                    name: '行业',
                    fillColor: '#3AC6D5',
                    points: [
                        {
                            label: '新增',
                            value: 120,
                            barLabel: [{
                                name: '335',
                                style: {
                                    color: '#6684C7',
                                }
                            }, '50%'],
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
                },
                {
                    name: '行业2',
                    fillColor: '#3AC6D5',
                    independentAxis: true,
                    points: [
                        {
                            label: '新增',
                            value: 10,
                            barLabel: [{
                                name: '不同单位',
                                style: {
                                    color: '#6684C7',
                                }
                            }, '50%'],
                        },
                        {
                            label: '活跃',
                            value: 5,
                        },
                        {
                            label: '留存',
                            value: 1,
                        },
                    ],
                }
            ]
        });

        this.setData({
            totalHeight: chart.totalHeight
        });
        chart.setHeight(chart.totalHeight);

        chart.draw();
    }
});

