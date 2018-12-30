import { getTHREE, getScene } from "../Animation/AnimationFrame";

let box;
const _max = 100;
export function addBox() {
    const scene = getScene();
    const THREE = getTHREE();
    const geometry = new THREE.BoxBufferGeometry( _max, _max, _max );
    const edges = new THREE.EdgesGeometry( geometry );
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    scene.add( line );
    box = line;
}
export function getMax() {
    return _max;
}
export function removeBox() {
    const scene = getScene();
    scene.remove(box);
}