import Translate, { getZooming } from "../Translation/Translation";
import { getShowFrame } from "../../datas/CollectAndShareDatas";
import { moveFrame } from "../Objects/Frame";


let front = 0;
let left = 0;
let top = 0;
let step = 0.1;
let interval;

function setIntervalForMoving(){
    if(!interval) {
        interval = setInterval(function(){
            const _actualFront = getZooming();
            if(_actualFront > 1.5 && front !== 0.99)  {
                front = 0;
            }
            let trasnlationObject = {
                front: front,
                left: left,
                top: top
            }
            if(getShowFrame()) {
                trasnlationObject.front = trasnlationObject.front === 0.99 ? -1 : trasnlationObject.front;
                trasnlationObject.left *=3;
                trasnlationObject.top *=3;
                moveFrame(trasnlationObject);
                return;
            }
            Translate(trasnlationObject);
            Translate(trasnlationObject);
        }, 5);
    }
}
function removeIntervalForMoving(){
    if(front === 0 && left === 0 && top === 0) {
        clearInterval(interval);
        interval = undefined;
    }
}
export function MoveToTop(){
    if(top !== 0) return;

    top = -step;
    setIntervalForMoving();
}
export function MoveToDown(){
    if(top !== 0) return;

    top = step;
    setIntervalForMoving();
}
export function MoveToFront(){
    if(front !== 0) return;
    front = 1.01;
    setIntervalForMoving();
}
export function MoveToBack(){
    if(front !== 0) return;

    front = 0.99;
    setIntervalForMoving();
}
export function MoveToLeft(){
    if(left !== 0) return;    

    left = -step;
    setIntervalForMoving();
}
export function MoveToRight(){
    if(left !== 0) return;

    left = step;
    setIntervalForMoving();
}
export function StopMovingFront(){
    front = 0;
    removeIntervalForMoving();
}
export function StopMovingBack(){
    front = 0;
    removeIntervalForMoving();
}
export function StopMovingLeft(){
    left = 0;
    removeIntervalForMoving();
}
export function StopMovingRight(){
    left = 0;
    removeIntervalForMoving();
}
export function StopMovingTop(){
    top = 0;
    removeIntervalForMoving();
}
export function StopMovingDown(){
    top = 0;
    removeIntervalForMoving();
}