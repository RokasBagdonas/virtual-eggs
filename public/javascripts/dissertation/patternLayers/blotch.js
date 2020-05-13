let utility = require('../utility.js');
let rainbow = require('rainbowvis.js');
let Stats = require('../Stats.js');

module.exports = {

//init-----------------------------------------------------
CANVAS_ID_1 : "small-blotch",
canvas : undefined,
width : undefined,
height : undefined,
ctx : undefined,


COLOUR_SCHEME_1 : ["#1f302e", "#111414"],
COLOUR_SCHEME_2 : ["#eaa28b", "#8e4312"],

colourPicker : new rainbow(),

dataRangeParams : undefined,
variogramRangeParams : {
    range: [50, 90],
    sill: [250, 330],
    nugget: [80, 90],
    alpha: 1,
    variogramModel: "gaussian",
    newVariogram: true,
    useAlpha: false,
    drawRadius: 3,
    threshold: 1
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

dataParams : undefined,
// module.variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.variogramRangeParams);

init: function(){
    this.CANVAS_ID_1 = "small-blotch";
    this.canvas = document.getElementById(this.CANVAS_ID_1);
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.ctx = this.canvas.getContext("2d");

    this.colourScheme = this.COLOUR_SCHEME_1;
    this.colourPicker.setNumberRange(-100, 100);
    this.colourPicker.setSpectrum(this.colourScheme[0], this.colourScheme[1]);


    this.dataRangeParams = {
        muX: [this.width / 8, this.width / 1.42],
        muY: [this.height / 8, this.height / 1.42],
        varianceX: [this.width / 7.3, this.width / 7.8],
        varianceY: [this.height / 7.3, this.height / 8],
        numPoints: [140, 180]
    };

    this.variogramRangeParams = {
        range: [50, 90],
        sill: [250, 330],
        nugget: [80, 90],
        alpha: 1,
        variogramModel: "gaussian",
        newVariogram: true,
        useAlpha: false,
        drawRadius: 3,
        threshold: 1
    };

    this.dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, this.dataRangeParams);

},



draw_small_blotch : function() {
    blotch.ctx.clearRect(0,0,this.width, this.height);
    let data = Stats.generateData(this.dataParams);
    Stats.plotVariogram(this.ctx, this.width, this.height, data, this.variogramParams, this.colourPicker);
},


};
module.exports.init();
window.blotch = module.exports;