
export function isIntersection(lines, rectangles) {

    const inters = [];
    for(let i = 0; i < rectangles.length; i ++) {
        inters.push(ifLineIntersectRectangle(lines, rectangles[i]));
    }
    return inters;
}
function ifLineIntersectRectangle(lines, rect) {

    const ls = Array(4);
    ls[0] = {x1: 0, y1: 0, x2: lines[0].x1, y2: lines[0].y1};
    ls[1] = {x1: 0, y1: 0, x2: lines[0].x2, y2: lines[0].y2};
    ls[2] = {x1: lines[0].x1, y1: lines[0].y1, x2: lines[1].x, y2: lines[1].y};
    ls[3] = {x1: lines[0].x2, y1: lines[0].y2, x2: lines[1].x, y2: lines[1].y};

    const rs = Array(4);
    rs[0] = {x1: rect.x1, y1: rect.y1, x2: rect.x2, y2: rect.y1};
    rs[1] = {x1: rect.x1, y1: rect.y1, x2: rect.x1, y2: rect.y2};
    rs[2] = {x1: rect.x1, y1: rect.y2, x2: rect.x2, y2: rect.y2};
    rs[3] = {x1: rect.x2, y1: rect.y1, x2: rect.x2, y2: rect.y2};

    for(let i = 0; i < 4; i ++) {
        for(let j = 0; j < 4; j ++) {
            if(intersect(ls[i], rs[j])) {
                return {l: ls[i], r: rs[j]};
            }
        }
    }
    return false;
}
export function ifTwolinesIntersectRectangles(lines, rects) {
    for(let i = 0; i < rects.length; i ++) {
        const rect = rects[i];
        const rs = Array(4);
        rs[0] = {x1: rect.x1, y1: rect.y1, x2: rect.x2, y2: rect.y1};
        rs[1] = {x1: rect.x1, y1: rect.y1, x2: rect.x1, y2: rect.y2};
        rs[2] = {x1: rect.x1, y1: rect.y2, x2: rect.x2, y2: rect.y2};
        rs[3] = {x1: rect.x2, y1: rect.y1, x2: rect.x2, y2: rect.y2};

        for(let k = 0; k < lines.length; k ++) {
            for(let j = 0; j < 4; j ++) {
                if(intersect(lines[k], rs[j])) {
                    return true;
                }
            }
        }
    }
    return false;
}
export function intersect(l, r) {
    const A = {x: l.x1, y: l.y1};
    const B = {x: l.x2, y: l.y2};

    const C = {x: r.x1, y: r.y1};
    const D = {x: r.x2, y: r.y2};
    return ccw(A,C,D) !== ccw(B,C,D) && ccw(A,B,C) !== ccw(A,B,D);
}
function ccw (A, B, C) {
    return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x);
}