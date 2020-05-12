
let Slider = require('Slider.js');
let streaks = require('patternLayers/streaks.js');
let EggTexture = require('EggTexture.js');
module.exports = {

    initStreaksUI: {
      //1. create sliders.
      //1.1 Scrawl
      let test = new Slider('slider-scrawl',
          streaks.ui_params.thickness_min, streaks.ui_params.thickness_max,
          streaks.ui_params.thickness_default, streaks.ui_params.thickness_step, EggTexture. )

        //1.2 shorthand.

      //2. create checkboxes.


    },

    initBlotchesUI: {

    },

    initOtherUI: {

    },

    init: {

    }


};

// module.exports = function(){
//
// let module = {};
//
// module.test = function(){console.log("Egg UI test ")};
//
// module.addBaseOverlayRangeSlider = function(){
//     let slider1 = new Slider("range", 1, 100, 25, 1,
//         EggTexture.setBaseOverlayRange);
//     let baseParamContainer = document.getElementById("base-param");
//     baseParamContainer.appendChild(slider1.container);
// };
//
// return module;
// };






