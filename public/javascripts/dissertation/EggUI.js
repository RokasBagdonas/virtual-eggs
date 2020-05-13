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
        let scrawl_thickness = new Slider('scrawl thickness',
            streaks.ui_params.thickness_min, streaks.ui_params.thickness_max,
            streaks.ui_params.thickness_default, streaks.ui_params.thickness_step,
            streaks.scale_scrawl_thickness
        );
        let scrawl_octaves = new Slider('scrawl octaves',
            streaks.ui_params.period_min, streaks.ui_params.period_max,
            streaks.ui_params.scrawl_period_scalar, streaks.ui_params.period_step,
            streaks.scale_scrawl_periods);

        this.streaks_container.appendChild(scrawl_thickness.container);
        this.streaks_container.appendChild(scrawl_octaves.container);

        //1.2 shorthand
        let shorthand_thickness = new Slider('shorthand thickness',
            streaks.ui_params.thickness_min, streaks.ui_params.thickness_max,
            streaks.ui_params.thickness_default, streaks.ui_params.thickness_step,
            streaks.scale_shorthand_thickness
        );
        let shorthand_octaves = new Slider('shorthand octaves',
            streaks.ui_params.period_min, streaks.ui_params.period_max,
            streaks.ui_params.shorthand_period_scalar, streaks.ui_params.period_step,
            streaks.scale_shorthand_periods);

        this.streaks_container.appendChild(shorthand_thickness.container);
        this.streaks_container.appendChild(shorthand_octaves.container);
        //2. create checkboxes.

        //3. reapply textures
        let reapply_button = document.createElement("input");
        reapply_button.setAttribute("type", "button");
        reapply_button.setAttribute("value", "reapply streaks");
        reapply_button.onclick = (e) => {EggTexture.combineTextures()};
        this.streaks_container.appendChild(reapply_button);

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






