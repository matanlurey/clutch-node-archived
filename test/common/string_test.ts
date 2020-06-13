import {
  isDigit,
  isLetter,
  isNewLine,
  isWhiteSpace,
  StringWriter,
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

describe('StringWriter', () => {
  let writer!: StringWriter;

  beforeEach(() => {
    writer = new StringWriter();
  });

  it('should write', () => {
    writer.write('Hello World');
    expect(writer.toString()).toBe('Hello World');
  });

  it('should write with new lines', () => {
    writer.writeLine('Hello').writeLine('World');
    expect(writer.toString()).toBe('Hello\nWorld\n');
  });

  it('should write with indentation', () => {
    writer
      .write('1.')
      .writeLine()
      .indent(2)
      .write('A.')
      .writeLine()
      .write('B.')
      .writeLine()
      .indent(2)
      .write('i.')
      .writeLine()
      .write('ii.')
      .writeLine()
      .indent(-2)
      .write('C.')
      .writeLine()
      .indent(-2)
      .write('2.');
    expect(writer.toString()).toMatchInlineSnapshot(`
      "1.
      A.
      B.
      i.
      ii.
      C.
      2."
    `);
  });
});
