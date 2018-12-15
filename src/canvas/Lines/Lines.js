import { getL1, getL2 } from "../../datas/CollectAndShareDatas";

const lines = [
    {
        angle1: 30,
        angle2: 60,
        x1: 1,
        y1: 1,
        x2: 1,
        y2: 1
    },
    {
        angle1: 30,
        angle2: 60,
        x: 2,
        y: 2,
    }
];
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

    lines[0].angle1 = Math.atan2(y1, x1);
    lines[0].angle2 = Math.atan2(y1 + y2, x1 + x2);

    lines[1].angle1 = Math.atan2(p2 - y1, p1 - x1);
    lines[1].angle1 = Math.atan2(p2 - y2, p1 - x2);

    lines[0].x1 = x1;
    lines[0].y1 = y1;
    lines[0].x2 = x2;
    lines[0].y2 = y2;

    lines[1].x = p1;
    lines[1].y = p2;
}