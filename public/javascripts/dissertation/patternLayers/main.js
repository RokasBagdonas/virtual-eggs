let width, height; //to be set in init()




const init = function(w, h){
  width = w;
  height = h;
  bigBlobsParams.dataRangeParams.muX = [w / 8, w / 1.42];
  bigBlobsParams.dataRangeParams.muY = [h / 8, h / 1.42];
  bigBlobsParams.dataRangeParams.varianceX = [w / 7.3, w / 7.8];
  bigBlobsParams.dataRangeParams.varianceY = [h / 7.3, h / 8];
  bigBlobsParams.dataRangeParams.numPoints = [140, 180];
};



//big blobs
const bigBlobsParams = {
    dataRangeParams : {
        muX: [],
        muY: [],
        varianceX: [],
        varianceY: [],
        numPoints: []
    },
    variogramRangeParams : {
        range: [50, 90],
        sill: [250, 330],
        nugget: [80, 90],
        alpha: 1,
        variogramModel: "gaussian",
        newVariogram: true,
        drawRadius: 3,
        threshold: 90
    },

    COLOUR_SCHEME_1 : ["#786e6f", "#8d675c"]

};


const drawStreaks1 = function(ctx2D, width, height){
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

module.exports = {
    init: init,
    bigBlobsParams: bigBlobsParams
}

