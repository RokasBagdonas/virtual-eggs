let EggTexture = (function() {

    let ctx = document.getElementById("egg-texture").getContext("2d");
    let texture;
    const CANVAS_SIZE = 256;
    const MAX_SPOTS = 500;
    let paramSpots = 100;
    let spotsCounter = 0;
    const SPOT_COLOUR = "#1e2121";
    const EGG_BASE_COLOUR = "#6b6e69";
    const SPOT_SIZE_MIN = 2;
    const SPOT_SIZE_MAX = 8;


    const getMAX_SPOTS = () => {return MAX_SPOTS};
    const getSpotsCounter = () => {return spotsCounter};
    const getTexture = () => {return texture};
    const getParamSpots = () => {return paramSpots};

    const setParamSpots = function(newSpots){
        if(newSpots <= MAX_SPOTS)
            paramSpots = newSpots;
        else
            console.log(`Too many spots - ${newSpots}, allowed: ${MAX_SPOTS}`);
    };

    const incrementSpots = () => {++spotsCounter};
    const resetCounter = () => {spotsCounter = 0};
    const resetTexture = () => {
        ctx.fillStyle = EGG_BASE_COLOUR;
        ctx.fillRect( 0, 0, 256, 256 );
        resetCounter();
    };

    const init = function(){
        ctx.fillStyle = EGG_BASE_COLOUR;
        ctx.fillRect( 0, 0, 256, 256 );
        texture = new THREE.CanvasTexture(ctx.canvas);
    };

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

    const test = function() {
        console.log("EggTexture module");
    };

    const update = function(){
        if(EggTexture.getSpotsCounter() < EggTexture.getParamSpots()) {
            drawRandomDot();
            texture.needsUpdate = true;
            incrementSpots();
        }

    };


    return {
        init: init,
        test: test,
        getTexture: getTexture,
        drawRandomDot: drawRandomDot,
        getMAX_SPOTS: getMAX_SPOTS,
        getSpotsCounter: getSpotsCounter,
        incrementSpots: incrementSpots,
        setParamSpots: setParamSpots,
        getParamSpots: getParamSpots,
        resetTexture: resetTexture,
        update: update
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


