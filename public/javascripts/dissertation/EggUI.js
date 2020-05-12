
module.exports = function(){

let module = {};

module.test = function(){console.log("Egg UI test ")}


module.addBaseOverlayRangeSlider = function(){
    let slider1 = new Slider("range", 1, 100, 25, 1,
        EggTexture.setBaseOverlayRange);
    let baseParamContainer = document.getElementById("base-param");
    baseParamContainer.appendChild(slider1.container);
};

return module;
};





