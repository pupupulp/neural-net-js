const {
    exp, random, multiply, dotMultiply, mean, abs, subtract, transpose, add
} = require('mathjs');

class NeuralNetwork {

    constructor(config) {
        this.inputNodes = config.inputNodes;
        this.hiddenNodes = config.hiddenNodes;
        this.outputNodes = config.outputNodes;

        this.epochs = config.epochs;
        this.learningRate = config.learningRate;

        this.initializeWeight();
    }

    initializeWeight() {
        this.synapseIH = random([this.inputNodes, this.hiddenNodes], -1.0, 1.0);
        this.synapseHO = random([this.hiddenNodes, this.outputNodes], -1.0, 1.0);
    }

    sigmoidActivation(value) {
        return 1 / (1 + exp(-value));
    }

    sigmoidPrime(value) {
        return value * (1 - value);
    }
     
    forwardPropagation(input) {
        console.log("##FORWARD");
        console.log("Input: " + input);
        console.log("synapseIH: " + this.synapseIH);
        console.log("synapseHO: " + this.synapseHO);

        this.inputLayer = input;
        this.hiddenLayer = multiply(this.inputLayer, this.synapseIH).map(v => this.sigmoidActivation(v));
        this.outputLayer = multiply(this.hiddenLayer, this.synapseHO).map(v => this.sigmoidActivation(v));

        return this.outputLayer;
    }
    
    backwardPropagation(input, expected, output) {
        this.outputError = subtract(expected, output);
        this.outputDelta = dotMultiply(this.outputError, output.map(v => this.sigmoidPrime(v)));
    
        this.hiddenError = multiply(this.outputDelta, transpose(this.synapseHO));
        this.hiddenDelta = dotMultiply(this.hiddenError, this.hiddenLayer.map(v => this.sigmoidPrime(v)));

        this.gradientDescent();
    }

    gradientDescent() {
        this.synapseIH = add(this.synapseIH, multiply(transpose(this.inputLayer), multiply(this.hiddenDelta, this.learningRate)));
        this.synapseHO = add(this.synapseHO, multiply(transpose(this.hiddenLayer), multiply(this.outputDelta, this.learningRate)));
    }
    
    train(input, expected) {
        for (let i = 0; i < this.epochs; i++) {
            let output = this.forwardPropagation(input);
            this.backwardPropagation(input, expected, output);
        }
        console.log(`Mean Error: ${mean(abs(this.outputError))}`);
    };
    
    predict(input) {
        return this.forwardPropagation(input);
    }
}

// let NeuralNetwork = function (config) {
//     this.constructor(config);
// };

// NeuralNetwork.prototype.constructor = function (config) {
//     this.inputNodes = config.inputNodes;
//     this.hiddenNodes = config.HiddenLays;
//     this.outputNodes = config.outputNodes;
//     this.binaryThresh = config.binaryThresh;

//     this.weightIH = nj.random([this.inputNodes, this.hiddenNodes]);
//     this.wegithHO = nj.random([this.hiddenNodes, this.outputNodes]);

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

//     this.hiddenError = nj.dot(this.outputDelta, this.wegithHO.T);
//     this.s1Delta = this.hiddenError * this.sigmoidPrime(this.s1);

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