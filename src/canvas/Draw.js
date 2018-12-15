import { getContext, getCanvas } from "./CanvasData";
import { getLines } from "./Lines/Lines";

let startX = 700;
let startY = 455;
export function Draw() {

    const ctx = getContext();
    const canvas = getCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    DrawLines();
}
function DrawLines() {
    const ctx = getContext();
    const lines = getLines();

    //line1
    ctx.strokeStyle = "#3700B3";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + lines[0].x1, startY + lines[0].y1);
    ctx.lineTo(startX + lines[1].x, startY + lines[1].y);
    ctx.stroke();

    //line2
    ctx.strokeStyle = "#03DAC6";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + lines[0].x2, startY + lines[0].y2);
    ctx.lineTo(startX + lines[1].x, startY + lines[1].y);
    ctx.stroke();

}
function DrawRectangles() {
    
}