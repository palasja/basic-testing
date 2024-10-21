// Uncomment the code below and write your tests
 import { getBankAccount, InsufficientFundsError, BankAccount,  } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(10).getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(10).withdraw(100)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const from = getBankAccount(10);
    const to = getBankAccount(10);
    expect(() =>from.transfer(100, to)).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(10);
    expect(() =>acc.transfer(100, acc)).toThrowError();
  });

  test('should deposit money', () => {
    expect(getBankAccount(10).deposit(10).getBalance()).toBe(20);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(10).withdraw(10).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const from = getBankAccount(10);
    const to = getBankAccount(10);
    from.transfer(10, to);
    expect(from.getBalance()).toBe(0);
    expect(to.getBalance()).toBe(20);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const res =  await getBankAccount(10).fetchBalance();
    if(res != null) expect(typeof res).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    let acc = new BankAccount(0);
    jest.spyOn(acc, 'fetchBalance').mockImplementation(async () => 100);
    const res =  await acc.fetchBalance();
    expect(typeof res).toBe('number');
    
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    let acc = new BankAccount(0);
    jest.spyOn(acc, 'fetchBalance').mockImplementation(async () => null);
    expect(acc.fetchBalance()).resolves.toBeNull();
    expect(() => acc.synchronizeBalance()).rejects.toThrowError();
  });
});
