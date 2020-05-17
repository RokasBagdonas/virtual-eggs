let utility = require('../utility.js');
let Rainbow = require('Rainbowvis.js');
let Stats = require('../Stats.js');

module.exports = {

//init-----------------------------------------------------
CANVAS_ID_SMALL_BLOTCH : "small-blotch",
CANVAS_ID_BIG_BLOTCH : "big-blotch",
CANVAS_ID_BLACK_CAP : "black-cap",

canvas : undefined,
width : undefined,
height : undefined,
ctx : undefined,


COLOUR_SCHEME_1 : ["#1f302e", "#111414"],
COLOUR_SCHEME_2 : ["#eaa28b", "#8e4312"],

colourPicker : new Rainbow(),


ui_params: {
    range_min: 1,
    range_max: 50,
    range_step: 0.5,
    sill_min: 50,
    sill_max: 200, //cannot be larger than ctx
    sill_step: 1,
    nugget_min: 1,
    nugget_max: 50,
    variogram_models: ['gaussian', 'exponential', 'spherical'],
    draw_radius_min: 1,
    draw_radius_max: 5,
    threshold_min: 10,
    threshold_max: 120
},


//v1 0 big blotches
// module.variogramParams = {
//     range: 20,
//     sill: 250,
//     nugget: 10,
//     alpha: 1,
//     variogramModel: "gaussian",
//     newVariogram: true,
//     useAlpha: false,
//     drawRadius: 2,
//     threshold: 80
// };

black_cap_params: {
    dataRangeParams: undefined,
    dataParams : undefined,
    data : undefined,
    ctx : undefined,

    variogramParams: {
        range: 20,
        sill: 230,
        nugget: 10,
        alpha: 1,
        variogramModel: "gaussian",
        newVariogram: true,
        useAlpha: false,
        drawRadius: 3,
        threshold: 80
    },

    testData: undefined
},



small_blotch_params: {

    //depends on the canvas size -> defined in init()
    dataRangeParams : undefined,
    dataParams : undefined,
    data: undefined, //3D data to train variogram model.
    ctx: undefined,

    variogramParams : {
        range: 10,
        sill: 250,
        nugget: 10,
        alpha: 1,
        variogramModel: "gaussian",
        newVariogram: true,
        useAlpha: false,
        drawRadius: 2,
        threshold: 80
    },
    testData: undefined,


},

big_blotch_params: {
    //depends on the canvas size -> defined in init()
    dataRangeParams : undefined,
    dataParams : undefined,
    data: undefined, //3D data to train variogram
    ctx: undefined,

    variogramParams : {
    range: 100,
    sill: 250,
    nugget: 5,
    alpha: 1,
    variogramModel: "gaussian",
    newVariogram: true,
    useAlpha: false,
    drawRadius: 2,
    threshold: 80
    },

    testData: undefined,
},


change_small_blotch_range : function(newRange, interactive = false, newVariogram = false){
    blotch.small_blotch_params.variogramParams.range = newRange;
    blotch.small_blotch_params.variogramParams.newVariogram = newVariogram;
    if(interactive){
        blotch.draw_small_blotch();
    }
},


init: function(){
    // this.CANVAS_ID_SMALL_BLOTCH = "small-blotch";
    this.canvas = document.getElementById(this.CANVAS_ID_SMALL_BLOTCH);

    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.small_blotch_params.ctx = this.canvas.getContext("2d");

    this.colourScheme = this.COLOUR_SCHEME_1;
    this.colourPicker.setNumberRange(-100, 100);
    this.colourPicker.setSpectrum(this.colourScheme[0], this.colourScheme[1]);


    // this.canvas = document.getElementById(this.CANVAS_ID_SMALL_BLOTCH);
    this.small_blotch_params.dataRangeParams = {
        muX: [this.width / 8, this.width / 1.42],
        muY: [this.height / 8, this.height / 1.42],
        varianceX: [this.width / 7.3, this.width / 7.8],
        varianceY: [this.height / 7.3, this.height / 8],
        numPoints: [140, 180]
    };

    // this.CANVAS_ID_BIG_BLOTCH = "big-blotch";
    this.big_blotch_params.ctx = document.getElementById(this.CANVAS_ID_BIG_BLOTCH).getContext("2d");
    this.big_blotch_params.dataRangeParams = {
        muX: [this.width * 0.4, this.width * 0.6],
        muY: [this.height * 0.2, this.height * 0.4],
        varianceX: [this.width * 0.4 * 0.2 , this.width * 0.5],
        varianceY: [this.height * 0.2 , this.height * 0.35],
        numPoints: [140, 180]
    };

    this.black_cap_params.ctx = document.getElementById(this.CANVAS_ID_BLACK_CAP).getContext("2d");
    // this.black_cap_params.dataRangeParams = {
    //     muX: [this.width * 0.45, this.width * 0.55],
    //     muY: [this.height * 0.1, this.height * 0.31],
    //     varianceX: [this.width * 0.45 * 0.45 , this.width * 0.45 * 0.65],
    //     varianceY: [this.height * 0.1 * 0.6, this.height * 0.31 * 0.78],
    //     numPoints: [140, 180]
    // };

    this.black_cap_params.dataParams = {
            muX: this.width / 2,
            muY: this.height * 0.3,
            varianceX: this.width * 0.25,
            varianceY: this.height * 0.01,
            numPoints: 180
        };


    this.small_blotch_params.dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, this.small_blotch_params.dataRangeParams);
    this.small_blotch_params.data = Stats.generateData(this.small_blotch_params.dataParams);

    this.big_blotch_params.dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, this.big_blotch_params.dataRangeParams);
    this.big_blotch_params.data = Stats.generateData(this.big_blotch_params.dataParams);

    // this.black_cap_params.dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, this.black_cap_params.dataRangeParams);
    this.black_cap_params.data = Stats.generateData(this.black_cap_params.dataParams);


},


draw_small_blotch : function() {
    blotch.small_blotch_params.ctx.clearRect(0,0, blotch.width, blotch.height);

    if(blotch.small_blotch_params.variogramParams.newVariogram){
        blotch.small_blotch_params.data = Stats.generateData(blotch.small_blotch_params.dataParams);
    }
    Stats.plotVariogram(blotch.small_blotch_params.ctx, blotch.width, blotch.height, blotch.small_blotch_params.data, blotch.small_blotch_params.variogramParams, blotch.colourPicker);
},

draw_big_blotch: function(){
    blotch.big_blotch_params.ctx.clearRect(0,0, blotch.width, blotch.height);

    if(blotch.big_blotch_params.variogramParams.newVariogram){
        blotch.big_blotch_params.data = Stats.generateData(blotch.big_blotch_params.dataParams);
    }
    Stats.plotVariogram(blotch.big_blotch_params.ctx, blotch.width, blotch.height, blotch.big_blotch_params.data, blotch.big_blotch_params.variogramParams, blotch.colourPicker);
},

draw_cap: function(){
    blotch.black_cap_params.ctx.clearRect(0,0, blotch.width, blotch.height);

    if(blotch.black_cap_params.variogramParams.newVariogram){
        blotch.black_cap_params.data = Stats.generateData(blotch.black_cap_params.dataParams);
    }
    Stats.plotVariogram(blotch.black_cap_params.ctx, blotch.width, blotch.height, blotch.black_cap_params.data, blotch.black_cap_params.variogramParams, blotch.colourPicker);
},

};

module.exports.init();
window.blotch = module.exports;