const rectangles = [
];
export function getrectangles() {
    return rectangles;
}
export function addRectangle(x1, y1, x2, y2) {
    if (x1 === x2 || y1 === y2) {
        return;
    }
    const rect = {};
    rect.x1 = Math.min(x1, x2);
    rect.y1 = Math.min(y1, y2);
    rect.x2 = Math.max(x1, x2);
    rect.y2 = Math.max(y1, y2);

    rectangles.push(rect);
}