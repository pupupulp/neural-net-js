# neural-net-js

![contributors](https://badgen.net/github/contributors/pupupulp/neural-net-js)
![stars](https://badgen.net/github/stars/pupupulp/neural-net-js)
![commits](https://badgen.net/github/commits/pupupulp/neural-net-js)
![last commit](https://badgen.net/github/last-commit/pupupulp/neural-net-js)
[![License](https://badgen.net/github/license/pupupulp/neural-net-js)](https://github.com/pupupulp/neural-net-js/blob/master/LICENSE)

An opensource package to create a Neural Network

## Features

- Forward Propagation
    - Sigmoid Activation
- Backward Propagation
    - Gradient Descent
    - Sigmoid Derivative (Sigmoid Prime)
- Architecture consist of one input layer, one hidden layer, and one output layer

## Quickstart

+ **On index.js you can set config for neural network**

```js
{
    inputNodes: 1,  // number of features on input layer
    hiddenNodes: 2, // numbrer of neurons on hidden layer
    outputNodes: 2, // number of result on output layer
    epochs: 100000, // number of iterations for training
    learningRate: .05 // learning rate for gradient descent adjustments on weight
}
```

+ **Data are found on data.js, specified as input and expected data, you can alter the file to your likings and for other necessary processing for your data before passing it to the neural network**

+ **On index.js you can set the test data for prediction**

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/pupupulp/neural-net-js/issues/new).

### Contributors

### Author

**Eagan Martin**
- [Github](https://github.com/pupupulp)
- [LinkedIn]()

### License

Copyright © 2019, [Eagan Martin](https://github.com/pupupulp). Release under the [The Unlicense](https://github.com/pupupulp/neural-net-js/blob/master/LICENSE)