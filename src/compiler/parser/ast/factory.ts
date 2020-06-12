/* eslint-disable @typescript-eslint/ban-types */
import { Token } from '../../lexer/token';
import {
  BinaryOperator,
  Declaration,
  Expression,
  PrefixOperator,
  Statement,
} from './ast';
import { FunctionDeclaration } from './declaration/function';
import { Parameter, ParameterList } from './declaration/parameter';
import { TypeDefinition } from './declaration/type';
import { VariableDeclaration } from './declaration/variable';
import { BinaryExpression } from './expression/binary';
import { LiteralBoolean, LiteralNumber } from './expression/literal';
import { PrefixExpression } from './expression/prefix';
import { StatementBlock } from './statement/block';
import { CompilationUnit } from './unit';

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
