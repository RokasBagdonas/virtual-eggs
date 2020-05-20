let Rainbow = require('rainbowvis.js');
let Stats = require('../Stats.js');
let numbers = require('numbers');
let utility = require('../utility.js');
module.exports = {

//scrawl-----
CANVAS_ID_1: "scrawl",
canvas_scrawl : undefined ,
width_scrawl : undefined,
height_scrawl : undefined,
ctx_scrawl : undefined,

ui_params : {
    period_min: 0.7,
    period_max: 3,
    period_step: 0.01,
    thickness_min: 0.1,
    thickness_max: 20,
    thickness_step: 0.1,
    thickness_default: 10,
    scrawl_period_scalar: 1,
    shorthand_period_scalar: 1
},

scrawl_params : {
    octave_1: {
        period_x: 1 / 30,
        period_y: 1 / 30
    },
    octave_2: {
        period_x: 1 / 25,
        period_y: 1 / 40
    },
    thickness: 10,
    seed: Math.random()
},



scale_scrawl_thickness : function(scalar, interactive = false){
    streaks.scrawl_params.thickness = scalar;
    if(interactive){
        streaks.drawScrawl(false);
    }
},

scale_scrawl_periods : function(scalar, interactive = false){
    //1. scale octaves.

    let octave_1 = {
        period_x: streaks.scrawl_params.octave_1.period_x * scalar,
        period_y: streaks.scrawl_params.octave_1.period_y * scalar
    };

    let octave_2 = {
        period_x: streaks.scrawl_params.octave_2.period_x * scalar,
        period_y: streaks.scrawl_params.octave_2.period_y * scalar
    };
    if(interactive){
        streaks.drawScrawl(false, octave_1, octave_2);
    }
},


init: function(){
    //scrawl --
    this.canvas_scrawl = document.getElementById(this.CANVAS_ID_1);
    this.width_scrawl = this.canvas_scrawl.clientWidth;
    this.height_scrawl = this.canvas_scrawl.clientHeight;
    this.ctx_scrawl = this.canvas_scrawl.getContext("2d");

    this.canvas_shorthand = document.getElementById(this.CANVAS_ID_2);
    this.width_shorthand = this.canvas_shorthand.clientWidth;
    this.height_shorthand = this.canvas_shorthand.clientHeight;
    this.ctx_shorthand = this.canvas_shorthand.getContext("2d");

    this.initColourPicker();

    this.streaks_bounds1 = {
        top_left:     {x: 0, y: 0},
        bottom_left:  {x: 0, y: this.height_scrawl * 0.6},
        top_right:    {x: this.width_scrawl, y: 0},
        bottom_right: {x: this.width_scrawl, y: this.height_scrawl * 0.6 }
    };

    this.streak_bounds_default =  {
        top_left:     {x: 0, y: 0},
        bottom_left:  {x: 0, y: this.height_scrawl },
        top_right:    {x: this.width_scrawl, y: 0},
        bottom_right: {x: this.width_scrawl, y: this.height_scrawl }
    }
},


//shorthand-----
CANVAS_ID_2:"shorthand",
canvas_shorthand: undefined,
width_shorthand : undefined,
height_shorthand : undefined,
ctx_shorthand : undefined,

shorthand_params : {
    octave_1: {
        period_x: 1 / 10,
        period_y: 1 / 10
    },
    octave_2: {
        period_x: 1 / 25,
        period_y: 1 / 40
    },
    thickness : 10,
    seed: Math.random()
},

scale_shorthand_thickness : function(scalar, interactive = false){
    streaks.shorthand_params.thickness = scalar;
    if(interactive){
        streaks.drawShorthand(false);
    }
},

scale_shorthand_periods : function(scalar, interactive = false){

    //create new octaves as we want to maintain the base octave's ratio + less sliders.
    let octave_1 = {
        period_x: streaks.shorthand_params.octave_1.period_x * scalar,
        period_y: streaks.shorthand_params.octave_1.period_y * scalar
    };

    let octave_2 = {
        period_x: streaks.shorthand_params.octave_2.period_x * scalar,
        period_y: streaks.shorthand_params.octave_2.period_y * scalar
    };
    if(interactive){
        streaks.drawShorthand(false, octave_1, octave_2);
    }
},

colourScheme : ['#73739c', '#222426'],

colourPicker : new Rainbow(),
initColourPicker: function() {
    this.colourPicker.setNumberRange(-10, 10);
    this.colourPicker.setSpectrum(this.colourScheme[0], this.colourScheme[1]);
},


streaks_bounds1 : undefined,
streak_bounds_default : undefined,


/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {period_x, period_y} octave_1 used for scale
 * @param {period_x, period_y} octave_2 scale and "stretching" direction
 * @param thickness
 * @param seed
 */
drawStreaks : function(ctx, octave_1, octave_2, thickness=10, seed=Math.random()){
    let perlin_value;
    let o_1;
    let o_2;
    let n = new Noise(seed);
    let drawing_area = this.streak_bounds_default;
    let perlin_scalar = 210;

    for(let x = drawing_area.top_left.x; x < drawing_area.top_right.x; x++){

        for(let y = drawing_area.top_left.y; y < drawing_area.bottom_right.y; y++){

            o_1 = n.perlin2(x * octave_1.period_x, y * octave_1.period_y);
            o_2 = n.perlin2(x * octave_2.period_x, y * octave_2.period_y);

            perlin_value = Math.abs(o_1 + o_2) * perlin_scalar;

            if(perlin_value < thickness){
                ctx.beginPath();
                ctx.fillStyle = '#' + this.colourPicker.colourAt(perlin_value);
                ctx.arc(x,y,1,0, Math.PI * 2);
                ctx.fill();
            }

        }
    }
},
//used for splitting perlin noise into separate streaks.
drawMask : function(ctx, width, height){
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
},

drawShorthand : function(newSeed = false, octave_1 = this.shorthand_params.octave_1, octave_2 = this.shorthand_params.octave_2){
    this.ctx_shorthand.clearRect(0,0, this.width_shorthand, this.height_shorthand);
    if(newSeed) this.shorthand_params.seed = Math.random();
    console.log("---PERLIN shorthand---");
    console.log(`octave1.periodX: ${octave_1.period_x}, y:${octave_1.period_y}`);
    console.log(`octave2.periodX: ${octave_2.period_x}, y:${octave_2.period_y}`);
    console.log(` seed: ${this.shorthand_params.seed};`);
    this.drawStreaks(this.ctx_shorthand, octave_1, octave_2, this.shorthand_params.thickness, this.shorthand_params.seed);
    this.drawMask(this.ctx_shorthand, this.width_shorthand, this.height_shorthand);

},
drawScrawl : function(newSeed = false, octave_1 = this.scrawl_params.octave_1, octave_2 = this.scrawl_params.octave_2){
    this.ctx_scrawl.clearRect(0,0, this.width_scrawl, this.height_scrawl);
    if(newSeed) this.scrawl_params.seed = Math.random();
    console.log("---PERLIN scrawl---");
    console.log(`octave1.periodX: ${octave_1.period_x}, y:${octave_1.period_y}`);
    console.log(`octave2.periodX: ${octave_2.period_x}, y:${octave_2.period_y}`);
    console.log(` seed: ${this.shorthand_params.seed};`);
    this.drawStreaks(this.ctx_scrawl, octave_1, octave_2, this.scrawl_params.thickness, this.scrawl_params.seed);
    this.drawMask(this.ctx_scrawl, this.width_scrawl, this.height_scrawl);
},

draw : function(){
    this.drawScrawl();
    this.drawShorthand();
},

};

module.exports.init();

window.streaks = module.exports;
