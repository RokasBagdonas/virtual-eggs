let Stats = require('./Stats.js');

// let texture = new THREE.CanvasTexture(Stats.ctxVariogram.canvas); //THREE object
let texture; //THREE object
let ctxData, ctxTexture;
let newVariogram = false;

let colours1 = {
    base: ["#57b9bf"],
    baseOverlay: ["#c0d282 ","#cdea6c"],
    noiseSpots: ["#21233b"],
    main: ["#0c0d19"]
};

const getTexture = function(){
    return texture;
};

const updateTexture =  function(){
    // Stats.plotVariogram(ctxTexture);
    texture.needsUpdate = true;
};


const init = function(){
    ctxData = document.getElementById("stats-points");
    Stats.init(ctxData.width, ctxData.height);
    ctxData = ctxData.getContext("2d");
    Stats.plotPoints(ctxData);


    let canvasTexture = document.getElementById("texture");
    texture = new THREE.CanvasTexture(canvasTexture);

    ctxTexture = canvasTexture.getContext("2d");
    Stats.plotVariogram(ctxTexture, true);

    /**
     * Plan for generating texture
     * 1. add base colour to ctx. Research interpolation
     * 2. add base pigment colour using big range.
     * 3. add low radius noisy dots
     * 4. add main patterns
     *   4.1 blobs
     *   4.2 streaking
     *   4.3 gaussian with trend
     * 5. add noise bump map
     *
     * Need to improve Stats js so that we can different parameters for different patterns.
     * 1. Save a copy of the base texture (1-3) so that it can be used to adjust main patterns.
     * 2. determine areas where points get distorted. when plotting a point, check if it is in that area.
     *  If so, scale default drawing radius down.
     * 3. Refactor Stats to have variogram function with options.
     * 4.
     *
     */

    // texture = new THREE.CanvasTexture(ctxTexture.canvas);
    texture.needsUpdate = true;
};

const plotBaseColour = function(){

};


//TODO: rename to stage 4: plot blobs / streaking
const plotVariogram = function(){
    ctxTexture.fillStyle = "#ffffff";
    ctxTexture.fillRect(0,0, Stats.width, Stats.height);
    Stats.plotVariogram(ctxTexture, newVariogram);
    newVariogram = false;
    this.updateTexture();
};

const plotDistribution = function(){
    Stats.generateData();
    newVariogram = true;
    Stats.plotPoints(ctxData);
};



module.exports = {
    init: init,
    updateTexture: updateTexture,
    getTexture: getTexture,
    plotDistribution: plotDistribution,
    plotVariogram: plotVariogram
};

