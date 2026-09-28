const test = require('node:test');
const assert = require('node:assert');
const { isValidSudoku } = require('./solution');

const valid = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

test('official examples', () => {
  assert.strictEqual(isValidSudoku(valid), true);
  const bad = valid.map((r) => [...r]);
  bad[0][0] = '8'; // clashes with 8 in the same column and box
  assert.strictEqual(isValidSudoku(bad), false);
});

test('each kind of conflict is detected separately', () => {
  const empty = () => Array.from({ length: 9 }, () => Array(9).fill('.'));
  const row = empty();
  row[4][0] = row[4][8] = '3';
  assert.strictEqual(isValidSudoku(row), false);
  const col = empty();
  col[0][7] = col[8][7] = '3';
  assert.strictEqual(isValidSudoku(col), false);
  const box = empty();
  box[3][3] = box[5][5] = '3'; // same box, different row and column
  assert.strictEqual(isValidSudoku(box), false);
  assert.strictEqual(isValidSudoku(empty()), true);
});
