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
    event.preventDefault();
    event.stopPropagation();
}
export function mouseUp(event) {
    event.preventDefault();
    event.stopPropagation();
    const rect = getCanvas().getBoundingClientRect();
    endX = event.clientX - rect.left;
    endY = event.clientY - rect.top;

    if(!getMode()) {
        if(event.button === 0) {
            setLines(endX - 700, endY - 455, 1);
        } else if(event.button === 2) {
            setLines(endX - 700, endY - 455, 0);
        }
    } else {
        addRectangle(startX - 700, startY - 455, endX - 700, endY - 455);
    }
    Draw();
    return false;
}
