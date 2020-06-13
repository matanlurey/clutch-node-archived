import { RecoveryNode } from '../ast/ast';
import { FunctionDeclaration } from '../ast/declaration/function';
import { Parameter, ParameterList } from '../ast/declaration/parameter';
import { TypeDefinition } from '../ast/declaration/type';
import { VariableDeclaration } from '../ast/declaration/variable';
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
import { CompilationUnit } from '../ast/unit';

export abstract class AstVisitor<R, C> {
  abstract visitBinaryExpression(astNode: BinaryExpression, context?: C): R;

  abstract visitCallExpression(astNode: CallExpression, context?: C): R;

  abstract visitCompilationUnit(astNode: CompilationUnit, context?: C): R;

  abstract visitConditionalExpression(
    astNode: ConditionalExpression,
    context?: C,
  ): R;

  abstract visitFunctionDeclaration(
    astNode: FunctionDeclaration,
    context?: C,
  ): R;

  abstract visitGroupExpression(astNode: GroupExpression, context?: C): R;

  abstract visitIdentifier(astNode: Identifier, context?: C): R;

  abstract visitLiteralBoolean(astNode: LiteralBoolean, context?: C): R;

  abstract visitLiteralNumber(astNode: LiteralNumber, context?: C): R;

  abstract visitParameter(astNode: Parameter, context?: C): R;

  abstract visitParameterList(astNode: ParameterList, context?: C): R;

  abstract visitPostfixExpression(astNode: PostfixExpression, context?: C): R;

  abstract visitPrefixExpression(astNode: PrefixExpression, context?: C): R;

  abstract visitPropertyExpression(astNode: PropertyExpression, context?: C): R;

  abstract visitRecoveryNode(astNode: RecoveryNode, context?: C): R;

  abstract visitStatementBlock(astNode: StatementBlock, context?: C): R;

  abstract visitTypeDefinition(astNode: TypeDefinition, context?: C): R;

  abstract visitVariableDeclaration(
    astNode: VariableDeclaration,
    context?: C,
  ): R;
}
