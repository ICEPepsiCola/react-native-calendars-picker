import { areDateBetweenOrAt } from '../utils';
import dayjs from 'dayjs';

describe('areDateBetweenOrAt', () => {
  test('should return false if a or b is not defined', () => {
    // @ts-expect-error
    expect(areDateBetweenOrAt(undefined, undefined)).toBeFalsy();
    expect(areDateBetweenOrAt(undefined, [])).toBeFalsy();
    // @ts-expect-error
    expect(areDateBetweenOrAt([], undefined)).toBeFalsy();
  });
  test('should return false if b is not an array', () => {
    // @ts-expect-error
    expect(areDateBetweenOrAt('2020-01-01', '2020-01-01')).toBeFalsy();
  });
  test('should return false if b is empty array', () => {
    expect(areDateBetweenOrAt(dayjs(), [])).toBeFalsy();
  });
  test('should return false if b all values are not valid date', () => {
    expect(areDateBetweenOrAt(dayjs(), [undefined, undefined])).toBeFalsy();
  });
});
