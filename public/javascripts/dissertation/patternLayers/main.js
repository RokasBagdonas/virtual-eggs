let utility = require('../utility.js');
let Stats = require('../Stats.js');
//big blobs
module.exports = function(width, height){
let module = {};

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
    drawRadius: 3,
    threshold: 90
};

module.COLOUR_SCHEME_1 = ["#786e6f", "#8d675c"];
    

module.dataParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.dataRangeParams);
//generate data from Stats
module.data = Stats.generateData(module.dataParams);

module.variogramParams = utility.mapFuncToObjProps(utility.getNumberInRange, module.variogramRangeParams);


//pattern 2. TODO: Port to main-streaks.js
drawStreaks1 = function(ctx2D, width, height){
    let value;
    let colourPicker = new Rainbow();
    colourPicker.setSpectrum("#323135","#e0dbe7");
    colourPicker.setNumberRange(-10,10);
    let yRange = [0, height];

    let n = new Noise(Math.random());
    for(let x = 0; x < width; x++){
        // let yLength = numbers.random.sample(yRange[0], yRange[1];
        for(let y = 0; y < height; y++){
            // if()
            value = Math.abs((n.perlin2(x / 50,y / 50)) + (n.perlin2(x / 25 ,y / 40))) * 256;
            if(value < 10){
                ctx2D.beginPath();
                ctx2D.fillStyle = "#" + colourPicker.colourAt(value);
                ctx2D.arc(x,y,1,0, Math.PI * 2);
                ctx2D.fill();
            }

        }
    }

};


return module;

};

