let Stats = require('./Stats.js');


let texture; //THREE object
const init = function(){
    texture = new THREE.CanvasTexture(Stats.ctxVariogram.canvas);
    texture.needsUpdate = true;
};

const updateTexture =  function(){
    Stats.plotVariogram();
    texture.needsUpdate = true;
};

Stats.init();
init();
updateTexture();

module.exports = {
    texture: texture,
    init: init,
    updateTexture: updateTexture
};

