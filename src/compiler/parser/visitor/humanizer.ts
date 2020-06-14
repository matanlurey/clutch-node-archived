import { StringWriter } from '../../../common/string';
import { Type } from '../../lexer/token';
import { OperatorType, RecoveryNode } from '../ast/ast';
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

/**
 * An AST Vistior that inputs and outputs a @see StringWriter instance.
 */
export class HumanWriterVisitor extends AstVisitor<StringWriter, StringWriter> {
  visitBinaryExpression(
    astNode: BinaryExpression,
    context = new StringWriter(),
  ): StringWriter {
    astNode.left.accept(this, context);
    let operator: string;
    switch (astNode.operator) {
      case OperatorType.Addition:
        operator = '+';
        break;
      case OperatorType.Assignment:
        operator = '=';
        break;
      case OperatorType.Division:
        operator = '/';
        break;
      case OperatorType.Equality:
        operator = '==';
        break;
      case OperatorType.Inequality:
        operator = '!=';
        break;
      case OperatorType.Multiplication:
        operator = '*';
        break;
      case OperatorType.Remainder:
        operator = '%';
        break;
      case OperatorType.Subtraction:
        operator = '-';
        break;
      case OperatorType.And:
        operator = '&&';
        break;
      case OperatorType.Or:
        operator = '||';
        break;
      case OperatorType.GreaterThan:
        operator = '>';
        break;
      case OperatorType.GreaterThanOrEquals:
        operator = '>=';
        break;
      case OperatorType.LessThan:
        operator = '<';
        break;
      case OperatorType.LessThanOrEquals:
        operator = '<=';
        break;
      case OperatorType.BitwiseShiftLeft:
        operator = '<<';
        break;
      case OperatorType.BitwiseShiftRight:
        operator = '>>';
        break;
      default:
        operator = 'ಠ_ಠ';
    }
    context.write(` ${operator} `);
    return astNode.right.accept(this, context);
  }

  visitCallExpression(
    astNode: CallExpression,
    context = new StringWriter(),
  ): StringWriter {
    astNode.receiver.accept(this, context);
    context.write('(');
    astNode.parameters.forEach((arg, index) => {
      const last = index === astNode.parameters.length - 1;
      arg.accept(this, context);
      if (!last) {
        context.write(', ');
      }
    });
    return context.write(')');
  }

  visitConditionalExpression(
    astNode: ConditionalExpression,
    context = new StringWriter(),
  ): StringWriter {
    context.write('if ');
    astNode.condition.accept(this, context);
    context.write(' then ');
    astNode.thenExpression.accept(this, context);
    context.write(' else ');
    return astNode.elseExpression.accept(this, context);
  }

  visitFunctionDeclaration(
    astNode: FunctionDeclaration,
    context = new StringWriter(),
  ): StringWriter {
    context.write(`func ${astNode.name.name}`);
    if (astNode.parameters) {
      astNode.parameters.accept(this, context);
    }
    if (astNode.returnType) {
      context.write(': ');
      astNode.returnType.accept(this, context);
    }
    if (astNode.statements) {
      context.write(' -> ');
      astNode.statements.accept(this, context);
    }
    return context;
  }

  visitGroupExpression(
    astNode: GroupExpression,
    context = new StringWriter(),
  ): StringWriter {
    context.write('(');
    astNode.expression.accept(this, context);
    return context.write(')');
  }

  visitIdentifier(
    astNode: Identifier,
    context = new StringWriter(),
  ): StringWriter {
    return context.write(`${astNode.name}`);
  }

  visitLiteralBoolean(
    astNode: LiteralBoolean,
    context = new StringWriter(),
  ): StringWriter {
    return context.write(`${astNode.value}`);
  }

  visitLiteralNumber(
    astNode: LiteralNumber,
    context = new StringWriter(),
  ): StringWriter {
    return context.write(`${astNode.value}`);
  }

  visitLiteralString(
    astNode: LiteralString,
    context = new StringWriter(),
  ): StringWriter {
    return context.write(`'${astNode.value}'`);
  }

  visitModuleDeclaration(
    astNode: ModuleDeclaration,
    context = new StringWriter(),
  ): StringWriter {
    let indent = false;
    if (astNode.keyword) {
      context.write('module');
      if (astNode.name) {
        context.write(` ${astNode.name}`);
      }
      if (astNode.endBlock?.type === Type.pair) {
        context.writeLine(' {');
        context.indent(2);
        indent = true;
      }
    }
    astNode.declarations.forEach((d) => d.accept(this, context));
    if (indent) {
      context.indent(-2).writeLine().writeLine('}');
    }
    return context;
  }

  visitModuleRoot(
    astNode: ModuleRoot,
    context = new StringWriter(),
  ): StringWriter {
    astNode.modules.forEach((m) => m.accept(this, context));
    return context;
  }

  visitParameter(
    astNode: Parameter,
    context = new StringWriter(),
  ): StringWriter {
    context.write(astNode.name.name);
    if (astNode.type) {
      context.write(`: `);
      astNode.type.accept(this, context);
    }
    if (astNode.value) {
      context.write(` = `);
      astNode.value.accept(this, context);
    }
    return context;
  }

  visitParameterList(
    astNode: ParameterList,
    context = new StringWriter(),
  ): StringWriter {
    context.write('(');
    astNode.parameters.forEach((parameter, index) => {
      parameter.accept(this, context);
      if (index !== astNode.parameters.length - 1) {
        context.write(', ');
      }
    });
    return context.write(')');
  }

  visitPrefixExpression(
    astNode: PrefixExpression,
    context = new StringWriter(),
  ): StringWriter {
    let operator;
    switch (astNode.operator) {
      case OperatorType.Negation:
        operator = '!';
        break;
      case OperatorType.UnaryNegative:
        operator = '-';
        break;
      case OperatorType.UnaryPositive:
        operator = '+';
        break;
      case OperatorType.PreDecrement:
        operator = '--';
        break;
      case OperatorType.PreIncrement:
        operator = '++';
        break;
      default:
        operator = '';
    }
    context.write(operator);
    return astNode.expression.accept(this, context);
  }

  visitPostfixExpression(
    astNode: PostfixExpression,
    context = new StringWriter(),
  ): StringWriter {
    let operator;
    switch (astNode.operator) {
      case OperatorType.PostDecrement:
        operator = '--';
        break;
      case OperatorType.PostIncrement:
        operator = '++';
        break;
      default:
        operator = '';
    }
    astNode.expression.accept(this, context);
    return context.write(operator);
  }

  visitPropertyExpression(
    astNode: PropertyExpression,
    context = new StringWriter(),
  ): StringWriter {
    astNode.receiver.accept(this, context).write('.');
    return astNode.property.accept(this, context);
  }

  visitRecoveryNode(
    astNode: RecoveryNode,
    context = new StringWriter(),
  ): StringWriter {
    return context.write(`ಠ_ಠ`);
  }

  visitReturnStatement(
    astNode: ReturnStatement,
    context = new StringWriter(),
  ): StringWriter {
    context.write('return ');
    return astNode.expression.accept(this, context);
  }

  visitStatementBlock(
    astNode: StatementBlock,
    context = new StringWriter(),
  ): StringWriter {
    if (astNode.statements.length === 0) {
      return context.write('{}');
    }
    context.write('{').writeLine().indent(2);
    astNode.statements.forEach((statement) => {
      context.writeIndented('');
      statement.accept(this, context);
    });
    return context.writeLine().indent(-2).write('}');
  }

  visitVariableDefinition(
    astNode: VariableDefinition,
    context = new StringWriter(),
  ): StringWriter {
    context.write(`let `);
    astNode.name.accept(this, context);
    if (astNode.type) {
      context.write(': ');
      astNode.type.accept(this, context);
    }
    if (astNode.initalValue) {
      context.write(' = ');
      astNode.initalValue.accept(this, context);
    }
    return context;
  }
}
