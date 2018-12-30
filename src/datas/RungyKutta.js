import { getCubePoints, removeBezier, addBezierCube, setCubePoints } from "../canvas/Objects/Bezier";
import { getMass } from "./CollectAndShareDatas";
import { getFrameCorners } from "../canvas/Objects/Frame";
import { getMax } from "../canvas/Objects/Box";

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

    const _k = 4;
    const lepkosc = MultiplyPoint(v,-_k);

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
    const framePoints = getFrameCorners();
    for(let _i = 0; _i < 2; _i ++) {
        for(let _j = 0; _j < 2; _j ++) {
            for(let _k = 0; _k < 2; _k ++) {
                if(p.i === framePoints[_i][_j][_k].i && p.j === framePoints[_i][_j][_k].j && p.k === framePoints[_i][_j][_k].k) {
                    f = SumPoints(f, countCL(p, framePoints[_i][_j][_k]));
                }
            }
        }
    }
    f.i = p.i;
    f.j = p.j;
    f.k = p.k;
    return f;
}
function oneStep(p, points) {

    const h = 0.01;
    const v0 = p.v;

    const xPrim = SumPoints(p, MultiplyPoint(countDerivativeX(v0), h));
    const vPrim = SumPoints(v0, MultiplyPoint(countDerivativeV(xPrim, v0, points), h));

    return updateV({
        i: p.i,
        j: p.j,
        k: p.k,
        v: vPrim,
        x: xPrim.x,
        y: xPrim.y,
        z: xPrim.z
    });
}
function updateV(p) {
    const _max = getMax();
    const tlumienie = 0.3;
    const x = p.x - 15;
    const y = p.y - 15;
    const z = p.z - 15;
    if(x < -_max / 2 || x > _max / 2) {
        p.v.x = -tlumienie * p.v.x;
        if(x < -_max / 2) {
            p.x ++;;
        }
        if(x > _max / 2) {
            p.x --;
        }
    }
    if(y < -_max / 2 || y > _max / 2) {
        p.v.y = -tlumienie * p.v.y;
        if(y < -_max / 2) {
            p.y ++;;
        }
        if(y > _max / 2) {
            p.y --;
        }
    }
    if(z < -_max / 2 || z > _max / 2) {
        p.v.z = -tlumienie * p.v.z;
        if(z < -_max / 2) {
            p.z ++;;
        }
        if(z > _max / 2) {
            p.z --;
        }
    }
    return p;
} 
function countCL(p1, p2) {
    let l0 = 10;
    let c = 35;
    const parLen = Math.abs(p1.i - p2.i) + Math.abs(p1.j - p2.j) + Math.abs(p1.k - p2.k);
    if(parLen === 2) {
        l0 = l0 * Math.sqrt(2);
    }
    if(parLen === 3) {
        l0 = l0 * Math.sqrt(3);
    }
    if(parLen === 0) {
        l0 = 0.01;
        c = 70;
    }
    const diff = DiffPoints(p2, p1);
    let l = vectorLength(DiffPoints(p2, p1)) - l0;
    let n = normalize(DiffPoints(p2, p1));
    if(diff.x === 0 && diff.y === 0 && diff.z === 0) {
        n = diff;
    }
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
export function countDerivativeX(v) {
    return v;
}
export function countDerivativeV(p, v, points) {
    const m = getMass() / 64;
    const f = getF(p, points, v);
    return  MultiplyPoint(f, 1/m);
}
function vectorLength(vec1) {
    return Math.sqrt(Math.pow(vec1.x, 2) + Math.pow(vec1.y, 2) + Math.pow(vec1.z, 2));
}