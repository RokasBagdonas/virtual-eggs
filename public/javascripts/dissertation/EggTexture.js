let Stats = require('./Stats.js');
let Maths = require('./Maths.js');
let numbers = require('numbers');

// let texture = new THREE.CanvasTexture(Stats.ctxVariogram.canvas); //THREE object
let texture; //THREE object
let ctxData, ctxTexture, ctxStreaks;
let newVariogram = false;
let WIDTH, HEIGHT;
let colours0 = {
    base: ["#6bbbbf", "#57b9bf"],
    baseOverlay: ["#c0d282","#cdea6c"],
    noise: ["#21233b", "#333b39"],
    main: ["#0c0d19"],
    highContrast: ["#340a09","#ea3c00"]
};

let colours1 = {
    base: ["#fcefdf"],
    baseOverlay: ["#9a8f7e","#a29279"],
    noise: ["#926a60", "#b96c50"],
    main: ["#786e6f", "#8d675c"]
};

const getTexture = function(){
    return texture;
};

const updateTexture =  function(){
    texture.needsUpdate = true;
};

const plotBaseColour = function(colour){
    ctxTexture.fillStyle = colour;
    ctxTexture.fillRect(0,0, WIDTH, HEIGHT);
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
    //TODO: refactor with mapping function: for each pair, call random.sample
    const mu = numbers.random.sample(dataParams.mu[0], dataParams.mu[1], 1)[0];
    const variance = numbers.random.sample(dataParams.variance[0], dataParams.variance[1], 1)[0];
    const numPoints = numbers.random.sample(dataParams.numPoints[0], dataParams.numPoints[1], 1)[0];
    //1.2 generateData
    dataParams = {mu: mu, variance: variance, numPoints: numPoints};

    Stats.generateData({mu: mu, variance: variance, numPoints: numPoints});
    Stats.plotPoints(ctxData);

    //2. colours
    //2.1 define Rainbow object, setSpectrum
    let colourScheme = new Rainbow();
    colourScheme.setNumberRange(Stats.MIN_HEIGHT, Stats.MAX_HEIGHT);
    colourScheme.setSpectrum(...colourSpectrum);



    //3. plotVariogram.
    // TODO: Modify to accept Rainbow object instead
    //3.1 get uniform random variables
    variogramParams.newVariogram = variogramParams.newVariogram;
    variogramParams.range = numbers.random.sample(variogramParams.range[0], variogramParams.range[1], 1)[0];
    variogramParams.sill = numbers.random.sample(variogramParams.sill[0], variogramParams.sill[1], 1)[0];
    variogramParams.nugget = numbers.random.sample(variogramParams.nugget[0], variogramParams.nugget[1], 1)[0];
    variogramParams.alpha = variogramParams.alpha;
    variogramParams.variogramModel = variogramParams.variogramModel;
    variogramParams.newVariogram = variogramParams.newVariogram;
    variogramParams.colourScheme = colourScheme;


    //3.2 draw Variogram
    Stats.plotVariogram(ctxTexture, variogramParams);
    updateTexture();

};

const drawBaseOverlayPattern1 = function(colours){

    const dataParams = {
        // mu: [WIDTH / 8, WIDTH / 1.42],
        mu: [30, 190],
        variance: [35, 60],
        numPoints: [140, 160]
    };
    const variogramParams = {
        range: [40, 60],
        sill: [200, 280],
        nugget: [100, 105],
        alpha: 0.05,
        variogramModel: "gaussian",
        newVariogram: true,
        drawRadius: 2,
        threshold: 80
    };
    const colourSpectrum = colours;

    drawPattern(dataParams, variogramParams, colourSpectrum);


};

const drawGeneralNoise1 = function(){
    const dataParams = {
        mu: [110, 130],
        variance: [120, 180],
        numPoints: [200, 300]
    };
    const variogramParams = {
        range: [2, 5],
        sill: [38, 50],
        nugget: [100, 102],
        alpha: 0.7,
        variogramModel: "gaussian",
        newVariogram: true,
        drawRadius: 0.6,
        threshold: 100
    };
    const colourSpectrum = colours1.noise;
    drawPattern(dataParams, variogramParams, colourSpectrum);

};

//big blobs
const drawMainPattern1 = function(){
    const dataParams = {
        mu: [WIDTH / 8, WIDTH / 1.42],
        variance: [35, 40],
        numPoints: [140, 180]
    };
    const variogramParams = {
        range: [50, 90],
        sill: [250, 330],
        nugget: [80, 90],
        alpha: 1,
        variogramModel: "gaussian",
        newVariogram: true,
        drawRadius: 3,
        threshold: 90
    };
    const colourSpectrum = colours1.main;

    drawPattern(dataParams, variogramParams, colourSpectrum);
};


const drawStreaks1 = function(){
    let value;
    let colourPicker = new Rainbow();
    colourPicker.setSpectrum("#323135","#e0dbe7");
    colourPicker.setNumberRange(-10,10);
    let yRange = [0, HEIGHT];

    let n = new Noise(Math.random());
    for(let x = 0; x < WIDTH; x++){
        // let yLength = numbers.random.sample(yRange[0], yRange[1];
            for(let y = 0; y < HEIGHT; y++){
                // if()
                value = Math.abs((n.perlin2(x / 50,y / 50)) + (n.perlin2(x / 25 ,y / 40))) * 256;
                if(value < 10){
                    ctxTexture.beginPath();
                    ctxTexture.fillStyle = "#" + colourPicker.colourAt(value);
                    ctxTexture.arc(x,y,1,0, Math.PI * 2);
                    ctxTexture.fill();
                }

        }
    }

};



const init = function(){
    let dataCanvas = document.getElementById("stats-points");
    WIDTH = dataCanvas.width;
    HEIGHT = dataCanvas.height;
    ctxData = dataCanvas.getContext("2d");
    let canvasTexture = document.getElementById("texture");
    ctxTexture = canvasTexture.getContext("2d");
    texture = new THREE.CanvasTexture(canvasTexture);

    ctxStreaks = document.getElementById("streaks").getContext("2d");


    Stats.init(WIDTH, HEIGHT);

    plotBaseColour(colours1.base[0]);
    drawBaseOverlayPattern1(colours1.baseOverlay);
    drawGeneralNoise1();
    drawMainPattern1();
    drawGeneralNoise1();
    drawGeneralNoise1();


    // plotBaseColour0(colours0.base);
    // drawStreaks0();

    // experimetalDraw();
    // plotSimple();
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

const plotVariogram = function(){
    plotBaseColour();
    const params = {newVariogram: newVariogram, useAlpha: true};
    Stats.plotVariogram(ctxTexture, params);
    newVariogram = false;
    this.updateTexture();
};

//TODO: legacy
const plotDistribution = function(){
    Stats.generateData();
    newVariogram = true;
    Stats.plotPoints(ctxData);
};


const experimetalDraw = function(){
    const dataParams = {
        mu: [110, 130],
        variance: [120, 180],
        numPoints: [160, 300]
    };
    const variogramParams = {
        range: [5, 8],
        sill: [105, 200],
        nugget: [30, 40],
        alpha: 0.7,
        variogramModel: "gaussian",
        newVariogram: true,
        drawRadius: 0.6
    };
    const colourSpectrum = colours1.highContrast;
    drawPattern(dataParams, variogramParams, colourSpectrum);
};

const plotSimple = function(){
    const data = {
        x: [128, 128, 128, 120, 150],
        y: [128, 120, 136, 128, 128],
        t: [80, 75, 75, 75, 60]
    };
    const variogramParams = {
        useAlpha: true,
        newVariogram: true,
        ctx: ctxTexture
    };

    const data2 = {
        x: [128, 128.5, 128.3, 129, 129, 135],
        y: [128, 134, 145, 150, 155, 159],
        t: [90, 92, 80, 91, 90, 93]
    };

    const data3 = {
        x: [128, 128, 128, 128, 128, 108, 148],
        y: [78, 108, 128, 148, 178, 128, 128],
        t: [40, 85, 100, 85, 45, 90, 90]
    };

    // let degrees = 30;
    // console.log(data2.x);
    // console.log(Maths.pairData(data2.x, data2.y));
    // // console.log(Maths.rotate(degrees, v));
    // console.log(numbers.matrix.rotate([[1],[1]], degrees, 'clockwise'));


    // console.log(xy);

    Stats.setData(data3);
    Stats.plotPoints(ctxData, data3);
    Stats.plotVariogram(ctxTexture, variogramParams);
};


module.exports = {
    init: init,
    updateTexture: updateTexture,
    getTexture: getTexture,
    drawPattern: drawPattern,
    drawBaseOverlayPattern1: drawBaseOverlayPattern1,
    plotDistribution: plotDistribution,
    plotVariogram: plotVariogram

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
