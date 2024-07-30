import React, { ReactElement, TransitionEventHandler, useCallback, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import * as pako from 'pako';

const BACKGROUND_EDITOR = '#E0EFF8';
const EditorWrap = styled('section')`
  background: ${BACKGROUND_EDITOR};
  width: 50em;
`;
const ExpressionEditorWrap = styled('div')`
  > div {
    border-bottom: solid 1px #cee
    font-size: 12px;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    > label {
      flex: 1 1 0;
      text-align: right;
      overflow: hidden;
    }
    > input[type='button'] {
      background: transparent;
    }
    > input {
      text-indent: 0.2em;
    }
    > input, >select {
      font-size: 12px;
      flex: 2 1 0;
      height: 2em;
      margin: 1px;
      padding: 0 .8em;
      border: solid 1px #cff;
      border-radius: .4em;
    }
    > input.empty, >select.empty {
      background: #ccc;
      color: #866;
    }
    > input::placeholder {
      color: #866;
    }
  }
`;

const PasteReceiver = styled('div')`
  padding: 5em 0;
  margin: 1em;
  text-align: center;
  align-items: stretch;
  border: dashed;
  background: rgba(255, 255, 255, 0.5);
  &:focus {
    background: #aa6;
  }
  em,
  i,
  b {
    float: left;
    padding: 0 1em;
  }
  i {
    text-decoration: line-through;
    color: #a88;
  }
  em {
    color: #888;
  }
`;

const Cell = styled('span')`
  text-align: right;
  background: #cff;
  height: 1.5em;
`;
const RowHead = styled('label')`
  transition: all 0.3s;
  display: inline-flex;
  margin: 0 1px 1px;
  min-height: 0.6em;
  cursor: pointer;
  justify-content: end;
  > * {
    flex: 1 1 10em;
    transition: all 0.3s;
    width: 10em;
    height: 1.5em;
  }
`;
const Table = styled('article')`
  font-size: 10px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: end;
  > aside {
    overflow: visible;
  }
  > div {
    overflow: auto;
    > div {
      display: flex;
      width: max-content;
    }
    > div > label {
      flex-direction: column;
      > * {
        flex: 0 1 1.5em;
      }
    }
  }
  > div,
  > aside {
    display: flex;
    flex-direction: column;
    > div {
      overflow: hidden;
    }
  }

  overflow: auto;
  span {
    transition: all 0.3s;
    margin: 0 1px 1px;
    display: inline-block;
    height: 1.5em;
    width: 10em;
    white-space: nowrap;
  }
  .highlight {
    background: #eff;
    span {
      background: #eff;
    }
    .highlight {
      background: #ffa;
    }
  }
`;

export function restoreHash<T>(): [T[], T[], string] {
  if (!window?.location?.hash) {
    return [[], [], ''];
  }
  const restoredRaw = window.location.hash.substring(1);
  if (!restoredRaw) {
    return [[], [], ''];
  }
  const restoredString = pako.inflate(new Uint8Array([...atob(restoredRaw)].map((c) => c.charCodeAt(0))), {
    to: 'string',
  });

  const [colsRestored, rowsRestored] = JSON.parse(restoredString);
  return [colsRestored, rowsRestored, restoredRaw];
}

function testStringyValue<T extends string | number | boolean>(reference: T, rawValue: T | undefined): boolean {
  return convertStringyValue(reference, rawValue) === reference;
}

function convertStringyValue<T extends string | number | boolean>(
  reference: T | T[],
  rawValue: T | undefined,
): T | undefined {
  if (Array.isArray(reference)) {
    return reference.find((s) => testStringyValue(s, rawValue));
  }
  switch (typeof reference) {
    case 'number':
      const val = Number(rawValue);
      return isNaN(val) ? undefined : (val as T);
    case 'boolean':
      return Boolean(rawValue) as T;
    case 'string':
    default:
      return rawValue as T;
  }
}

function ExpressionInput<T extends Record<string, string | number | boolean>>({
  name,
  data,
  selections,
  focused,
  onPaste,
  onChange,
}: {
  name: keyof T;
  data: Partial<T>;
  selections: T[typeof name] | Array<T[typeof name]>;
  focused: boolean;
  onPaste?: React.ClipboardEventHandler;
  onChange?: React.ChangeEventHandler;
}): ReactElement<any, any> {
  const [expression, setExpression] = useState<(typeof data)[typeof name] | undefined>();

  const changeHandler = useCallback(
    (evt: React.ChangeEvent) => {
      onChange?.(evt);
    },
    [name, data],
  );
  useEffect(() => {
    const val = data[name];
    if (val === '' || val === undefined) {
      setExpression('' as never);
    } else {
      setExpression(convertStringyValue(selections, val));
    }
  }, [data, name]);
  const loser: React.FormEventHandler = (e): void => {
    if (!data) {
      return;
    }
    const target = e.target as HTMLSelectElement;
    if (target.value === '') {
      delete data[name];
      setExpression(undefined);
    } else {
      const value = Array.isArray(selections)
        ? selections[Number(target.value)]
        : convertStringyValue(selections, target.value as typeof selections);
      data[name] = value;
      setExpression(value);
    }
    changeHandler(e as React.ChangeEvent);
  };
  return Array.isArray(selections) ? (
    <select
      ref={(input) => focused && input?.focus()}
      name={name.toString()}
      value={selections.findIndex((s) => s === expression)}
      onInput={loser}
      onPaste={onPaste}
      className={data[name] === undefined ? 'empty' : ''}
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
      name={name.toString()}
      autoFocus={focused}
      onInput={loser}
      value={expression?.toString() ?? ''}
      onPaste={onPaste}
      placeholder="-none"
      className={data[name] === undefined ? 'empty' : ''}
    />
  );
}
function ExpressionEditor<
  T extends Record<string, string | number | boolean>,
  K extends string = Exclude<Exclude<keyof T, symbol>, number>,
>({
  colSetting,
  colHead,
  insertBefore,
  deleting,
  insertAfter,
  focused,
  onPaste,
  onChange,
}: {
  colSetting: Partial<{
    [k in K]: Array<NonNullable<T[k]>> | NonNullable<T[k]>;
  }>;
  colHead: { expression: Partial<T> } | undefined;
  focused?: K;
  insertBefore: () => void;
  deleting: () => void;
  insertAfter: () => void;
  onPaste?: React.ClipboardEventHandler;
  onChange?: React.ChangeEventHandler;
}): ReactElement<any, any> {
  const keys: Array<K> = colSetting ? (Object.keys(colSetting) as Array<K>) : [];
  return (
    <ExpressionEditorWrap onPaste={onPaste}>
      {colHead ? (
        <>
          <div>
            <input type="button" value="InsertBefore" onClick={insertBefore} />
            <input type="button" value="Delete" onClick={deleting} />
            <input type="button" value="InsertAfter" onClick={insertAfter} />
          </div>
          {...keys.map((key, i) => {
            const selections = colSetting[key]!;
            return (
              <div key={i}>
                <label>{key}&nbsp;:&nbsp;</label>
                <ExpressionInput
                  selections={selections}
                  onChange={onChange}
                  name={key}
                  data={colHead.expression}
                  focused={focused === key}
                />
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </ExpressionEditorWrap>
  );
}

function Head<
  T extends Record<string, string | number | boolean>,
  K extends string = Exclude<Exclude<keyof T, symbol>, number>,
>({
  colHead,
  onClick,
  isEditing,
  style,
  className,
  titles,
  getTrigger,
  targeted,
}: {
  colHead: { expression: Partial<T> };
  titles?: Array<K>;
  isEditing: boolean;
  onClick: (colHead?: { expression: Partial<T> }, keyName?: K) => void;
  getTrigger?: (forceUpdate: React.DispatchWithoutAction) => void;
  style?: React.CSSProperties;
  className?: string;
  targeted?: K;
}): ReactElement<any, any> {
  const displayTitle = titles ?? (Object.keys(colHead.expression) as K[]);
  const backgroundDefault = isEditing ? BACKGROUND_EDITOR : 'transparent';
  const [background, setBackground] = useState<string[]>([]);
  const [, forceUpdate] = useReducer(
    (x) => {
      const currentTitles = titles ?? (Object.keys(colHead.expression) as K[]);
      const bg = currentTitles.map((exp, idx) => {
        if (x[idx] === colHead.expression[exp]) {
          return exp === targeted ? BACKGROUND_EDITOR : backgroundDefault;
        }
        return '#faa';
      });
      setBackground(bg);
      return currentTitles.map((exp) => colHead.expression[exp]);
    },
    displayTitle.map((exp) => colHead.expression[exp]),
  );

  const transitionEndHandler: TransitionEventHandler = (e) => {
    const bg = displayTitle.map((exp) => (exp === targeted ? BACKGROUND_EDITOR : backgroundDefault));
    setBackground(bg);
  };
  getTrigger?.(forceUpdate);
  return (
    <RowHead style={style} className={className} title={JSON.stringify(colHead.expression)}>
      {(displayTitle.length === 0 ? [undefined] : displayTitle).map((exp, i) => (
        <a
          key={i}
          onClick={() => onClick(colHead, exp)}
          onTransitionEnd={transitionEndHandler}
          style={{ background: background[i] }}
        >
          {exp ? colHead.expression[exp]?.toString() : '-empty-'}
        </a>
      ))}
    </RowHead>
  );
}

export function TestOracle<
  T extends Record<string, string | number | boolean>,
  K extends string = Exclude<Exclude<keyof T, number>, symbol>,
>({
  defaultCols,
  defaultRows,
  colSelections,
  execute,
}: {
  defaultCols: Partial<T>[];
  defaultRows: Partial<T>[];
  colSelections: {
    [k in K]: Array<NonNullable<T[k]>> | NonNullable<T[k]>;
  };
  execute: (options: Partial<T>) => Promise<string>;
}): React.ReactElement<any, any> {
  const [cols, setCols] = useState<{ expression: Partial<T> }[]>([]);
  const [rows, setRows] = useState<{ expression: Partial<T> }[]>([]);
  const [editingHead, setEditingHead] = useState<{ expression: Partial<T> } | undefined>();
  let headToRefresh = editingHead;
  const [editingKey, setEditingKey] = useState<K | undefined>();
  const [result, setResult] = useState<string[][] | undefined>();
  const [colSel, setColSel] = useState<Partial<typeof colSelections>>(colSelections);
  const [commonColProperty, setCommonColProperty] = useState<{ expression: Partial<T> } | undefined>();
  const [pasteNote, setPasteNote] = useState<React.ReactNode>();
  const [highlightRow, setHighlightRow] = useState<number>();
  const [highlightCol, setHighlightCol] = useState<number>();
  const triggersRows = new Array(rows.length); //.fill(new Array(cols.length))
  const triggersCols = new Array(cols.length); //.fill(new Array(cols.length))

  const compressed = btoa(String.fromCharCode.apply(null, pako.deflate(JSON.stringify([cols, rows])) as any));

  useEffect(() => {
    const [colsRestored, rowsRestored] = restoreHash<{ expression: Partial<T> }>();
    if (rowsRestored.length) {
      setRows(rowsRestored);
    } else {
      setRows(defaultRows.map((item) => ({ expression: item })));
    }

    if (colsRestored.length) {
      setCols(colsRestored);
    } else {
      setCols(defaultCols.map((item) => ({ expression: item })));
    }
  }, [defaultCols, defaultRows]);

  useEffect(() => {
    if (window?.location?.hash !== undefined) {
      window.location.hash = compressed;
    }
  }, [compressed]);

  const pasteHandler = (clip: React.ClipboardEvent): void => {
    const text = clip.clipboardData.getData('text/plain');
    if (!text) {
      return;
    }
    if (!editingKey) {
      return;
    }
    const values = text.split(/\r?\n/);
    const selection = colSel[editingKey];
    if (!selection) {
      return;
    }

    const nodes: React.ReactNode[] = [];
    values.forEach((val, idx) => {
      nodes[idx] = <em>{val}</em>;
      if (!rows[idx]) {
        return;
      }
      nodes[idx] = <i>{val}</i>;
      if (!val) {
        return;
      }
      const parsed = convertStringyValue(selection, val as T[K]);
      rows[idx].expression[editingKey] = parsed;
      triggersRows[idx]?.();
      if (parsed !== undefined) {
        nodes[idx] = <b>{parsed}</b>;
      }
    });
    setPasteNote(<>{...nodes}</>);
  };
  const getEditingArray = (): [number, { expression: Partial<T> }[], React.Dispatch<{ expression: Partial<T> }[]>] => {
    const idxRows = rows.findIndex((h) => h === editingHead);
    if (idxRows !== -1) {
      return [idxRows, rows, setRows];
    } else {
      const idxCols = cols.findIndex((h) => h === editingHead);
      if (idxCols !== -1) {
        return [idxCols, cols, setCols];
      }
    }
    throw new Error('not found');
  };

  const insertBefore = (): void => {
    const [idxRows, editingArray, update] = getEditingArray();
    editingArray.splice(idxRows, 0, { expression: {} });
    update([...editingArray]);
  };

  const deleting = (): void => {
    const [idxRows, editingArray, update] = getEditingArray();
    editingArray.splice(idxRows, 1);
    setEditingHead(undefined);
    update([...editingArray]);
  };

  const insertAfter = (): void => {
    const [idxRows, editingArray, update] = getEditingArray();
    editingArray.splice(idxRows + 1, 0, { expression: {} });
    update([...editingArray]);
  };

  const width = {};
  // const width = { width: `${cols.length * 10 + 10}em` };

  const run = async (): Promise<void> => {
    const ret = await Promise.all(
      rows.map(
        async (rowExp) =>
          await Promise.all(
            cols.map(async (colExp) => {
              try {
                const options = Object.assign({}, rowExp.expression, colExp.expression);
                return execute(options);
              } catch (err: any) {
                return err.message ?? err?.toString() ?? err;
              }
            }),
          ),
      ),
    );
    setResult(ret);
  };

  const refreshHead = (): void => {
    if (headToRefresh) {
      const idxCols = cols.indexOf(headToRefresh);
      const idxRows = rows.indexOf(headToRefresh);
      triggersRows[idxRows]?.();
      triggersCols[idxCols]?.();
      if (idxRows === -1 && idxCols === -1) {
        triggersRows.forEach((r) => r?.());
      }
    }
  };

  const editHandler = (): void => {
    if (commonColProperty?.expression && editingHead === commonColProperty) {
      const keys = Object.keys(commonColProperty.expression);
      keys.forEach((k) => {
        const key = k as keyof T;
        const val = commonColProperty.expression[key];
        rows.forEach((rowColumn, i) => {
          if (rowColumn.expression[key] !== val) {
            delete commonColProperty.expression[key];
            rowColumn.expression[key] = val as any;
          }
          triggersRows[i]?.();
        });
      });
    } else {
      refreshHead();
    }
  };

  const headClickHandler = (data?: { expression: Partial<T> }, keyName?: K): void => {
    setColSel(colSelections);
    setEditingKey(keyName ?? (Object.keys(colSelections) as K[])[0]);
    refreshHead();
    setEditingHead(data);
    headToRefresh = data;
    refreshHead();
  };

  const headHeadClickHandler = (title: K): void => {
    const selections: T[K] | T[K][] = colSelections[title];
    const colSelection: typeof colSel = { [title]: selections } as typeof colSel;
    setColSel(colSelection);
    setEditingKey(title);
    setPasteNote(undefined);
    refreshHead();
    headToRefresh = { expression: {} };
    setEditingHead(headToRefresh);
    setCommonColProperty(headToRefresh);
    refreshHead();
  };

  const arrRowExpression = rows.reduce<Array<K>>((prev, { expression }) => {
    const keys = Object.keys(expression) as Array<K>;
    return prev.concat(keys).filter((dup, id, arr) => arr.indexOf(dup) === id);
  }, []);

  const clipboard = async (): Promise<void> => {
    const headArray = [...arrRowExpression, ...cols.map((c) => Object.values(c.expression).join(';'))];
    const resultArray =
      result?.map((row, i) => [...arrRowExpression.map((k) => rows[i].expression[k] ?? ''), ...row]) ?? [];
    const resultTableFormat = [headArray, ...resultArray].map((row) => row.join(' | ')).join('\n');
    await navigator.clipboard.writeText(resultTableFormat);
  };

  const highlight = (row: number, col: number): void => {
    setHighlightRow(row);
    setHighlightCol(col);
  };

  return (
    <>
      <div>
        <button type="button" onClick={run}>
          run
        </button>
        <button type="button" onClick={clipboard}>
          copy
        </button>
      </div>
      <Table>
        <aside>
          <div>
            <RowHead style={{ width: '100%', textAlign: 'center' }}>
              {arrRowExpression.map((title, i) => (
                <a
                  key={i}
                  onClick={() => headHeadClickHandler(title)}
                  style={
                    Object.keys(colSel).length === 1 && editingKey === title ? { background: BACKGROUND_EDITOR } : {}
                  }
                >
                  {title.replace('formatOption', 'opt')}
                </a>
              ))}
            </RowHead>
          </div>
          {rows.map((r, i) => (
            <div key={i} className={highlightRow === i ? 'highlight' : ''} onMouseMove={() => highlight(i, -1)}>
              <Head
                titles={arrRowExpression}
                getTrigger={(refresh) => {
                  triggersRows[i] = refresh;
                }}
                onClick={headClickHandler}
                colHead={r}
                isEditing={editingHead === r}
                targeted={editingHead === r || Object.keys(colSel).length === 1 ? editingKey : undefined}
              />
            </div>
          ))}
        </aside>
        <div>
          <div style={width}>
            {cols.map((col, j) => (
              <Head
                className={highlightCol === j ? 'highlight' : ''}
                getTrigger={(refresh) => {
                  triggersCols[j] = refresh;
                }}
                key={j}
                onClick={headClickHandler}
                colHead={col}
                isEditing={editingHead === col}
                style={{ textAlign: 'center' }}
              />
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={i} style={width} className={highlightRow === i ? 'highlight' : ''}>
              {cols.map((col, j) => (
                <Cell key={j} onMouseMove={() => highlight(i, j)} className={highlightCol === j ? 'highlight' : ''}>{`${
                  result?.[i]?.[j] ?? '--'
                }\t`}</Cell>
              ))}
            </div>
          ))}
        </div>
      </Table>
      <EditorWrap>
        <ExpressionEditor
          onPaste={pasteHandler}
          colSetting={colSel}
          colHead={editingHead}
          focused={editingKey}
          insertAfter={insertAfter}
          deleting={deleting}
          insertBefore={insertBefore}
          onChange={editHandler}
        />

        {commonColProperty && commonColProperty === editingHead ? (
          <PasteReceiver onPaste={pasteHandler}>
            <span>{pasteNote || 'paste multiple lines here'}</span>
          </PasteReceiver>
        ) : (
          <></>
        )}
      </EditorWrap>
    </>
  );
}
