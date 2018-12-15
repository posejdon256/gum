let ctx;
let canvas;
export function setContext(_canvas) {
    canvas = _canvas;
    ctx = _canvas.getContext("2d");
}
export function getContext() {
    return ctx;
}
export function getCanvas() {
    return canvas;
}