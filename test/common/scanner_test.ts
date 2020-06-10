import { SourceFile, StringSpan } from '../../src/common/source';

describe('StringSpan', () => {
  describe('should throw on an invalid', () => {
    it('offset', () => {
      expect(() => new StringSpan('', -1, 0, 0)).toThrowError(RangeError);
    });

    it('column', () => {
      expect(() => new StringSpan('', 0, -1, 0)).toThrowError(RangeError);
    });

    it('line', () => {
      expect(() => new StringSpan('', 0, 0, -1)).toThrowError(RangeError);
    });
  });

  it('should support a single-line span', () => {
    const span = new StringSpan('Hello World', 0, 1, 2);
    expect(span.offset).toBe(0);
    expect(span.column).toBe(1);
    expect(span.line).toBe(2);
    expect(span.text).toBe('Hello World');
    expect(span.length).toBe('Hello World'.length);
  });
});

describe('SourceFile', () => {
  it('should support an empty file', () => {
    const file = new SourceFile('', 'EMPTY');
    expect(file.contents).toBe('');
    expect(file.length).toBe(0);
    expect(file.url).toBe('EMPTY');
  });

  it('should prevent invalid offsets', () => {
    const file = new SourceFile('test');
    expect(() => file.computeLineAndColumn(-1)).toThrowError(RangeError);
    expect(() => file.computeLineAndColumn(5)).toThrowError(RangeError);
    expect(() => file.span(2, 1)).toThrowError(RangeError);
  });

  describe('should support computing span information', () => {
    const file = new SourceFile(
      '' +
        // 0
        'aaaa\n' +
        // 1
        'bbbb\rcccc\r\n' +
        // 2
        'dddd',
    );

    it('line 0, column 0', () => {
      const aaaa = file.span(0, 4);
      expect(aaaa.text).toBe('aaaa');
      expect(aaaa.column).toBe(0);
      expect(aaaa.line).toBe(0);
    });

    it('line 0, column N', () => {
      const aa = file.span(2, 4);
      expect(aa.text).toBe('aa');
      expect(aa.column).toBe(2);
      expect(aa.line).toBe(0);
    });

    it('line 1, column 0', () => {
      const bbb = file.span(5, 8);
      expect(bbb.text).toBe('bbb');
      expect(bbb.column).toBe(0);
      expect(bbb.line).toBe(1);
    });

    it('line 1, column N', () => {
      const bb = file.span(7, 9);
      expect(bb.text).toBe('bb');
      expect(bb.column).toBe(2);
      expect(bb.line).toBe(1);
    });

    it('ignores \\r without \\n', () => {
      const cc = file.span(12, 14);
      expect(cc.column).toBe(2);
      expect(cc.line).toBe(2);
    });

    it('line 2, column N', () => {
      const d = file.span(19, 20);
      expect(d.column).toBe(3);
      expect(d.line).toBe(3);
    });
  });
});