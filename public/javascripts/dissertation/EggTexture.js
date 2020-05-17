//Namespace for combining canvases and creating egg texture.
let base = require('./patternLayers/base.js')();
let pepper_plot = require('./patternLayers/pepper-plot.js');
let blotch = require('./patternLayers/blotch.js');
let streaks = require('./patternLayers/streaks.js');
let test = require('./patternLayers/test.js')();

module.exports = {

    canvasTexture : undefined,
    texture : undefined,
    width: undefined,
    height: undefined,
    getTexture : function() {return this.texture},

    drawAllTextures : function(){
        base.draw();
        // pepper_plot.draw();
        pepper_plot.draw_intial();
        // blotch.draw_small_blotch();
        // blotch.draw_big_blotch();
        blotch.draw_cap();
        streaks.draw();

    },

    init: function(){
        this.canvasTexture = document.createElement("canvas");
        // let a = document.getElementById("texture-container");
        // a.appendChild(this.canvasTexture);
        this.width = 256; this.height = 256;
        this.canvasTexture.width = this.width; this.canvasTexture.height = this.height;
        this.texture = new THREE.CanvasTexture(this.canvasTexture); //THREE js Canvas texture
        this.drawAllTextures();
    },

    //for merging all textures into one and mapping it on to the 3D egg model.
    combineTextures : function(){
        //1. create Texture canvas
        let textureCtx = this.canvasTexture.getContext("2d");
        textureCtx.clearRect(0,0,this.width, this.height);

        this.texture.canvas = this.canvasTexture;
        this.texture.updateTexture = true;


        //2. retrieve all texture layers.
        let canvases = document.getElementsByClassName("texture");
        //3. draw each layer onto the final canvas
        for(const canvas of canvases){
            textureCtx.drawImage(canvas, 0,0);
        }

        //4. return THREE CanvasTexture.
        this.texture.canvas = this.canvasTexture;
        this.texture.needsUpdate = true;
        // texture = new THREE.CanvasTexture(textureCtx.canvas);
        console.log(this.texture.uuid);

    },

    redrawTexture: function(drawCallback){
        drawCallback();
        this.combineTextures();
    },

};

window.EggTexture = module.exports;



