import { FunctionDeclaration } from './declaration/function';
import { Parameter, ParameterList } from './declaration/parameter';
import { TypeDefinition } from './declaration/type';
import { VariableDeclaration } from './declaration/variable';
import { BinaryExpression } from './expression/binary';
import { Identifier } from './expression/identifier';
import { LiteralBoolean, LiteralNumber } from './expression/literal';
import { PrefixExpression } from './expression/prefix';
import { StatementBlock } from './statement/block';
import { CompilationUnit } from './unit';

export abstract class AstVisitor<R, C> {
  abstract visitBinaryExpression(astNode: BinaryExpression, context?: C): R;

  abstract visitCompilationUnit(astNode: CompilationUnit, context?: C): R;

  abstract visitFunctionDeclaration(
    astNode: FunctionDeclaration,
    context?: C,
  ): R;

  abstract visitIdentifier(astNode: Identifier, context?: C): R;

  abstract visitLiteralBoolean(astNode: LiteralBoolean, context?: C): R;

  abstract visitLiteralNumber(astNode: LiteralNumber, context?: C): R;

  abstract visitParameter(astNode: Parameter, context?: C): R;

  abstract visitParameterList(astNode: ParameterList, context?: C): R;

  abstract visitPrefixExpression(astNode: PrefixExpression, context?: C): R;

  abstract visitStatementBlock(astNode: StatementBlock, context?: C): R;

  abstract visitTypeDefinition(astNode: TypeDefinition, context?: C): R;

  abstract visitVariableDeclaration(
    astNode: VariableDeclaration,
    context?: C,
  ): R;
}
