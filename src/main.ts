import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("webgl")!});

camera.position.set(7, 7, 7);
camera.lookAt(new THREE.Vector3(0, 0, 0))



const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({color: 0x808080})
)

const red_light = new THREE.PointLight("red");
const point_light_helper = new THREE.PointLightHelper(red_light);
const axes_helper = new THREE.AxesHelper(5);
const grid_helper = new THREE.GridHelper(20, 20)


scene.add(cube);
scene.add(axes_helper);
scene.add(grid_helper);
scene.add(point_light_helper);
scene.add(red_light);



function update() {
	requestAnimationFrame(update);
	cube.rotateOnAxis(new THREE.Vector3(0,1,0), 3)
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.render(scene, camera);
}
update();