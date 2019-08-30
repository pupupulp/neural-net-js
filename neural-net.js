const nj = require('numjs');

const matrixAddition = (a, b) => {
    return a.map(function(n, i){
        return n.map(function(o, j){
            return o + b[i][j];
        });
    });
}

class NeuralNetwork {

    constructor(config) {
        this.inputSize = config.inputSize;
        this.hiddenLayers = config.hiddenLayers;
        this.outputSize = config.outputSize;

        this.initializeWeight();
    }

    initializeWeight() {
        this.weightIH = nj.random([this.inputSize, this.hiddenLayers]);
        this.wegithHO = nj.random([this.outputSize, this.hiddenLayers]);
    }

    sigmoidActivation(value) {
        return 1 / (1 + nj.exp(-value));
    }

    sigmoidPrime(value) {
        return value * (1 - value);
    }
     
    forwardPropagation(input) {
        console.log("##FORWARD");
        console.log("Input: " + input);
        console.log("weightIH: " + this.weightIH);
        console.log("wegithHO: " + this.wegithHO);

        this.p1 = nj.dot(input, this.weightIH);
        console.log("p1: " + this.p1);

        this.s1 = this.sigmoidActivation(this.p1);
        console.log("s1: " + this.s1);

        this.p2 = nj.dot(this.s1, this.wegithHO);
        console.log("p2: " + this.p2);
        
        let output = this.sigmoidActivation(this.p2);
        console.log("Forward Output: " + output);
        
        return output;
    }
    
    backwardPropagation(input, expected, output) {
        this.outputError = expected - output;
        this.outputDelta = this.outputError * this.sigmoidPrime(output);
    
        this.s1Error = nj.dot(this.outputDelta, this.wegithHO.T);
        this.s1Delta = this.s1Error * this.sigmoidPrime(this.s1);
    
        this.weightIH = matrixAddition(this.weightIH, nj.dot(input.T, this.s1Delta));
        this.wegithHO = matrixAddition(this.wegithHO, nj.dot(s1.T, this.outputDelta));
    }
    
    train(input, expected) {
        let output = this.forwardPropagation(input);
        // this.backwardPropagation(input, expected, output);
    };
    
    predict(input) {
        this.forwardPropagation(input);
    }
}

// let NeuralNetwork = function (config) {
//     this.constructor(config);
// };

// NeuralNetwork.prototype.constructor = function (config) {
//     this.inputSize = config.inputSize;
//     this.hiddenLayers = config.HiddenLays;
//     this.outputSize = config.outputSize;
//     this.binaryThresh = config.binaryThresh;

//     this.weightIH = nj.random([this.inputSize, this.hiddenLayers]);
//     this.wegithHO = nj.random([this.hiddenLayers, this.outputSize]);

//     return this;
// };

// NeuralNetwork.prototype.sigmoidActivation = function (value) {
//     return 1 / (1 + nj.exp(-value));
// };

// NeuralNetwork.prototype.sigmoidPrime = function (value) {
//     return value * (1 - value);
// };
 
// NeuralNetwork.prototype.forwardPropagation = function (input) {
//     console.log(this.self);
//     console.log(input);
//     console.log(this.weightIH);
//     console.log(this.wegithHO);
//     this.p1 = nj.dot(input, this.weightIH);
//     this.s1 = this.sigmoidActivation(this.p1);
//     this.p2 = nj.dot(this.s1, this.wegithHO);
    
//     let output = this.sigmoidActivation(p2);
    
//     return output;
// };

// NeuralNetwork.prototype.backwardPropagation = function (input, expected, output) {
//     this.outputError = expected - output;
//     this.outputDelta = this.outputError * this.sigmoidPrime(output);

//     this.s1Error = nj.dot(this.outputDelta, this.wegithHO.T);
//     this.s1Delta = this.s1Error * this.sigmoidPrime(this.s1);

//     this.weightIH = matrixAddition(this.weightIH, nj.dot(input.T, this.s1Delta));
//     this.wegithHO = matrixAddition(this.wegithHO, nj.dot(s1.T, this.outputDelta));
// }

// NeuralNetwork.prototype.train = function (input, expected) {
//     let output = this.forwardPropagation(input);
//     this.backwardPropagation(input, expected, output);
// };

// NeuralNetwork.prototype.predict = function (input) {
//     this.forwardPropagation(input);
// }

module.exports = NeuralNetwork;