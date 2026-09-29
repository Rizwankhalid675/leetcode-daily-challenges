/**
 * 1386. Cinema Seat Allocation
 * https://leetcode.com/problems/cinema-seat-allocation/
 * Only rows with reservations need work. Each is a bitmask checked against three 4-seat blocks
 * (2-5, 4-7, 6-9); untouched rows seat two families. n can be 1e9, so never loop over rows.
 */
var maxNumberOfFamilies = function (n, reservedSeats) {
  const rows = new Map();
  for (const [r, c] of reservedSeats) {
    if (c === 1 || c === 10) continue; // aisle-end seats never block a family
    rows.set(r, (rows.get(r) || 0) | (1 << c));
  }
  const LEFT = 0b111100, MID = 0b11110000, RIGHT = 0b1111000000; // seats 2-5, 4-7, 6-9
  let total = 2 * (n - rows.size);
  for (const m of rows.values()) {
    const l = (m & LEFT) === 0, r = (m & RIGHT) === 0;
    if (l && r) total += 2;
    else if (l || r || (m & MID) === 0) total += 1;
  }
  return total;
};

module.exports = { maxNumberOfFamilies };
