/**
 * 735. Asteroid Collision
 * https://leetcode.com/problems/asteroid-collision/
 *
 * Stack of surviving asteroids. Only a new left-mover (< 0) meeting a right-mover (> 0) on
 * top of the stack can collide. Keep resolving collisions until the newcomer is destroyed
 * or nothing it can hit remains.
 *
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  const stack = [];
  for (const a of asteroids) {
    let alive = true;
    while (alive && a < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -a) {
        stack.pop(); // top explodes, newcomer keeps going
      } else {
        if (top === -a) stack.pop(); // both explode
        alive = false; // newcomer explodes
      }
    }
    if (alive) stack.push(a);
  }
  return stack;
};

module.exports = { asteroidCollision };
