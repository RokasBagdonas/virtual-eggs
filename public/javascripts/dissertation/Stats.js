/**
 * Plan: 
 * 1. Create an array of random points (Gaussian?)
 *  1.1 t - height value at (x,y). At a random location, set a random height value.
 * 2. Create semivariogram model using kriging.js
 * 3. Plot those points to visualise
 * 4. For each pixel on a canvas, predict its colour.
 *  4.1. If prediction is lower than certain threshold, set it to 0.
 *  4.2. TODO: further improvement: make it to look like a layer beneath.
 */

const Stats = (function() {


    let numPoints, width, height;

    const init = function (num, w, h) {
        numPoints = num;
        width = w;
        height = h;
    }


    /**
     * Generates random values (heights) at random locations in a 2D area.
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
     *
     * @param {Object} data contains three 1-D arrays: x, y, t (value at (x,y)).
     * @return {HTMLCanvasElement}
     */
    const plotPoints = function (data = generateData()){
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




    return {
        init: init,
        generateData: generateData,
        plotPoints: plotPoints
    }
})();