import { Draw } from '../canvas/Draw';
import { convertAngleToLine, getLines, getLinesPrev, setLines } from '../canvas/Lines/Lines';
import { getrectangles } from '../canvas/Rectangles/Rectangle';
import { getL1, getL2 } from '../datas/CollectAndShareDatas';
import { ifTwolinesIntersectRectangles } from '../Intersection/Intersect';
import { updateCanvas } from '../navbar/FloodFillCanvas';

let configuaration;
let visited;
let interId;
let animationSteps;
let step;
export function startAnimation() {
    configuaration = Array(360).fill().map(() => Array(360).fill(0));
    visited = Array(360).fill().map(() => Array(360).fill(false));
    fillArray();
    animationSteps = findPath();
    step = 0;
    interId = setInterval(animationStep, 10);
}
function fillArray() {
    const rectangles = getrectangles();
    for(let i = 0; i < 360; i ++) {
        for(let j = 0; j < 360; j ++) {
            const len1 = getL1();
            const len2 = getL2();

            const p1 = {x: 0, y: 0};
            const l1 = convertAngleToLine(i, p1, len1);
            const p2 = {x: l1.x2, y: l1.y2};
            const l2 = convertAngleToLine(j, p2, len2);


            const isIntersect = ifTwolinesIntersectRectangles([l1, l2], rectangles);
            configuaration[i][j] = (isIntersect === true ? false : true);
        }
    }
    updateCanvas(configuaration);
}
function findPath() {
    const linesPrev = getLinesPrev();
    let startX = linesPrev[0].angle1;
    let startY = linesPrev[1].angle1;

    return floodFill(startX, startY);
}
function floodFill(x, y) {
    const lines = getLines();
    const stack = [{x: x, y: y}];
    let current; 
    while(stack.length !== 0) {
        current = stack.shift();
        if(current.x === lines[0].angle1 && current.y === lines[1].angle1) {
           break;
        }
        if(current.x < 0 || current.x >= 360 || current.y < 0 || current.y >= 360) {
            continue;
        }
        if(visited[current.x][current.y] === true) {
            continue;
        }
        visited[current.x][current.y] = true;
        if(configuaration[current.x][current.y] === false) {
            continue;
        }
        stack.push({x: current.x - 1, y: current.y, prev: current});
        stack.push({x: current.x, y: current.y - 1, prev: current});
        stack.push({x: current.x + 1, y: current.y, prev: current});
        stack.push({x: current.x, y: current.y + 1, prev: current});
        current = undefined;
    }
    if(current) {
        const ret = [];
        ret.push({x: current.x, y: current.y});
        let _current = current.prev;
        while(_current.prev) {
            ret.push({x: _current.x, y: _current.y});
            _current = _current.prev;
        }
        return ret.reverse();
    }
    return false;
}
function animationStep() {
    if(!animationSteps || step >= animationSteps.length) {
        clearInterval(interId);
        return;
    }
    const len1 = getL1();
    const len2 = getL2();

    const p1 = {x: 0, y: 0};
    const l1 = convertAngleToLine(animationSteps[step].x, p1, len1);
    const p2 = {x: l1.x2, y: l1.y2};
    const l2 = convertAngleToLine(animationSteps[step].y, p2, len2);
    const p3 = {x: l2.x2, y: l2.y2};
    setLines(parseInt(p3.x, 10), parseInt(p3.y, 10));
    Draw();
    step ++;
}