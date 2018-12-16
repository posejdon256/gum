let canvas;
let ctx;

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
}