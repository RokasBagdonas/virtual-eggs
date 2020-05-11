let Rainbow = require('rainbowvis.js');
let Stats = require('../Stats.js');
let numbers = require('numbers');
module.exports = function(){
    let module = {};
console.log("streaks init");
//init -----------------------------------------------------
//scrawl
const CANVAS_ID_1 = "scrawl";
let canvas_scrawl = document.getElementById(CANVAS_ID_1);
let width_scrawl = canvas_scrawl.clientWidth;
let height_scrawl = canvas_scrawl.clientHeight;
let ctx_scrawl = canvas_scrawl.getContext("2d");

//shorthand
const CANVAS_ID_2 = "shorthand";
let canvas_shorthand = document.getElementById(CANVAS_ID_2);
let width_shorthand = canvas_shorthand.clientWidth;
let height_shorthand = canvas_shorthand.clientHeight;
let ctx_shorthand = canvas_shorthand.getContext("2d");

let streaks_bounds1 = {
    top_left:     {x: 0, y: 0},
    bottom_left:  {x: 0, y: height_scrawl * 0.6},
    top_right:    {x: width_scrawl, y: 0},
    bottom_right: {x: width_scrawl, y: height_scrawl * 0.6 }
};

let streak_bounds_default =  {
    top_left:     {x: 0, y: 0},
    bottom_left:  {x: 0, y: height_scrawl },
    top_right:    {x: width_scrawl, y: 0},
    bottom_right: {x: width_scrawl, y: height_scrawl }
    };

module.colourScheme = ['#73739c', '#222426'];

let colourPicker = new Rainbow();
colourPicker.setNumberRange(-10, 10);
colourPicker.setSpectrum(module.colourScheme[0], module.colourScheme[1]);

module.draw = function(){
    module.drawScrawl();
    module.drawShorthand();
};

module.scrawl_params = {
    octave_1: {
        period_x: 1 / 30,
        period_y: 1 / 30
    },
    octave_2: {
        period_x: 1 / 25,
        period_y: 1 / 40
    }
};

module.shorthand_params = {
    octave_1: {
        period_x: 1 / 10,
        period_y: 1 / 10
    },
    octave_2: {
        period_x: 1 / 25,
        period_y: 1 / 40
    }
};

module.drawScrawl = function(){
    drawStreaks(ctx_scrawl, module.scrawl_params.octave_1, module.scrawl_params.octave_2);
    drawMask(ctx_scrawl);
};

module.drawShorthand = function(){
    drawStreaks(ctx_shorthand, module.shorthand_params.octave_1, module.shorthand_params.octave_2);
    drawMask(ctx_shorthand);

};




function drawStreaks(ctx, octave_1, octave_2, thickness=10, seed=Math.random()){
    let perlin_value;
    let o_1;
    let o_2;
    let n = new Noise(seed);
    let drawing_area = streak_bounds_default;
    let perlin_scalar = 210;

    for(let x = drawing_area.top_left.x; x < drawing_area.top_right.x; x++){

        for(let y = drawing_area.top_left.y; y < drawing_area.bottom_right.y; y++){

            o_1 = n.perlin2(x * octave_1.period_x, y * octave_1.period_y);
            o_2 = n.perlin2(x * octave_2.period_x, y * octave_2.period_y);

            perlin_value = Math.abs(o_1 + o_2) * perlin_scalar;

            if(perlin_value < thickness){
                ctx.beginPath();
                ctx.fillStyle = '#' + colourPicker.colourAt(perlin_value);
                ctx.arc(x,y,1,0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

}

//used for splitting perlin noise into separate streaks.
    const drawMask = function(ctx_scrawl){
        let interval = [10, 20];
        let stripe_thickness = 7; //pixels
        let num_of_intervals = Math.floor(numbers.random.sample(interval[0], interval[1], 1)[0]);

        //y
        for(let y = 0; y < height_scrawl; y += stripe_thickness + height_scrawl / num_of_intervals){
            ctx_scrawl.clearRect(0, y, width_scrawl, stripe_thickness);
        }

        //x
        // for(let x = 0; x < width_scrawl; x += stripe_thickness + width_scrawl / num_of_intervals ){
        //     ctx_scrawl.clearRect(x, 0, stripe_thickness, height_scrawl );
        // }
    };

    return module;
};

