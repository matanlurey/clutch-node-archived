import fs from 'fs-extra';
import minimist from 'minimist';
import readline from 'readline';
import { Scanner } from './common/scanner';
import { SourceFile } from './common/source';
import { StringWriter } from './common/string';
import { Lexer } from './compiler/lexer/lexer';
import { DiagnosticReporter } from './compiler/parser/diagnostic';
import { ModuleParser } from './compiler/parser/parser/module';
import { HumanWriterVisitor } from './compiler/parser/visitor/humanizer';
import { TreeWriterVisitor } from './compiler/parser/visitor/tree';
import { AstVisitor } from './compiler/parser/visitor/visitor';

const args = minimist(process.argv.slice(2), {
  alias: {
    i: 'input',
    o: 'output',
  },
});

const input = args['input'] as string | undefined;
const output = args['output'] as string | undefined;

let visitor: AstVisitor<StringWriter, StringWriter>;
switch (output) {
  case 'format':
    visitor = new HumanWriterVisitor();
    break;
  case 'tree':
    visitor = new TreeWriterVisitor();
    break;
  default:
    console.error('No --output, -o format specified: "format" or "tree".');
    process.exit(1);
}

function printOutput(file: string): void {
  const source = new SourceFile(file, 'REPL');
  const tokens = new Lexer().tokenize(new Scanner(source));
  const parser = new ModuleParser(tokens, new DiagnosticReporter(source));
  const result = parser.parseModuleRoot().accept(visitor);
  console.log('----------------\n');
  console.log(result.toString());
  console.log('----------------\n');
}

if (input) {
  const file = fs.readFileSync(input, 'utf-8');
  printOutput(file);
  process.exit(0);
}

const reader = readline.createInterface(process.stdin);
const lines: string[] = [];

console.info('Program >');

reader.on('line', (line) => {
  lines.push(line);
});

process.on('SIGINT', () => {
  if (lines.length === 0) {
    process.exit(0);
  }

  printOutput(lines.join('\n'));
  lines.length = 0;
});
