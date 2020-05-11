let Rainbow = require('rainbowvis.js');
let Stats = require('../Stats.js');
let numbers = require('numbers');
module.exports = function(){
    let module = {};
    console.log("scrawl init");
//init -----------------------------------------------------
const CANVAS_ID = "scrawl";
let canvas = document.getElementById(CANVAS_ID);
let width = canvas.clientWidth;
let height = canvas.clientHeight;
let ctx = canvas.getContext("2d");



let streaks_bounds1 = {
    top_left:     {x: 0, y: 0},
    bottom_left:  {x: 0, y: height * 0.6},
    top_right:    {x: width, y: 0},
    bottom_right: {x: width, y: height * 0.6 }
};

let streak_bounds_default =  {
    top_left:     {x: 0, y: 0},
    bottom_left:  {x: 0, y: height },
    top_right:    {x: width, y: 0},
    bottom_right: {x: width, y: height }
    };

module.colourScheme = ['#73739c', '#222426'];

let colourPicker = new Rainbow();
colourPicker.setNumberRange(-10, 10);
colourPicker.setSpectrum(module.colourScheme[0], module.colourScheme[1]);

module.draw = function(){
    drawScrawl();
    // drawMask(ctx);
    // drawStreaks1();
};

//used for splitting perlin noise into separate streaks.
const drawMask = function(ctx){
    let interval = [10, 20];
    let stripe_thickness = 7; //pixels
    let num_of_intervals = Math.floor(numbers.random.sample(interval[0], interval[1], 1)[0]);

    //y
    for(let y = 0; y < height; y += stripe_thickness + height / num_of_intervals){
        ctx.clearRect(0, y, width, stripe_thickness);
    }

    //x
    // for(let x = 0; x < width; x += stripe_thickness + width / num_of_intervals ){
    //     ctx.clearRect(x, 0, stripe_thickness, height );
    // }
};

const drawScrawl = function(){
    let final_value;
    let octave_1;
    let octave_2;
    // let n = new Noise(Math.random());
    let n = new Noise(0.5);
    let drawing_area = streak_bounds_default;

    //scale
    let octave_1_period_x = 1 / 30;
    let octave_1_period_y = 1 / 30;

    //direction and scale
    let octave_2_period_x = 1 / 25;
    let octave_2_period_y = 1 / 40;
    let thickness = 210;
    let threshold = 10;

    for(let x = drawing_area.top_left.x; x < drawing_area.top_right.x; x++){

        for(let y = drawing_area.top_left.y; y < drawing_area.bottom_right.y; y++){

            // perlin_value = Math.abs((n.perlin2(x / 50, y / 50)) + (n.perlin2(x / 25, y / 40))) * 256;
            octave_1 = n.perlin2(x * octave_1_period_x, y * octave_1_period_y);
            octave_2 = n.perlin2(x * octave_2_period_x, y * octave_2_period_y);

            perlin_value = Math.abs(octave_1 + octave_2) * thickness;
            if(perlin_value < threshold){
                ctx.beginPath();
                ctx.fillStyle = '#' + colourPicker.colourAt(perlin_value);
                ctx.arc(x,y,1,0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
};

const drawShorthand = function(){
    let final_value;
    let octave_1;
    let octave_2;
    // let n = new Noise(Math.random());
    let n = new Noise(0.5);
    let drawing_area = streak_bounds_default;

    //scale
    let octave_1_period_x = 1 / 30;
    let octave_1_period_y = 1 / 30;

    //direction and scale
    let octave_2_period_x = 1 / 25;
    let octave_2_period_y = 1 / 40;
    let thickness = 210;
    let threshold = 10;

    for(let x = drawing_area.top_left.x; x < drawing_area.top_right.x; x++){

        for(let y = drawing_area.top_left.y; y < drawing_area.bottom_right.y; y++){

            // perlin_value = Math.abs((n.perlin2(x / 50, y / 50)) + (n.perlin2(x / 25, y / 40))) * 256;
            octave_1 = n.perlin2(x * octave_1_period_x, y * octave_1_period_y);
            octave_2 = n.perlin2(x * octave_2_period_x, y * octave_2_period_y);

            perlin_value = Math.abs(octave_1 + octave_2) * thickness;
            if(perlin_value < threshold){
                ctx.beginPath();
                ctx.fillStyle = '#' + colourPicker.colourAt(perlin_value);
                ctx.arc(x,y,1,0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
};


//shorthand
//    value = Math.abs((n.perlin2(x / 50, y / 50)) + (n.perlin2(x / 12, y / 20))) * 256;





    return module;
};
window.scrawl = module.exports;

