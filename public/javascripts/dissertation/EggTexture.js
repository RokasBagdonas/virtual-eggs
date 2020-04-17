let Stats = require('./Stats.js');
let numbers = require('numbers');
let baseOverlayPattern = require('./patternLayers/baseOverlay.js');
let noisePattern = require('./patternLayers/noise.js');
let mainPattern = require('./patternLayers/main.js');
let utility = require('./utility.js');

// let texture = new THREE.CanvasTexture(Stats.ctxVariogram.canvas); //THREE object
let ctxData, ctxTexture, ctxStreaks;
let baseCtx, baseOverlayCtx, noiseCtx, mainCtx;
let width, height;

// const updateTexture =  function(){
//     texture.needsUpdate = true;
// };

/**
 * @param {CanvasRenderingContext2D} ctx2D
 * @param {Array} colourRange :: [colourHexes]
 * @param {Object} patternType
 */
const drawPattern = function(ctx2D, patternType, colourRange){
    //0.TODO define a function that picks a coordinate space where the base overlay should be placed
    //1. generate data points to be used for kriging
    //1.1 get concrete dataRangeParams
    // let dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, dataRangeParams);

    //1.2 generate data. Data is set in Stats
    // Stats.generateData(dataParams);

    //2. create Rainbow instance
    let colourScheme = new Rainbow();
    colourScheme.setNumberRange(Stats.MIN_HEIGHT, Stats.MAX_HEIGHT);
    colourScheme.setSpectrum(...colourRange);

    //3. correlate points and draw them on canvas
    //3.1 get Concrete variogramRangeParams values
    // let variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, variogramRangeParams);

    //3.2 draw variogram
    Stats.plotVariogram(ctx2D, patternType.data, patternType.variogramParams, colourScheme);
};

/**
 * @param {CanvasRenderingContext2D} ctx to be drawn on
 * @param {muX, muY, varianceX, varianceY, numPoints} params
 * @param {HexString} colour
 */
// const drawGaussian = function(ctx, params, colour){
//
// };

const init = function(w, h){
    width = w;
    height = h;
    baseCtx = document.getElementById("base-layer").getContext("2d");
    baseOverlayCtx = document.getElementById("baseOverlay-layer").getContext("2d");
    noiseCtx = document.getElementById("noise-layer").getContext("2d");
    mainCtx = document.getElementById("main-layer").getContext("2d");

    //setup all pattern modules
    baseOverlayPattern.init(width, height);
    noisePattern.init(width, height);
    mainPattern.init(width, height);
};


const drawTexture1 = function(){
    baseCtx.fillStyle = baseOverlayPattern.COLOUR_SCHEME_1.base[0];
    baseCtx.fillRect(0, 0, width, height);
    // drawPattern(baseOverlayCtx, baseOverlayPattern, baseOverlayPattern.COLOUR_SCHEME_1.baseOverlay);
    drawPattern(noiseCtx, noisePattern, noisePattern.COLOUR_SCHEME_1.noise1);
    // drawPattern(mainCtx, mainPattern, mainPattern.bigBlobsParams.COLOUR_SCHEME_1);
};


const getTexture = function(){
    //1. create Texture canvas
    let textureCanvas = document.createElement("canvas");
    textureCanvas.width = width; textureCanvas.height = height;
    let textureCtx = textureCanvas.getContext("2d");

    //2. retrieve all texture layers
    let canvases = document.getElementsByClassName("texture");

    //3. draw each layer onto the final canvas
    for(const canvas of canvases){
        textureCtx.drawImage(canvas, 0,0);
    }

    //4. return THREE CanvasTexture
    return new THREE.CanvasTexture(textureCtx.canvas);
};





module.exports = {
    init: init,
    getTexture: getTexture,
    drawPattern: drawPattern,
    drawTexture1: drawTexture1

};

