//Namespace for combining canvases and creating egg texture.
module.exports = function(width, height){

let base = require('./patternLayers/base.js')();
let pepper_plot = require('./patternLayers/pepper-plot.js')();
let blotch = require('./patternLayers/blotch.js')();
let scrawl = require('./patternLayers/streaks.js')();
let test = require('./patternLayers/test.js')();

let module = {};
//setup Main texture.
let canvasTexture = document.createElement("canvas");
canvasTexture.width = width; canvasTexture.height = height;
let texture = new THREE.CanvasTexture(canvasTexture); //THREE js Canvas texture

module.initTextures = function() {
    base.draw();
    // pepper_plot.draw();
    // blotch.draw_small_blotch();
    scrawl.draw();

};

module.combineTextures = function(){
    //1. create Texture canvas
    let textureCtx = canvasTexture.getContext("2d");

    //2. retrieve all texture layers. TODO: in what sequence are they retrieved?
    let canvases = document.getElementsByClassName("texture");

    //3. draw each layer onto the final canvas
    for(const canvas of canvases){
        textureCtx.drawImage(canvas, 0,0);
    }

    //4. return THREE CanvasTexture.
    texture.canvas = canvasTexture;
    texture.updateTexture = true;
    // texture = new THREE.CanvasTexture(textureCtx.canvas);
    console.log(texture.uuid);
};

module.getTexture = function() {return texture};

return module;

};


