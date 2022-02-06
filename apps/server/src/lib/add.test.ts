import { add } from './add';

describe('testing add', () => {
  it('should be 4', () => {
    expect(add(2, 2)).toBe(4);
  });
});
