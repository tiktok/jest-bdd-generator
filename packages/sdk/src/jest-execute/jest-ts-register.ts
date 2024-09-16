import { RegisterOptions, register as _register, TranspilerModule, CreateTranspilerOptions } from 'ts-node';
import { JestCucumberExecute } from './index';

// Register this file itself to be the *.ts transpiler
export function register(opts?: RegisterOptions): ReturnType<typeof _register> {
  const _opts = opts ?? {};
  _opts.transpileOnly = true;
  _opts.transpiler = __filename; //'./register';
  return _register(_opts);
}

// The required function for being a code-transpiler, Node.js calls it.
export const create: TranspilerModule['create'] = (opt: CreateTranspilerOptions) => {
  return new JestCucumberExecute();
};

register();
