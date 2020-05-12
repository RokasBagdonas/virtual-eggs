let streaks = require('./streaks.js');
module.exports = {
    a: 0,
    add: function(){
        console.log(++this.a);
    },
    b: undefined,
    init: function(){
        this.b = 5659;
    },
    addB: function(){
        console.log(++this.b);
    },
    draw: function(){
        streaks.scrawl_params.octave_1 = {period_x: 1/800, period_y: 50};
        streaks.drawScrawl();
    }
};
module.exports.init();
console.log('test2 addB');
module.exports.addB();
window.test2 = module.exports;