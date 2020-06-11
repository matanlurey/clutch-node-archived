import {
  isDigit,
  isLetter,
  isNewLine,
  isWhiteSpace,
} from '../../src/common/string';

describe('isNewLine should', () => {
  it('recognize \\n', () => {
    expect(isNewLine('\n'.charCodeAt(0))).toBeTruthy();
  });

  it('recognize \\r', () => {
    expect(isNewLine('\r'.charCodeAt(0))).toBeTruthy();
  });
});

describe('isWhiteSpace should', () => {
  it('recognize spaces', () => {
    expect(isWhiteSpace(' '.charCodeAt(0))).toBeTruthy();
  });

  it('recognize tabs', () => {
    expect(isWhiteSpace('\t'.charCodeAt(0))).toBeTruthy();
  });

  it('recognize new lines', () => {
    expect(isWhiteSpace('\n'.charCodeAt(0))).toBeTruthy();
    expect(isWhiteSpace('\r'.charCodeAt(0))).toBeTruthy();
  });
});

describe('isDigit', () => {
  it('should recognize 0...9', () => {
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

it('isLetter should recognize A-Z', () => {
  for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    expect(isLetter(i)).toBeTruthy();
  }
});

it('isLetter should recognize a-z', () => {
  for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
    expect(isLetter(i)).toBeTruthy();
  }
});
