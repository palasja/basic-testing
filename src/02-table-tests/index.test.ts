// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a:0, b:0, action:Action.Subtract, expected: 0},
    { a:2, b:0, action:Action.Subtract, expected: 2},
    { a:2, b:2, action:Action.Subtract, expected: 0},
    { a:-2, b:4, action:Action.Subtract, expected: -6},
    { a:-2, b:-4, action:Action.Subtract, expected: 2},
    { a:0, b:0, action:Action.Multiply, expected: 0},
    { a:2, b:0, action:Action.Multiply, expected: 0},
    { a:2, b:2, action:Action.Multiply, expected: 4},
    { a:-2, b:4, action:Action.Multiply, expected: -8},
    { a:-2, b:-4, action:Action.Multiply, expected: 8},
    { a:0, b:0, action:Action.Divide, expected: NaN},
    { a:2, b:0, action:Action.Divide, expected: Infinity},
    { a:2, b:2, action:Action.Divide, expected: 1},
    { a:-2, b:4, action:Action.Divide, expected: -0.5},
    { a:-2, b:-4, action:Action.Divide, expected: 0.5},
    { a:0, b:0, action:Action.Exponentiate, expected: 1},
    { a:2, b:0, action:Action.Exponentiate, expected: 1},
    { a:2, b:2, action:Action.Exponentiate, expected: 4},
    { a:-2, b:4, action:Action.Exponentiate, expected: 16},
    { a:-2, b:-4, action:Action.Exponentiate, expected: 0.0625},
    { a:-2, b:-4, action:'qwe', expected: null},
    { a:'a', b:-4, action:Action.Add, expected: null},
    { a:2, b:'2', action:Action.Add, expected: null},
    { a:2, b:2, action:-2, expected: null},
    { a:'2', b:'3', action:Action.Add, expected: null},
    { a:'s', b:'s', action:Action.Add, expected: null},
];

describe('simpleCalculator', () => {
  test.each(testCases)(`simpleCalculator table test %o`, (obj) => {
    expect(simpleCalculator(obj)).toBe(obj.expected);

  })
});
