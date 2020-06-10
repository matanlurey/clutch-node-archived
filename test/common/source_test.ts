import { SourceSpan } from '../../src/common/source';

describe('SourceSpan', () => {
  it('should refuse offset < 0', () => {
    expect(() => new SourceSpan('', -1)).toThrowError(RangeError);
  });

  it('should refuse column < 0', () => {
    expect(() => new SourceSpan('', 0, -1)).toThrowError(RangeError);
  });

  it('should refuse line < 0', () => {
    expect(() => new SourceSpan('', 0, 0, -1)).toThrowError(RangeError);
  });
});
