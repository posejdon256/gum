import { getContext, getCanvas } from "./CanvasData";
import { getLines, getLinesPrev } from "./Lines/Lines";
import { getrectangles } from "./Rectangles/Rectangle";
import { isIntersection } from "../Intersection/Intersect";

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

    //#4f00ff
    //#2dfce9
    const prev = getLinesPrev();
    ctx.strokeStyle = "#d6c4ff";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + prev[0].x1, startY + prev[0].y1);
    ctx.lineTo(startX + prev[1].x, startY + prev[1].y);
    ctx.stroke();

    //line2
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + prev[0].x2, startY + prev[0].y2);
    ctx.lineTo(startX + prev[1].x, startY + prev[1].y);
    ctx.stroke();

    const inters = isIntersection(lines, getrectangles());

    for(let i = 0; i < inters.length; i ++) {
        if(inters[i] === false) {
            continue;
        }
        ctx.strokeStyle = "#B00020";
        ctx.beginPath();
        ctx.moveTo(startX + inters[i].l.x1, startY + inters[i].l.y1);
        ctx.lineTo(startX + inters[i].l.x2, startY + inters[i].l.y2);
        ctx.stroke();

        ctx.strokeStyle = "#B00020";
        ctx.beginPath();
        ctx.moveTo(startX + inters[i].r.x1, startY + inters[i].r.y1);
        ctx.lineTo(startX + inters[i].r.x2, startY + inters[i].r.y2);
        ctx.stroke();
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