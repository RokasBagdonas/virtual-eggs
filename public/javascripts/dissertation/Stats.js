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
let ctx = document.getElementById("stats-points"); //temporary variable
let width = ctx.width;
let height = ctx.height;

let ctxData = ctx.getContext("2d");
let ctxVariogram = document.getElementById("spatial-random-field").getContext("2d");

//texture parameters-----------------------------
let params = {
    numPoints: 223,
    sigma2: 1,
    alpha: 2,
    range: 5
};

let variogram;
let data;

let variogramModel = "exponential";

const MAX_SIGMA2 = 2;
const MAX_ALPHA = 10;
const MAX_POINTS = 300;
const MAX_RANGE = 100;
const MAX_SILL = 2000;

//utilities--------------------------------------
let colourPicker = new Rainbow();
colourPicker.setNumberRange(0,100); //TODO: change to 0-1
colourPicker.setSpectrum('black', 'red');


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
    let t = [], x = [], y = [];

    for (let i = 0; i < numPoints; i++) {
        x[i] = Math.random() * w;
        y[i] = Math.random() * h;
        t[i] = Math.random() * 100;
    }
    data = {x,y,t};
}

/**
 * //2.
 * TODO: plot points as on a sphere (or do coordinate transformation relative to the model path) (AvianBioRes15)
 */
const plotPoints = function(){
    ctxData.fillStyle = "#ffffff";
    ctxData.fillRect(0, 0, width, height);

    let x, y, h;
    const radius = 3;
    for(let i = 0; i < params.numPoints; i++){
        x = data.x[i];
        y = data.y[i];
        h = data.t[i];
        ctxData.beginPath();
        ctxData.fillStyle = "#" + colourPicker.colourAt(h);
        ctxData.arc(x, y, radius, 0, Math.PI * 2);
        ctxData.fill();
    }
};

//3. Rename to replot
const plotNewVariogram = function(){
    variogram = kriging.train(data.t, data.x, data.y, variogramModel, params.sigma2, params.alpha);
    plotVariogram();
}

/**
 * Called when variogram params are changed but not the data.
 * TODO: refactor plotNewVariogram
 */
const plotVariogram = function(){
    variogram.range = params.range;
    ctxVariogram.fillStyle = "#ffffff";
    ctxVariogram.fillRect(0, 0, width, height);
    let value = 0;
    const step = 2;
    const radius = 1;
    const threshold = 80;
    console.log(`nugget: ${variogram.nugget.toFixed(3)}; range: ${variogram.range.toFixed(3)}; sill: ${variogram.sill.toFixed(3)}; A: ${variogram.A.toFixed(3)}; model: ${variogramModel}`);

    for(let x = 0; x < width; x += step){
        for(let y = 0; y < height; y += step){
            value = kriging.predict(x, y, variogram);
            if (value >= threshold){
                ctxVariogram.beginPath();
                ctxVariogram.fillStyle = "#" + colourPicker.colourAt(value);
                ctxVariogram.arc(x, y, radius, 0, Math.PI * 2);
                ctxVariogram.fill();
            }
        }
    }
};

const init = function(){
    generateData();
    plotPoints();
    plotNewVariogram();
}

//======================================================================================================================
//init phase
console.log("init phase " + width + " " + height);

let Stats = {
    width: width,
    height: height,
    ctxData: ctxData,
    ctxVariogram: ctxVariogram,
    params: params,
    data: data,
    variogramModel: variogramModel,
    MAX_SIGMA2: MAX_SIGMA2,
    MAX_ALPHA: MAX_ALPHA,
    MAX_POINTS: MAX_POINTS,
    MAX_RANGE: MAX_RANGE,
    MAX_SILL: MAX_SILL,
    setVariogramModel: setVariogramModel,
    setRange: setRange,
    plotPoints: plotPoints,
    plotNewVariogram: plotNewVariogram,
    plotVariogram: plotVariogram,
    init: init
};

module.exports = Stats;
