import { isDigit, isNewLine, isWhiteSpace } from '../../src/common/string';

describe('isNewLine', () => {
  it('recognizes \\n', () => {
    expect(isNewLine('\n'.charCodeAt(0))).toBeTruthy();
  });

  it('recognizes \\r', () => {
    expect(isNewLine('\r'.charCodeAt(0))).toBeTruthy();
  });
});

describe('isWhiteSpace', () => {
  it('recognizes spaces', () => {
    expect(isWhiteSpace(' '.charCodeAt(0))).toBeTruthy();
  });

  it('recognizes tabs', () => {
    expect(isWhiteSpace('\t'.charCodeAt(0))).toBeTruthy();
  });

  it('recognizes new lines', () => {
    expect(isWhiteSpace('\n'.charCodeAt(0))).toBeTruthy();
    expect(isWhiteSpace('\r'.charCodeAt(0))).toBeTruthy();
  });
});

describe('isDigit', () => {
  test('recognizes 0...9', () => {
    expect(isDigit('0'.charCodeAt(0))).toBeTruthy();
    expect(isDigit('1'.charCodeAt(0))).toBeTruthy();
    expect(isDigit('2'.charCodeAt(0))).toBeTruthy();
    expect(isDigit('3'.charCodeAt(0))).toBeTruthy();
    expect(isDigit('4'.charCodeAt(0))).toBeTruthy();
    expect(isDigit('5'.charCodeAt(0))).toBeTruthy();
    expect(isDigit('6'.charCodeAt(0))).toBeTruthy();
    expect(isDigit('7'.charCodeAt(0))).toBeTruthy();
    expect(isDigit('8'.charCodeAt(0))).toBeTruthy();
    expect(isDigit('9'.charCodeAt(0))).toBeTruthy();
  });
});
