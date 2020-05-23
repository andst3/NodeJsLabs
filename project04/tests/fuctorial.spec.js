const funcFactorial = require('../functions');

const factorials = [
    [0, 1],
    [-5, -120],
    [6, 720]
];

describe('Test factorial', () => {
    test.each(factorials)('Testing %i value to be factorial %i', (value, expected) => {
        expect(funcFactorial(value)).toBe(expected);
    })
});