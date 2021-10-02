import * as THREE from './three.module.js';
import { OrbitControls } from "./OrbitControls.js";

let scene, camera, renderer, skyboxGeo, skybox, controls, myReq;
let zoomOut = false;
let autoRotate = true;
let skyboxImage = 'logo';

function createPathStrings(filename) {
  const basePath = `img/skyboxes/${filename}/`;
  const baseFilename = basePath + filename;
  const fileType = filename == 'logo' ? '.jpg' : '.png';
  const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf'];
  const pathStings = sides.map(side => {
    return baseFilename + '_' + side + fileType;
  });
  return pathStings;
}

function createMaterialArray(filename) {
  const skyboxImagepaths = createPathStrings(filename);
  const materialArray = skyboxImagepaths.map(image => {
    let texture = new THREE.TextureLoader().load(image);
    if (filename == 'logo') {
      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    } else {
      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    }    
  });
  return materialArray;
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    45,
    30000,
  );
  camera.position.set(1200, -250, 2000);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = 'canvas';
  document.body.appendChild(renderer.domElement);

  const materialArray = createMaterialArray(skyboxImage);

  skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(skybox);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.minDistance = 700;
  controls.maxDistance = 1500;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.0;

  window.addEventListener('resize', onWindowResize, false);
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.autoRotate = autoRotate;
  
    if(controls.maxDistance == 1500 && !zoomOut) {
    
      controls.maxDistance = 20000;
      camera.position.z = 20000;
    } else if(controls.maxDistance == 20000 && zoomOut) {
      console.log('called')
      controls.maxDistance = 1500;
      camera.position.z = 2000;
    }
    
    controls.update();
    renderer.render(scene, camera);
    myReq = window.requestAnimationFrame(animate);
   
}

init();

function switchSkyBox (skyboxName) {
  scene.remove(skybox);
  skyboxImage = skyboxName;
  const materialArray = createMaterialArray(skyboxImage);

  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);
}

function toggleAutoRotate(value) {
  autoRotate = value;
  autoRotateBtn.textContent = value ? 'Detener' : 'Rotar';
  loading.style.display = value ? 'none' : 'show';
}

function toggleZoom(value) {
  zoomOut = value;
  zoomBtn.textContent = value ? 'Abducir' : "Sumergir";
  loading.style.display = value ? 'none' : 'show';
}

const feriaBtn = document.getElementById('feria');
const burroBtn = document.getElementById('burro');
const casaBtn = document.getElementById('julia');
const dentroBtn = document.getElementById('interior');
const extBtn = document.getElementById('arriera');
const logoBtn = document.getElementById('logo');
const perezaBtn = document.getElementById('pereza');
const afueraBtn = document.getElementById('afuera');
const diositoBtn = document.getElementById('diosito');

const autoRotateBtn = document.getElementById('autoRotate');
const zoomBtn = document.getElementById('zoom');
const loading = document.getElementById('loading');



logoBtn.addEventListener('click', () => switchSkyBox('logo'))
feriaBtn.addEventListener('click', () => switchSkyBox('iglesia'))
casaBtn.addEventListener('click', () => switchSkyBox('julia'))
dentroBtn.addEventListener('click', () => switchSkyBox('interior'))
extBtn.addEventListener('click', () => switchSkyBox('exterior'))
burroBtn.addEventListener('click', () => switchSkyBox('barranco'))
perezaBtn.addEventListener('click', () => switchSkyBox('baño'))
afueraBtn.addEventListener('click', () => switchSkyBox('exterior-perezosa'))
diositoBtn.addEventListener('click', () => switchSkyBox('misa'))

autoRotateBtn.addEventListener('click', () => toggleAutoRotate(!autoRotate))
zoomBtn.addEventListener('click', () => toggleZoom(!zoomOut))