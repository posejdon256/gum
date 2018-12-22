
let points = [];
export function getLinesVerticesTrayectory() {
    let lines = [];
    lines = lines.concat(points);
    return lines;
}
export function addPointToDraw(x, y, z) {
}
export function removePointToDraw() {
}
export function getLinesIndicesTrayectory() {
    let lines = [];
    return lines;
}
export function getLinesVerticesDiagonal() {
    let lines = [];
    return lines;
}
export function getLinesIndicesDiagonal() {
    return [0, 1];
}
export function getLinesVerticesGraviatation() {
    let lines = [];
    lines.push(0, 0, 0, 0,  -9.81, 0);
    return lines;
}
export function getLinesIndicesGravitation() {
    return [0, 1];
}