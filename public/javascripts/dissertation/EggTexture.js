//Namespace for combining canvases and creating egg texture.
let base = require('./patternLayers/base.js')();
let pepper_plot = require('./patternLayers/pepper-plot.js');
let blotch = require('./patternLayers/blotch.js');
let streaks = require('./patternLayers/streaks.js');

module.exports = {

    canvasTexture : undefined,
    texture : undefined,
    width: undefined,
    height: undefined,
    getTexture : function() {return this.texture},
    excludeList: [],
    toggleTexture: function(texture_id){
        this.textures[texture_id] = !this.textures[texture_id];
        this.combineTextures();
    },
    //for toggling which are applied onto the egg.
    textures: {
        "small-blotch": true,
        "big-blotch": false,
        "black-cap": true,
        "scrawl": true,
        "shorthand": true,
        "pepper-plot": true
    },

    drawAllTextures : function(){
        base.draw();
        // pepper_plot.draw();
        pepper_plot.draw_intial();
        blotch.draw_small_blotch();
        // blotch.draw_big_blotch();
        blotch.draw_black_cap();
        streaks.drawScrawl();
        streaks.drawShorthand();

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
            if(!this.excludeList.find(t => t === canvas.id))
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



