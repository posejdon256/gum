import { Draw } from '../canvas/Draw';
import { convertAngleToLine, getLines, getLinesPrev, setLines, linesFromAngles, updateLinePrev } from '../canvas/Lines/Lines';
import { getrectangles } from '../canvas/Rectangles/Rectangle';
import { getL1, getL2, getSelect1, getSelect2 } from '../datas/CollectAndShareDatas';
import { ifTwolinesIntersectRectangles } from '../Intersection/Intersect';
import { updateCanvas, putWayOnCanvas, drawStartAndEnd, colorPixel } from '../navbar/FloodFillCanvas';

let configuaration;
let visited;
let interId;
let animationSteps;
let step;
let animationRun = false;
let callError;

export function startAnimation(_callError) {
    callError = _callError;
    configuaration = Array(360).fill().map(() => Array(360).fill(0));
    visited = Array(360).fill().map(() => Array(360).fill(false));
    fillArray();
    animationSteps = findPath();
    step = 0;
    interId = setInterval(animationStep, 10);
}
export function getAnimationRun() {
    return animationRun;
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
    const lines = getLines();
    const startX = getSelect1() ? linesPrev[0].angle1 : linesPrev[0].angle2;
    const startY = getSelect1() ? linesPrev[1].angle1 : linesPrev[1].angle2;

    const endX = getSelect2() ? lines[0].angle1 : lines[0].angle2;
    const endY = getSelect2() ? lines[1].angle1 : lines[1].angle2;
    if(isNaN(startX) || isNaN(startY) || isNaN(endX) || isNaN(endY)) {
        callError("You put a point in a wrong place");
        return false;
    }

    const flood = floodFill(startX, startY);
    if(!flood) {
        callError("There is no possible way");
    } else {
        callError("No error");
    }
    drawStartAndEnd({x: startX, y: startY}, {x: endX, y: endY});
    return flood;
}
function floodFill(x, y) {
    const lines = getLines();
    const stack = [{x: x, y: y, deep: 0}];
    let current; 
    const endX = getSelect2() ? lines[0].angle1 : lines[0].angle2;
    const endY = getSelect2() ? lines[1].angle1 : lines[1].angle2;
    while(stack.length !== 0) {
        current = stack.shift();
        if(current.x === endX && current.y === endY) {
           break;
        }
        if(current.x >= 360) {
            current.x = 0;
        } else if(current.x < 0) {
            current.x = 359;
        } else if(current.y >= 360) {
            current.y = 0;
        } else if(current.y < 0) {
            current.y = 359;
        }
        if(visited[current.x][current.y] === true) {
            current = undefined;
            continue;
        }
        visited[current.x][current.y] = true;
        if(configuaration[current.x][current.y] === false) {
            current = undefined;
            continue;
        }
        colorPixel(current, current.deep);
        stack.push({x: current.x - 1, y: current.y, prev: current, deep: current.deep + 1});
        stack.push({x: current.x, y: current.y - 1, prev: current, deep: current.deep + 1});
        stack.push({x: current.x + 1, y: current.y, prev: current, deep: current.deep + 1});
        stack.push({x: current.x, y: current.y + 1, prev: current, deep: current.deep + 1});
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
        putWayOnCanvas(ret);
        return ret;
    }
    return false;
}
function animationStep() {
    if(!animationSteps || step >= animationSteps.length) {
        clearInterval(interId);
        animationRun = false;
        return;
    }
    linesFromAngles(animationSteps[step].x, animationSteps[step].y);
    Draw();
    if(step === 0) {
        animationRun = true;
    }
    step ++;
}