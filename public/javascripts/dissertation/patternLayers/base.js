let utility = require('../utility.js');
let Stats = require('../Stats.js');
let numbers = require('numbers');
let Rainbow = require('rainbowvis.js');

module.exports = function(){
let module = {};
//init -----------------------------------------------------
const CANVAS_ID = "base-layer";
let canvas = document.getElementById(CANVAS_ID);
let width = canvas.clientWidth;
let height = canvas.clientHeight;
let ctx = canvas.getContext("2d");

module.colourScheme1 = ["#6bbbbf", "#2a545a" ];
module.colourScheme2 = ["#c5d8d2", "#696970" ];

let rainbow = new Rainbow();
rainbow.setNumberRange(0, 100);
module.draw = function() {
  let colourSchemeIndex = Math.random();
  let colourScheme;
  if(colourSchemeIndex < 0.65){
    colourScheme = module.colourScheme1;
  }
  else colourScheme = module.colourScheme2;
  rainbow.setSpectrum(...colourScheme);
  let colourRandomizer = Math.round(Math.random() * 100);
  let colour = "#" + rainbow.colourAt(colourRandomizer);

  ctx.fillStyle = colour;
  ctx.fillRect(0,0,width, height);
};

return module;
};

// module.COLOUR_SCHEME_1 = {
//     base: ["#6bbbbf", "#57b9bf"],
//     baseOverlay: ["#c0d282","#cdea6c"]
// };
//
// module.COLOUR_SCHEME_2 = {
//     base: ["#fcefdf"],
//     baseOverlay: ["#9a8f7e","#a29279"]
// };
//
// module.colourScheme = module.COLOUR_SCHEME_1["baseOverlay"];
//
// module.dataRangeParams = {
//     muX: [width / 8.5, width / 1.4 ],
//     muY: [height * 0.1, height * 0.5],
//     varianceX: [width / 2 * 0.1, width / 2 * 0.3],
//     varianceY: [height / 11 , height / 7],
//     numPoints: [140, 170]
// };
//
// module.variogramRangeParams = {
//     range: [40, 60],
//     sill: [200, 280],
//     nugget: [100, 105],
//     alpha: 0.05,
//     variogramModel: "gaussian",
//     newVariogram: true,
//     drawRadius: 2,
//     threshold: 80
// };
//
// module.dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.dataRangeParams);
// //generate data from Stats
// module.data = Stats.generateData(module.dataParams);
//
// module.variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.variogramRangeParams);
