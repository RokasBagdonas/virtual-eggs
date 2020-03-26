let EggTexture = (function() {

    // let ctx = document.getElementById("egg-texture").getContext("2d");
    let ctx;
    let texture; //THREE.js CanvasTexture object
    const CANVAS_SIZE = 256;
    const EGG_BASE_COLOUR = "#6b6e69";


    const getTexture = () => {return texture};

    const resetTexture = () => {
        ctx.fillStyle = EGG_BASE_COLOUR;
        ctx.fillRect( 0, 0, 256, 256 );
    };

    const updateTexture = () => {
        texture.needsUpdate = true;
    }

    const init = function(){
        ctx = Stats.plotSpatiallyCorrelatedField();
        texture = new THREE.CanvasTexture(ctx.canvas);
        texture.needsUpdate = true;
    };

    //TODO: move to utilities
    const randInt = function(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min | 0;
    };

    const drawRandomDot = function(){

        ctx.fillStyle = SPOT_COLOUR;
        ctx.beginPath();

        const x = randInt(CANVAS_SIZE);
        const y = randInt(CANVAS_SIZE);
        const radius = randInt(SPOT_SIZE_MIN, SPOT_SIZE_MAX);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    };


    return {
        init: init,
        getTexture: getTexture,
        drawRandomDot: drawRandomDot,
        resetTexture: resetTexture,
        updateTexture: updateTexture
    }
})();


function loadEgg() {

    const loader = new THREE.GLTFLoader();

    // A reusable function to set up the models. We're passing in a position parameter
    // so that they can be individually placed around the scene
    const onLoad = ( gltf, position ) => {

        let model = gltf.scene.children[ 0 ];
        const sc = 5;
        model.scale.set(sc, sc, sc);
        //TODO: change base material colours
        model.material = new THREE.MeshStandardMaterial({map: EggTexture.getTexture(), flatShading: false});
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


