import { StringWriter } from '../../../common/string';
import { OperatorType, RecoveryNode } from '../ast/ast';
import { FunctionDeclaration } from '../ast/declaration/function';
import { Parameter, ParameterList } from '../ast/declaration/parameter';
import { TypeDefinition } from '../ast/declaration/type';
import { BinaryExpression } from '../ast/expression/binary';
import { CallExpression } from '../ast/expression/call';
import { ConditionalExpression } from '../ast/expression/conditional';
import { GroupExpression } from '../ast/expression/group';
import { Identifier } from '../ast/expression/identifier';
import { LiteralBoolean, LiteralNumber } from '../ast/expression/literal';
import { PostfixExpression } from '../ast/expression/postfix';
import { PrefixExpression } from '../ast/expression/prefix';
import { PropertyExpression } from '../ast/expression/property';
import { StatementBlock } from '../ast/statement/block';
import { ReturnStatement } from '../ast/statement/return';
import { VariableDefinition } from '../ast/statement/variable';
import { CompilationUnit } from '../ast/unit';
import { AstVisitor } from './visitor';

/**
 * An AST Vistior that inputs and outputs a @see StringWriter instance.
 */
export class Humanizer extends AstVisitor<StringWriter, StringWriter> {
  visitBinaryExpression(
    astNode: BinaryExpression,
    context = new StringWriter(),
  ): StringWriter {
    astNode.left.accept(this, context);
    let operator;
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
    astNode.argumentList.forEach((arg, index) => {
      const last = index === astNode.argumentList.length - 1;
      arg.accept(this, context);
      if (!last) {
        context.write(', ');
      }
    });
    return context.write(')');
  }

  visitCompilationUnit(
    astNode: CompilationUnit,
    context = new StringWriter(),
  ): StringWriter {
    astNode.declarations.forEach((declaration) => {
      declaration.accept(this, context);
      context.writeLine();
    });
    return context;
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
    context.write(`func ${astNode.functionName}`);
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

  visitParameter(
    astNode: Parameter,
    context = new StringWriter(),
  ): StringWriter {
    context.write(astNode.name);
    if (astNode.type) {
      context.write(` : `);
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
      statement.accept(this, context);
    });
    return context.writeLine().indent(-2).write('}');
  }

  visitTypeDefinition(
    astNode: TypeDefinition,
    context = new StringWriter(),
  ): StringWriter {
    return context.write(astNode.typeName);
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
