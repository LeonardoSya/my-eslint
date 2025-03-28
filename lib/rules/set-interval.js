/**
 * @fileoverview setInterval第二个参数不能是数字
 * @author sya
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "setInterval第二个参数不能是数字",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      setIntervalError: "setInterval第二个参数不能直接使用数字",
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
      CallExpression: (node) => {
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "setInterval"
        ) {
          const timeNode = node.arguments?.[1];
          if (timeNode) {
            if (
              timeNode.type === "Literal" &&
              typeof timeNode.value === "number"
            ) {
              context.report({ node, messageId: "setIntervalError" });
            }
          }
        }
      },
    };
  },
};
