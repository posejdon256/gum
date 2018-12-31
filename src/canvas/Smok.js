
export function getSmok() {
//   /  var reader = new FileReader();
   // const _name = "Smok.json";
    const json = require(`./Smok.json`);
    //console.log(json);
    let max = -1000;
    let min = 1000;
    for(let i = 0; i < json.vertices.length; i ++) {
        if(json.vertices[i] < min) {
            min = json.vertices[i];
        }
        if(json.vertices[i] > max) {
            max = json.vertices[i];
        }
    }
    max = Math.max(max, Math.abs(min));
    for(let i = 0; i < json.vertices.length; i ++) {
        json.vertices[i] /= max;
    }
    for(let i = 0; i < json.vertices.length - 2; i += 3) {
       // json.vertices[i] /= max;
        json.vertices[i + 1] = -json.vertices[i + 1];
    }
    return json.vertices;
}