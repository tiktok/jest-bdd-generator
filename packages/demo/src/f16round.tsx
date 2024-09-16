import React from 'react';
import { TestOracle } from 'jest-bdd-generator/UI/TestOracle';
declare global {
  interface Math {
    f16round: (num: number) => number;
  }
}

export function TestOracleF16Round() {
  return (
    <TestOracle<{ num: number; method: 'ceil' | 'floor' | 'round' | 'fround' | 'f16round' }>
      defaultRows={[
        { num: 9.1, note: '+0.1' },
        { num: -9.1, note: '-0.1' },
        { num: 9.9, note: '+0.9' },
        { num: -9.9, note: '-0.9' },
        { num: 9.5, note: '+0.5' },
        { num: -9.5, note: '-0.5' },
        { num: 9.4, note: '+0.4' },
        { num: -9.4, note: '-0.4' },
        { num: 9.6, note: '+0.6' },
        { num: -9.6, note: '-0.6' }
      ]}
      defaultCols={[
        { method: 'ceil' },
        { method: 'floor' },
        { method: 'round' },
        { method: 'fround' },
        { method: 'f16round' }
      ]}
      colSelections={{
        num: Number.NaN,
        method: ['ceil', 'floor', 'round', 'fround', 'f16round']
      }}
      execute={async (opt) =>
        opt.method ? JSON.stringify(Math[opt.method]?.(opt.num ?? NaN)) : 'Method Required'
      }
    />
  );
}
