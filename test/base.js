var assert = require("assert");
var generateWord = require('../lib/base');


describe('Test Generate Word', function() {
  var ret;

  ret = generateWord("30");
  assert.equal(ret, "Thirty Only");

  ret = generateWord("0.01");
  assert.equal(ret, "Cents One Only");

  ret = generateWord("0.5");
  assert.equal(ret, "Cents Fifty Only");

  ret = generateWord("120");
  assert.equal(ret, "One Hundred And Twenty Only");

  ret = generateWord("12,220.4");
  assert.equal(ret, "Twelve Thousand Two Hundred And Twenty And Cents Forty Only");

  ret = generateWord("501,932.03");
  assert.equal(ret, "Five Hundred And One Thousand Nine Hundred And Thirty Two And Cents Three Only");

  ret = generateWord("211, 455, 002.13");
  assert.equal(ret, "Two Hundred And Eleven Million Four Hundred And Fifty Five Thousand Two And Cents Thirteen Only");

  ret = generateWord("99, 011, 030, 052.22");
  assert.equal(ret, "Ninety Nine Billion Eleven Million Thirty Thousand Fifty Two And Cents Twenty Two Only");

  ret = generateWord("100, 000, 000, 000");
  assert.equal(ret, "One Hundred Billion Only");

  // assert exception when empty value is provided
  assert.throws(function() {
    generateWord("");
  }, Error);

  // assert exception when only spaces is provided
  assert.throws(function() {
    generateWord("  ");
  }, Error)

  // assert exception when more than 100 billion is provided
  assert.throws(function() {
    generateWord("100, 000, 000, 000.01");
  }, Error);

  // assert exception when more than 2 decimal place is provided
  assert.throws(function() {
    generateWord("0.015");
  }, Error);
});
