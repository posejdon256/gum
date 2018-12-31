import { TryParseFloat } from "../Helpers/Parsing";
import { addBox, removeBox } from "../canvas/Objects/Box";
import { removeCenter, addBezierCube, addNiceBezierCube, getCubePoints } from "../canvas/Objects/Bezier";
import { addFrameToScene, removeFrame } from "../canvas/Objects/Frame";

let ShowControlPoints= true,
    ShowFrame= true,
    ShowCuboid= true,
    ShowBezierCube= true,
    ShowSolid= false,
    rotateFrame= false,
    velocityStart= 0,
    mass= 64,
    elasticity= 1,
    elasticity2= 1,
    vibrationDamping= 1,
    perturbation= 1;

export function setShowControlPoints() {
    removeCenter();
    ShowControlPoints = !ShowControlPoints;
}
export function getShowControlPoints() {
    return ShowControlPoints;
}
export function setShowFrame() {
    removeCenter();
    ShowFrame = !ShowFrame;
}
export function getShowFrame() {
    return ShowFrame;
}
export function setShowCuboid() {
    ShowCuboid = !ShowCuboid;
    if(ShowCuboid) {
        addBox();
    } else {
        removeBox();
    }
}
export function getShowCuboid() {
    return ShowCuboid;
}
export function getShowBezierBube() {
    return ShowBezierCube;
}
export function setShowBezierCube(value) {
    removeCenter();
    if(value === false) {
        ShowBezierCube = false;
    } else {
        if(!ShowBezierCube) {
            addNiceBezierCube();
        }
        ShowBezierCube = !ShowBezierCube;
    }
}
export function setShowSolid(value) {
    removeCenter();
    if(value === false) {
        ShowSolid = false;
    } else {
        ShowSolid = !ShowSolid;
    }
}
export function getShowSolid() {
    return ShowSolid;
}
export function setRotateFrame() {
    rotateFrame = !rotateFrame;
    if(rotateFrame) {
        addFrameToScene();
    } else {
        removeFrame();
    }
}
export function getRotationFrame() {
    return rotateFrame;
}
export function setVelocityStart(_value) {
    velocityStart = TryParseFloat(_value, velocityStart);
    const points = getCubePoints();
    for(let i = 0; i < 4; i ++) {
       for(let j = 0; j < 4; j ++) {
            for(let k = 0; k < 4; k ++) {
                points[i][j][k].v.x = velocityStart;
                points[i][j][k].v.y = velocityStart;
                points[i][j][k].v.z = velocityStart;
            }
        }
    }
}
export function getVelocityStart() {
    return velocityStart;
}
export function setMass(_value) {
    mass = TryParseFloat(_value, mass);
}
export function getMass() {
    return mass;
}
export function setElasticity(_value) {
    elasticity = TryParseFloat(_value, elasticity);
}
export function getElastity() {
    return elasticity;
}
export function setElasticity2(_value) {
    elasticity2 = TryParseFloat(_value, elasticity2);
}
export function getElastity2() {
    return elasticity2;
}
export function setVibrationDamping(_value) {
    vibrationDamping = TryParseFloat(_value, vibrationDamping);
}
export function getVibrationDamping() {
    return vibrationDamping;
}
export function setPerturbation(_value) {
    perturbation = TryParseFloat(_value, perturbation);
}
export function getPerturbation() {
    return perturbation;
}