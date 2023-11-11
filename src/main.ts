import * as THREE from "three";
import { FirstPersonControls, OrbitControls } from "three/examples/jsm/Addons"
import { FlyControls } from "three/examples/jsm/Addons";
import { VRButton } from "three/examples/jsm/Addons";


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();



const debug = {
	log: (message: string) => {
		let console = document.querySelector(".console")!;
		console.innerHTML = "&nbsp;log > " + message;
	}
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector(".webgl")!});

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
const orbit_controls = new OrbitControls(camera, renderer.domElement);
const fly_controls = new FlyControls(camera, renderer.domElement);
const first_person = new FirstPersonControls(camera, renderer.domElement);


scene.add(axes_helper);
scene.add(grid_helper);
scene.add(cube);


let clock = new THREE.Clock();




renderer.setAnimationLoop(() => {
	let delta = clock.getDelta();
	
	cube.rotateY(0.1)
	cube.rotateX(0.1)

	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	orbit_controls.enabled = false;
	first_person.enabled = true;
	fly_controls.enabled = false;
	
	first_person.update(delta);
	
	renderer.render(scene, camera);
	
});



document.getElementById("run")?.addEventListener("click", () => {debug.log("run mode: on")} )
document.getElementById("stop")?.addEventListener("click", () => {debug.log("run mode: off")} )