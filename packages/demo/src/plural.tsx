import React from 'react';
import { TestOracle } from 'jest-bdd-generator/UI/TestOracle';

function resolveRule(exp: string): string {
  const idxDesc = exp.indexOf('@');
  const baseRule = exp.substring(0, idxDesc < 0 ? undefined : idxDesc);
  if (baseRule.match(/^\s+$/)) {
    return `return true`;
  }
  const connectedRule = baseRule.replace(/\band\b/g, '&&').replace(/\bor\b/g, '||');
  const expressedRule = connectedRule.replace(
    /(\w(?:\s?%\s?\d+)?) (!?=) ([\s\d\,\.]+)/g,
    (match, p1: string, p2: string, p3: string, offset, str, groups) => {
      const oparator = p2 === '=' ? '===' : '!==';
      let exp = `(${p1} ${oparator} ${p3})`;

      if (p3.indexOf(',') !== -1) {
        const expParts = p3.split(',').map((v) => resolveRuleValue(p1, oparator, v));
        if (oparator === '!==') {
          exp = expParts.join(' && ');
        } else {
          exp = expParts.join(' || ');
        }
      } else {
        exp = resolveRuleValue(p1, oparator, p3);
      }
      return `(${exp})`;
    }
  );
  return `return ${expressedRule}`;
}
function resolveRuleValue(p1: string, oparator: string, p3: string): string {
  let exp = `${p1} ${oparator} ${p3}`;
  if (p3.indexOf('..') !== -1) {
    const [start, end] = p3.split('..');
    exp = `${p1} >= ${start} && ${p1} <= ${end}`;
    if (oparator === '!==') {
      exp = `!(${exp})`;
    }
  }
  return exp;
}

type IPluralKey =
  | 'pluralRule-count-zero'
  | 'pluralRule-count-one'
  | 'pluralRule-count-two'
  | 'pluralRule-count-few'
  | 'pluralRule-count-many'
  | 'pluralRule-count-other';
type ILocaleKey = string;

type IColumnHead = {
  keys: ILocaleKey;
  expression: string;
  num: string;
};
const defaultRows: Partial<IColumnHead & { note: string }>[] = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '100',
  '1000',
  '10000',
  '0.1',
  '0.2',
  '0.3',
  '0.4',
  '0.5',
  '0.6',
  '0.7',
  '0.8',
  '0.9',
  '1.1',
  '2.1',
  '3.1',
  '1.2',
  '2.2',
  '3.2',
  '0.10',
  '0.100',
  '0.1000',
  '0.10000'
].map((n) => ({ num: n }));
const dataPreset: Promise<{
  supplemental: {
    version: {};
    'plurals-type-cardinal': {
      [key: ILocaleKey]: {
        [key in IPluralKey]?: string;
      };
    };
  };
}> = fetch('https://raw.githubusercontent.com/unicode-cldr/cldr-core/master/supplemental/plurals.json').then(
  (res) => res.json()
);

async function execute(options: Partial<IColumnHead>): Promise<React.ReactNode> {
  const data = await dataPreset;

  if (!options.keys) {
    return 'key invalid';
  }

  const items = data.supplemental['plurals-type-cardinal'][options.keys];
  if (!items) {
    return 'NA';
  }
  if (!options.num) {
    return 'NA';
  }
  let ret: React.ReactNode = '/';
  // eslint-disable-next-line guard-for-in
  for (const ruleName in items) {
    const expression = items[ruleName as IPluralKey];
    if (!expression) {
      continue;
    }
    // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
    const tester = new Function('n', 'i', 'v', 'w', 'f', 't', 'c', 'e', resolveRule(expression));

    const n = parseInt(options.num);
    const [i, f = ''] = options.num.split('.');
    const t = f.replace(/0+$/, '');
    const v = f.length;
    const w = t.length;
    const c = 0;
    const e = 0;
    if (tester(n, parseInt(i), v, w, f ? parseInt(f) : 0, t, c, e)) {
      ret = <div title={expression}> {ruleName.split('-').slice(-1)[0]}</div>;
      break;
    }
  }
  return ret;
}

export function TestOraclePluralRule(): React.ReactElement<any, any> {
  const [source, setSource] = React.useState<Awaited<typeof dataPreset>>();
  void dataPreset.then((data) => {
    setSource(data);
  });

  if (source) {
    const keys: ILocaleKey[] = Object.keys(source.supplemental['plurals-type-cardinal']);
    const defaultCols: Partial<IColumnHead>[] = keys.map((keys) => ({ keys }));

    const colSelections = {
      keys,
      num: ''
    };

    return (
      <TestOracle
        colSelections={colSelections}
        defaultCols={defaultCols}
        defaultRows={defaultRows}
        execute={execute}
      />
    );
  } else {
    return <h1>https://raw.githubusercontent.com/unicode-cldr/cldr-core/master/supplemental/plurals.json</h1>;
  }
}
