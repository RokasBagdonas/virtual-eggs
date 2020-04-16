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
 * @param {Object} dataRangeParams :: {[muStart, muEnd], [varianceStart, varianceEnd], [numPointsStart, numPointsEnd]}
 * @param {Object} variogramRangeParams :: {[rangeStart, rangeEnd], [sillStart, sillEnd], [nuggetStart, nuggetEnd], modelName}
 */
const drawPattern = function(ctx2D, colourRange, dataRangeParams, variogramRangeParams){
    //0.TODO define a function that picks a coordinate space where the base overlay should be placed
    //1. generate data points to be used for kriging
    //1.1 get concrete dataRangeParams
    let dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, dataRangeParams);

    //1.2 generate data. Data is set in Stats
    Stats.generateData(dataParams);

    //2. create Rainbow instance to be used for drawing
    let colourScheme = new Rainbow();
    colourScheme.setNumberRange(Stats.MIN_HEIGHT, Stats.MAX_HEIGHT);
    colourScheme.setSpectrum(...colourRange);

    //3. correlate points and draw them on canvas
    //3.1 get Concrete variogramRangeParams values
    let variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, variogramRangeParams);

    //3.2 draw variogram
    Stats.plotVariogram(ctx2D, variogramParams, colourScheme);
};

/**
 * @param {CanvasRenderingContext2D} ctx to be drawn on
 * @param {muX, muY, varianceX, varianceY, numPoints} params
 * @param {HexString} colour
 */
const drawGaussian = function(ctx, params, colour){

}

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
    drawPattern(baseOverlayCtx, baseOverlayPattern.COLOUR_SCHEME_1.baseOverlay, baseOverlayPattern.dataRangeParams, baseOverlayPattern.variogramRangeParams);
    drawPattern(noiseCtx, noisePattern.COLOUR_SCHEME_1.noise1, noisePattern.dataRangeParams, noisePattern.variogramRangeParams);
    drawPattern(mainCtx, mainPattern.bigBlobsParams.COLOUR_SCHEME_1, mainPattern.bigBlobsParams.dataRangeParams, mainPattern.bigBlobsParams.variogramRangeParams);
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









//Legacy code
const plotVariogram = function(){
    plotBaseColour();
    const params = {newVariogram: newVariogram, useAlpha: true};
    Stats.plotVariogram(ctxTexture, params);
    newVariogram = false;
    this.updateTexture();
};

//Legacy code
const plotDistribution = function(){
    Stats.generateData();
    newVariogram = true;
    Stats.plotPoints(ctxData);
};


module.exports = {
    init: init,
    getTexture: getTexture,
    drawPattern: drawPattern,
    plotDistribution: plotDistribution,
    plotVariogram: plotVariogram,
    drawTexture1: drawTexture1

};


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

/**
 * 1. On each call, create random params in range
 * 1.1. Determine uniform variations of range, sill mu and variance
 *  1.1.1 range: 40-60
 *  1.1.2 sill: 150-300
 *  1.1.3 mu: 30-180
 *  1.1.4 variance: 40-90
 * 2. Colour variation:
 *  2.1. define two hex values for two colours for rainbow.setSpectrum
 *  2.2.
 *
 */

/**
 * For each layer, there is a pattern that we follow.
 * We have different variogram parameters, different colour schemes, different alpha layers.
 * The functions do essentially the same thing but achieve different looks.
 * need to define a function that can do all of these things.
 * We need:
 * 1. data params. These either are fixed or in a certain range.
 *      On each call, get a uniform random variable from that range to make
 *      patterns look unique.
 *  1.1. mu, variance, num of points
 * 2. variogram params
 *  2.1 sill, nugget, range, alpha layer, draw radius, variogram model
 * 3. Colour schemes
 *  3.1 colour hex range. provide variant colours in an array.
 *  3.2 Provide the spectrum to the variogram function.
 *  3.3 on variogram value prediction, use that value for determining the colour (already present).
 *
 *
 */

/**
 * What the function does:
 * 1. given the range between each variable, it picks a random value from that range.
 *  1.1 For that to work, for each pattern we need to:
 *      1.1.1 Determine data generation params
 *      1.1.2 Determine plot Variogram params
 *      1.1.3 Decide on colour schemes
 * 2. Calls generateData() and plotVariogram() with those variables.
 */
