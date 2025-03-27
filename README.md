## create

yeoman是一个创建脚手架的工具

eslint使用espree作为默认的js解析器，解析器将源代码转换成抽象语法树（AST）

- espree规则解析示例
    
    ```jsx
    // setTimeout(()=>{},1000).  espress规则
    // 这段AST表示：一个名为setTimeout的函数表达式，有两个参数，第一个参数是一个箭头函数，第二个参数是一个具体的值
    {
      "type": "Program", // 根节点
      "start": 0,  // 代码起始和结束位置
      "end": 23,
      "range": [
        0,
        23
      ],
      "body": [
        {
          "type": "ExpressionStatement", // 表示这是一个表达式语句，包含整个setTimeout的调用
          "start": 0,
          "end": 23,
          "range": [
            0,
            23
          ],
          "expression": {
            "type": "CallExpression", // 表示函数调用表达式
            "start": 0,
            "end": 23,
            "range": [
              0,
              23
            ],
            "callee": { // 指定被调用的函数(setTimeout)
              "type": "Identifier", // 表示标识符，可以理解为变量名/函数名/属性名
              "start": 0,
              "end": 10,
              "range": [
                0,
                10
              ],
              "name": "setTimeout"
            },
            "arguments": [ // 包含传递给函数的参数
              {
                "type": "ArrowFunctionExpression",  // 表示箭头函数作为第一个参数
                "start": 11,
                "end": 17,
                "range": [
                  11,
                  17
                ],
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement", // 一个代码块
                  "start": 15,
                  "end": 17,
                  "range": [
                    15,
                    17
                  ],
                  "body": []
                }
              },
              {
                "type": "Literal",  // 表示一个字面量，就是一个具体的值
                "start": 18,
                "end": 22,
                "range": [
                  18,
                  22
                ],
                "value": 1000,
                "raw": "1000"
              }
            ],
            "optional": false
          }
        }
      ],
      "sourceType": "module"
    }
    ```
    

eslint的运行流程：解析、遍历、触发回调
- 触发回调：每当匹配到对应的节点，触发rule监听器上的回调

因此我们的工作主要是定义规则(meta)，编写create函数，然后编写单测

如何新增一条规则：`yo eslint:rule`

![image.png](attachment:8cdb865d-8135-49eb-b958-77306e45155b:image.png)

- plugins和extends的区别
    
    ```jsx
    插件是ESLint的功能扩展包，但它们默认不会启用任何规则。插件就像是一个工具箱，提供了额外的工具（规则），但你需要自己决定使用哪些工具。
    ****// 只是加载插件，但没有启用任何规则
    plugins: {
      "react-hooks": reactHooks
    }
    加载插件后，你还需要在rules中手动启用这些规则：
    // 手动启用插件中的规则
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
    
    扩展是预配置的规则集，相当于是插件和规则的组合包。使用扩展可以一次性启用一组推荐的规则配置。
    // 自动启用react-hooks插件的推荐规则集
    extends: ["plugin:react-hooks/recommended"]
    ```