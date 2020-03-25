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

    const init = function(){
        setupSpotsSlider();
        setupSubmit();
        setupGeneratePoints();
        setupSpatiallyCorrelatedField();
        setupColourPicker();
    };

    const setupSpotsSlider = function(){
        let slider = document.getElementById("spots-slider");
        slider.max = EggTexture.getMAX_SPOTS();
        slider.value = EggTexture.getMAX_SPOTS();

        slider.onchange = (event) => {
            console.log("slider event");
            EggTexture.setParamSpots(parseInt(event.target.value, 10));
        }
    };

    const setupSubmit = function(){
        let submit = document.getElementById("options-submit");

        submit.onclick = (event) => {
            console.log("submit event");
            EggTexture.resetTexture();

        }
    };

    const setupGeneratePoints = function(){
        let btn = document.getElementById("points-button");
        btn.onclick = (event) =>{
            Stats.plotPoints();
        }
    };

    const setupSpatiallyCorrelatedField = function () {
        //sigma2
        let slider = document.getElementById("sigma2-slider");
        let label = document.getElementById("sigma2-label");

        slider.max = Stats.getSigma2Limit();
        slider.value = Stats.getSigma2();
        label.innerHTML = "Sigma^2 = " + Stats.getSigma2();

        slider.oninput = (event) => {
            // console.log("sigma2 slider");
            Stats.setSigma2(parseInt(event.target.value, 10));
            label.innerHTML = "Sigma^2 = " + event.target.value;
        };




        //alpha
        slider = document.getElementById("alpha-slider");
        let label2 = document.getElementById("alpha-label");

        slider.max = Stats.getAlphaLimit();
        slider.value = Stats.getAlpha();
        label2.innerHTML = "Alpha = " + Stats.getAlpha();

        slider.oninput = (event) => {
            Stats.setAlpha(parseInt(event.target.value, 10));
            label2.innerHTML = "Alpha = " + event.target.value;
        };

        let btn = document.getElementById("correlate-button");
        btn.onclick = (event) =>{
            Stats.plotSpatiallyCorrelatedField();
        }

    };


    return {
        init: init,
        colourPicker: colourPicker
    }

})();