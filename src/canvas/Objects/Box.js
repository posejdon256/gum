import { getTHREE, getScene } from "../Animation/AnimationFrame";

let box;
export function addBox() {
    const scene = getScene();
    const THREE = getTHREE();
    const geometry = new THREE.BoxBufferGeometry( 100, 100, 100 );
    const edges = new THREE.EdgesGeometry( geometry );
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    scene.add( line );
    box = line;
}
export function removeBox() {
    const scene = getScene();
    scene.remove(box);
}