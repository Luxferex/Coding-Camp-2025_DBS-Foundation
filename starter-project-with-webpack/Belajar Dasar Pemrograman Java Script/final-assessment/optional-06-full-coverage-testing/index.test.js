import test from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

test('Pengujian fungsi sum', async (t) => {
  await t.test('mengembalikan hasil penjumlahan ketika input adalah dua bilangan positif', () => {
    assert.strictEqual(sum(2, 3), 5);
    assert.strictEqual(sum(0, 0), 0);
    assert.strictEqual(sum(100, 200), 300);
    assert.strictEqual(sum(1.5, 2.5), 4);
  });

  await t.test('mengembalikan 0 ketika salah satu atau kedua input adalah bilangan negatif', () => {
    assert.strictEqual(sum(-1, 5), 0);
    assert.strictEqual(sum(5, -1), 0);
    assert.strictEqual(sum(-3, -7), 0);
  });

  await t.test('mengembalikan 0 ketika salah satu atau kedua input bukan tipe data number', () => {
    assert.strictEqual(sum('string', 5), 0);
    assert.strictEqual(sum(5, 'string'), 0);
    assert.strictEqual(sum('a', 'b'), 0);
    assert.strictEqual(sum(null, 5), 0);
    assert.strictEqual(sum(5, null), 0);
    assert.strictEqual(sum(undefined, 5), 0);
    assert.strictEqual(sum(5, undefined), 0);
    assert.strictEqual(sum({}, []), 0);
    assert.strictEqual(sum(true, 5), 0);
    assert.strictEqual(sum(5, false), 0);
  });

  await t.test('mengembalikan hasil yang benar ketika salah satu input adalah 0', () => {
    assert.strictEqual(sum(0, 5), 5);
    assert.strictEqual(sum(5, 0), 5);
  });

  await t.test('mengembalikan hasil yang benar untuk angka besar', () => {
    assert.strictEqual(sum(Number.MAX_SAFE_INTEGER, 1), Number.MAX_SAFE_INTEGER + 1);
  });

  await t.test('mengembalikan hasil yang benar untuk angka desimal', () => {
    assert.strictEqual(sum(0.1, 0.2), 0.30000000000000004);
  });
});
