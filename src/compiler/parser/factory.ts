/* eslint-disable @typescript-eslint/ban-types */
import { Token } from '../lexer/token';
import {
  BinaryOperator,
  Declaration,
  Expression,
  PostfixOperator,
  PrefixOperator,
  Statement,
} from './ast/ast';
import { FunctionDeclaration } from './ast/declaration/function';
import { ModuleDeclaration, ModuleRoot } from './ast/declaration/module';
import { Parameter, ParameterList } from './ast/declaration/parameter';
import { BinaryExpression } from './ast/expression/binary';
import { CallExpression } from './ast/expression/call';
import { ConditionalExpression } from './ast/expression/conditional';
import { GroupExpression } from './ast/expression/group';
import { Identifier } from './ast/expression/identifier';
import { LiteralBoolean, LiteralNumber } from './ast/expression/literal';
import { PostfixExpression } from './ast/expression/postfix';
import { PrefixExpression } from './ast/expression/prefix';
import { PropertyExpression } from './ast/expression/property';
import { StatementBlock } from './ast/statement/block';
import { ReturnStatement } from './ast/statement/return';
import { VariableDefinition } from './ast/statement/variable';
import { CompilationUnit } from './ast/unit';

/**
 * Delegate class for creating new instances of @see AstNode.
 *
 * Potentially allows overriding and providing alternative implementations.
 */
export class AstFactory {
  /**
   * @see BinaryExpression
   */
  createBinaryExpression(
    left: Expression,
    right: Expression,
    operator: BinaryOperator,
  ): BinaryExpression {
    return new BinaryExpression(left, right, operator);
  }

  createCallExpression(
    receiver: Expression,
    argumentList: Expression[],
    lastToken: Token,
  ): CallExpression {
    return new CallExpression(receiver, argumentList, lastToken);
  }

  /**
   * @see CompilationUnit
   */
  createCompilationUnit(
    declarations: Declaration[],
    eof: Token,
  ): CompilationUnit {
    return new CompilationUnit(declarations, eof);
  }

  /**
   * @see ConditionalExpression
   */
  createConditionalExpression(
    ifToken: Token,
    condition: Expression,
    thenExpr: Expression,
    elseExpr: Expression,
  ): ConditionalExpression {
    return new ConditionalExpression(ifToken, condition, thenExpr, elseExpr);
  }

  /**
   * @see FunctionDeclaration
   */
  createFunctionDeclaration(
    keyword: Token,
    name: Identifier,
    parameters?: ParameterList,
    returnType?: Identifier,
    statements?: StatementBlock,
  ): FunctionDeclaration {
    return new FunctionDeclaration(
      keyword,
      name,
      parameters,
      returnType,
      statements,
    );
  }

  /**
   * @see GroupExpression
   */
  createGroupExpression(
    open: Token,
    expr: Expression,
    close: Token,
  ): GroupExpression {
    return new GroupExpression(open, expr, close);
  }

  /**
   * @see Identifier
   */
  createIdentifier(identifier: Token): Identifier {
    return new Identifier(identifier);
  }

  /**
   * @see LiteralBoolean
   */
  createLiteralBoolean(literal: Token, value: boolean): LiteralBoolean {
    return new LiteralBoolean(literal, value);
  }

  /**
   * @see LiteralNumber
   */
  createLiteralNumber(literal: Token, value: number): LiteralNumber {
    return new LiteralNumber(literal, value);
  }

  /**
   * @see ModuleDeclaration
   */
  createModuleDeclaration(declarations: Declaration[]): ModuleDeclaration {
    return new ModuleDeclaration(declarations);
  }

  /**
   * @see ModuleRoot
   */
  createModuleRoot(modules: ModuleDeclaration[], endOfFile: Token): ModuleRoot {
    return new ModuleRoot(modules, endOfFile);
  }

  /**
   * @see Parameter
   */
  createParameter(
    nameToken: Token,
    type?: Identifier,
    value?: Expression,
  ): Parameter {
    return new Parameter(nameToken, type, value);
  }

  /**
   * @see ParameterList
   */
  createParameterList(
    firstToken: Token,
    parameters: Parameter[],
    lastToken: Token,
  ): ParameterList {
    return new ParameterList(firstToken, parameters, lastToken);
  }

  /**
   * @see PrefixExpression
   */
  createPrefixExpression(
    expression: Expression,
    operatorToken: Token,
    operator: PrefixOperator,
  ): PrefixExpression {
    return new PrefixExpression(expression, operatorToken, operator);
  }

  /**
   * @see PropertyExpression
   */
  createPropertyExpresson(
    receiver: Expression,
    property: Identifier,
  ): PropertyExpression {
    return new PropertyExpression(receiver, property);
  }

  /**
   * @see PostfixExpression
   */
  createPostfixExpression(
    expression: Expression,
    operatorToken: Token,
    operator: PostfixOperator,
  ): PostfixExpression {
    return new PostfixExpression(expression, operatorToken, operator);
  }

  /**
   * @see ReturnStatement
   */
  createReturnStatement(
    keyword: Token,
    expression: Expression,
  ): ReturnStatement {
    return new ReturnStatement(keyword, expression);
  }

  /**
   * @see StatementBlock
   */
  createStatementBlock(
    firstToken: Token,
    lastToken: Token,
    statements: Statement[],
  ): StatementBlock {
    return new StatementBlock(firstToken, lastToken, statements);
  }

  /**
   * @see VariableDefinition
   */
  createVariableDefinition(
    define: Token,
    name: Identifier,
    type?: Identifier,
    initialValue?: Expression,
  ): VariableDefinition {
    return new VariableDefinition(define, name, type, initialValue);
  }
}
