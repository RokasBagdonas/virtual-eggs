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
let EggUI = (function(){

    let colourPicker = new Rainbow();
    function setupColourPicker(params){
        colourPicker.setNumberRange(0,100);
        colourPicker.setSpectrum('black', 'red');
    }
    let isInteractive = true;

    const init = function(){
        setupGeneratePoints();
        setupSpatiallyCorrelatedField();
        setupOther();
        setupColourPicker();
        setupRangeSlider();
    };


    const setupGeneratePoints = function(){
        let slider = document.getElementById("points-slider");
        let label = document.getElementById("points-label");
        const initialPoints = Stats.getNumPointsLimit() / 2;
        label.innerHTML = initialPoints;

        slider.max = Stats.getNumPointsLimit();
        slider.value = initialPoints;

        slider.oninput = (event) => {
            const points = Math.round(parseInt(event.target.value, 10));
            Stats.setNumPoints(points);
            label.innerHTML = points;
        };

        let btn = document.getElementById("points-button");
        btn.onclick = (event) =>{
            Stats.plotPoints();
        };
    };

    const setupSpatiallyCorrelatedField = function () {
        //sigma2
        let slider = document.getElementById("sigma2-slider");
        let label = document.getElementById("sigma2-label");

        slider.step = "0.1";
        slider.max = Stats.getSigma2Limit();
        slider.value = Stats.getSigma2();
        label.innerHTML = "Sigma^2 = " + Stats.getSigma2();

        slider.oninput = (event) => {
            // console.log("sigma2 slider");
            Stats.setSigma2(parseFloat(event.target.value, 10));
            label.innerHTML = "Sigma^2 = " + event.target.value;
            if (isInteractive){
                Stats.plotSpatiallyCorrelatedField();
                EggTexture.updateTexture();
            }
        };

        //alpha
        slider = document.getElementById("alpha-slider");
        let label2 = document.getElementById("alpha-label");

        slider.min = -2;
        slider.step = "0.1";
        slider.max = Stats.getAlphaLimit();
        slider.value = Stats.getAlpha();
        label2.innerHTML = "Alpha = " + Stats.getAlpha();

        slider.oninput = (event) => {
            Stats.setAlpha(parseInt(event.target.value, 10));
            label2.innerHTML = "Alpha = " + event.target.value;
            if (isInteractive){
                Stats.plotSpatiallyCorrelatedField();
                EggTexture.updateTexture();
            }
        };
    };

    function setupRangeSlider(){
        let slider = document.getElementById("range-slider");
        let label = document.getElementById("range-label");
        slider.min = 0;
        slider.max = 20;
        slider.step = "0.1";
        slider.value = 2;
        label.innerHTML = "Range = " + 2;

        slider.oninput = (event) => {
            Stats.setRange(parseFloat(event.target.value, 10));
            label.innerHTML = "Range = " + event.target.value;
            if (isInteractive){
                Stats.plotVariogram();
                EggTexture.updateTexture();
            }
        }
    }



    function setupOther() {
        let btn = document.getElementById("correlate-button");
        btn.onclick = (event) =>{
            const model = document.getElementById("variogramModel-select");
            Stats.setVariogramModel(model.value);
            Stats.plotSpatiallyCorrelatedField();
            EggTexture.updateTexture();
        };

        let chx = document.getElementById("interactive-checkbox");
        chx.onclick = (event) => {
            isInteractive = !isInteractive;
        }
    }



    return {
        init: init,
        colourPicker: colourPicker
    }

})();