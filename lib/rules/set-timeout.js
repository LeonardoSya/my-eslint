/**
 * @fileoverview setTimeout第二个参数不能直接使用数字
 * @author sya
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "setTimeout第二个参数不能直接使用数字",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // 表示该规则是否可自动修复，值为"code"或"whitespace"，null表示不可修复
    schema: [], // 定义规则配置选项的JSON Schema，空数组表示没有配置选项
    messages: {
      setTimeoutError: "setTimeout第二个参数不能直接使用数字", // key值是messages的ID，value是具体的提示消息
    }, // Add messageId and message
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      // * 匹配函数调用
      CallExpression: (node) => {
        if (node.callee.name === "setTimeout") {
          const timeNode = node.arguments && node.arguments[1]; // setTimeout有两个参数，这里拿到第二个参数 也就是duration
          if (timeNode) {
            if (
              timeNode.type === "Literal" &&
              typeof timeNode.value === "number"
            ) {
              context.report({
                node,
                messageId: "setTimeoutError",
              });
            }
          }
        }
      },
    };
  },
};
