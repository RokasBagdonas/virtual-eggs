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
let defaultParams = {
    mu: width /2,
    variance: width / 2,
    numPoints: 150,
    sigma2: 0.8,
    alpha: 2,
    range: 5,
    sill: 200,
    nugget: 20,
    coordinateStep: 1,
    drawRadius: 1,
    threshold: 1000
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
colourPicker.setSpectrum("#373c3d","#4bdbb0");


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
 * @param customParams {mu, variance, numPoints}
 * TODO: Gaussian data
 */
function generateData(customParams = {}) {
    const mu = customParams.mu || defaultParams.mu;
    const variance =  customParams.variance || defaultParams.variance;
    const numPoints = customParams.numPoints || defaultParams.numPoints;
    const x = numbers.random.distribution.normal(numPoints, mu, variance);
    const y = numbers.random.distribution.normal(numPoints, mu, variance);
    const t = numbers.random.distribution.normal(numPoints, MAX_HEIGHT / 2, MAX_HEIGHT / 4);
    // console.log(`t MAX: ${t.find(e => e >= 99)}`);
    // console.log(`t MIN: ${t.find(e => e <= 0)}`);
    data = {x,y,t};
}

const setData = function(newData){
    data = newData;
}


/**
 * //2.
 * TODO: plot points as on a sphere (or do coordinate transformation relative to the model path) (AvianBioRes15)
 */
const plotPoints = function(ctx){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    let x, y, h;
    const radius = 2;
    for(let i = 0; i < defaultParams.numPoints; i++){
        x = data.x[i];
        y = data.y[i];
        h = data.t[i];
        ctx.beginPath();
        if(!isNaN(h))
        try{
            ctx.fillStyle = "#" + colourPicker.colourAt(h);
        }
        catch(e){
            console.error(`plotPoints: '${h}', '${i}', length: ${data.length} `);
        }
        finally{
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

    }
};


/**
 * @param ctx canvas as 2D context to be drawn on.
 * @param params {range, sill, nugget, alpha, variogramModel, newVariogram, colours}
 */
const plotVariogram = function(ctx, params){
    if(ctx === undefined){
        console.error("plotVariogram: canvas is not provided");
        return;
    }
    variogramModel = params.variogramModel || variogramModel;
    if (params.newVariogram)
        variogram = kriging.train(data.t, data.x, data.y, variogramModel,
            (params.sigma2 || defaultParams.sigma2),(params.alpha || defaultParams.alpha));

    if(!(params.useAlpha || false)){
        variogram.range = params.range || defaultParams.range;
        variogram.sill = params.sill || defaultParams.sill;
        variogram.nugget = params.nugget || defaultParams.nugget;
    }

    const step = params.coordinateStep || defaultParams.coordinateStep;
    const threshold = params.threshold || defaultParams.threshold;
    const alpha = params.alpha || 1;
    let radius = params.drawRadius || defaultParams.drawRadius;
    console.log(`nugget: ${variogram.nugget.toFixed(3)}; range: ${variogram.range.toFixed(3)};
     sill: ${variogram.sill.toFixed(3)}; A: ${variogram.A.toFixed(3)}; model: ${variogramModel}`);

    let value = 0; //initialise kriging prediciton value

    ctx.globalAlpha = alpha;
    const colourScheme = params.colourScheme || colourPicker;
    for(let x = 0; x < width; x += step){
        for(let y = 0; y < height; y += step){
            value = kriging.predict(x, y, variogram);
            if (value <= threshold){
                // if((x > 100 && x < 140) && (y > 100 && y < 140)){
                //     radius = 0.1;
                  // }
                ctx.beginPath();
                ctx.fillStyle = "#" + colourScheme.colourAt(value);
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            // else{console.log(value)}
        }
    }
};

const init = function(w, h){
    width = w || width;
    height = h || height;
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
    setData: setData,
    width: width,
    height: height,
    defaultParams: defaultParams,
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
    MAX_NUGGET: MAX_NUGGET,
    MIN_HEIGHT: MIN_HEIGHT,
    MAX_HEIGHT: MAX_HEIGHT

};

module.exports = Stats;
