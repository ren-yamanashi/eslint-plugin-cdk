import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";

import { isConstructOrStackType } from "./utils/typeCheck.mjs";

type Context = TSESLint.RuleContext<"noVariableConstructId", []>;

/**
 * Enforce using literal strings for Construct ID.
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 */
export const noVariableConstructId = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: `Enforce using literal strings for Construct ID.`,
    },
    messages: {
      noVariableConstructId: "Shouldn't use a parameter as a Construct ID.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();

    return {
      NewExpression(node) {
        const type = typeChecker.getTypeAtLocation(
          parserServices.esTreeNodeToTSNodeMap.get(node)
        );
        if (!isConstructOrStackType(type)) {
          return;
        }

        if (node.arguments.length < 2) return;

        validateConstructId(node, context, node);
      },
    };
  },
});

/**
 * Check if the construct ID is a literal string
 */
const validateConstructId = (
  node: TSESTree.Node,
  context: Context,
  expression: TSESTree.NewExpression
) => {
  if (expression.arguments.length < 2 || isInsideLoop(node)) {
    return;
  }

  // NOTE: Treat the second argument as ID
  const secondArg = expression.arguments[1];

  // NOTE: When id is string literal, it's OK
  if (
    secondArg.type === AST_NODE_TYPES.Literal &&
    typeof secondArg.value === "string"
  ) {
    return;
  }

  // NOTE: When id is template literal, only those without expressions are OK
  if (
    secondArg.type === AST_NODE_TYPES.TemplateLiteral &&
    !secondArg.expressions.length
  ) {
    return;
  }

  context.report({
    node,
    messageId: "noVariableConstructId",
  });
};

/**
 * Check if the node is inside a loop statement
 */
const isInsideLoop = (node: TSESTree.Node): boolean => {
  let current = node.parent;
  while (current) {
    if (
      current.type === AST_NODE_TYPES.ForStatement ||
      current.type === AST_NODE_TYPES.ForInStatement ||
      current.type === AST_NODE_TYPES.ForOfStatement ||
      current.type === AST_NODE_TYPES.WhileStatement ||
      current.type === AST_NODE_TYPES.DoWhileStatement
    ) {
      return true;
    }
    current = current.parent;
  }
  return false;
};