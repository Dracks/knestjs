'use strict';

const objection = require('..');
const assert = require('assert').strict;

assert.strictEqual(objection(), 'Hello from objection');
console.info('objection tests passed');
