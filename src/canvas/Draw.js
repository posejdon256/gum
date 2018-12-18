import { getSelect1, getSelect2 } from '../datas/CollectAndShareDatas';
import { getCanvas, getContext } from './CanvasData';
import { getLines, getLinesPrev } from './Lines/Lines';
import { getrectangles } from './Rectangles/Rectangle';

let startX = 700;
let startY = 455;
export function Draw() {

    const ctx = getContext();
    const canvas = getCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    DrawRectangles();
    DrawLines();
}
function DrawLines() {

    const lines = getLines();  
    const prev = getLinesPrev();

    //prev
    if(getSelect1()) {
        DrawLine("#d6c4ff", startX, startY, startX + prev[0].x1, startY + prev[0].y1);
        DrawLine("#d6c4ff", startX + prev[0].x1, startY + prev[0].y1, startX + prev[1].x, startY + prev[1].y);
        DrawCircle("#d6c4ff", startX + prev[0].x1, startY + prev[0].y1);
    }

    DrawCircle("#d6c4ff", startX, startY);
    DrawCircle("#d6c4ff", startX + prev[1].x, startY + prev[1].y);
    

    if(!getSelect1()) {
        DrawLine("#d6c4ff", startX, startY, startX + prev[0].x2, startY + prev[0].y2);
        DrawLine("#d6c4ff", startX + prev[0].x2, startY + prev[0].y2, startX + prev[1].x, startY + prev[1].y);
        DrawCircle("#d6c4ff", startX + prev[0].x2, startY + prev[0].y2);
    }

    //line1
    if(getSelect2()) {
        DrawLine("#3700B3", startX, startY, startX + lines[0].x1, startY + lines[0].y1);
        DrawLine("#3700B3", startX + lines[0].x1, startY + lines[0].y1, startX + lines[1].x, startY + lines[1].y);

        DrawCircle("#3700B3", startX, startY);
        DrawCircle("#3700B3", startX + lines[0].x1, startY + lines[0].y1);
        DrawCircle("#3700B3", startX + lines[1].x,startY + lines[1].y);
    }

    //line2
    if(!getSelect2()) {
        DrawLine("#03DAC6", startX, startY, startX + lines[0].x2, startY + lines[0].y2);
        DrawLine("#03DAC6", startX + lines[0].x2, startY + lines[0].y2, startX + lines[1].x, startY + lines[1].y);

        DrawCircle("#03DAC6", startX, startY);
        DrawCircle("#03DAC6", startX + lines[0].x2, startY + lines[0].y2,);
        DrawCircle("#03DAC6", startX + lines[1].x, startY + lines[1].y);
    }

}
function DrawRectangles() {
    const rects = getrectangles();
    const ctx = getContext();
    ctx.fillStyle = "#BB86FC";
    for(let i = 0; i < rects.length; i ++) {
        ctx.fillRect(startX + rects[i].x1, startY + rects[i].y1, rects[i].x2 - rects[i].x1, rects[i].y2 - rects[i].y1);
    }
}
function DrawLine(color, x1, y1, x2, y2) {
    const ctx = getContext();

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function DrawCircle(color, x, y) {
    const ctx = getContext();
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
    ctx.fill();
}