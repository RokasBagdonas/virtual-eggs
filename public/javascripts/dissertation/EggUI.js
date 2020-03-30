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
// import * as Stats from './Stats.js'
// import {texture} from "./EggTexture.js";

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
        Stats.plotPoints();
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
            Stats.plotNewVariogram();
            texture.needsUpdate = true;
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
            Stats.plotNewVariogram();
            texture.needsUpdate = true;
        }
    };
}

function setupRangeSlider(){
    let slider = document.getElementById("range-slider");
    let label = document.getElementById("range-label");
    slider.min = 0;
    slider.max = 20;
    slider.step = "0.1";
    slider.value = 2;
    label.innerHTML = "Range = " + 2;

    slider.oninput = (event) => {
        Stats.params.range = parseFloat(event.target.value, 10);
        label.innerHTML = "Range = " + event.target.value;
        if (isInteractive){
            Stats.plotVariogram();
            texture.updateTexture();
        }
    }
}



function setupOther() {
    let btn = document.getElementById("correlate-button");
    btn.onclick = (event) =>{
        const model = document.getElementById("variogramModel-select");
        Stats.setVariogramModel(model.value);
        Stats.plotNewVariogram();
        texture.updateTexture();
    };

    let chx = document.getElementById("interactive-checkbox");
    chx.onclick = (event) => {
        isInteractive = !isInteractive;
    }
}

export function initEggUI(){
    setupGeneratePoints();
    setupSpatiallyCorrelatedField();
    setupOther();
    setupRangeSlider();
}


