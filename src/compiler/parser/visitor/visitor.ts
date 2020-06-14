import { RecoveryNode } from '../ast/ast';
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

export abstract class AstVisitor<R, C> {
  abstract visitBinaryExpression(astNode: BinaryExpression, context?: C): R;

  abstract visitCallExpression(astNode: CallExpression, context?: C): R;

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

  abstract visitLiteralString(astNode: LiteralString, context?: C): R;

  abstract visitModuleDeclaration(astNode: ModuleDeclaration, context?: C): R;

  abstract visitModuleRoot(astNode: ModuleRoot, context?: C): R;

  abstract visitParameter(astNode: Parameter, context?: C): R;

  abstract visitParameterList(astNode: ParameterList, context?: C): R;

  abstract visitPostfixExpression(astNode: PostfixExpression, context?: C): R;

  abstract visitPrefixExpression(astNode: PrefixExpression, context?: C): R;

  abstract visitPropertyExpression(astNode: PropertyExpression, context?: C): R;

  abstract visitRecoveryNode(astNode: RecoveryNode, context?: C): R;

  abstract visitReturnStatement(astNode: ReturnStatement, context?: C): R;

  abstract visitStatementBlock(astNode: StatementBlock, context?: C): R;

  abstract visitVariableDefinition(astNode: VariableDefinition, context?: C): R;
}
