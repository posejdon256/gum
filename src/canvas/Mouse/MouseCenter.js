import { getCanvas } from "../CanvasData";
import { setLines } from "../Lines/Lines";
import { getMode } from "../../datas/CollectAndShareDatas";
import { Draw } from "../Draw";
import { addRectangle } from "../Rectangles/Rectangle";

let startX;
let startY;
let endX;
let endY;

export function mouseDown(event) {
    const rect = getCanvas().getBoundingClientRect();
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;
}
export function mouseUp(event) {
    const rect = getCanvas().getBoundingClientRect();
    endX = event.clientX - rect.left;
    endY = event.clientY - rect.top;

    if(!getMode()) {
        setLines(endX - 700, endY - 455);
    } else {
        addRectangle(startX - 700, startY - 455, endX - 700, endY - 455);
    }
    Draw();
}
