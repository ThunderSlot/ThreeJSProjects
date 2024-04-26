import './style.css'
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new Three.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); 

renderer.render(scene, camera);

const geometry = new Three.TorusGeometry(10,3,16,100)
// const material = new Three.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
const material = new Three.MeshStandardMaterial({color: 0xFF6347});
const torus = new Three.Mesh(geometry, material);

scene.add(torus)


// emit light evenly in all directions from specific point in space
const pointLight = new Three.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

// to spread the lighting across the entire scene
const ambientLight = new Three.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// to show the position of specific source of light source
const lightHelper = new Three.PointLightHelper(pointLight)
const girdHelper = new Three.GridHelper(200,50)


scene.add(lightHelper, girdHelper)


const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new Three.SphereGeometry(0.25, 24, 24);
  const material = new Three.MeshStandardMaterial({color: 0xffffff});
  const star = new Three.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> Three.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);

}

Array(200).fill().forEach(addStar);

const spaceTexture = new Three.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01; 

  controls.update();
  renderer.render(scene, camera);
  
}

animate();
