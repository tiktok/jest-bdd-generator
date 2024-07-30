import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

import * as pako from 'pako';

const ExpressionEditorWrap = styled('div')`
  background: var(--Background-Hover);
  > div {
    display: flex;
    height: 1.5em;
    width: 50em;
    flex-direction: row;
    > label {
      flex: 1 1 0;
    }
    > input[type='button'] {
      background: transparent;
    }
    > input,
    select {
      flex: 3 1 0;
      background: var(--Background-Hover);
      border: solid 1px;
    }
  }
`;

export type IColumnHead = {
  expression: Record<string, any>;
};

const Cell = styled('span')`
`;
const RowHead = styled('label')`
  position: relative;
  display: flex;
  // z-index: 999999999;
  width: 10em;
  min-height: 0.6em;
  cursor: pointer;
  > * {
    flex: 1 1 0;
    background: none;
    &: hover {
      background: var(--Label-P);
      color: var(--Background-P);
      min-height: 100%;
    }
  }
`;
const Table = styled('article')`
  font-size: 14px;
  position: relative;
  display: inline-flex;
  text-align: center;
  border-top: solid 1px var(--Label-T);
  border-left: solid 1px var(--Label-T);
  > aside {
    overflow: visible;
    > *:hover {
      overflow: visible;
      width: 99em;
      background: var(--Hover);
    }
  }
  > div {
    overflow: hidden;
  }
  aside, header {
    background-color: var(--Hover);
  }
  overflow: auto;
  span, label>* {
    display: inline-block;
    white-space: nowrap;
    width: 10em;
    height: 3em;
    line-height: 2.8em;
    border-right: solid 1px var(--Label-T);
    border-bottom: solid 1px var(--Label-T);
  }
`;


const enums = {
  'formatOption.notation': ['normal', 'compact', 'scientific', 'percent', 'per-mille'],
  'formatOption.relativeForm': ['between', 'approximately', 'atLeast', 'atMost'],
  'formatOption.compactDisplay': ['short', 'long'],
};
type IExpressions = IColumnHead['expression'];
type IExpressionProps<T extends keyof IColumnHead['expression']> = {
  name: T;
  data: IColumnHead['expression'];
  selections?: Array<IExpressions[T]>;
  focused: boolean;
};
interface ExpressionFC {
  <P extends keyof IColumnHead['expression']>(...args: Parameters<React.FC<IExpressionProps<P>>>): ReturnType<
    React.FC<IExpressionProps<P>>
  >;
}
const testStringyValue = <T = any,>(reference: T, rawValue: T | string): boolean => {
  switch (typeof reference) {
    case 'number':
      return Number(rawValue) === reference;
    case 'boolean':
      return Boolean(rawValue) === reference;
    case 'string':
    default:
      return rawValue === reference;
  }
};

const ExpressionInput: ExpressionFC = ({ name, data, selections, focused }) => {
  const [expression, setExpression] = useState<string | number>();

  useEffect(() => {
    if (data[name] === '' || data[name] === undefined) {
      setExpression('');
    } else if (selections) {
      setExpression(selections.findIndex((s) => testStringyValue(s, data[name])));
    } else {
      setExpression(data[name]?.toString() ?? '');
    }
  }, [data, name]);
  const loser: React.FormEventHandler = (e): void => {
    if (!data) {
      return;
    }
    const target = e.target as HTMLSelectElement;
    if (target.value === '') {
      delete data[name];
    } else {
      const value = selections ? selections[Number(target.value)] : target.value;
      data[name] = value as any;
    }
    setExpression(target.value);
  };
  return selections ? (
    <select
      ref={(input) => focused && input?.focus()}
      name={name}
      value={expression}
      onInput={loser}
      style={{ background: data[name] === undefined ? '#ccc' : 'transparent' }}
    >
      <option value="">-none</option>
      {selections.map((str, i) => (
        <option key={i} value={i}>
          {str?.toString()}
        </option>
      ))}
    </select>
  ) : (
    <input
      ref={(input) => focused && input?.focus()}
      name={name}
      autoFocus={focused}
      onInput={loser}
      value={expression}
      placeholder="-none"
      style={{ background: data[name] === undefined ? '#ccc' : 'transparent' }}
    />
  );
};

const ExpressionEditor: React.FC<{
  colHead: IColumnHead | undefined;
  focused?: keyof IColumnHead['expression'];
  insertBefore: () => void;
  deleting: () => void;
  insertAfter: () => void;
}> = ({ colHead, insertBefore, deleting, insertAfter, focused }) => {
  return (
    <ExpressionEditorWrap>
      {colHead ? (
        <>
          <div>
            <input type="button" value="InsertBefore" onClick={insertBefore} />
            <input type="button" value="Delete" onClick={deleting} />
            <input type="button" value="InsertAfter" onClick={insertAfter} />
          </div>
        </>
      ) : (
        <></>
      )}
    </ExpressionEditorWrap>
  );
};

const Head: < T extends object = Record<string, any>>(...args: Parameters<React.FC<{
  colHead: { expression: T; };
  titles?: Array<keyof T>;
  isEditing: boolean;
  handler: (colHead?: { expression: T; }, keyname?: keyof T) => void;
  style?: React.CSSProperties;
}>>) => ReactElement = ({ colHead, handler, isEditing, style, titles }) => {
  type _iColHead = typeof colHead;
  const displayTitle = titles ?? (Object.keys(colHead.expression) as [keyof _iColHead['expression']]);
  const myStyle = {
    ...style,
    width: titles ? displayTitle.length + '0em' : '10em',
    background: isEditing ? '#ffa' : 'transparent',
  };
  return (
    <RowHead style={myStyle} title={JSON.stringify(colHead.expression)}>
      {displayTitle.length ? (
        displayTitle.map((exp, i) => (
          <a key={'a' + i} onClick={() => handler(colHead, exp)}>
            {(colHead.expression as _iColHead['expression'])[exp]?.toString()}
          </a>
        ))
      ) : (
        <a onClick={() => handler(colHead, Object.keys(colHead.expression)[0] as keyof _iColHead['expression'])}>-empty-</a>
      )}
    </RowHead>
  );
};

export const TestOracle: <C extends { expression: Record<string, any> }, R extends { expression: Record<string, any> }>(...args: Parameters<React.FC<{
  fnGenerate: (rowExp: R, colExp: C) => Promise<string[]>;
  setEditingHead: (head: R | C | undefined) => void;
  defaultCols: C[];
  defaultRows: R[];
}>>) => ReturnType<React.FC> = ({ fnGenerate, defaultCols, defaultRows, setEditingHead }) => {
  type _iRowHead = (typeof defaultRows)[0];
  type _iColumnHead = (typeof defaultCols)[0];
  const [cols, setCols] = useState<_iColumnHead[]>(defaultCols);
  const [rows, setRows] = useState<_iRowHead[]>(defaultRows);
  const [editingKey, setEditingKey] = useState<keyof _iRowHead['expression'] | undefined>();
  const [result, setResult] = useState<string[][] | undefined>();

  const [selected] = useState<_iRowHead | _iColumnHead | undefined>(undefined)

  let compressed = btoa(String.fromCharCode.apply(null, pako.deflate(JSON.stringify([cols, rows])) as any));

  useEffect(() => {
    if (window?.location?.hash !== undefined) {
      const restoredRaw = window.location.hash.substring(1);
      if (!restoredRaw) {
        return;
      }
      compressed = restoredRaw;
      //@ts-ignore
      const restoredString = pako.inflate(new Uint8Array([...atob(restoredRaw)].map((c) => c.charCodeAt(0))), {
        to: 'string',
      });

      // const [colsRestored, rowsRestored] = JSON.parse(restoredString);
      // setRows(rowsRestored);
      // setCols(colsRestored);
    }
  }, []);

  useEffect(() => {
    if (window?.location?.hash !== undefined) {
      window.location.hash = compressed;
    }
  }, [compressed]);

  // const getEditingArray = (): [number, Array<_iColumnHead | _iRowHead>, React.Dispatch<Array<_iRowHead>> | React.Dispatch<Array<_iColumnHead>>] => {
  //   const idxRows = rows.findIndex((h) => h === selected);
  //   if (idxRows !== -1) {
  //     return [idxRows, rows, setRows];
  //   } else {
  //     const idxCols = cols.findIndex((h) => h === selected);
  //     if (idxCols !== -1) {
  //       return [idxCols, cols, setCols];
  //     }
  //   }
  //   throw new Error('not found');
  // };

  // const insertBefore = (): void => {
  //   const [idxRows, editingArray, update] = getEditingArray();
  //   editingArray.splice(idxRows, 0, { expression: {} } as _iRowHead);
  //   update([...editingArray]);
  // };

  // const deleting = (): void => {
  //   const [idxRows, editingArray, update] = getEditingArray();
  //   editingArray.splice(idxRows, 1);
  //   setEditingHead(undefined);
  //   update([...editingArray]);
  // };

  // const insertAfter = (): void => {
  //   const [idxRows, editingArray, update] = getEditingArray();
  //   editingArray.splice(idxRows + 1, 0, { expression: {} } as _iRowHead);
  //   update([...editingArray]);
  // };

  const width = { width: `${cols.length * 10}em` };

  const run = async (): Promise<void> => {
    const ret = await Promise.all(
      rows.map(
        async (rowExp) =>
          await Promise.all(
            cols.map(async (colExp) => {
              try {
                return await fnGenerate(rowExp, colExp)
              } catch (err: any) {
                return err.message ?? err?.toString() ?? err;
              }
            }),
          ),
      ),
    );
    setResult(ret);
  };

  // const headClickHandler = (data?: _iRowHead, keyname?: keyof _iRowHead['expression']): void => {
  //   setEditingKey(keyname);
  //   setEditingHead(data);
  // };

  const arrRowExpression: Array<keyof _iRowHead['expression']> = rows.reduce<Array<keyof _iRowHead['expression']>>((prev, { expression }) => {
    const keys = Object.keys(expression) as Array<keyof _iRowHead['expression']>;
    return prev.concat(keys).filter((dup, id, arr) => arr.indexOf(dup) === id);
  }, []);

  const clipboard = async (): Promise<void> => {
    const headArray = [...arrRowExpression, ...cols.map((c) => Object.values(c.expression).join(';'))];
    const resultArray =
      result?.map((row, i) => [...arrRowExpression.map((k) => (rows[i].expression as _iRowHead['expression'])[k] ?? ''), ...row]) ?? [];
    const resultTableFormat = [headArray, ...resultArray].map((row) => row.join(' | ')).join('\n');
    await navigator.clipboard.writeText(resultTableFormat);
  };
  return (
    <>
      <div className='flex flex-row gap-2 py-2'>
        <button onClick={run}>Run</button>
        <button onClick={clipboard}>Copy</button>
      </div>
      <div className=' basis-full'>
        <Table>
          <aside>
            <RowHead style={{ width: '100%' }} >
              {arrRowExpression.map((title, i) => (
                <a key={i}>{(title as string).replace('formatOption', 'opt')}</a>
              ))}
            </RowHead>
            {rows.map((r, i) => (
              <Head key={i} handler={() => { }} titles={arrRowExpression as any} colHead={r} isEditing={selected === r} />
            ))}
          </aside>
          <div style={{ overflow: 'auto', ...width }}>
            <header>
              {cols.map((col, j) => (
                <Head key={j} handler={() => { }} colHead={col} isEditing={selected === col} style={{ display: 'inline-flex' }} />
              ))}
            </header>
            {rows.map((r, i) => (
              <div key={i}>
                {cols.map((col, j) => (
                  <Cell key={j}>{`${result?.[i]?.[j] ?? '--'}\t`}</Cell>
                ))}
              </div>
            ))}
          </div>
        </Table>
      </div>
    </>
  );
};
