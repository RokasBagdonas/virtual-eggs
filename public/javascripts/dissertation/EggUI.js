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

    const init = function(){
        setupSpotsSlider();
        setupSubmit();
        setupGeneratePoints();
        setupSpatiallyCorrelatedField();
    }

    const setupSpotsSlider = function(){
        let slider = document.getElementById("spots-slider");
        slider.max = EggTexture.getMAX_SPOTS();
        slider.value = EggTexture.getMAX_SPOTS();

        slider.onchange = (event) => {
            console.log("slider event");
            EggTexture.setParamSpots(parseInt(event.target.value, 10));
        }
    }

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
    }

    const setupSpatiallyCorrelatedField = function () {
        let btn = document.getElementById("correlate-button");
        btn.onclick = (event) =>{
            Stats.plotSpatiallyCorrelatedField();
        }

    }


    return {
        init: init
    }

})();