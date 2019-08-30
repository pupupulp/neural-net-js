
const { max, dotDivide, matrix } = require('mathjs');

let input = matrix([
    [2000],
    [2001],
    [2002],
    [2003],
    [2004],
    [2005],
    [2006],
    [2007],
    [2008],
    [2009],
    [2010],
    [2011],
    [2012],
    [2013],
    [2014],
    [2015],
    [2016],
    [2017]
]);

const inputMax = max(input);

input = input.map(v => {
    return v / inputMax;
});

let expected = matrix([
    [24070960236.0455, 534844],
    [24038299052.4038, 533789],
    [24042057211.9959, 533683],
    [24083749591.6127, 534641],
    [24033733172.3944, 534040],
    [24024703455.8806, 533607],
    [24061392798.4737, 534285],
    [23986006521.6111, 533130],
    [24018191241.9652, 534015],
    [23989116623.8311, 533516],
    [24022166047.4491, 533671],
    [23983842056.0042, 533106],
    [24021077803.7724, 533854],
    [24026215590.1899, 533655],
    [24030459613.5956, 534020],
    [23950204509.831, 532171],
    [24051122346.3845, 534467],
    [23964580258.537, 532674]
]);

const expectedMax = max(expected, 0);
let temp = [];
const expectedCount = expected.size()[0];

for(let i = 0; i < expectedCount; i++) {
    temp.push(expectedMax);
}

let expectedMaxMatrix = matrix(temp);
expected = dotDivide(expected, expectedMaxMatrix);

module.exports.input = input;
module.exports.expected = expected;
module.exports.expectedMax = matrix([expectedMax]);
