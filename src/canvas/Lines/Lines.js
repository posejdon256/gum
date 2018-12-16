import { getL1, getL2 } from "../../datas/CollectAndShareDatas";
import { radiansToDegrees, degreesToRadians } from "../../Helpers/Conversion";

const lines = [{},{}];
const linesPrev = [{}, {}];
export function getLinesPrev() {
    return linesPrev;
}
export function getLines() {
    return lines;
}
export function setLines(p1, p2) { // p1 - p.x, p2 - p.y
    const l1 = getL1();
    const l2 = getL2();

    const l1_2 = Math.pow(l1, 2);
    const l2_2 = Math.pow(l2, 2);
    const p1_3 = Math.pow(p1, 3);
    const p2_2 = Math.pow(p2, 2);
    const p1_2 = Math.pow(p1, 2);
    const l1_4 = Math.pow(l1, 4);
    const p2_4 = Math.pow(p2, 4);

    const x1 = (l1_2 * p1 - l2_2 *p1 + p1_3 + 
        p1 *p2_2 - Math.sqrt(-p2_2 * (l1_4 + Math.pow(-l2_2 + p1_2 + p2_2, 2) - 
           2 *l1_2 * (l2_2 + p1_2 + p2_2))))/(2 * (p1_2 + p2_2));
    const y1 =(l1_2 * p2_2 - l2_2 * p2_2 + p1_2 * p2_2 + p2_4 + 
        p1 * Math.sqrt(-p2_2 * (l1_4 + Math.pow(-l2_2 + p1_2 + p2_2, 2) - 
            2 * l1_2 * (l2_2 + p1_2 + p2_2))))/(2 * p2 * (p1_2 + p2_2))
    const x2 = (l1_2 * p1 - l2_2 * p1 + p1_3 + p1 * p2_2 + 
                Math.sqrt(-p2_2 * (l1_4 + Math.pow(-l2_2 + p1_2 + p2_2, 2) - 
                   2 * l1_2 * (l2_2 + p1_2 + p2_2))))/(2 * (p1_2 + p2_2));
    const y2 = (l1_2 * p2_2 - l2_2 * p2_2 + p1_2 * p2_2 + p2_4 - 
                p1 * Math.sqrt(-p2_2 * (l1_4 + Math.pow(-l2_2 + p1_2 + p2_2, 2) - 
                    2 * l1_2 * (l2_2 + p1_2 + p2_2))))/(2 * p2 * (p1_2 + p2_2));

    //line prev
    linesPrev[0].angle1 = lines[0].angle1;
    linesPrev[0].angle2 = lines[0].angle2;
    linesPrev[0].x1 = lines[0].x1;
    linesPrev[0].y1 = lines[0].y1;
    linesPrev[0].x2 = lines[0].x2;
    linesPrev[0].y2 = lines[0].y2;

    linesPrev[1].angle1 = lines[1].angle1;
    linesPrev[1].angle2 = lines[1].angle2;
    linesPrev[1].x = lines[1].x;
    linesPrev[1].y = lines[1].y;

    lines[0].angle1 = radiansToDegrees(Math.atan2(y1, x1));
    lines[0].angle2 = radiansToDegrees(Math.atan2(y2, x2));

    lines[1].angle1 = radiansToDegrees(Math.atan2(p2 - y1, p1 - x1));
    lines[1].angle2 = radiansToDegrees(Math.atan2(p2 - y2, p1 - x2));

    lines[0].x1 = x1;
    lines[0].y1 = y1;
    lines[0].x2 = x2;
    lines[0].y2 = y2;

    lines[1].x = p1;
    lines[1].y = p2;
}
export function convertAngleToLine(angle, p, len) {
    return {
        x1: p.x,
        y1: p.y,
        x2: p.x + (len * Math.cos(degreesToRadians(angle))),
        y2: p.y + (len * Math.sin(degreesToRadians(angle)))
    }
}