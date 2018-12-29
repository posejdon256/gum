import { getCubePoints, removeBezier, addBezierCube, setCubePoints } from "../canvas/Objects/Bezier";
import { getMass } from "./CollectAndShareDatas";

export function RungyKuttaStep() {
    removeBezier();
    let t = 0;
    const points = getCubePoints();
    const pointsCopy = [];
    for(let i = 0; i < 4; i ++) {
        pointsCopy.push([]);
        for(let j = 0; j < 4; j ++) {
            pointsCopy[i].push([]);
            for(let k = 0; k < 4; k ++) {
                pointsCopy[i][j].push({
                    x: points[i][j][k].x,
                    y: points[i][j][k].y,
                    z: points[i][j][k].z
                })
            }
        }
    }
    for(let i = 0; i < 4; i ++) {
        for(let j = 0; j < 4; j ++) {
            for(let k = 0; k < 4; k ++) {
                pointsCopy[i][j][k] = oneStep(points[i][j][k], points);
            }
        }
    }
    setCubePoints(pointsCopy);
    addBezierCube();
}
function getF(p, points, v) {

    const _k = 20;
    const lepkosc = MultiplyPoint(v, -_k);

    const i = p.i;
    const j = p.j;
    const k = p.k;
    let f = {x: 0, y: 0, z: 0};
    if(i > 0) {
        f = SumPoints(f, countCL(p, points[i - 1][j][k]));
    }
    if(j > 0) {
        f = SumPoints(f, countCL(p, points[i][j - 1][k]));
    }
    if(k > 0) {
        f = SumPoints(f, countCL(p, points[i][j][k - 1]));
    }
    if(i < 3) {
        f = SumPoints(f, countCL(p, points[i + 1][j][k]));
    }
    if(j < 3) {
        f = SumPoints(f, countCL(p, points[i][j + 1][k]));
    }
    if(k < 3) {
        f = SumPoints(f, countCL(p, points[i][j][k + 1]));
    }
     if(i > 0 && j > 0) {
        f = SumPoints(f, countCL(p, points[i - 1][j - 1][k]));
    }
    if(i > 0 && k > 0) {
        f = SumPoints(f, countCL(p, points[i - 1][j][k - 1]));
    }
    if(j > 0 && k > 0) {
        f = SumPoints(f, countCL(p, points[i][j - 1][k - 1]));
    }
    if(i < 3 && j < 3) {
        f = SumPoints(f, countCL(p, points[i + 1][j + 1][k]));
    }
    if(i < 3 && k < 3) {
        f = SumPoints(f, countCL(p, points[i + 1][j][k + 1]));
    }
    if(j < 3 && k < 3) {
        f = SumPoints(f, countCL(p, points[i][j + 1][k + 1]));
    }
    if(i > 0 && j < 3) {
        f = SumPoints(f, countCL(p, points[i - 1][j + 1][k]));
    }
    if(i < 3 && j > 0) {
        f = SumPoints(f, countCL(p, points[i + 1][j - 1][k]));
    }
    if(i > 0 && k < 3) {
        f = SumPoints(f, countCL(p, points[i - 1][j][k + 1]));
    }
    if(i < 3 && k > 0) {
        f = SumPoints(f, countCL(p, points[i + 1][j][k - 1]));
    }
    if(j > 0 && k < 3) {
        f = SumPoints(f, countCL(p, points[i][j - 1][k + 1]));
    }
    if(j < 3 && k > 0) {
        f = SumPoints(f, countCL(p, points[i][j + 1][k - 1]));
    }
    if(i > 0 && j > 0 && k > 0) {
        f = SumPoints(f, countCL(p, points[i - 1][j - 1][k - 1]));
    }
    if(i < 3 && j < 3 && k < 3) {
        f = SumPoints(f, countCL(p, points[i + 1][j + 1][k + 1]));
    }
    if(i > 0 && j < 3 && k < 3) {
        f = SumPoints(f, countCL(p, points[i - 1][j + 1][k + 1]));
    }
    if(i < 3 && j > 0 && k < 3) {
        f = SumPoints(f, countCL(p, points[i + 1][j - 1][k + 1]));
    }
    if(i < 3 && j < 3 && k > 0) {
        f = SumPoints(f, countCL(p, points[i + 1][j + 1][k - 1]));
    }
    if(i > 0 && j > 0 && k < 3) {
        f = SumPoints(f, countCL(p, points[i - 1][j - 1][k + 1]));
    }
    if(i > 0 && j < 3 && k > 0) {
        f = SumPoints(f, countCL(p, points[i - 1][j + 1][k - 1]));
    }
    if(i < 3 && j > 0 && k > 0) {
        f = SumPoints(f, countCL(p, points[i + 1][j - 1][k - 1]));
    }
    f = SumPoints(f, lepkosc);
    f.i = p.i;
    f.j = p.j;
    f.k = p.k;
    return f;
}
function oneStep(p, points) {

    const h = 0.01;
    const v0 = p.v;

    const k1V = MultiplyPoint(countDerivativeV(v0), h);
    const k1X = MultiplyPoint(countDerivativeP(p, k1V, points), h);

    const k2V = MultiplyPoint(countDerivativeV(SumPoints(v0, MultiplyPoint(k1V, 1/2))), h);
    const k2X= MultiplyPoint(countDerivativeP(SumPoints(p, MultiplyPoint(k1X, 1/2)), k2V, points), h);

    const k3V = MultiplyPoint(countDerivativeV(SumPoints(v0, MultiplyPoint(k2V, 1/2))), h);
    const k3X = MultiplyPoint(countDerivativeP(SumPoints(p, MultiplyPoint(k2X, 1/2)), k3V, points), h);

    const k4V = MultiplyPoint(countDerivativeV(SumPoints(v0, k3V)), h);
    const k4X = MultiplyPoint(countDerivativeP(SumPoints(p, k3X), k4V, points), h);

    const k116V = MultiplyPoint(k1V, 1/6);
    const k116X = MultiplyPoint(k1X, 1/6);

    const k213V = MultiplyPoint(k2V, 1/3);
    const k213X = MultiplyPoint(k2X, 1/3);

    const k313V = MultiplyPoint(k3V, 1/3);
    const k313X = MultiplyPoint(k3X, 1/3);

    const k416V = MultiplyPoint(k4V, 1/6);
    const k416X = MultiplyPoint(k4X, 1/6);

    const newV = SumPoints(SumPoints(SumPoints(SumPoints(p, k116V),  k213V), k313V), k416V);
    const newX = SumPoints(SumPoints(SumPoints(SumPoints(v0, k116X),  k213X), k313X), k416X);

    return {
        i: p.i,
        j: p.j,
        k: p.k,
        v: newX,
        x: newV.x,
        y: newV.y,
        z: newV.z
    }


    // if(p1.z > p2.z) {
    //     ret.z = -ret.z;
    // }
    // if(p1.x > p2.x) {
    //     ret.x = -ret.x;
    // }
    // if(p1.y > p2.y) {
    //     ret.y = -ret.y;
    // }
    // if(Math.abs(diff.x) < 0.05 && Math.abs(diff.y) < 0.05 && Math.abs(diff.z) < 0.05) {
    //     console.log(diff);
    // }
   // console.log(diff);
    //return f;
}
function countCL(p1, p2) {
    const l0 = 15;
    const c = 10;
    const l = vectorLength(DiffPoints(p2, p1)) - l0;
    const n = normalize(DiffPoints(p2, p1));
    return MultiplyPoint(n, c*l);
}
function normalize(p) {
    const len = vectorLength(p);
    return {x: p.x / len, y: p.y / len, z: p.z / len,
    i: p.i,
    j: p.j,
    k: p.k,
    v: p.v
    };
}
function abs(p) {
    return { x: p.x < 0 ? -p.x : p.x, y: p.y < 0 ? -p.y : p.y, z: p.z < 0 ? -p.z : p.z,
        i: p.i,
        j: p.j,
        k: p.k,
        v: p.v
        };
}
function DiffPoints(p1, p2) {
    return {x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z,
        i: p2.i,
        j: p2.j,
        k: p2.k,
        v: p2.v
        };
}
function MultiplyPoint(p1, k) {
    return { x: p1.x * k, y: p1.y * k, z: p1.z * k,
        i: p1.i,
        j: p1.j,
        k: p1.k,
        v: p1.v
        };
}
function SumPoints(p1, p2) {
    return {x: p1.x + p2.x, y: p1.y + p2.y, z: p1.z + p2.z,
        i: p1.i,
        j: p1.j,
        k: p1.k,
        v: p1.v
        };
}
export function countDerivativeV(v) {
    return v;
}
export function countDerivativeP(p, v, points) {
    const m = getMass() / 64;
    const f = getF(p, points, v);
    return  MultiplyPoint(f, 1/m);
}
function vectorLength(vec1) {
    return Math.sqrt(Math.pow(vec1.x, 2) + Math.pow(vec1.y, 2) + Math.pow(vec1.z, 2));
}