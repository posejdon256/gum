import { TryParseFloat } from "../Helpers/Parsing";
import { addBox, removeBox } from "../canvas/Objects/Box";
import { addBezierCube } from "../canvas/Objects/Bezier";
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
    ShowControlPoints = !ShowControlPoints;
}
export function getShowControlPoints() {
    return ShowControlPoints;
}
export function setShowFrame() {
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
export function setShowBezierCube() {
    ShowBezierCube = !ShowBezierCube;
}
export function getShowBezierBube(value) {
    if(value === false) {
        ShowBezierCube = false;
    } else {
        ShowBezierCube = !ShowBezierCube;
    }
    if(ShowBezierCube) {
        addBezierCube();
    }
}
export function setShowSolid(value) {
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