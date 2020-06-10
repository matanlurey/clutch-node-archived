import { isNewLine, isWhiteSpace } from '../../src/common/string';

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
