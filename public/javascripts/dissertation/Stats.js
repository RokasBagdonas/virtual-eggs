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


    let numPoints = 100;
    let width = 256;
    let height = 256;
    let data;

    const setParameters = function (num, w, h) {
        numPoints = num;
        width = w;
        height = h;
        data = generateData();
    }


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

        ctx.fillStyle = "#000000";

        let x, y, h;
        const radius = 3;
        for(let i = 0; i < numPoints; i++){
            x = data.x[i];
            y = data.y[i];
            h = data.t[i];
            ctx.beginPath();
            // ctx.fillStyle = rgbToHex(h);
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
        let ctx = document.getElementById("spatial-random-field").getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        let value = 0;
        const step = 2;
        const threshold = 60;
        const radius = 1;
        //TODO: research mean and covariance params
        const mean = 0;
        const convariance = 10;
        const model = "gaussian"; //"gaussian", "exponential", "spherical"
        const variogram = kriging.train(data.t, data.x, data.y, model, mean, convariance);
        /**
         * for each coordinate at (x,y), get a value from variogram
         * if that value is greater than threshold, plot a filled circle with black value
         * TODO: else, plot gradient value
         */
        ctx.fillStyle = "#000000";
        for(let x = 0; x < width; x += step){
            for(let y = 0; y < height; y += step){
                //TODO: paint size transformation depending on the location on the egg.
                value = kriging.predict(x, y, variogram);
                if (value >= threshold){
                    //TODO(?): improve drawing by setting up the points first and drawing after finishing the loop
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }



    }


    return {
        setParameters: setParameters,
        generateData: generateData,
        plotPoints: plotPoints,
        plotSpatiallyCorrelatedField: plotSpatiallyCorrelatedField
    }
})();