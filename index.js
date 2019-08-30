const NeuralNetwork = require('./neural-net');
const nj = require('numjs');

let config = {
    inputSize: 2,
    hiddenLayers: 3,
    outputSize: 1
};

// console.log(NeuralNetwork);

const net = new NeuralNetwork(config);

// net.initializeWeight();

let input = nj.float64([
    [0.2, 0.9],
    [0.1, 0.5],
    [0.3, 0.6],
    [0.5, 0.7]
]);

// input = nj.softmax(input);

let expected = nj.float64([
    [0.92],
    [0.86],
    [0.89]
]);

// console.log(input);
// console.log(expected);

for (let i = 0; i < 1000; i++) {
    console.log("Iteration: " + (i + 1));
    net.train(input, expected);
}

// let test = nj.float64([[1, 12]]);

// net.predict(test);