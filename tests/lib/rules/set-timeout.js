/**
 * @fileoverview setTimeout第二个参数不能直接使用数字
 * @author sya
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/set-timeout"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("set-timeout", rule, {
  valid: [
    // valid中定义合法的单测
    // give me some code that won't trigger a warning
    {
      code: "const delay = 1000; setTimeout(() => {}, delay)",
    },
  ],

  invalid: [
    // invalid定义不合法的单测
    {
      code: "setTimeout(() => {},1000)",
      errors: [{ messageId: "setTimeoutError", type: "CallExpression" }],
    },
  ],
});
