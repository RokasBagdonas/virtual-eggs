let numbers = require('numbers');

/**
 * Zips two 1-D arrays into a matrix of 2D vectors [[[x1], [y1]] ... [[xn],[yn]]]
 * @param X
 * @param Y
 */
const pairData = function(X, Y){
    if(X.length !== Y.length){
        console.error("mismatch in X and Y lengths");
        return;
    }
    return X.map((e,i) => [[e], [Y[i]]]);
};

const degreesToRadian = function(angle){
    return angle * (180 / Math.PI);
};

module.exports = {
    pairData: pairData
};