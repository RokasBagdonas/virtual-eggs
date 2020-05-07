// const noise = require('noisejs');
const rainbow = require('rainbowvis.js');
/**
 * Perlin noise: given a coordinate, it produces a semi random number that is related to the following numbers.
 *
 */
module.exports  = function(width, height){
let module = {};

let perlinCanvas = document.getElementById("perlin-layer");
let ctx = perlinCanvas.getContext("2d");

const perlinNoise = new Noise(152);

let rainbow = new Rainbow(); rainbow.setNumberRange(-100,100);
rainbow.setSpectrum("#c9c0a7", "#36322a");

module.run = function(){
    //setup
    ctx.fillStyle = "#faeddc";
    ctx.fillRect(0,0,256,256);

    //test
    ctx.fillStyle = "#000000";
    let value = 0; //init
    const threshold = 25;
    const octaves = 1;
    const persistence = 1;
    const boundX = [20, 100];
    const boundY = [12, 100];
    for(let x = boundX[0]; x < boundX[1]; x++){
        for(let y = boundY[0]; y < boundY[1]; y++){
            // value = perlinNoise.perlin2(x/10, y/10) * 100;
            value = octavePerlin(x/10, y/10, octaves, persistence) * 100;
            // console.log(value);
            let a = perlinNoise.simplex2(x,y);

            if(value >= threshold){
                ctx.fillStyle  = "#" + rainbow.colourAt(value);
                ctx.fillRect(x,y,1,1);
            }

        }
    }

};

    module.drawStreaks1 = function(){
        let value;
        for(let x = 0; x < width; x++){
            // let yLength = numbers.random.sample(yRange[0], yRange[1];
            for(let y = 0; y < height; y++){
                // if()
                value = Math.abs((perlinNoise.perlin2(x / 50,y / 50)) + (perlinNoise.perlin2(x / 25 ,y / 40))) * 256;
                if(value < 10){
                    ctx.beginPath();
                    ctx.fillStyle = "#" + rainbow.colourAt(value);
                    ctx.arc(x,y,1,0, Math.PI * 2);
                    ctx.fill();
                }

            }
        }

    };


//https://flafla2.github.io/2014/08/09/perlinnoise.html
    /**
     *
     * @param x
     * @param y
     * @param octaves: i exponent for persistence.
     * @param persistence amplitude = persistence^i . Defines how much influence each successive octave has. Each octave
     * has less and less influence on the final result.
     * @returns {number}
     */
function octavePerlin(x, y, octaves, persistence){
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let maxValue = 0; //used for normalising the result (0.0 - 1.0)
    for(let i = 0; i < octaves; i++){
        total += perlinNoise.perlin2(x*frequency,y*frequency) * amplitude;

        maxValue += amplitude;
        amplitude *= persistence;
        frequency *= 2;
    }
    return total/maxValue;
}

return module;


};
