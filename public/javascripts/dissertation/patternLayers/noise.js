let utility = require('../utility.js');
let Stats = require('../Stats.js');

let width, height; //to be set in init()
let data; //3D data
let dataParams;
let variogramParams; //actual variogram params, post generated

const COLOUR_SCHEME_1 = {
    noise1: ["#21233b", "#333b39"]
};

const COLOUR_SCHEME_2 = {
    noise1: ["#926a60", "#b96c50"]
};

const variogramRangeParams = {
    range: [2, 5],
    sill: [38, 50],
    nugget: [100, 102], //TODO: adjust with regards to range?
    alpha: 0.7,
    variogramModel: "gaussian",
    newVariogram: true,
    drawRadius: 0.6,
    threshold: 100
};


const dataRangeParams = {
    muX: [],
    muY: [],
    varianceX: [],
    varianceY: [],
    numPoints: []
};

dataRangeParams.muX = [width / 1.8, width / 2.5 ];
dataRangeParams.muY = [height / 1.8, height / 2.5];
dataRangeParams.varianceX = [width / 1.8, width / 2.5];
dataRangeParams.varianceY = [height / 1.8 , height / 2.5];
dataRangeParams.numPoints = [200, 300];

dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, dataRangeParams);
//generate data from Stats
data = Stats.generateData(dataParams);

variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, variogramRangeParams);

const init = function(w, h){
    width = w;
    height = h;
    // dataRangeParams.muX = [width / 1.8, width / 2.5 ];
    // dataRangeParams.muY = [height / 1.8, height / 2.5];
    // dataRangeParams.varianceX = [width / 1.8, width / 2.5];
    // dataRangeParams.varianceY = [height / 1.8 , height / 2.5];
    // dataRangeParams.numPoints = [200, 300];
    //
    // dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, dataRangeParams);
    // //generate data from Stats
    // data = Stats.generateData(dataParams);
    //
    // variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, variogramRangeParams);
};



module.exports = {
    init: init,
    COLOUR_SCHEME_1: COLOUR_SCHEME_1,
    COLOUR_SCHEME_2: COLOUR_SCHEME_2,
    dataRangeParams: dataRangeParams,
    dataParams: dataParams,
    variogramRangeParams: variogramRangeParams,
    variogramParams: variogramParams,
    data: data
};