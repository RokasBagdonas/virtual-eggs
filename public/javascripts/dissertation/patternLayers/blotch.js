let utility = require('../utility.js');
let rainbow = require('rainbowvis.js');
let Stats = require('../Stats.js');

module.exports = function(){
let module = {};

//init-----------------------------------------------------
const CANVAS_ID_1 = "small-blotch";
let canvas = document.getElementById(CANVAS_ID_1);
let width = canvas.clientWidth;
let height = canvas.clientHeight;
let ctx = canvas.getContext("2d");


const COLOUR_SCHEME_1 = ["#1f302e", "#111414"];
const COLOUR_SCHEME_2 = ["#eaa28b", "#8e4312"];
module.colourScheme = COLOUR_SCHEME_1;

let colourPicker = new rainbow();
colourPicker.setNumberRange(-100, 100);
colourPicker.setSpectrum(module.colourScheme[0], module.colourScheme[1]);


module.dataRangeParams = {
    muX: [width / 8, width / 1.42],
    muY: [height / 8, height / 1.42],
    varianceX: [width / 7.3, width / 7.8],
    varianceY: [height / 7.3, height / 8],
    numPoints: [140, 180]
};

module.variogramRangeParams = {
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

    module.variogramParams = {
        range: 10,
        sill: 250,
        nugget: 10,
        alpha: 1,
        variogramModel: "gaussian",
        newVariogram: true,
        useAlpha: false,
        drawRadius: 2,
        threshold: 80
    };

module.dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.dataRangeParams);
// module.variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.variogramRangeParams);




module.draw_small_blotch = function() {
    ctx.clearRect(0,0,width, height);
    let data = Stats.generateData(module.dataParams);
    Stats.plotVariogram(ctx, width, height, data, module.variogramParams, colourPicker);
};


return module;
};
