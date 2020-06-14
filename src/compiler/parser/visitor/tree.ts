import { StringWriter } from '../../../common/string';
import { AstNode, RecoveryNode } from '../ast/ast';
import { FunctionDeclaration } from '../ast/declaration/function';
import { ModuleDeclaration, ModuleRoot } from '../ast/declaration/module';
import { Parameter, ParameterList } from '../ast/declaration/parameter';
import { BinaryExpression } from '../ast/expression/binary';
import { CallExpression } from '../ast/expression/call';
import { ConditionalExpression } from '../ast/expression/conditional';
import { GroupExpression } from '../ast/expression/group';
import { Identifier } from '../ast/expression/identifier';
import {
  LiteralBoolean,
  LiteralNumber,
  LiteralString,
} from '../ast/expression/literal';
import { PostfixExpression } from '../ast/expression/postfix';
import { PrefixExpression } from '../ast/expression/prefix';
import { PropertyExpression } from '../ast/expression/property';
import { StatementBlock } from '../ast/statement/block';
import { ReturnStatement } from '../ast/statement/return';
import { VariableDefinition } from '../ast/statement/variable';
import { AstVisitor } from './visitor';

export class TreeWriterVisitor extends AstVisitor<StringWriter, StringWriter> {
  protected writeTree<T extends AstNode, K extends keyof T>(
    context: StringWriter,
    astNode: T,
    describe: K[],
  ): StringWriter {
    context.writeIndented(`${astNode.constructor.name}:\n`);
    context.indent(2);
    describe.forEach((key) => {
      const value = astNode[key];
      if (value === undefined) {
        return;
      }
      if (value instanceof AstNode) {
        context.writeIndented(`${key}:\n`);
        context.indent(2);
        value.accept(this, context);
        context.indent(-2);
      } else if (Array.isArray(value)) {
        value.forEach((element) => {
          context.writeIndented(`${key}:\n`);
          if (element instanceof AstNode) {
            context.indent(2);
            element.accept(this, context);
            context.indent(-2);
          } else {
            context.write(`${element}`);
          }
        });
      } else {
        context.writeIndented(`${key}: ${value}\n`);
      }
    });
    context.indent(-2);
    return context;
  }

  protected writeValue(
    context: StringWriter,
    name: string,
    value: string,
  ): StringWriter {
    return context.writeLine(`${name}:`).indent(2).writeLine(value).indent(-2);
  }

  visitBinaryExpression(
    astNode: BinaryExpression,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['operator', 'left', 'right']);
  }

  visitCallExpression(
    astNode: CallExpression,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['receiver', 'parameters']);
  }

  visitConditionalExpression(
    astNode: ConditionalExpression,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, [
      'condition',
      'thenExpression',
      'elseExpression',
    ]);
  }

  visitFunctionDeclaration(
    astNode: FunctionDeclaration,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, [
      'name',
      'parameters',
      'returnType',
      'statements',
    ]);
  }

  visitGroupExpression(
    astNode: GroupExpression,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['expression']);
  }

  visitIdentifier(
    astNode: Identifier,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['name']);
  }

  visitLiteralBoolean(
    astNode: LiteralBoolean,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['value']);
  }

  visitLiteralNumber(
    astNode: LiteralNumber,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['value']);
  }

  visitLiteralString(
    astNode: LiteralString,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['value']);
  }

  visitModuleDeclaration(
    astNode: ModuleDeclaration,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['name', 'declarations']);
  }

  visitModuleRoot(
    astNode: ModuleRoot,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['modules']);
  }

  visitParameter(
    astNode: Parameter,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['name', 'type', 'value']);
  }

  visitParameterList(
    astNode: ParameterList,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['parameters']);
  }

  visitPostfixExpression(
    astNode: PostfixExpression,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['expression', 'operator']);
  }

  visitPrefixExpression(
    astNode: PrefixExpression,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['operator', 'expression']);
  }

  visitPropertyExpression(
    astNode: PropertyExpression,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['receiver', 'property']);
  }

  visitRecoveryNode(
    astNode: RecoveryNode,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, []);
  }

  visitReturnStatement(
    astNode: ReturnStatement,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['expression']);
  }

  visitStatementBlock(
    astNode: StatementBlock,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['statements']);
  }

  visitVariableDefinition(
    astNode: VariableDefinition,
    context = new StringWriter(),
  ): StringWriter {
    return this.writeTree(context, astNode, ['name', 'type', 'initalValue']);
  }
}
