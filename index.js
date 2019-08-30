const NeuralNetwork = require('./neural-net');
const { matrix } = require('mathjs');

let config = {
    inputNodes: 2,
    hiddenNodes: 3,
    outputNodes: 1,
    epochs: 1,
    learningRate: .5
};

const net = new NeuralNetwork(config);

let input = matrix([
    [0.2, 0.9],
    [0.1, 0.5],
    [0.3, 0.6]
]);

let expected = matrix([
    [0.92],
    [0.86],
    [0.89]
]);

net.train(input, expected);

let test = matrix([[5, 2]]);
console.log(net.predict(test));