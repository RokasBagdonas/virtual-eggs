
module.exports = function(){
module = {};

let canvas = document.getElementById("test");
let width = canvas.width;
let height = canvas.height;
let ctx =  canvas.getContext("2d");

let corners = {
    top_left: {x: 0, y: 0},
    top_right: {x: width-10, y: 0},
    bottom_left: {x: 0, y: height-10},
    bottom_right: {x: width-10, y: height-10},
    center: {x: width / 2 - 10, y: height / 2 - 10},
    bottom_mid: {x: width / 2 - 10, y: height - 10},
    top_mid: {x: width / 2 - 10 , y: 0},
    cl: {x: width / 2 - 40, y: height / 2 - 10},
    cr: {x: width / 2 + 20, y: height / 2 - 10},
    ct: {x: width / 2 - 10, y: height / 2 - 50},
    cb: {x: width / 2 - 10, y: height / 2 + 30},
    mid_left: {x: 0, y: height / 2 - 10},
    mid_right: {x: width - 10, y: height / 2 - 10}

};


ctx.fillStyle = '#fc0388';

module.draw = function() {
    for(let c in corners){
        if(c === "cr")
            ctx.fillStyle = '#f5f542';
        else
            ctx.fillStyle = '#fc0388';
        ctx.fillRect(corners[c].x, corners[c].y, 10, 10);
    }
};

return module;
};