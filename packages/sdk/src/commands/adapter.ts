/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import * as process from 'process';
import * as path from 'path';
import * as fs from 'fs';
// console.log(process.argv)

const OUTPUT_PARAM = 'pathOutput';

function fetchArgV(name: string): (str: string) => string | undefined {
  return (arg: string) => {
    const match = arg.match(new RegExp(`^${name}=(.+)`, 'i'));
    return match?.[1];
  };
}

export async function run<Opt extends Record<string, unknown>, Ret>(
  execute: (opt: Opt) => Ret,
  defaultOption?: Opt & { [OUTPUT_PARAM]?: string },
  pathlikeFromArgV?: Array<keyof (Opt & { [OUTPUT_PARAM]: string })>,
): Promise<Ret | Ret[]> {
  const [_execPath, ...args] = process.argv;
  const options = {
    ...defaultOption,
  } as NonNullable<typeof defaultOption>;

  const argsNames: typeof pathlikeFromArgV = [
    OUTPUT_PARAM,
    ...(defaultOption ? Object.keys(defaultOption) : []),
    ...(pathlikeFromArgV ?? []),
  ];

  args.forEach((arg) => {
    argsNames.forEach((key) => {
      const opt = fetchArgV(key as string)(arg);
      if (opt?.match(/^\.\/|^\.\.\//)) {
        options[key] = path.join(process.cwd(), opt) as typeof defaultOption[keyof typeof defaultOption];
      }
    });
  });
  const executables: Array<Opt> = [];
  Object.keys(options).forEach((argName) => {
    if (argName === OUTPUT_PARAM || !pathlikeFromArgV?.includes(argName)) {
      return;
    }
    const optionValue = options[argName];
    if (typeof optionValue === 'string' && fs.statSync(optionValue).isDirectory()) {
      fs.readdirSync(optionValue).forEach((fileinfo) => {
        const _option = {
          ...options,
          [argName]: path.join(optionValue, fileinfo),
        };
        const baseName = path.basename(fileinfo, path.extname(fileinfo));
        if (options[OUTPUT_PARAM]) {
          const outputExt = path.extname(options[OUTPUT_PARAM]);
          const outputPath = path.dirname(options[OUTPUT_PARAM]);
          _option[OUTPUT_PARAM] = path.join(outputPath, `${baseName}${outputExt}`);
        }
        executables.push(_option);
      });
    }
  });

  if (executables.length === 0) {
    executables.push(options);
  }

  const ret = await Promise.all(
    executables.map(async (_option) => {
      const res = await execute(_option);

      if (typeof _option[OUTPUT_PARAM] === 'string') {

        const outputPath = path.dirname(_option[OUTPUT_PARAM]);
        if (!fs.existsSync(outputPath)) {
          fs.mkdirSync(outputPath);
        }
        
        fs.writeFileSync(_option[OUTPUT_PARAM], res as string);
      } else {
        console.log(res);
      }
      return res;
    }),
  );

  return ret;
}
