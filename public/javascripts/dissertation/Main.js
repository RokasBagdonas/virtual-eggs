// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;

function init() {

    container = document.querySelector( '#scene-container' );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x8FBCD4 );

    createCamera();
    createControls();
    createLights();
    createRenderer();

    loadEgg();
    EggTexture.init();
    EggUI.init();

    renderer.setAnimationLoop( () => {
        update();
        render();
    } );

}

function createCamera() {
    camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 1000 );
    camera.position.set( 1, -1, 1); //to be centered near egg
}

function createControls() {
    controls = new THREE.OrbitControls( camera, container );
}

function createLights() {

    const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );
    const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
    mainLight.position.set( 10, 10, 10 );

    scene.add( ambientLight, mainLight );

}


function createRenderer() {

    let ctx = document.getElementById("scene-canvas");
    renderer = new THREE.WebGLRenderer( { antialias: true, canvas: ctx } );
    renderer.setSize( container.clientWidth, container.clientHeight );

    renderer.setPixelRatio( window.devicePixelRatio );

    //TODO: fix gammaFactor
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;

    renderer.physicallyCorrectLights = true;

    container.appendChild( renderer.domElement );

}

function update() {
    EggTexture.update();
}

function render() {
    renderer.render( scene, camera );
}

function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight;
    // update the camera's frustum
    camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );
}

window.addEventListener( 'resize', onWindowResize );

init();
