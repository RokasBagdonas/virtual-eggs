let Stats = require('./Stats.js');
let numbers = require('numbers');

// let texture = new THREE.CanvasTexture(Stats.ctxVariogram.canvas); //THREE object
let texture; //THREE object
let ctxData, ctxTexture;
let newVariogram = false;
let w, h;
let colours1 = {
    base: ["#6bbbbf", "#57b9bf"],
    baseOverlay: ["#c0d282","#cdea6c"],
    noiseSpots: ["#21233b"],
    main: ["#0c0d19"]
};

const getTexture = function(){
    return texture;
};

const updateTexture =  function(){
    texture.needsUpdate = true;
};

const plotBaseColour = function(){
    ctxTexture.fillStyle = colours1.base[0];
    ctxTexture.fillRect(0,0, w, h);
};

/**
 *
 * @param dataParams :: {[muStart, muEnd], [varianceStart, varianceEnd], [numPointsStart, numPointsEnd]}
 * @param variogramParams :: {[rangeStart, rangeEnd], [sillStart, sillEnd], [nuggetStart, nuggetEnd], modelName}
 * @param colourParams :: [colourHexes]
 */
const drawPattern = function(dataParams, variogramParams, colourSpectrum){
    //1. baseData
    //1.1 Get uniform random variable
    const mu = numbers.random.sample(dataParams.mu[0], dataParams.mu[1], 1)[0];
    const variance = numbers.random.sample(dataParams.variance[0], dataParams.variance[1], 1)[0];
    const numPoints = numbers.random.sample(dataParams.numPoints[0], dataParams.numPoints[1], 1)[0];
    //1.2 generateData
    const customParams = {mu: mu, variance: variance, numPoints: numPoints};
    console.log("custom Params: " + customParams);
    Stats.generateData({mu: mu, variance: variance, numPoints: numPoints});
    Stats.plotPoints(ctxData);

    //2. colours
    //2.1 define Rainbow object, setSpectrum

    //3. plotVariogram.
    // TODO: Modify to accept Rainbow object instead
    //3.1 get uniform random variables

    //3.2 draw Variogram
};

const drawBaseOverlayPattern = function(){

    const dataParams = {
        mu: [30, 180],
        variance: [35, 60],
        numPoints: [140, 160]
    };
    const varianceParams = {
        range: [40, 60],
        sill: [150, 300],
        nugget: [100, 105],
        alpha: 0.5,
        variogramModel: "gaussian"
    };
    const colours = colours1.baseOverlay;

    drawPattern(dataParams, varianceParams, colours);


};








//TODO: legacy
//TODO: rename to stage 4: plot blobs / streaking
const plotVariogram = function(){
    plotBaseColour();
    Stats.plotVariogram(ctxTexture, newVariogram);
    newVariogram = false;
    this.updateTexture();
};

//TODO: legacy
const plotDistribution = function(){
    Stats.generateData();
    newVariogram = true;
    Stats.plotPoints(ctxData);
};

const init = function(){
    ctxData = document.getElementById("stats-points");
    w = ctxData.width;
    h = ctxData.height;
    Stats.init(w, h);
    ctxData = ctxData.getContext("2d");
    Stats.plotPoints(ctxData);

    let canvasTexture = document.getElementById("texture");
    texture = new THREE.CanvasTexture(canvasTexture);

    ctxTexture = canvasTexture.getContext("2d");
    plotBaseColour();
    /**
     * range: 40-60
     *  1.1.2 sill: 150-300
     *  1.1.3 mu: 30-180
     *  1.1.4 variance: 40-90
     */

    // plotBaseOverlayColour();
    // Stats.plotVariogram(ctxTexture, true);


    // texture = new THREE.CanvasTexture(ctxTexture.canvas);
    texture.needsUpdate = true;
};


module.exports = {
    init: init,
    updateTexture: updateTexture,
    getTexture: getTexture,
    plotDistribution: plotDistribution,
    drawPattern: drawPattern,
    plotVariogram: plotVariogram,
    drawBaseOverlayPattern: drawBaseOverlayPattern
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
