/**
* Parameters:
*  - canvas resolution (width ?== height)
*  - num of points
*  - mean
*  - variance
*  - range
*  - nugget
*
* @type {{init: init}}
*/

const Stats = require('./Stats.js');
const EggTexture = require('./EggTexture.js');

let isInteractive = true; //for updating the texture while parameters are being changed live


function setupGeneratePoints(){
    let slider = document.getElementById("points-slider");
    let label = document.getElementById("points-label");
    const initialPoints = Stats.MAX_POINTS / 2;
    label.innerHTML = "" + initialPoints;

    slider.max = Stats.MAX_POINTS;
    slider.value = initialPoints;

    slider.oninput = (event) => {
        const points = Math.round(parseInt(event.target.value, 10));
        Stats.params.numPoints = points;
        label.innerHTML = "" + points;
    };

    let btn = document.getElementById("points-button");
    btn.onclick = (event) =>{
        EggTexture.plotDistribution();
    };
}

function setupSpatiallyCorrelatedField() {
    //sigma2
    let slider = document.getElementById("sigma2-slider");
    let label = document.getElementById("sigma2-label");

    slider.step = "0.1";
    slider.max = Stats.MAX_SIGMA2;
    slider.value = Stats.params.sigma2;
    label.innerHTML = "Sigma^2 = " + Stats.params.sigma2;

    slider.oninput = (event) => {
        // console.log("sigma2 slider");
        Stats.params.sigma2 = parseFloat(event.target.value, 10);
        label.innerHTML = "Sigma^2 = " + event.target.value;
        if (isInteractive){
            EggTexture.plotVariogram();
        }
    };

    //alpha
    slider = document.getElementById("alpha-slider");
    let label2 = document.getElementById("alpha-label");

    slider.min = -2;
    slider.step = "0.1";
    slider.max = Stats.MAX_ALPHA;
    slider.value = Stats.params.alpha;
    label2.innerHTML = "Alpha = " + Stats.params.alpha;

    slider.oninput = (event) => {
        Stats.params.alpha = parseInt(event.target.value, 10);
        label2.innerHTML = "Alpha = " + event.target.value;
        if (isInteractive){
            EggTexture.plotVariogram();
        }
    };
}

function setupOther() {
    let btn = document.getElementById("correlate-button");
    btn.onclick = (event) => {
        const model = document.getElementById("variogramModel-select");
        Stats.setVariogramModel(model.value);
        EggTexture.plotVariogram();
    };

    let chx = document.getElementById("interactive-checkbox");
    chx.onclick = (event) => {
        isInteractive = !isInteractive;
    }
}

//TODO: refactor
function setupStatsSlider(elementId, labelId, min, max, step, value, paramName){
    let slider = document.getElementById(elementId);
    let label = document.getElementById(labelId);
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = value;
    let labelInnerHTML =  `${slider.name}= ${value}`;
    label.innerHTML = labelInnerHTML;

}

function setupVariogramSlider(elementId, labelId, min, max, step, value, paramName){
    let slider = document.getElementById(elementId);
    let label = document.getElementById(labelId);
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = value;
    let labelInnerHTML =  `${slider.name}= ${value}`;
    label.innerHTML = labelInnerHTML;
    slider.oninput = (event) => {
        Stats.params[paramName] = parseFloat(event.target.value, 10);
        label.innerHTML = slider.name + "= " + event.target.value;
        if (isInteractive){
            EggTexture.plotVariogram();
        }
    }
}

function setupDistributionSlider(elementId, labelId, min, max, step, value, paramName){
    let slider = document.getElementById(elementId);
    let label = document.getElementById(labelId);
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = value;
    let labelInnerHTML =  `${slider.name}= ${value}`;
    label.innerHTML = labelInnerHTML;
    slider.oninput = (event) => {
        Stats.params[paramName] = parseFloat(event.target.value, 10);
        label.innerHTML = slider.name + "= " + event.target.value;
        EggTexture.plotDistribution();
    }
}



const initEggUI = function(){
    setupGeneratePoints();
    setupSpatiallyCorrelatedField();
    setupOther();
    setupVariogramSlider("range-slider", "range-label",
        Stats.MIN_RANGE, Stats.MAX_RANGE, "0.1", 2,"range");
    setupVariogramSlider("sill-slider", "sill-label",
        Stats.MIN_SILL, Stats.MAX_SILL, "10", 200, "sill");
    setupVariogramSlider("nugget-slider", "nugget-label",
        Stats.MIN_NUGGET, Stats.MAX_NUGGET, "7", 100, "nugget");
    setupDistributionSlider("mu-slider", "mu-label",
        0, Stats.width, 1, Stats.params.mu, "mu");
    setupDistributionSlider("variance-slider", "variance-label",
        Stats.MIN_VARIANCE, Stats.MAX_VARIANCE, 1, Stats.params.variance, "variance");
    setupDistributionSlider("points-slider", "points-label",
        0, Stats.MAX_POINTS, 1, Stats.params.numPoints, "numPoints");
};

module.exports = {
    initEggUI: initEggUI
};


