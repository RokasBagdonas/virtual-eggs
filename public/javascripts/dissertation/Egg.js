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
    };

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





