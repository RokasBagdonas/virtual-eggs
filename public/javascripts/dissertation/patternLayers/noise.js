let utility = require('../utility.js');
let Stats = require('../Stats.js');

module.exports = function(width, height){
let module = {};

module.COLOUR_SCHEME_1 = {
    noise1: ["#21233b", "#333b39"]
};

module.COLOUR_SCHEME_2 = {
    noise1: ["#926a60", "#b96c50"]
};

module.colourScheme = module.COLOUR_SCHEME_1["noise1"];

module.variogramRangeParams = {
    range: [2, 5],
    sill: [38, 50],
    nugget: [100, 102], //TODO: adjust with regards to range?
    alpha: 0.7,
    variogramModel: "gaussian",
    newVariogram: true,
    drawRadius: 0.6,
    threshold: 100
};


module.dataRangeParams = {
    muX: [width / 1.8, width / 2.5 ],
    muY: [height / 1.8, height / 2.5],
    varianceX: [width / 1.8, width / 2.5],
    varianceY: [height / 1.8 , height / 2.5],
    numPoints: [200, 300]
};

module.dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.dataRangeParams);
//generate data from Stats
module.data = Stats.generateData(module.dataParams);

module.variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.variogramRangeParams);


return module;
};

