/**
 * Parameters:
 *  - canvas resolution (width =? height)
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
        setupSlider("spots-slider",
            (event) => {
                EggTexture.setParamSpots(parseInt(event.target.value, 10));
            },
            0,
            EggTexture.getMAX_SPOTS(),
            EggTexture.getMAX_SPOTS() / 2
        );

        setupSubmit();
        setupGeneratePoints();
        setupSpatiallyCorrelatedField();
        setupOther();
        setupColourPicker();
    };



    const setupSlider = function (elementId, eventCallback, min = 0, max = 200, value = 100) {
        let slider = document.getElementById(elementId);
        slider.min = min;
        slider.max = max;
        slider.value = value;
        slider.oninput = eventCallback;
    };

    const setupSubmit = function(){
        let submit = document.getElementById("options-submit");

        submit.onclick = (event) => {
            console.log("submit event");
            EggTexture.resetTexture();

        }
    };

    const setupGeneratePoints = function(){
        let slider = document.getElementById("points-slider");
        let label = document.getElementById("points-label");
        const initialPoints = Stats.getNumPointsLimit() / 2
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
            }
        };

        //alpha
        slider = document.getElementById("alpha-slider");
        let label2 = document.getElementById("alpha-label");

        slider.min = -30;
        slider.max = Stats.getAlphaLimit();
        slider.value = Stats.getAlpha();
        label2.innerHTML = "Alpha = " + Stats.getAlpha();

        slider.oninput = (event) => {
            Stats.setAlpha(parseInt(event.target.value, 10));
            label2.innerHTML = "Alpha = " + event.target.value;
            if (isInteractive)
                Stats.plotSpatiallyCorrelatedField();
        };
    };



    function setupOther() {
        let btn = document.getElementById("correlate-button");
        btn.onclick = (event) =>{
            const model = document.getElementById("variogramModel-select");
            Stats.setVariogramModel(model.value);
            Stats.plotSpatiallyCorrelatedField();
        }

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