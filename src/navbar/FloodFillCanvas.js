let canvas;
let ctx;
let image;

export function setContextFloodFill(_canvas) {
    canvas = _canvas;
    ctx = _canvas.getContext("2d");
}
export function getContext() {
    return ctx;
}
export function getCanvas() {
    return canvas;
}
export function updateCanvas(configuration) {
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < 360; i ++) {
        for(let j = 0; j < 360; j ++) {
            const place = (parseInt((i), 10) * canvas.width * 4) + (parseInt(j, 10) * 4);
            if(configuration[i][j] === true) {
                img.data[place] = 99;
                img.data[place + 1] = 164;
                img.data[place + 2] = 255;
                img.data[place + 3] = 255;
            } else if(configuration[i][j] === false) {
                img.data[place] = 239;
                img.data[place + 1] = 83;
                img.data[place + 2] = 80;
                img.data[place + 3] = 255;
            }
        }
    }
    ctx.putImageData(img, 0, 0);
    image = img;
}
export function putWayOnCanvas(way) {
    ctx.putImageData(image, 0, 0);
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < way.length; i ++) {
            const place = (parseInt((way[i].x), 10) * canvas.width * 4) + (parseInt(way[i].y, 10) * 4);
                img.data[place] = 255;
                img.data[place + 1] = 255;
                img.data[place + 2] = 255;
                img.data[place + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
}
export function colorPixel(current, deep) {
    const place = (parseInt((current.x), 10) * canvas.width * 4) + (parseInt(current.y, 10) * 4);
    image.data[place] = 99;
    image.data[place + 1] = 164;
    image.data[place + 2] = 255;
    image.data[place + 3] = parseInt(deep, 10);
}
export function drawStartAndEnd(p1, p2) {
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const place1 = (parseInt((p1.x), 10) * canvas.width * 4) + (parseInt(p1.y, 10) * 4);
    img.data[place1] = 0;
    img.data[place1 + 1] = 0;
    img.data[place1 + 2] = 0;
    img.data[place1 + 3] = 255;

    const place2 = (parseInt((p2.x), 10) * canvas.width * 4) + (parseInt(p2.y, 10) * 4);
    img.data[place2] = 0;
    img.data[place2 + 1] = 0;
    img.data[place2 + 2] = 0;
    img.data[place2 + 3] = 255;
    
    ctx.putImageData(img, 0, 0);
}