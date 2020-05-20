let Rainbow = require('Rainbowvis.js');
let Stats = require('../Stats.js');
let numbers = require('numbers');
module.exports = {
//init -----------------------------------------------------
CANVAS_ID : "pepper-plot",
canvas : undefined,
width : undefined,
height : undefined,
ctx : undefined,


parameters : undefined,

colourScheme : ['#242931', '#121214'],
valueRange_layer1: {min: 20, max: 80, alpha_min: 0.1, alpha_max: 0.8},
valueRange_layer2: {min: 70, max: 100, alpha_min: 0.5, alpha_max: 1},
colourPicker : new Rainbow(),

init: function(){
    this.canvas = document.getElementById(this.CANVAS_ID);
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.ctx = this.canvas.getContext("2d");


    this.parameters = {
        numPoints: undefined, //to be defined when generating points.
        numPoints_min: 160,
        numPoints_max: 250,
        muX: this.width / 2,
        muY: this.height / 2,
        varianceX: this.width / 2,
        varianceY: this.height / 2,
        value_mean: 75, //radius
        value_variance: 15,
        alpha_min: 0.7,
        alpha_max: 1,
        radius_min: 1.2,
        radius_max: 3.5
    };



    this.colourScheme = ['#4b555e', '#222426'];
    this.colourPicker.setNumberRange(0, 100);
    this.colourPicker.setSpectrum(this.colourScheme[0], this.colourScheme[1]);
},

draw : function(){
    Stats.plotPoints(this.ctx, Stats.generateData(this.parameters), this.colourPicker );
},


draw_intial: function(){
    //1. generate 3D data
    //1.1
    let numPoints = Math.round(numbers.random.sample(pepper_plot.parameters.numPoints_min, pepper_plot.parameters.numPoints_max, 1)[0]);
    pepper_plot.parameters.numPoints = numPoints;
    let data = Stats.generateData(pepper_plot.parameters);
    //2. generate alpha values for each data point.
    let alpha_values = numbers.random.sample(pepper_plot.parameters.alpha_min, pepper_plot.parameters.alpha_max, numPoints);

    let colour_intensities = numbers.random.sample(pepper_plot.parameters.radius_min, pepper_plot.parameters.radius_max, numPoints);

    for(let i = 0; i < numPoints; i++){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#" + pepper_plot.colourPicker.colourAt(data.t[i]);
        this.ctx.globalAlpha = alpha_values[i];
        this.ctx.arc(data.x[i], data.y[i], colour_intensities[i], 0, Math.PI * 2);
        this.ctx.fill();
    }
}
    
};

module.exports.init();
window.pepper_plot = module.exports;