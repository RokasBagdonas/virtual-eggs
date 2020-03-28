import * as Stats from './Stats.js'

export let texture; //THREE object

export function init(){
    texture = new THREE.CanvasTexture(Stats.ctxVariogram.canvas);
    texture.needsUpdate = true;
}

export function updateTexture(){
    Stats.plotVariogram();
    texture.needsUpdate = true;
}

