const NeuralNetwork = require('./neural-net');
const { input, expected, expectedMax } = require('./data');
const { matrix, dotMultiply } = require('mathjs');

let config = {
    inputNodes: 1,
    hiddenNodes: 2,
    outputNodes: 2,
    epochs: 100000,
    learningRate: .05
};

const net = new NeuralNetwork(config);
net.train(input, expected);

let test = matrix([
    [2019]
]);

let result = net.predict(test);

console.log(dotMultiply(expectedMax, result));