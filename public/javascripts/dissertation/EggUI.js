let Slider = require('./Slider.js');
let streaks = require('./patternLayers/streaks.js');
let blotch = require('./patternLayers/blotch.js');
let EggTexture = require('./EggTexture.js');

module.exports = {

    streaks_container : document.getElementById("streaks-container"),
    scrawl_container: document.getElementById("scrawl-container"),
    shorthand_container: document.getElementById("shorthand-container"),
    blotches_container: document.getElementById('blotches-container'),
    black_cap_container: document.getElementById('black-cap-container'),
    other_container: document.getElementById('other-container'),
    general_container: document.getElementById('general-container'),


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
            streaks.scale_scrawl_periods
        );

        this.scrawl_container.appendChild(scrawl_thickness.container);
        this.scrawl_container.appendChild(scrawl_octaves.container);


        //1.2 shorthand
        let shorthand_thickness = new Slider('shorthand thickness',
            streaks.ui_params.thickness_min, streaks.ui_params.thickness_max,
            streaks.ui_params.thickness_default, streaks.ui_params.thickness_step,
            streaks.scale_shorthand_thickness
        );

        let shorthand_octaves = new Slider('shorthand octaves',
            streaks.ui_params.period_min, streaks.ui_params.period_max,
            streaks.ui_params.shorthand_period_scalar, streaks.ui_params.period_step,
            streaks.scale_shorthand_periods
        );

        this.shorthand_container.appendChild(shorthand_thickness.container);
        this.shorthand_container.appendChild(shorthand_octaves.container);

    },

    initBlotchesUI: function(){
        //1. sliders
        //small blotches ------------------------
        let small_blotch_range = new Slider("small blotch range",
            blotch.ui_params.range_min, blotch.ui_params.range_max,
            blotch.small_blotch_params.variogramParams.range, blotch.small_blotch_params.variogramParams.range_step,
            blotch.change_small_blotch_range
        );
        this.blotches_container.appendChild(small_blotch_range.container);

        //black cap -----------------------------
        let black_cap_range = new Slider("black cap range",
            blotch.ui_params.range_min, blotch.ui_params.range_max,
            blotch.black_cap_params.variogramParams.range, blotch.black_cap_params.variogramParams.range_step,
            blotch.change_black_cap_range
        );
        this.black_cap_container.appendChild(black_cap_range.container);

        let black_cap_muY = new Slider("black cap location",
            blotch.black_cap_params.ui_params.muY_min, blotch.black_cap_params.ui_params.muY_max,
            blotch.black_cap_params.dataParams.muY, blotch.black_cap_params.ui_params.muY_step,
            blotch.change_black_cap_location
        );
        this.black_cap_container.appendChild(black_cap_muY.container);


    },

    initOtherUI: function(){
        let reapply_button = document.createElement("input");
        reapply_button.setAttribute("type", "button");
        reapply_button.setAttribute("value", "reapply textures");
        reapply_button.onclick = (e) => {EggTexture.combineTextures()};
        this.general_container.appendChild(reapply_button);
    },

    init: function(){
        this.initStreaksUI();
        this.initBlotchesUI();
        this.initOtherUI();
    },


    create_event_button: function(name, eventCallback) {
        let button = document.createElement("input");
        button.setAttribute("type", "button");
        button.setAttribute("id", name + "-button");
        button.setAttribute("value", name);
        button.onclick = eventCallback;
        return button;
    },


};






