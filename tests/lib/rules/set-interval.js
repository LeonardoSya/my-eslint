/**
 * @fileoverview setInterval第二个参数不能是数字
 * @author sya
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/set-interval"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("set-interval", rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      code: "const delay=1000;setInterval(() => {}, delay)",
    },
  ],

  invalid: [
    {
      code: "setInterval(() => {}, 1000)",
      errors: [{ messageId: "setIntervalError", type: "CallExpression" }],
    },
  ],
});
