import { Token } from '../../../lexer/token';
import { AstVisitor } from '../../visitor/visitor';
import { Expression } from '../ast';
import { Identifier } from './identifier';

export class PropertyExpression extends Expression {
  constructor(readonly receiver: Expression, readonly property: Identifier) {
    super();
  }

  accept<R, C>(visitor: AstVisitor<R, C>, context?: C): R {
    return visitor.visitPropertyExpression(this, context);
  }

  get firstToken(): Token {
    return this.receiver.firstToken;
  }

  get lastToken(): Token {
    return this.property.lastToken;
  }
}
