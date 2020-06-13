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
import { Parameter, ParameterList } from './ast/declaration/parameter';
import { TypeDefinition } from './ast/declaration/type';
import { VariableDeclaration } from './ast/declaration/variable';
import { BinaryExpression } from './ast/expression/binary';
import { CallExpression } from './ast/expression/call';
import { ConditionalExpression } from './ast/expression/conditional';
import { GroupExpression } from './ast/expression/group';
import { Identifier } from './ast/expression/identifier';
import { LiteralBoolean, LiteralNumber } from './ast/expression/literal';
import { PostfixExpression } from './ast/expression/postfix';
import { PrefixExpression } from './ast/expression/prefix';
import { StatementBlock } from './ast/statement/block';
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
    funcToken: Token,
    nameToken: Token,
    parameters?: ParameterList,
    returnType?: TypeDefinition,
    statements?: StatementBlock,
  ): FunctionDeclaration {
    return new FunctionDeclaration(
      funcToken,
      nameToken,
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
   * @see Parameter
   */
  createParameter(
    nameToken: Token,
    type?: TypeDefinition,
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
   * @see TypeDefinition
   */
  createTypeDefinition(name: Token): TypeDefinition {
    return new TypeDefinition(name);
  }

  /**
   * @see VariableDeclaration
   */
  createVariableDeclaration(
    letToken: Token,
    nameToken: Token,
    type?: TypeDefinition,
    initialValue?: Expression,
  ): VariableDeclaration {
    return new VariableDeclaration(letToken, nameToken, type, initialValue);
  }
}
