module.exports = function(width, height){

let Stats = require('./Stats.js');
let baseOverlayPattern = require('./patternLayers/baseOverlay.js')(width, height);
let noisePattern = require('./patternLayers/noise.js')(width, height);
let mainPattern = require('./patternLayers/main.js')(width, height);

let module = {};
// let texture = new THREE.CanvasTexture(Stats.ctxVariogram.canvas); //THREE object
let ctxData, ctxTexture, ctxStreaks;
let texture; //THREE js Canvas texture
//init
let baseCtx = document.getElementById("base-layer").getContext("2d");
let baseOverlayCtx = document.getElementById("baseOverlay-layer").getContext("2d");
let noiseCtx = document.getElementById("noise-layer").getContext("2d");
let mainCtx = document.getElementById("main-layer").getContext("2d");


/**
 * @param {CanvasRenderingContext2D} ctx2D
 * @param {Array} colourRange :: [colourHexes]
 * @param {Object} patternType
 */
module.drawPattern = function(ctx2D, patternNamespace){
    //0.TODO define a function that picks a coordinate space where the base overlay should be placed
    //2. create Rainbow instance
    let colourScheme = new Rainbow();
    colourScheme.setNumberRange(Stats.MIN_HEIGHT, Stats.MAX_HEIGHT);
    colourScheme.setSpectrum(...(patternNamespace.colourScheme));

    //3.2 draw variogram
    Stats.plotVariogram(ctx2D, patternNamespace.data, patternNamespace.variogramParams, colourScheme);
};

/**
 * @param {CanvasRenderingContext2D} ctx to be drawn on
 * @param {muX, muY, varianceX, varianceY, numPoints} params
 * @param {HexString} colour
 */
// const drawGaussian = function(ctx, params, colour){
//
// };

module.drawTextures = function(){
    baseCtx.fillStyle = baseOverlayPattern.COLOUR_SCHEME_1.base[0];
    baseCtx.fillRect(0, 0, width, height);
    this.drawPattern(baseOverlayCtx, baseOverlayPattern);
    this.drawPattern(noiseCtx, noisePattern);
    this.drawPattern(mainCtx, mainPattern);
};


module.combineTextures = function(){
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

    texture = new THREE.CanvasTexture(textureCtx.canvas);
};

module.getTexture = function() {return texture};


//=============================================================================
//event callbacks for EggUI to change parameters
function updatePatternProperty(ctx, newValue, patternNamespace,  property, propertyType = variogramParams, isInteractive = true){
    patternNamespace[`${propertyType}`][`${property}`] = newValue;
    if(isInteractive){
        ctx.clearRect(0,0,width, height);
        module.drawPattern(ctx, patternNamespace);
        module.combineTextures();
        texture.needsUpdate = true;
    }

}

module.setBaseOverlayRange = function(newRange, isInteractive){
    updatePatternProperty(baseOverlayCtx, newRange, baseOverlayPattern, "range", "variogramParams", isInteractive);
};


return module;

};


