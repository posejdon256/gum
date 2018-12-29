import { RungyKuttaStep } from "../../datas/RungyKutta";

let camera = [],
    renderer = [],
    scene = [],
    THREE;
export function getCamera() {
    return camera;
}
export function getCameras(){
    return camera;
}
export function setTHREE(_Three) {
    THREE = _Three;
}
export function getTHREE() {
    return THREE;
}
export function setCamera(_camera){
    camera = _camera;
}
export function setScene(_scene){
    scene = _scene;
}
export function setRenderer(_renderer) {
    renderer = _renderer;
}
export function getScene() {
    return scene;
}
export function _animate() {
    requestAnimationFrame( _animate );
    RungyKuttaStep();
    renderer.render( scene, camera );
}