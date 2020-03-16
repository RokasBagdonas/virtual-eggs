let EggUI = (function(){

    const init = function(){
        setupSpotsSlider();
        setupSubmit();
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

    return {
        init: init
    }

})();