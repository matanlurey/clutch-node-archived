import { Scanner } from '../../src/common/scanner';

it('should return the length of the underlying text', () => {
  const scanner = new Scanner('123');
  expect(scanner).toHaveLength(3);
});

it('should return the position/substring', () => {
  const scanner = new Scanner('123');
  expect(scanner.position).toBe(0);

  expect(scanner.hasNext()).toBeTruthy();
  expect(scanner.peek()).toBe('1'.charCodeAt(0));
  expect(scanner.advance()).toBe('1'.charCodeAt(0));
  expect(scanner.position).toBe(1);

  expect(scanner.substring()).toBe('23');
  expect(scanner.substring(2)).toBe('2');
});

it('should return if there are remaining matching characters', () => {
  const scanner = new Scanner('123');
  const $1 = '1'.charCodeAt(0);
  const $2 = $1 + 1;
  expect(scanner.match($1)).toBeTruthy();
  expect(scanner.match($1)).toBeFalsy();
  expect(scanner.match((c) => c === $2)).toBeTruthy();
  expect(scanner.match((c) => c === $1)).toBeFalsy();
  expect(scanner.match('3')).toBeTruthy();
  expect(scanner.hasNext()).toBeFalsy();
});
