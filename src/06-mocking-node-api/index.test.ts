// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path, { join } from 'node:path';
import fs from 'fs';

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
    jest.spyOn(fs, 'existsSync').mockImplementation((_) => true);
    
    readFileAsynchronously('index.ts');
    expect(join).toHaveBeenCalledTimes(1);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation((_) => false);
    readFileAsynchronously('qwe');
    expect(readFileAsynchronously('qwe')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    // jest.spyOn(fs, 'existsSync').mockImplementation((_) => true);
    // // const fs = jest.createMockFromModule('fs') as {existsSync: (_:string) => boolean };
    // // fs.existsSync = jest.fn((_:string) => true);
    // jest.mock("fs", () => ({
    //   promises: {
    //     writeFile: jest.fn(),
    //   },
    // }));
    
    // // const fsp = jest.createMockFromModule('fs/promises') as {readFile: (_:string) => Promise<String> };
    // // fsp.readFile = jest.fn(async (_:string) => 'qwe');
    // expect(readFileAsynchronously('qwe')).resolves.toEqual('123');
  });
});
