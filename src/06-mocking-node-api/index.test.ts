// Uncomment the code below and write your tests
import { readFile } from 'node:fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path, { join } from 'node:path';
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockFn = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockFn, 1000)
    expect(setTimeout).toHaveBeenLastCalledWith(mockFn, 1000);
  });

  test('should call callback only after timeout', () => {
    const mockFn = jest.fn();
    doStuffByTimeout(mockFn, 1000)
    jest.advanceTimersByTime(999);
    expect(mockFn).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockFn = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockFn, 1000);
    jest.advanceTimersByTime(1000);
    expect(setInterval).toHaveBeenLastCalledWith(mockFn, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockFn = jest.fn();
    doStuffByInterval(mockFn, 100)
    jest.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    readFileAsynchronously('index.ts');
    expect(join).toHaveBeenCalledTimes(1);
  });

  test('should return null if file does not exist', async () => {
    expect(readFileAsynchronously('inde.ts')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = await readFile( join(__dirname, './index.ts'), 'utf8');
    expect(readFileAsynchronously('./index.ts')).resolves.toEqual(fileContent);
  });
});
