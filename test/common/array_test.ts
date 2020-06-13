import { binarySearch } from '../../src/common/array';

describe('binarySearch', () => {
  it('finds first element', () => {
    expect(binarySearch([1, 2, 3], 1)).toBe(0);
  });

  it('finds last element', () => {
    expect(binarySearch([1, 2, 3], 3)).toBe(2);
  });

  it('find a middle element', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 2)).toBe(1);
    expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
    expect(binarySearch([1, 2, 3, 4, 5], 4)).toBe(3);
  });

  it('finds closest element', () => {
    expect(binarySearch([1, 3, 5, 8, 9], 8)).toBe(3);
  });
});
