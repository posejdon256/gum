import { getScene, getTHREE } from "../Animation/AnimationFrame";
let points = [];
let line;
export function prepareCubePoints() {
    for(let i = 0; i < 4; i ++) {
        points.push([]);
       for(let j = 0; j < 4; j ++) {
           points[i].push([]);
            for(let k = 0; k < 4; k ++) {
                points[i][j].push({
                    // x: (Math.random() * 100) % 40,
                    // y: (Math.random() * 100) % 40,
                    // z: (Math.random() * 100) % 40
                    v: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    x: i * 10,
                    y: j * 10,
                    z: k * 10,
                    i: i,
                    j: j,
                    k: k
                });
            } 
       }
   }
}
export function setCubePoints(_points) {
    points = _points;
}
export function getCubePoints() {
    return points;
}
export function addBezierCube() {
    const THREE = getTHREE();
    const scene = getScene();
    const geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    for(let i = 0; i < 4; i ++) {
        for(let j = 0; j < 4; j ++) {
            for(let k = 0; k < 4; k ++) {
               // console.log(i, j);
                if(j < 3) {
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    geometry.vertices.push(new THREE.Vector3(points[i][j + 1][k].x, points[i][j + 1][k].y, points[i][j + 1][k].z));
                }
                if(i < 3 && j < 3) {
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    geometry.vertices.push(new THREE.Vector3(points[i + 1][j + 1][k].x, points[i + 1][j + 1][k].y, points[i + 1][j + 1][k].z));
                }
                if(i < 3) {
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    geometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j][k].y, points[i + 1][j][k].z));
                }
                if(i < 3 && j < 3) {
                    geometry.vertices.push(new THREE.Vector3(points[i][j + 1][k].x, points[i][j + 1][k].y, points[i][j + 1][k].z));
                    geometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j][k].y, points[i + 1][j][k].z));
                }
                if(i < 3 && k < 3) {
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    geometry.vertices.push(new THREE.Vector3(points[i + 1][j][k + 1].x, points[i + 1][j][k + 1].y, points[i + 1][j][k + 1].z));
                }
                if(j < 3 && k < 3) {
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    geometry.vertices.push(new THREE.Vector3(points[i][j + 1][k + 1].x, points[i][j + 1][k + 1].y, points[i][j + 1][k + 1].z));
                }
                if(k < 1 && i < 3) {
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k + 1].x, points[i][j][k + 1].y, points[i][j][k + 1].z));
                    geometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j][k].y, points[i + 1][j][k].z));
                }
                if(j < 3 && k < 3) {
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k + 1].x, points[i][j][k + 1].y, points[i][j][k + 1].z));
                    geometry.vertices.push(new THREE.Vector3(points[i][j + 1][k].x, points[i][j + 1][k].y, points[i][j + 1][k].z));
                }
                if(k < 3){
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k + 1].x, points[i][j][k + 1].y, points[i][j][k + 1].z));
                }
                if(i < 3 && j < 3 && k < 3) {
                    geometry.vertices.push(new THREE.Vector3(points[i + 1][j + 1][k + 1].x, points[i + 1][j + 1][k + 1].y, points[i + 1][j + 1][k + 1].z));
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));

                    geometry.vertices.push(new THREE.Vector3(points[i + 1][j + 1][k].x, points[i + 1][j + 1][k].y, points[i + 1][j + 1][k].z));
                    geometry.vertices.push(new THREE.Vector3(points[i][j][k + 1].x, points[i][j][k + 1].y, points[i][j][k + 1].z));
                    
                    geometry.vertices.push(new THREE.Vector3(points[i + 1][j][k + 1].x, points[i + 1][j][k + 1].y, points[i + 1][j][k + 1].z));
                    geometry.vertices.push(new THREE.Vector3(points[i][j + 1][k].x, points[i][j + 1][k].y, points[i][j + 1][k].z));

                    geometry.vertices.push(new THREE.Vector3(points[i][j + 1][k + 1].x, points[i][j + 1][k + 1].y, points[i][j + 1][k + 1].z));
                    geometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j][k].y, points[i + 1][j][k].z));
                    
                }

                geometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                // geometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j + 1][k].y, points[i][j][k].z));

            }
            //geometry.vertices.push(new THREE.Vector3(points[i][j][0].x, points[i][j][0].y, points[i][j][0].z));
        }
        geometry.vertices.push(new THREE.Vector3(points[i][3][0].x, points[i][3][0].y, points[i][3][0].z));
        geometry.vertices.push(new THREE.Vector3(points[i][0][0].x, points[i][0][0].y, points[i][0][0].z));
    }
    for(let i = 0; i < 3; i ++) {
        for(let j = 0; j < 1; j++) {
            geometry.vertices.push(new THREE.Vector3(points[3][i][j].x, points[3][i][j].y, points[3][i][j].z));

        }
    }
    line = new THREE.Line( geometry, material );
    line.position.x = -15;
    line.position.y = -15;
    line.position.z = -15;

    scene.add(line);
}
export function removeBezier() {
    const scene = getScene();
    scene.remove(line);
}