/**
* Plan:
* 1. Create an array of random points (Gaussian?)
*  1.1 t - height value at (x,y). At a random location, set a random height value.
* 2. Plot those points to visualise
* 3. Create semivariogram model using kriging.js
* 4. For each pixel on a canvas, predict its colour.
*  4.1. If prediction is lower than certain threshold, set it to 0.
*  4.2. TODO: further improvement: make it to look like a layer beneath.
*/

let numbers = require('numbers');

//setup canvases---------------------------------
let width = 256, height = 256;

//texture parameters-----------------------------
let params = {
    mu: width /2,
    variance: width / 2,
    numPoints: 150,
    sigma2: 0.8,
    alpha: 2,
    range: 5,
    sill: 200,
    nugget: 100,
    coordinateStep: 1,
    drawRadius: 1
};

let variogram;
let data;

let variogramModel = "gaussian";

const MIN_MU = width / 10;
const MAX_MU = width * 2;
const MIN_VARIANCE = MIN_MU / 2;
const MAX_VARIANCE = MAX_MU / 2;
const MIN_HEIGHT = 0;
const MAX_HEIGHT = 100;

const MAX_SIGMA2 = 2;
const MAX_ALPHA = 10;
const MAX_POINTS = 300;
const MIN_RANGE = 0;
const MAX_RANGE = 100;
const MIN_SILL = 0;
const MAX_SILL = 2000;
const MIN_NUGGET = 1;
const MAX_NUGGET = 200;



//utilities--------------------------------------
let colourPicker = new Rainbow();
colourPicker.setNumberRange(0,100); //TODO: change to 0-1
colourPicker.setSpectrum("#4bdbb0", "#373c3d");


const setVariogramModel= function (newModel){
    switch (newModel) {
        case 'gaussian': variogramModel = 'gaussian'; break;
        case 'exponential': variogramModel = 'exponential'; break;
        case 'spherical': variogramModel = 'spherical'; break;
    }
};

const setRange = function (newRange){
    if (variogram != null){
        params.range = newRange;
        variogram.range = newRange;
    }
    else
        console.log("setRange: variogram does not exist");
};

/**
 * Generates random values (heights) at random locations in a 2D area.
 * //1.
 * @param {int} numOfPoints
 * @param {number} w width in 2D area
 * @param {number} h height 2D area
 * TODO: Gaussian data
 */
function generateData(numPoints = params.numPoints, w = width, h = height) {
    const mu = params.mu;
    const variance = params.variance;
    let x = numbers.random.distribution.normal(numPoints, mu, variance);
    let y = numbers.random.distribution.normal(numPoints, mu, variance);
    let t = numbers.random.distribution.normal(numPoints, MAX_HEIGHT / 2, MAX_HEIGHT / 4);
    data = {x,y,t};
}


/**
 * //2.
 * TODO: plot points as on a sphere (or do coordinate transformation relative to the model path) (AvianBioRes15)
 */
const plotPoints = function(ctx){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    let x, y, h;
    const radius = 3;
    for(let i = 0; i < params.numPoints; i++){
        x = data.x[i];
        y = data.y[i];
        h = data.t[i];
        ctx.beginPath();
        ctx.fillStyle = "#" + colourPicker.colourAt(h);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
};



/**
 * Called when variogram params are changed but not the data.
 */
const plotVariogram = function(ctx, newVariogram = false, customParams = {}, colours = ["#bcb9c6", "#5e616a"]){
    if (newVariogram)
        variogram = kriging.train(data.t, data.x, data.y, variogramModel,
            (customParams.sigma2 || params.sigma2),(customParams.alpha || params.alpha));

    variogram.range = customParams.range || params.range;
    variogram.sill = customParams.range || params.sill;
    variogram.nugget = customParams.nugget || params.nugget;
    let value = 0;
    const step = customParams.coordinateStep || params.coordinateStep;
    const threshold = 80;
    console.log(`nugget: ${variogram.nugget.toFixed(3)}; range: ${variogram.range.toFixed(3)};
     sill: ${variogram.sill.toFixed(3)}; A: ${variogram.A.toFixed(3)}; model: ${variogramModel}`);

    let colourStyle = new Rainbow();

    colourStyle.setSpectrum(...colours);
    const min = params.mu - params.variance *2;
    const max = min + params.variance * 4;
    colourStyle.setNumberRange(min, max);


    for(let x = 0; x < width; x += step){
        for(let y = 0; y < height; y += step){
            value = kriging.predict(x, y, variogram);
            // if (value >= threshold){
            ctx.beginPath();
            ctx.fillStyle = "#" + colourStyle.colourAt(value);
            ctx.arc(x, y, params.drawRadius, 0, Math.PI * 2);
            ctx.fill();
            // }
        }
    }
};

const init = function(w, h){
    width = w;
    height = h;
    generateData();
};


//======================================================================================================================
//init phase
console.log("Stats: " + numbers.random.distribution.normal(4, 10, 3));

let Stats = {
    setVariogramModel: setVariogramModel,
    setRange: setRange,
    generateData: generateData,
    plotPoints: plotPoints,
    plotVariogram: plotVariogram,
    init: init,
    width: width,
    height: height,
    params: params,
    data: data,
    variogramModel: variogramModel,
    MIN_MU: MIN_MU,
    MAX_MU: MAX_MU,
    MIN_VARIANCE: MIN_VARIANCE,
    MAX_VARIANCE: MAX_VARIANCE,
    MAX_SIGMA2: MAX_SIGMA2,
    MAX_ALPHA: MAX_ALPHA,
    MAX_POINTS: MAX_POINTS,
    MIN_RANGE: MIN_RANGE,
    MAX_RANGE: MAX_RANGE,
    MIN_SILL: MIN_SILL,
    MAX_SILL: MAX_SILL,
    MIN_NUGGET: MIN_NUGGET,
    MAX_NUGGET: MAX_NUGGET

};

module.exports = Stats;
