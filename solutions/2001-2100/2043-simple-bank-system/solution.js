/**
 * 2043. Simple Bank System
 * https://leetcode.com/problems/simple-bank-system/
 * Validate account numbers and sufficient funds, then apply the transaction. Balances are BigInt because repeated deposits of up to 10^12 can pass 2^53.
 */
var Bank = function (balance) {
  // Up to 1e4 deposits/transfers of 1e12 into one account can exceed 2^53, so keep exact BigInts.
  this.bal = balance.map((x) => BigInt(x));
};
Bank.prototype._ok = function (a) {
  return a >= 1 && a <= this.bal.length;
};
Bank.prototype.transfer = function (account1, account2, money) {
  if (!this._ok(account1) || !this._ok(account2)) return false;
  const m = BigInt(money);
  if (this.bal[account1 - 1] < m) return false;
  this.bal[account1 - 1] -= m;
  this.bal[account2 - 1] += m;
  return true;
};
Bank.prototype.deposit = function (account, money) {
  if (!this._ok(account)) return false;
  this.bal[account - 1] += BigInt(money);
  return true;
};
Bank.prototype.withdraw = function (account, money) {
  if (!this._ok(account)) return false;
  const m = BigInt(money);
  if (this.bal[account - 1] < m) return false;
  this.bal[account - 1] -= m;
  return true;
};

module.exports = { Bank };
