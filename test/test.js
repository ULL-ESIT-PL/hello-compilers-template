
const p = require('../src/maxmin.js').parser;
const escodegen = require('escodegen');

const { Complex, factorial, max, min, print } = require("../src/support-lib.js")

require('chai').should();

const Checks = [
  { text: '2@1&3', result: 2 },
  { text: '2@1@3', result: 3 },
  { text: '2&1&3', result: 1 },
  { text: '2&1@3', result: 3 },
  { text: '2.2&2.1@3.01', result: 3.01 },
  { text: '2&(1@3)', result: 2 },
  { text: '3i - 1i', result: '2i' },
  { text: '9 + 6 * 3', result: 27 },
  { text: '4 * 3e4 / 20e-1', result: 60000 },
  { text: '4 * (1 + 3i) / 2', result: '2 + 6i' },
  { text: '4! ** 2', result: 576 },
  { text: '-(2 ** (6 - 3) + 1)', result: -9 },
  { text: '-(2 ** (6 - 3) + 1i)', result: '-8 - i' },
  { text: '3.2e3', result: 3200 },
  { text: '1i+2i', result: '3i' },
];

describe('Testing hello maxmin translator', () => {
  for (let c of Checks) {
    it(`Test ${c.text} = ${c.result}`, () => {
      let oldLog = console.log;
      console.log = x => x;

      const t = p.parse(c.text);
      const js = escodegen.generate(t);
      const result = eval(js);

      result.toString().should.equal(String(c.result));
      
      console.log = oldLog;
    });
  }
});
