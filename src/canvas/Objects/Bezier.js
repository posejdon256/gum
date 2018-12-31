import { getScene, getTHREE } from "../Animation/AnimationFrame";
import { MultiplyPoint, SumPoints } from "../../datas/RungyKutta";
import {addFrameToScene, removeFrame} from './Frame';
import { getShowSolid, getShowControlPoints, getShowFrame, getShowCuboid, getShowBezierBube } from "../../datas/CollectAndShareDatas";
import {addBox, removeBox} from './Box';

import _OBJLoader from 'three-obj-loader';
let points = [];
let mesh;
let smok;
let line;
let bezierGeometry;
let controlPointsGeometry;
let smokMesh;
let smokMeshArray = [];
export function prepareCubePoints() {
    for(let i = 0; i < 4; i ++) {
        points.push([]);
       for(let j = 0; j < 4; j ++) {
           points[i].push([]);
            for(let k = 0; k < 4; k ++) {
                points[i][j].push({
                    v: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                     x: i * 10 + (Math.random() * 10 - 5),
                     y: j * 10 + (Math.random() * 10 - 5),
                     z: k * 10 + (Math.random() * 10 - 5),
                    i: i,
                    j: j,
                    k: k
                });
            } 
       }
   }
}
function prepareMesh() {
    let _mesh = [];
    const delta = 0.1;
    for(let u = 0; u < 2; u ++) {
        for(let v = 0; v <= 1; v += delta) {
            for(let w = 0; w <= 1; w += delta) {
                if(w + delta > 1) {
                    continue;
                }
                if(v + delta <= 1 && u === 0) {
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u, v, w + delta));
                    _mesh.push(...evaluateBezier(u, v + delta, w + delta));
                }
                if(v - delta >= 0 && u === 0) {
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u, v - delta, w));
                    _mesh.push(...evaluateBezier(u, v, w + delta));
                }
                if(v + delta <= 1 && u === 1) {
                    _mesh.push(...evaluateBezier(u, v, w + delta));
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u, v + delta, w + delta));
                }
                if(v - delta >= 0 && u === 1) {
                    _mesh.push(...evaluateBezier(u, v - delta, w));
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u, v, w + delta));
                }
            }
        }
    }
    for(let v = 0; v < 2; v ++) {
        for(let u = 0; u <= 1; u += delta) {
            for(let w = 0; w <= 1; w += delta) {
                if(w + delta > 1) {
                    continue;
                }
                if(u + delta <= 1 && v === 1) {
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u, v, w + delta));
                    _mesh.push(...evaluateBezier(u + delta, v, w + delta));
                }
                if(u - delta >= 0 && v === 1) {
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u -  delta, v, w));
                    _mesh.push(...evaluateBezier(u, v, w + delta));
                }
                if(u + delta <= 1 && v === 0) {
                    _mesh.push(...evaluateBezier(u, v, w + delta));
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u + delta, v, w + delta));
                }
                if(u - delta >= 0 && v === 0) {
                    _mesh.push(...evaluateBezier(u -  delta, v, w));
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u, v, w + delta));
                }
            }
        }
    }
    for(let w = 0; w < 2; w ++) {
        for(let v = 0; v <= 1; v += delta) {
            for(let u = 0; u <= 1; u += delta) {
                if(u + delta > 1) {
                    continue;
                }
                if(v + delta <= 1 && w === 1) {
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u + delta, v, w));
                    _mesh.push(...evaluateBezier(u + delta, v + delta, w));
                }
                if(v + delta <= 1 && w === 0) {
                    _mesh.push(...evaluateBezier(u + delta, v, w));
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u + delta, v + delta, w));
                }
                if(v - delta >= 0 && w === 0) {
                    _mesh.push(...evaluateBezier(u, v - delta, w));
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u + delta, v, w));
                }
                if(v - delta >= 0 && w === 1) {
                    _mesh.push(...evaluateBezier(u, v, w));
                    _mesh.push(...evaluateBezier(u, v - delta, w));
                    _mesh.push(...evaluateBezier(u + delta, v, w));
                }
            }
        }
    }
    return _mesh;
}
export function setCubePoints(_points) {
    points = _points;
}
function prepareMeshSmok() {
    let _mesh = [];
    for(let i = 0; i < smok.length - 2; i +=3) {
        _mesh = _mesh.concat(evaluateBezier(smok[i], smok[i + 1], smok[i + 2]));
    }
    return _mesh;
}
export function getCubePoints() {
    return points;
}
export function addNiceBezierCube() {
    //return;
    const THREE = getTHREE();
    const scene = getScene();
    bezierGeometry = new THREE.BufferGeometry();
    bezierGeometry.dynamic = true;
    const vertices = new Float32Array(prepareMesh());
    bezierGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshPhongMaterial({
        color: 0xff0000
    });
    bezierGeometry.computeVertexNormals();
    mesh = new THREE.Mesh(bezierGeometry, material);
    scene.add(mesh);
    mesh.position.x = -15;
    mesh.position.y = -15;
    mesh.position.z = -15;
}
export function addBezierCube() {
   // addNiceBezierCube();
   // return;
    const THREE = getTHREE();
    const scene = getScene();
    controlPointsGeometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    for(let i = 0; i < 4; i ++) {
        for(let j = 0; j < 4; j ++) {
            for(let k = 0; k < 4; k ++) {
               // console.log(i, j);
                if(j < 3) {
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j + 1][k].x, points[i][j + 1][k].y, points[i][j + 1][k].z));
                }
                if(i < 3 && j < 3) {
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i + 1][j + 1][k].x, points[i + 1][j + 1][k].y, points[i + 1][j + 1][k].z));
                }
                if(i < 3) {
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j][k].y, points[i + 1][j][k].z));
                }
                if(i < 3 && j < 3) {
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j + 1][k].x, points[i][j + 1][k].y, points[i][j + 1][k].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j][k].y, points[i + 1][j][k].z));
                }
                if(i < 3 && k < 3) {
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i + 1][j][k + 1].x, points[i + 1][j][k + 1].y, points[i + 1][j][k + 1].z));
                }
                if(j < 3 && k < 3) {
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j + 1][k + 1].x, points[i][j + 1][k + 1].y, points[i][j + 1][k + 1].z));
                }
                if(k < 1 && i < 3) {
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k + 1].x, points[i][j][k + 1].y, points[i][j][k + 1].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j][k].y, points[i + 1][j][k].z));
                }
                if(j < 3 && k < 3) {
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k + 1].x, points[i][j][k + 1].y, points[i][j][k + 1].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j + 1][k].x, points[i][j + 1][k].y, points[i][j + 1][k].z));
                }
                if(k < 3){
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k + 1].x, points[i][j][k + 1].y, points[i][j][k + 1].z));
                }
                if(i < 3 && j < 3 && k < 3) {
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i + 1][j + 1][k + 1].x, points[i + 1][j + 1][k + 1].y, points[i + 1][j + 1][k + 1].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));

                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i + 1][j + 1][k].x, points[i + 1][j + 1][k].y, points[i + 1][j + 1][k].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k + 1].x, points[i][j][k + 1].y, points[i][j][k + 1].z));
                    
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i + 1][j][k + 1].x, points[i + 1][j][k + 1].y, points[i + 1][j][k + 1].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j + 1][k].x, points[i][j + 1][k].y, points[i][j + 1][k].z));

                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j + 1][k + 1].x, points[i][j + 1][k + 1].y, points[i][j + 1][k + 1].z));
                    controlPointsGeometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j][k].y, points[i + 1][j][k].z));
                    
                }

                controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][j][k].x, points[i][j][k].y, points[i][j][k].z));
                // geometry.vertices.push(new THREE.Vector3(points[i + 1][j][k].x, points[i + 1][j + 1][k].y, points[i][j][k].z));

            }
            //geometry.vertices.push(new THREE.Vector3(points[i][j][0].x, points[i][j][0].y, points[i][j][0].z));
        }
        controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][3][0].x, points[i][3][0].y, points[i][3][0].z));
        controlPointsGeometry.vertices.push(new THREE.Vector3(points[i][0][0].x, points[i][0][0].y, points[i][0][0].z));
    }
    for(let i = 0; i < 3; i ++) {
        for(let j = 0; j < 1; j++) {
            controlPointsGeometry.vertices.push(new THREE.Vector3(points[3][i][j].x, points[3][i][j].y, points[3][i][j].z));

        }
    }
    line = new THREE.Line( controlPointsGeometry, material );
    line.position.x = -15;
    line.position.y = -15;
    line.position.z = -15;

    scene.add(line);
}
function Bezier(i, t) {
    if(i === 0) {
        return Math.pow(1 - t, 3);
    }
    if(i === 1) {
        return 3 * Math.pow(1 - t, 2) * t;
    }
    if(i === 2) {
        return 3 * (1 - t) * Math.pow(t, 2);
    }
    if(i === 3) {
        return Math.pow(t, 3);
    }
}
function evaluateBezier(u, v, w) {
    let sum = {x: 0, y: 0, z: 0};
    for(let i = 0; i < 4; i ++) {
        for(let j = 0; j < 4; j ++) {
            for(let k = 0; k < 4; k ++) {
                let valueOfThisPlace = points[i][j][k];
                const b1 = Bezier(i, u);
                const b2 = Bezier(j, v);
                const b3 = Bezier(k, w);
                valueOfThisPlace = MultiplyPoint(valueOfThisPlace, b1 * b2 * b3);
                sum = SumPoints(sum, valueOfThisPlace);
            }
        }
    }
    return [sum.x, sum.y, sum.z];
}
export function ShowCenter() {

}
export function removeCenter(update) {
    const THREE = getTHREE();
    const scene = getScene();
    if(getShowControlPoints()) {
        scene.remove(line);
    }
    if(getShowFrame()) {
        removeFrame();
    }
    if(getShowCuboid()) {
        removeBox();
    }
    if(getShowBezierBube() && !update) {
        removeBezier();
    }
    if(getShowSolid() && !update) {
        removeSmok();
    }
}
export function updateCenter() {
    removeCenter(true);
    if(getShowControlPoints()) {
        addBezierCube();
    }
    if(getShowFrame()) {
        addFrameToScene();
    }
    if(getShowCuboid()) {
        addBox();
    }
    if(getShowBezierBube()) {
        updateBezier();
    }
    if(getShowSolid()) {
        updateSmok()
    }
}
export function removeBezier() {
    const scene = getScene();
    if(getShowSolid()) {
        scene.remove(mesh);
    } else {
        scene.remove(mesh); //TODO00!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!
        
    }
}
export function LoadOBJ() {
   // smok = getSmok(); 
   const THREE = getTHREE();
   _OBJLoader(THREE);
    const loader = new THREE.OBJLoader();

   // this.name='office';

    loader.load('./wolf2.obj', (_mesh) => {
    const scene = getScene();
      let max = -1000;
      let min = 1000;
      for(let i = 0; i < _mesh.children[0].geometry.attributes.position.array.length; i ++) {
        if(_mesh.children[0].geometry.attributes.position.array[i] < min) {
            min = _mesh.children[0].geometry.attributes.position.array[i];
        }
        if(_mesh.children[0].geometry.attributes.position.array[i] > max) {
            max = _mesh.children[0].geometry.attributes.position.array[i];
        }
      }
      for(let i = 0; i < _mesh.children[0].geometry.attributes.position.array.length; i ++) {
        _mesh.children[0].geometry.attributes.position.array[i] += Math.abs(min);
      }
    max = max + Math.abs(min);
    for(let i = 0; i < _mesh.children[0].geometry.attributes.position.array.length; i ++) {
        _mesh.children[0].geometry.attributes.position.array[i] /= max;
        smokMeshArray.push(_mesh.children[0].geometry.attributes.position.array[i]);
    }
    smokMesh = _mesh;
    smokMesh.position.x = -15;
    smokMesh.position.y = -15;
    smokMesh.position.z = -15;
    scene.add(smokMesh);
     });
}
export function updateBezier() {
    const THREE = getTHREE();
   // const scene = getScene();
    const vertices = new Float32Array(prepareMesh());
    bezierGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // const material = new THREE.MeshPhongMaterial({
    //     color: 0xff0000
    // });
  //  bezierGeometry.computeVertexNormals();
   // mesh = new THREE.Mesh(bezierGeometry, material);
   // scene.add(mesh);
}
export function updateSmok() {
    smokMesh.scale.x = 1;
    smokMesh.scale.y = 1;
    smokMesh.scale.z = 1;
     for(let i = 0; i < smokMesh.children[0].geometry.attributes.position.array.length - 2; i += 3) {
        const ret = evaluateBezier(smokMeshArray[i],
            smokMeshArray[i + 1],
            smokMeshArray[i + 2]);
            smokMesh.children[0].geometry.attributes.position.array[i] = ret[0];
            smokMesh.children[0].geometry.attributes.position.array[i + 1] = ret[1];
            smokMesh.children[0].geometry.attributes.position.array[i+ 2] = ret[2];
     }
     smokMesh.children[0].geometry.attributes.position.needsUpdate = true;
}
function removeSmok() {
    smokMesh.scale.x = 0.001;
    smokMesh.scale.y = 0.001;
    smokMesh.scale.z = 0.001;
}