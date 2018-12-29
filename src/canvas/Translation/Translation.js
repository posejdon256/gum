import { getCamera, getCameras } from "../Animation/AnimationFrame";

let radX = 0, radY = 0;
let transVec = [0, 0, 0];
let zoom = 0.5;
export function getTranslationVector() {
    return transVec;
}
export function getRotationDatas() {
    return {x: radX, y: radY};
}
export function getZooming() {
    return [zoom, zoom, zoom];
}
export function setPosition(vec) {
    transVec = [vec[0], vec[1], vec[2]];
}
export default function Translate(translationObject) {
    const camera = getCameras();
    const {front, left, top, axisX, axisY, alphaX, alphaY} = translationObject;
    //rotation
    if(axisX) {
        camera.rotation.y += (alphaX);
    }
    if(axisY) {
        camera.rotation.x += (alphaY);
    }
    //shift
    if(left !== undefined && left !== 0) {
        camera.position.x += (left * 10);
    }
    if(top !== undefined && top !== 0) {
        camera.position.y += (top * 10);
    }
    if(front !== undefined && front !== 0) {
        camera.position.z /= front;
    }
}