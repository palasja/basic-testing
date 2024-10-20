// Uncomment the code below and write your tests
 import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a:0, b:0, action:Action.Add})).toBe(0);
    expect(simpleCalculator({a:2, b:0, action:Action.Add})).toBe(2);
    expect(simpleCalculator({a:2, b:2, action:Action.Add})).toBe(4);
    expect(simpleCalculator({a:-2, b:4, action:Action.Add})).toBe(2);
    expect(simpleCalculator({a:-2, b:-4, action:Action.Add})).toBe(-6);

  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a:0, b:0, action:Action.Subtract})).toBe(0);
    expect(simpleCalculator({a:2, b:0, action:Action.Subtract})).toBe(2);
    expect(simpleCalculator({a:2, b:2, action:Action.Subtract})).toBe(0);
    expect(simpleCalculator({a:-2, b:4, action:Action.Subtract})).toBe(-6);
    expect(simpleCalculator({a:-2, b:-4, action:Action.Subtract})).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a:0, b:0, action:Action.Multiply})).toBe(0);
    expect(simpleCalculator({a:2, b:0, action:Action.Multiply})).toBe(0);
    expect(simpleCalculator({a:2, b:2, action:Action.Multiply})).toBe(4);
    expect(simpleCalculator({a:-2, b:4, action:Action.Multiply})).toBe(-8);
    expect(simpleCalculator({a:-2, b:-4, action:Action.Multiply})).toBe(8);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a:0, b:0, action:Action.Divide})).toBe(NaN);
    expect(simpleCalculator({a:2, b:0, action:Action.Divide})).toBe(Infinity);
    expect(simpleCalculator({a:2, b:2, action:Action.Divide})).toBe(1);
    expect(simpleCalculator({a:-2, b:4, action:Action.Divide})).toBe(-0.5);
    expect(simpleCalculator({a:-2, b:-4, action:Action.Divide})).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a:0, b:0, action:Action.Exponentiate})).toBe(1);
    expect(simpleCalculator({a:2, b:0, action:Action.Exponentiate})).toBe(1);
    expect(simpleCalculator({a:2, b:2, action:Action.Exponentiate})).toBe(4);
    expect(simpleCalculator({a:-2, b:4, action:Action.Exponentiate})).toBe(16);
    expect(simpleCalculator({a:-2, b:-4, action:Action.Exponentiate})).toBe(0.0625);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a:-2, b:-4, action:'qwe'})).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a:'a', b:-4, action:Action.Add})).toBeNull();
    expect(simpleCalculator({a:2, b:'2', action:Action.Add})).toBeNull();
    expect(simpleCalculator({a:2, b:2, action:-2})).toBeNull();
    expect(simpleCalculator({a:'2', b:'3', action:Action.Add})).toBeNull();
    expect(simpleCalculator({a:'s', b:'s', action:Action.Add})).toBeNull();
  });
});
