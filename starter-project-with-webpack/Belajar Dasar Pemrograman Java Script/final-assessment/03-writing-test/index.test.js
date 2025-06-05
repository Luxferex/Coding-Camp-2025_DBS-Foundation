import test from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

test('fungsi sum harus mnegembalikan sum yang benar dari 2 angka ini', () => {
  assert.strictEqual(sum(2, 3), 5);
  assert.strictEqual(sum(-1, 1), 0);
  assert.strictEqual(sum(0, 0), 0);
  assert.strictEqual(sum(10, 20), 30);
  assert.strictEqual(sum(-5, -5), -10);
});
