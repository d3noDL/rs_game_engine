import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons"
import { FlyControls } from "three/examples/jsm/Addons";


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener( 'pointermove', onPointerMove );




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
cube.name = "Mr. Box";


const red_light = new THREE.PointLight("red");
const point_light_helper = new THREE.PointLightHelper(red_light);
const axes_helper = new THREE.AxesHelper(5);
const grid_helper = new THREE.GridHelper(20, 20)
const orbit_controls = new OrbitControls(camera, renderer.domElement);
const fly_controls = new FlyControls(camera, renderer.domElement);

let rc_objects: THREE.Mesh[] = [];
rc_objects.push(cube)

scene.add(axes_helper);
scene.add(grid_helper);
scene.add(cube);

let isRunning = false;
let clock = new THREE.Clock();

let camera_control_type = 1;

window.addEventListener("keypress", (key) => {
	switch (key.key) {
		case "1":
			camera_control_type = 1;
			debug.log("orbit controls: active");
			break;
		case "2":
			camera_control_type = 2;
			debug.log("fly controls: active");
			break;
	}
} )

const update = () => {
	let dt = clock.getDelta();

	raycaster.setFromCamera(pointer, camera)
	const intersects = raycaster.intersectObjects(rc_objects);
	debug.log("")
	for (let i = 0; i < intersects.length; i++) {
		debug.log(intersects[i].object.name);
	}

	if (isRunning) {
		cube.rotateOnAxis(new THREE.Vector3(0, 1, 0), 3);
	} else {
		switch (camera_control_type) {
			case 1:
				orbit_controls.update();
			case 2:
				fly_controls.update(0)
		}
		
		cube.rotation.set(0, 0, 0);
		cube.rotation.set(0, 0, 0);
		cube.scale.set(1, 1, 1);
	} 

	
	requestAnimationFrame(update);
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	
	renderer.render(scene, camera);
	
}
update();

document.getElementById("run")?.addEventListener("click", () => {isRunning = true; debug.log("run mode: on")} )
document.getElementById("stop")?.addEventListener("click", () => {isRunning = false; debug.log("run mode: off")} )