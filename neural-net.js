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

module.exports = NeuralNetwork;