let Slider = require('./Slider.js');
let streaks = require('./patternLayers/streaks.js');
let EggTexture = require('./EggTexture.js');

module.exports = {

    streaks_container : document.getElementById("streaks-container"),
    blotches_container: document.getElementById('blotches-container'),
    other_container: document.getElementById('other-container'),

    initStreaksUI: function(){
        //1. create sliders.
      //1.1 Scrawl
        console.log("ewgg ui: " + streaks.scrawl_params.thickness);
      let test = new Slider('scrawl thickness',
          streaks.ui_params.thickness_min, streaks.ui_params.thickness_max,
          streaks.ui_params.thickness_default, streaks.ui_params.thickness_step,
          streaks.scale_scrawl_thickness
      );

      this.streaks_container.appendChild(test.container);


      //1.2 shorthand

      //2. create checkboxes.

        //3. reapply textures


    },

    initBlotchesUI: function(){

    },

    initOtherUI: function(){

    },

    init: function(){
        this.initStreaksUI();
    },


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






