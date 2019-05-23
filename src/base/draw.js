/**
 * 图表组件基础类，封装一些canvas画图的基本方法
 * 这里可用于兼容H5和小程序
 * 因为小程序和H5的绘图API并不是完全一致的，通过基础类来兼容是最合适的
 */
export default class ChartBase {
    wordWidth(words, fontSize) {
        if ( words === undefined || words === null )
            return 0;

        let totLength = 0;

        for ( let i = 0; i < words.length; i++ ) {
            let strCode = words.charCodeAt(i);

            if ( strCode > 128 )
                totLength += fontSize;

            else
                totLength += fontSize / 2;
        }

        return totLength;
    }

    getWordWidth(word) {
        if ( typeof(word.text) === 'number' )
            word.text = word.text.toString();

        let w = this.wordWidth(word.text, word.fontSize);

        return Math.ceil(w);
    }

    /**
     * 根据给定样式绘制文字
     */
    drawWord(ctx, word) {
        if ( typeof(word.text) === 'number' )
            word.text = word.text.toString();

        ctx.beginPath();

        if ( word.isbottom )
            ctx.setTextBaseline('bottom')

        if ( word.baseline ) {
            ctx.setTextBaseline(word.baseline)
        }

        ctx.setFontSize(word.fontSize);
        ctx.setFillStyle(word.color);
        ctx.setTextAlign(word.textAlign || 'left');
        ctx.fillText(word.text, word.x, word.y);

        ctx.stroke();
        ctx.closePath();
    }

    /**
     * 绘制一个矩形
     */
    drawRect(ctx, rect) {
        ctx.beginPath();
        ctx.setStrokeStyle(rect.fillColor);
        ctx.setFillStyle(rect.fillColor);
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        ctx.closePath();
    }

    /**
     * 根据给定样式绘制线条
     */
    drawLine(ctx, line) {
        ctx.beginPath();
        ctx.setLineWidth(line.width || 1);
        ctx.setStrokeStyle(line.color);

        if ( line.isDash )
            ctx.setLineDash(line.dashPattern, line.dashOffset);

        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);

        ctx.stroke();
        ctx.closePath();

        ctx.setLineDash([0], 0);
    }

    drawLongLine(ctx, line) {
        ctx.beginPath();
        ctx.setLineWidth(line.width || 1);
        ctx.setStrokeStyle(line.color);

        if ( line.isDash )
            ctx.setLineDash(line.dashPattern, line.dashOffset);

        let points = line.points || [];

        for ( let index = 0; index < points.length; index++ ) {
            let point = points[index];
            if ( index === 0 )
                ctx.moveTo(point.x, point.y);

            else
                ctx.lineTo(point.x, point.y);
        }

        // 需要填充背景颜色要在stroke之前填充，否则边界线会发虚
        if ( line.fill ) {
            ctx.setFillStyle(line.fillColor);
            ctx.fill();
        }

        ctx.stroke();
        ctx.closePath();

        ctx.setLineDash([0], 0);
    }

    /**
     * 绘制一条由线段连接在一起的长线
     * 绘制多个线条时，效率更高的做法是，创建一个包含所有线条的路径，
     * 然后通过单个绘制调用进行绘制。也就是说，无需分别绘制各个线条。
     * 当这条线由很多线段组成的时候，可以非常显著提升性能!
     */
    drawLongLineWithFill(ctx, points, opts = {
        lineWidth: 1,
        lineColor: '#7587db',
        fillColor: 'rgba(117, 135, 219, 0.3)',
    }) {
        ctx.beginPath();
        ctx.setFillStyle(opts.fillColor);
        ctx.setLineWidth(opts.lineWidth);
        ctx.setStrokeStyle(opts.lineColor);

        let start = points[0];
        let end   = points[points.length - 1];

        ctx.moveTo(start.x, start.y);

        for ( let index = 1; index < points.length - 1; index++ ) {
            let point = points[index];
            if ( index === 1 )
                ctx.moveTo(point.x, point.y);

            else
                ctx.lineTo(point.x, point.y);
        }

        ctx.stroke();

        ctx.lineTo(end.x, end.y);
        ctx.lineTo(start.x, start.y);

        ctx.fill()

        ctx.closePath();
    }

    /**
     * 根据给定样式绘制一个圆
     */
    drawCircle(ctx, circle) {
        ctx.beginPath();

        ctx.setStrokeStyle(circle.strokeColor);
        ctx.setFillStyle(circle.fillColor);
        ctx.setLineWidth(circle.lineWidth || 1);
        ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);

        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    clearCanvas(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
        ctx.draw();
    }
}

