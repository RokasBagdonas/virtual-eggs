let rainbow = require('rainbowvis.js');
let Stats = require('../Stats.js');
module.exports = function(){
let module = {};
console.log("pepper plot init");
//init -----------------------------------------------------
const CANVAS_ID = "pepper-plot";
let canvas = document.getElementById(CANVAS_ID);
let width = canvas.clientWidth;
let height = canvas.clientHeight;
let ctx = canvas.getContext("2d");


module.parameters = {
    numPoints: 160,
    muX: width / 2,
    muY: height / 2,
    varianceX: width / 5,
    varianceY: height / 4
};



module.colourScheme = ['#4b555e', '#222426'];

let colourPicker = new rainbow();
colourPicker.setNumberRange(0, 100);
colourPicker.setSpectrum(module.colourScheme[0], module.colourScheme[1]);


module.draw = function(){
    Stats.plotPoints(ctx, Stats.generateData(module.parameters), colourPicker );
};
window.draw = module.draw;




return module;
};