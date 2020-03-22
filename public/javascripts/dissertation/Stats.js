/**
 * Plan: 
 * 1. Create an array of random points (Gaussian?)
 *  1.1 t - height value at (x,y). At a random location, set a random height value.
 * 2. Create semivariogram model using those points
 * 3. Plot those points to visualise
 * 4. For each pixel on a canvas, predict its colour.
 *  4.1. If prediction is lower than certain threshold, set it to 0.
 *  4.2. TODO: further improvement: make it to look like a layer beneath.
 */

const Stats = (function(){

    /**
     * Generates random values (heights) at random locations in a 2D area.
     * @param {int} numOfPoints 
     * @param {number} width 2D area
     * @param {number} height 2D area
     */
    const generateData = function(numOfPoints, width, height){
        let t = [], x = [], y = [];
        
        for(let i = 0; i < numOfPoints; i++){
            x[i] = Math.random() * width; 
            y[i] = Math.random() * height;
            t[i] = Math.random() * 100;
        }
        return { x, y, t };
    }




    return {
        generateData: generateData
    }
})();