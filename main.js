import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background.
renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const loader = new GLTFLoader();
loader.load('/sporting_village.glb', function(glb) {
    const model = glb.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
}, undefined, function(error) {
    console.error('An error happened', error);
});
// Sets orbit control to move the camera around.
const controls = new MapControls(camera, renderer.domElement);

// Camera positioning.
camera.position.set(6, 8, 14);
// Has to be done everytime we update the camera position.
controls.update();

// Creates a 12 by 12 grid helper.
// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// // Creates an axes helper with an axis length of 4.
// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});