import * as THREE from './three.module.js';
import { FirstPersonControls } from "./FirstPersonControls.js";

let camera, controls, scene, renderer;

let cube1, cube2, cube3, cube4, cube5;

let control;

const clock = new THREE.Clock();

function init() {
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 35, 0 );

	const listener = new THREE.AudioListener();
	camera.add( listener );

	scene = new THREE.Scene();
	//scene.background = new THREE.Color(0x161616);
	const loader = new THREE.TextureLoader();
    loader.load("../img/textures/backgraund.jpg",function(texture){
      scene.background = texture;
    });

	const sphere = new THREE.BoxGeometry( 60, 60, 60 );
	//Texturas de cada geometria

	const imagePrefix = "../img/skyboxes/iglesia/iglesia_";	
	const directions  = ["rt", "lf", "up", "dn", "bk", "ft"];
	const imageSuffix = ".png";

	const materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
		side: THREE.BackSide
	}));
	const skyMaterial = new THREE.MeshFaceMaterial( materialArray );

	const imagePrefix2 = "../img/skyboxes/julia/julia_";
	const directions2  = ["bk", "ft", "up", "dn", "lf", "rt"];
	const imageSuffix2 = ".png";

	const materialArray2 = [];
	for (var i = 0; i < 6; i++)
		materialArray2.push( new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture( imagePrefix2 + directions2[i] + imageSuffix2 ),
		side: THREE.BackSide
	}));
	const skyMaterial2 = new THREE.MeshFaceMaterial( materialArray2 );

	const imagePrefix3 = "../img/skyboxes/interior/interior_";	
	const directions3  = ["bk", "ft", "up", "dn", "lf", "rt"];
	const imageSuffix3 = ".png";

	const materialArray3 = [];
	for (var i = 0; i < 6; i++)
		materialArray3.push( new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture( imagePrefix3 + directions3[i] + imageSuffix3 ),
		side: THREE.BackSide
	}));
	const skyMaterial3 = new THREE.MeshFaceMaterial( materialArray3 );

	const imagePrefix4 = "../img/skyboxes/exterior/exterior_";
	const directions4  = ["bk", "ft", "up", "dn", "lf", "rt"];
	const imageSuffix4 = ".png";

	const materialArray4 = [];
	for (var i = 0; i < 6; i++)
		materialArray4.push( new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture( imagePrefix4 + directions4[i] + imageSuffix4 ),
		side: THREE.BackSide
	}));
	const skyMaterial4 = new THREE.MeshFaceMaterial( materialArray4 );

	const imagePrefix5 = "../img/skyboxes/barranco/barranco_";
	const directions5  = ["bk", "ft", "up", "dn", "lf", "rt"];
	const imageSuffix5 = ".png";

	const materialArray5 = [];
	for (var i = 0; i < 6; i++)
		materialArray5.push( new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture( imagePrefix5 + directions5[i] + imageSuffix5 ),
		side: THREE.BackSide
	}));
	const skyMaterial5 = new THREE.MeshFaceMaterial( materialArray5 );

	const logoTexture = new THREE.TextureLoader().load('../img/skyboxes/logo/logo_up.jpg');

	// Efectos de Sonido para cada geometria
	control = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshBasicMaterial({ map: logoTexture, side: THREE.DoubleSide }));
	control.position.set( 0, 40, - 50 );
	scene.add( control );

	const audioLoader = new THREE.AudioLoader();

	cube1 = new THREE.Mesh( sphere, skyMaterial );	
	cube1.position.set( 0, 35, - 450 );	
	scene.add( cube1 );
	
	const sound1 = new THREE.PositionalAudio( listener );
	audioLoader.load( '../sounds/Una fiesta en el pueblo.mp3', function ( buffer ) {
		sound1.setBuffer( buffer );
		sound1.setLoop( true );
		sound1.setVolume( 1.5 );
		sound1.setRefDistance( 15 )
		sound1.play();	
	} );
	cube1.add( sound1 );
			
	cube2 = new THREE.Mesh( sphere, skyMaterial2 );		
	cube2.position.set( 450, 35, -450 );
	scene.add( cube2 );

	const sound2 = new THREE.PositionalAudio( listener );
	audioLoader.load( '../sounds/Aves.mp3', function ( buffer ) {

		sound2.setBuffer( buffer );
		sound2.setLoop( true );
		sound2.setRefDistance( 15 );
		sound2.setVolume( 1.5 );
		sound2.play();

	} );
	cube2.add( sound2 );

	cube3 = new THREE.Mesh( sphere, skyMaterial3 );		
	cube3.position.set( 450, 35,  450 );
	scene.add( cube3 );	

	const sound3 = new THREE.PositionalAudio( listener );
	audioLoader.load( '../sounds/Interior_Casa.mp3', function ( buffer ) {

		sound3.setBuffer( buffer );
		sound3.setLoop( true );
		sound3.setRefDistance( 15 );
		sound3.setVolume(1.5);
		sound3.play();

	} );
	cube3.add( sound3 );

	cube4 = new THREE.Mesh( sphere, skyMaterial4 );
	cube4.position.set( - 450, 35,  450 );
	scene.add( cube4 );

	const sound4 = new THREE.PositionalAudio( listener );
	audioLoader.load( '../sounds/Naturaleza.mp3', function ( buffer ) {

		sound4.setBuffer( buffer );
		sound4.setLoop( true );
		sound4.setRefDistance( 15 );
		sound4.setVolume( 1.5 );
		sound4.play();

	} );
	cube4.add( sound4 );

	cube5 = new THREE.Mesh( sphere, skyMaterial5 );	
	cube5.position.set( - 450, 35, - 450 );
	scene.add( cube5 );

	const sound5 = new THREE.PositionalAudio( listener );
	audioLoader.load( '../sounds/Llamado.mp3', function ( buffer ) {

		sound5.setBuffer( buffer );
		sound5.setLoop( true );
		sound5.setRefDistance( 15 );
		sound5.setVolume( 1.5 );
		sound5.play();

	} );
	cube5.add( sound5 );
	

	// Sonido de Ambientacion

	const sound6 = new THREE.Audio( listener );
	audioLoader.load( '../sounds/Instrucciones.wav', function ( buffer ) {

		sound6.setBuffer( buffer );
		sound6.setLoop( false );
		sound6.setVolume( 0.5 );
		sound6.play();

	} );

	const helper = new THREE.GridHelper( 1000, 20, 0xc5c0b2, 0xc5c0b2 );
	helper.position.y = 0.1;
	scene.add( helper );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//Controles

	controls = new FirstPersonControls( camera, renderer.domElement );
	controls.movementSpeed = 150;
	controls.lookSpeed = 0.1;
	controls.lookVertical = false;
	


	window.addEventListener( 'resize', onWindowResize );
	animate();
}
init()
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.handleResize();

}


function animate() {

	requestAnimationFrame( animate );
	control.rotation.x += 0.01;
	control.rotation.y += 0.01;
	control.rotation.z += 0.01;
	render();

}

function render() {

	controls.update( clock.getDelta() );
	renderer.render( scene, camera );

}