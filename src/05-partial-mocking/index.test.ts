// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });
    jest.mock('./index', () => {
      const originalModule = jest.requireActual<typeof import('./index')>('./index');
      jest.spyOn(originalModule, 'mockOne').mockImplementation(() => 1);
      jest.spyOn(originalModule, 'mockTwo').mockImplementation(() => 1);
      jest.spyOn(originalModule, 'mockThree').mockImplementation(() => 1);

      mockOne();
      mockTwo();
      mockThree();
      expect(logSpy).toHaveBeenCalledTimes(0);
    });

    //const logSpy = jest.spyOn(global.console, 'log');

    // Write your test here
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });
    jest.mock('./index', () => {
      unmockedFunction();
      expect(logSpy).toHaveBeenCalledTimes(1);
    });
    
  });
});
