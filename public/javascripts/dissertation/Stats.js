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

const Stats = (function() {

    let ctx;
    let numPoints = 223;
    let width = 256;
    let height = 256;
    let data;
    let sigma2 = 1;
    let alpha = 2;
    let range = 5;
    // let sill = 500;
    let variogram;
    let variogramModel = "exponential";
    const MAX_SIGMA2 = 2;
    const MAX_ALPHA = 10;
    const MAX_POINTS = 300;
    const MAX_RANGE = 100;
    const MAX_SILL = 2000;

    const setParameters = function (num, w, h) {
        numPoints = num;
        width = w;
        height = h;
        data = generateData();
    }

    const init = function(){
        generateData();
        plotPoints();
        plotSpatiallyCorrelatedField();
    }

    const setSigma2 = (newSigma2) => {sigma2 = newSigma2;}
    const getSigma2 = () => {return sigma2;}

    const setAlpha = (newAlpha) => {alpha = newAlpha;}
    const getAlpha = () => {return alpha;}

    const getNumPoints = () => {return numPoints;};
    const setNumPoints = (points) => {numPoints = points;};

    const getVariogramModel = () => {return variogramModel;}
    const setVariogramModel = (newModel) => {
        switch (newModel) {
            case 'gaussian': variogramModel = 'gaussian'; break;
            case 'exponential': variogramModel = 'exponential'; break;
            case 'spherical': variogramModel = 'spherical'; break;
        }
    };

    const getRange = () => { return variogram.range;}
    const setRange = (newRange) => {
        if (variogram != null){
            range = newRange;
            variogram.range = newRange;
        }
        else
            console.log("setRange: variogram does not exist");
    };

    const getSigma2Limit = () => {return MAX_SIGMA2;}
    const getAlphaLimit = () => {return MAX_ALPHA;}
    const getNumPointsLimit = () => {return MAX_POINTS;}

    /**
     * Generates random values (heights) at random locations in a 2D area.
     * //1.
     * @param {int} numOfPoints
     * @param {number} w width in 2D area
     * @param {number} h height 2D area
     */
    const generateData = function (numOfPoints = numPoints, w = width, h = height) {
        let t = [], x = [], y = [];

        for (let i = 0; i < numOfPoints; i++) {
            x[i] = Math.random() * width;
            y[i] = Math.random() * height;
            t[i] = Math.random() * 100;
        }
        return {x, y, t};
    }

    /**
     * //2.
     * TODO: plot points as on a sphere (or do coordinate transformation relative to the model path) (AvianBioRes15)
     */
    const plotPoints = function (){
        data = generateData();
        let ctx = document.getElementById("stats-points").getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);


        let x, y, h;
        const radius = 3;
        for(let i = 0; i < numPoints; i++){
            x = data.x[i];
            y = data.y[i];
            h = data.t[i];
            ctx.beginPath();
            ctx.fillStyle = "#" + EggUI.colourPicker.colourAt(h);
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // return ctx;
    }

    const rgbToHex = function (rgb) {
        let hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };

    //3.
    const plotSpatiallyCorrelatedField = function(){

        variogram = kriging.train(data.t, data.x, data.y, variogramModel, sigma2, alpha);
        plotVariogram();
        return ctx;
    };

    /**
     * Called when variogram params are changed but not the data.
     * TODO: refactor plotSpatiallyCorrelatedField
     */
    const plotVariogram = function(){
        variogram.range = range;
        ctx = document.getElementById("spatial-random-field").getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        let value = 0;
        const step = 2;
        const radius = 1;
        const threshold = 80;
        console.log(`nugget: ${variogram.nugget.toFixed(3)}; range: ${variogram.range.toFixed(3)}; sill: ${variogram.sill.toFixed(3)}; A: ${variogram.A.toFixed(3)}; model: ${variogramModel}`);

        for(let x = 0; x < width; x += step){
            for(let y = 0; y < height; y += step){
                value = kriging.predict(x, y, variogram);
                if (value >= threshold){
                    ctx.beginPath();
                    ctx.fillStyle = "#" + EggUI.colourPicker.colourAt(value);
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };
    };


    return {
        init: init,
        generateData: generateData,
        plotPoints: plotPoints,
        plotSpatiallyCorrelatedField: plotSpatiallyCorrelatedField,
        getSigma2: getSigma2,
        setSigma2: setSigma2,
        getAlpha: getAlpha,
        setAlpha: setAlpha,
        getNumPoints: getNumPoints,
        setNumPoints: setNumPoints,
        getSigma2Limit: getSigma2Limit,
        getAlphaLimit: getAlphaLimit,
        getNumPointsLimit: getNumPointsLimit,
        getVariogramModel: getVariogramModel,
        setVariogramModel: setVariogramModel,
        setRange: setRange,
        getRange: getRange,
        plotVariogram: plotVariogram
    }
})();


