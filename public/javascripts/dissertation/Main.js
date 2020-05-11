

const Stats = require('./Stats.js');
const EggTexture = require('./EggTexture.js')(256, 256);

let container;
let camera;
let controls;
let renderer;
let scene;
let texture;
function init() {

    container = document.querySelector( '#scene-container' );
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x8FBCD4 );

    createCamera();
    createControls();
    createLights();
    createRenderer();

    EggTexture.initTextures();
    EggTexture.combineTextures();
    texture = EggTexture.getTexture();

    console.log("MAIN: " + texture.uuid);
    loadEgg();


    renderer.setAnimationLoop( () => {
        update();
        render();
    } );

}

function createCamera() {
    camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 1000 );
    camera.position.set(0.6817724298342465, 0.6424984836519444,-0.024665450387858244);
}

function createControls() {
    controls = new THREE.OrbitControls( camera, container );
}

function createLights() {

    const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );
    const mainLight = new THREE.DirectionalLight( 0xffffff, 1 );
    mainLight.position.set( 18, 18, 18 );

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
    // EggTexture.update();
    // console.log(texture.uuid);
}

function render() {
    renderer.render( scene, camera );
}

function onWindowResize() {

    // camera.aspect = container.clientWidth / container.clientHeight;
    // // update the camera's frustum
    // camera.updateProjectionMatrix();
    // renderer.setSize( container.clientWidth, container.clientHeight );
}

window.addEventListener( 'resize', onWindowResize );


// function eggTextureInit(){
//     Stats.plotNewVariogram();
//     let texture = new THREE.CanvasTexture(Stats.ctxVariogram);
//     texture.needsUpdate = true;
// }


function loadEgg() {

    const loader = new THREE.GLTFLoader();

    // A reusable function to set up the models. We're passing in a position parameter
    // so that they can be individually placed around the scene
    const onLoad = ( gltf, position ) => {

        let model = gltf.scene.children[ 0 ];
        const sc = 5;
        model.scale.set(sc, sc, sc);
        //TODO: change base material colours.
        // let texture = new THREE.TextureLoader().load("../images/UV-map.jpg");
        // let texture = EggTexture.getTexture();
        model.material = new THREE.MeshStandardMaterial({map: texture, flatShading: false});
        model.position.copy( position );

        scene.add( model );
        console.log(`model '${model.name}' loaded`);
    };

    // the loader will report the loading progress to this function
    const onProgress = () => {console.log("loading model..")};

    // the loader will send any error messages to this function, and we'll log
    // them to to console
    const onError = ( errorMessage ) => { console.log( errorMessage ); };

    // load the first model. Each model is loaded asynchronously,
    // so don't make any assumption about which one will finish loading first
    //egg dimensions: 0.101 x 0.0582 x 0.0286 m

    const eggPosition = new THREE.Vector3( 0, 0, 0 );
    loader.load( '/models/guillemot-egg.glb', //URL
        gltf => onLoad( gltf, eggPosition ), //onLoad callback
        onProgress, //onProgress callback
        onError ); //onError callback

}



init();

window.main = {scene, camera};