let width, height; //to be set in init()

const init = function(w, h){
    width = w;
    height = h;
    dataRangeParams.muX = [width / 8.5, width / 1.4 ];
    dataRangeParams.muY = [height * 0.1, height * 0.5];
    dataRangeParams.varianceX = [width / 2 * 0.1, width / 2 * 0.3];
    dataRangeParams.varianceY = [height / 11 , height / 7];
    dataRangeParams.numPoints = [140, 170];

};

const COLOUR_SCHEME_1 = {
    base: ["#6bbbbf", "#57b9bf"],
    baseOverlay: ["#c0d282","#cdea6c"]
};

const COLOUR_SCHEME_2 = {
    base: ["#fcefdf"],
    baseOverlay: ["#9a8f7e","#a29279"]
};

const dataRangeParams = {
    muX: [],
    muY: [],
    varianceX: 0,
    varianceY: 0,
    numPoints: []
};

const variogramRangeParams = {
    range: [40, 60],
    sill: [200, 280],
    nugget: [100, 105],
    alpha: 0.05,
    variogramModel: "gaussian",
    newVariogram: true,
    drawRadius: 2,
    threshold: 80
};


/**
 * @param {CanvasRenderingContext2D} ctx2D
 * @param {String} baseColour hex colour codes
 */
const paintBaseLayer = function(ctx2D, baseColour = COLOUR_SCHEME_1.base[0]){
    ctx2D.fillStyle = baseColour;
    ctx2D.fillRect(0,0, width, height);
};

/**
 * Usually appears either at the tip or in the middle. Refers to dirt, or yellow marks (urine?)
 * @param {CanvasRenderingContext2D} ctx2D
 * @param {Array} colourRange hex colour codes
 */
const paintBaseOverlayLayer = function(ctx2D, colourRange = COLOUR_SCHEME_1.baseOverlay){
    ctx2D.clearRect(0,0, width, height);
    //0.TODO define a function that picks a coordinate space where the base overlay should be placed
    //1. generate data points to be used for kriging
    //1.1 get concrete dataRangeParams
    let dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, dataRangeParams);
    //1.2 generate data
    Stats.generateData(dataParams);

    //2. create Rainbow instance to be used for drawing
    let colourScheme = new Rainbow();
    colourScheme.setNumberRange(Stats.MIN_HEIGHT, Stats.MAX_HEIGHT);
    colourScheme.setSpectrum(...COLOUR_SCHEME_1.baseOverlay);

    //3. correlate points and draw them on canvas
    //3.1 get Concrete variogramRangeParams values
    console.log(variogramRangeParams);
    let variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, variogramRangeParams);

    //3.2 draw variogram
    Stats.plotVariogram(ctx2D, variogramParams, colourScheme);
};


module.exports = {
    init: init,
    // paintBaseLayer: paintBaseLayer,
    // paintBaseOverlayLayer: paintBaseOverlayLayer,
    COLOUR_SCHEME_1: COLOUR_SCHEME_1,
    COLOUR_SCHEME_2: COLOUR_SCHEME_2,
    dataRangeParams: dataRangeParams,
    variogramRangeParams: variogramRangeParams
};
