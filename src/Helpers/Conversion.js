export function radiansToDegrees(_angle) {
    while(_angle < 0) {
        _angle += (2 * Math.PI);
    }
    while(_angle > 2 * Math.PI) {
        _angle -= (2 * Math.PI);
    }
    return parseInt(_angle * 180 / Math.PI, 10);
}
export function degreesToRadians(_angle) {
    return _angle * Math.PI / 180;
}