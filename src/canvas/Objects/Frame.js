import { getScene, getTHREE } from "../Animation/AnimationFrame";
let points = [];
let line;
function prepareFrame() {
    for(let i = 0; i < 2; i ++) {
        points.push([]);
       for(let j = 0; j < 2; j ++) {
           points[i].push([]);
            for(let k = 0; k < 2; k ++) {
                points[i][j].push({
                     x: i * 30,
                     y: j * 30,
                     z: k * 30,
                     i: i * 3,
                     j: j * 3,
                     k: k * 3
                });
            } 
       }
   }
}
export function moveFrame(translation) {
    for(let i = 0; i < 2; i ++) {
       for(let j = 0; j < 2; j ++) {
            for(let k = 0; k < 2; k ++) {
                points[i][j][k].x += translation.left;
                points[i][j][k].y += translation.top;
                points[i][j][k].z += translation.front;
            } 
       }
   }
   removeFrame();
   addFrameToScene(false);
}
export function getFrameCorners() {
    return points;
}
export function addFrameToScene(notPrepare) {
    if(notPrepare !== false) {
        prepareFrame();
    }
    const THREE = getTHREE();
    const scene = getScene();
    const geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    for(let i = 0; i < 2; i ++) {
        for(let j = 0; j < 2; j ++) {
            for(let k = 0; k < 2; k ++) {
                if(j < 1) {
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    geometry.vertices.push(new THREE.Vector3(points[i][j + 1][k].x, points[i][j + 1][k].y, points[i][j + 1][k].z));
                }
                if(i < 1) {
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    geometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j][k].y, points[i + 1][j][k].z));
                }
                if(k < 1){
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k + 1].x, points[i][j][k + 1].y, points[i][j][k + 1].z));
                }

                geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                // geometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j + 1][k].y, points[i][j][k].z));

            }
            geometry.vertices.push(new THREE.Vector3(points[i][j][0].x, points[i][j][0].y, points[i][j][0].z));
        }

    }
    line = new THREE.Line( geometry, material );
    line.position.x = -15;
    line.position.y = -15;
    line.position.z = -15;

    scene.add(line);
}
export function removeFrame() {
    const scene = getScene();
    scene.remove(line);
}