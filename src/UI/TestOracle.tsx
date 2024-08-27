import React, {
  ReactElement,
  TransitionEventHandler,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import * as pako from 'pako';
const THEME = ['#000', '#dfe', '#fe2c55', '#FFF', '#faffde', '#048'];
const LEFT_MOUSEKEY = 1;

const BACKGROUND_EDITOR = THEME[1];
const EditorWrap = styled('section')`
  background: ${BACKGROUND_EDITOR};
  width: 50em;
`;
const Toolbox = styled('div')`
  display: flex;
  color: ${THEME[5]};
  button {
    background: ${THEME[1]};
    border: solid 1px ${THEME[5]};
    border-radius: 0.2em;
    margin-left: 0.5em;
    font-size: 18px;
    padding: 0.2em 0.7em;
  }
  div {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
    input {
      margin: 0;
    }
  }
`;
const ExpressionEditorWrap = styled('div')`
  > div {
    border-bottom: solid 1px ${THEME[3]};
    font-size: 12px;
    display: flex;
    width: 100%;
    flex-direction: row;
    line-height: 1.6em;
    > label {
      flex: 1 1 0;
      text-align: right;
      overflow: hidden;
    }
    > input[type='button'] {
      background: transparent;
    }
    > input,
    > textarea {
      text-indent: 0.2em;
    }
    > input,
    > select,
    > textarea {
      font-size: 12px;
      flex: 2 1 0;
      height: 2em;
      margin: 1px;
      padding: 0 0.8em;
      border: solid 1px ${THEME[5]};
      border-radius: 0.4em;
    }
    > textarea {
      min-height: 4em;
      padding: 0.4em 0.8em;
    }
    > input.empty,
    > select.empty,
    > textarea.empty {
      background: #ccc;
      color: ${THEME[5]};
    }
    > input::placeholder,
    > textarea::placeholder {
      color: ${THEME[5]};
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
  background: ${THEME[3]};
  height: 1.5em;
`;
const RowHead = styled('label')`
  transition: all 0.3s;
  display: inline-flex;
  min-height: 0.6em;
  cursor: pointer;
  justify-content: end;
  > * {
    flex: 1 1 10em;
    border: solid 1px transparent;
    transition: all 0.3s;
    width: 10em;
    height: 1.5em;
  }
`;
const Table = styled('article')`
  font-size: 10px;
  width: 100%;
  position: relative;
  background: ${THEME[4]};
  display: flex;
  align-items: end;
  overflow: auto;

  > aside {
    overflow: visible;
    color: ${THEME[5]};
    display: table;
    > label {
      display: table-row;
      > a {
        display: table-cell;
        white-space: nowrap;
      }
    }
  }

  > section {
    overflow: auto;
    > div {
      display: table;
      > div {
        color: ${THEME[5]};
        display: table-row;
        span {
          transition: all 0.3s;
          border: solid 1px transparent;
          display: table-cell;
          height: 1.5em;
          min-width: 10em;
          white-space: nowrap;
          > label {
            display: flex;
            flex-direction: column;
            > * {
              flex: 0 1 1.5em;
            }
          }
        }
      }
    }
  }

  .highlight {
    background: ${THEME[1]};
    color: ${THEME[0]};
    span {
      background: ${THEME[1]};
    }
    .highlight {
      background: #ffa;
    }
  }
`;

export type IExpressionValue = string | number | boolean | Date;
export type IExpression = { [key: string]: IExpressionValue };
export type IExpressionNote = IExpression & { note?: string };

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
function _digit2(num: number): string {
  return (num + 100).toFixed().substring(1);
}
function showDate(date: Date): string {
  //2018-06-12T19:30
  return `${date.getFullYear()}-${_digit2(date.getMonth() + 1)}-${_digit2(date.getDate())}T${_digit2(
    date.getHours(),
  )}:${_digit2(date.getMinutes())}:${_digit2(date.getSeconds())}`;
}
function testStringyValue<T extends IExpressionValue>(reference: T, rawValue: T | undefined): boolean {
  return convertStringyValue(reference, rawValue) === reference;
}

function convertStringyValue<T extends IExpressionValue>(
  reference: T | T[] | EditorSelectionRelation<any>[],
  rawValue: T | undefined,
): T | undefined {
  if (Array.isArray(reference)) {
    if (typeof reference[0] === 'object' && !(reference[0] instanceof Date)) {
      return (reference as EditorSelectionRelation<any>[]).find((s) => testStringyValue(s.value, rawValue))?.value;
    } else {
      return (reference as T[]).find((s) => testStringyValue(s, rawValue));
    }
  }
  if (typeof reference === 'number') {
    const val = Number(rawValue);
    return isNaN(val) ? undefined : (val as T);
  }
  if (typeof reference === 'boolean') {
    return Boolean(rawValue) as T;
  }
  if (reference instanceof Date) {
    return rawValue ? (new Date(rawValue as Date) as T) : undefined;
  }

  return rawValue as T;
}

function ExpressionInput<T extends IExpressionNote>({
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
  const reference = useRef<HTMLSelectElement & HTMLInputElement & HTMLTextAreaElement>(null);

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
  }, [data, name, data[name]]);
  useEffect(() => {
    reference.current?.focus();
  }, [focused]);
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
  if (Array.isArray(selections)) {
    return (
      <select
        ref={reference}
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
    );
  } else if (name === 'note') {
    return (
      <textarea
        ref={reference}
        name={name.toString()}
        onInput={loser}
        value={expression?.toString() ?? ''}
        onPaste={onPaste}
        placeholder="-none"
        className={data[name] === undefined ? 'empty' : ''}
      />
    );
  } else if (selections instanceof Date) {
    return (
      <input
        type="datetime-local"
        ref={reference}
        name={name.toString()}
        autoFocus={focused}
        onChange={loser}
        value={expression ? showDate(expression as Date) : undefined}
        onPaste={onPaste}
        placeholder="-none"
        className={data[name] === undefined ? 'empty' : ''}
      />
    );
  } else {
    return (
      <input
        ref={reference}
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
}

export type StringKeyOf<T> = string & Exclude<Exclude<keyof T, symbol>, number>;

export type EditorSelectionRelation<T extends IExpressionNote> = { value: T[StringKeyOf<T>] } & Partial<T>;

function ExpressionEditor<
  T extends IExpressionNote,
  K extends StringKeyOf<T> = StringKeyOf<T>,
  R extends EditorSelectionRelation<T> = EditorSelectionRelation<T>,
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
    [k in K]: Array<NonNullable<T[k] | R>> | NonNullable<T[k]>;
  }>;
  colHead: { expression: Partial<T> } | undefined;
  focused?: K;
  insertBefore: () => void;
  deleting: () => void;
  insertAfter: () => void;
  onPaste?: React.ClipboardEventHandler;
  onChange?: React.ChangeEventHandler;
}): ReactElement<any, any> {
  const [, refresh] = useReducer((val) => val + 1, 0);
  const keys: Array<K> = colSetting
    ? (Object.keys(colSetting).sort((a, b) => {
        return b === 'note' ? -1 : 1;
      }) as Array<K>)
    : [];
  const testConnection: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    return onChange?.(e);
  };
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

            let selectionValues = selections as T[StringKeyOf<T>] | T[StringKeyOf<T>][];
            let testConnectionOnChange = testConnection;

            if (Array.isArray(selections) && typeof selections[0] === 'object' && !(selections[0] instanceof Date)) {
              const relations = selections as R[];
              selectionValues = relations.map((relation) => {
                return relation.value;
              });
              testConnectionOnChange = (e) => {
                const val = e.target.value;
                const relation = relations[parseInt(val)];
                if (relation) {
                  Object.keys(relation).forEach((key) => {
                    if (key !== 'value') {
                      colHead.expression[key as K] = relation[key] as T[K];
                    }
                  });
                  refresh();
                }
                return onChange?.(e);
              };
            }

            return (
              <div key={i}>
                <label>{key}&nbsp;:&nbsp;</label>
                <ExpressionInput
                  selections={selectionValues as T[K]}
                  onChange={testConnectionOnChange}
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

function Head<T extends IExpression, K extends StringKeyOf<T> = StringKeyOf<T>>({
  colHead,
  onClick,
  isEditing,
  style,
  className,
  titles,
  getTrigger,
  targeted,
  children,
  onMouseMove,
}: {
  colHead: { expression: Partial<T> };
  titles?: Array<K>;
  isEditing: boolean;
  onClick: (colHead?: { expression: Partial<T> }, keyName?: K) => void;
  getTrigger?: (forceUpdate: React.DispatchWithoutAction) => void;
  style?: React.CSSProperties;
  className?: string;
  targeted?: K;
  children?: ReactElement<any, any>;
  onMouseMove?: React.MouseEventHandler;
}): ReactElement<any, any> {
  const displayTitle = titles ?? (Object.keys(colHead.expression) as K[]);
  const backgroundDefault = isEditing ? BACKGROUND_EDITOR : '';
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
    <RowHead
      style={{ background: backgroundDefault, ...style }}
      className={className}
      title={JSON.stringify(colHead.expression)}
      onMouseMove={onMouseMove}
    >
      {children}
      {(displayTitle.length === 0 ? [undefined] : displayTitle).map((exp, i) => (
        <a
          key={i}
          onClick={() => onClick(colHead, exp)}
          onTransitionEnd={transitionEndHandler}
          style={{ background: background[i], color: exp === 'note' ? '#996' : 'inherit' }}
        >
          {exp ? colHead.expression[exp]?.toString() : '-empty-'}
        </a>
      ))}
    </RowHead>
  );
}

export function TestOracle<
  T extends IExpression,
  E extends IExpressionNote = T & { note?: string },
  K extends StringKeyOf<E> = StringKeyOf<E>,
>({
  defaultCols,
  defaultRows,
  colSelections,
  execute,
  sort,
}: {
  defaultCols: Partial<E>[];
  defaultRows: Partial<E>[];
  colSelections: Partial<{
    [k in K]: Array<NonNullable<E[k]> | EditorSelectionRelation<E>> | NonNullable<E[k]>;
  }>;
  execute: (options: Partial<T>) => Promise<React.ReactNode>;
  sort?: (options: Partial<E> | undefined) => Promise<void | ((row: { expression: Partial<E> }) => number)>;
}): React.ReactElement<any, any> {
  const [cols, setCols] = useState<{ expression: Partial<E> }[]>([]);
  const [rows, setRows] = useState<{ expression: Partial<E> }[]>([]);
  const [sortCol, setSortCol] = useState<{ expression: Partial<E> }>();
  const [sortDirection, setSortDirection] = useState<-1 | 1>(1);
  const [editingHead, setEditingHead] = useState<{ expression: Partial<E> } | undefined>();
  let headToRefresh = editingHead;
  const [editingKey, setEditingKey] = useState<K | undefined>();
  const [result, setResult] = useState<string[][] | undefined>();
  const defaultSels = { note: '', ...colSelections };
  const [colSel, setColSel] = useState<Partial<typeof colSelections>>(defaultSels);
  const [commonColProperty, setCommonColProperty] = useState<{ expression: Partial<E> } | undefined>();
  const [pasteNote, setPasteNote] = useState<React.ReactNode>();
  const [highlightRow, setHighlightRow] = useState<number>();
  const [highlightCol, setHighlightCol] = useState<number>();
  const [selection, setSelection] = useState<[number, number][]>([]);
  const [selecting, setSelecting] = useState<boolean>(false);

  const [format, setFormat] = useState<'gherkin' | 'xls'>('gherkin');

  const triggersRows = new Array(rows.length); //.fill(new Array(cols.length))
  const triggersCols = new Array(cols.length); //.fill(new Array(cols.length))

  const compressed = btoa(String.fromCharCode.apply(null, pako.deflate(JSON.stringify([cols, rows])) as any));

  useEffect(() => {
    const [colsRestored, rowsRestored] = restoreHash<{ expression: Partial<E> }>();
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
    const selection = colSel[editingKey] as E[K] | EditorSelectionRelation<E>[];
    if (!selection) {
      return;
    }

    const nodes: React.ReactNode[] = [];
    values.forEach((val, idx) => {
      nodes[idx] = <em>{val}</em>;
      if (idx >= rows.length) {
        rows.push({ expression: {} });
        // return;
      }
      nodes[idx] = <i>{val}</i>;
      if (!val) {
        return;
      }
      let parsed: IExpressionValue | undefined;
      if ((selection as EditorSelectionRelation<E>[])[0]?.value) {
        const found = (selection as EditorSelectionRelation<E>[]).find(
          (s) => s.value === convertStringyValue(s.value, val as E[K]),
        );
        parsed = found?.value;
        if (found) {
          Object.keys(found).forEach((k) => {
            if (k !== 'value') {
              rows[idx].expression[k as K] = found[k] as E[K];
            }
          });
        }
      } else {
        parsed = convertStringyValue(selection, val as E[K]);
      }
      rows[idx].expression[editingKey] = parsed as E[K];
      triggersRows[idx]?.();
      if (parsed !== undefined) {
        nodes[idx] = <b>{parsed}</b>;
      }
    });
    setRows(rows.slice(0, values.length));
    setPasteNote(<>{...nodes}</>);
  };
  const getEditingArray = (): [number, { expression: Partial<E> }[], React.Dispatch<{ expression: Partial<E> }[]>] => {
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

  const executeAll = async (r = rows, c = cols): Promise<string[][]> => {
    return Promise.all(
      r.map(
        async (rowExp) =>
          await Promise.all(
            c.map(async (colExp) => {
              try {
                const options: T = Object.assign({}, rowExp.expression, colExp.expression) as unknown as T;
                return execute(options);
              } catch (err: any) {
                return err.message ?? err?.toString() ?? err;
              }
            }),
          ),
      ),
    );
  };

  const run = async (): Promise<void> => {
    const ret = await executeAll(rows, cols);
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
        const key = k as K;
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

  const selected = (row: number, col: number): number => {
    return selection.findIndex((s) => s[0] === row && s[1] === col);
  };
  const addToSelection = (row: number, col: number): void => {
    selection.push([row, col]);
  };
  const addSelectionRange = (row: number | undefined, col: number | undefined): void => {
    let [startRow, startCol] = selection[0] ?? [row ?? 0, col ?? 0];
    selection.splice(1, selection.length - 2);
    let endRow = row ?? rows.length - 1;
    let endCol = col ?? cols.length - 1;
    if (endRow < startRow) {
      endRow = startRow;
      startRow = row!;
    }
    if (endCol < startCol) {
      endCol = startCol;
      startCol = col!;
    }
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        addToSelection(r, c);
      }
    }
  };
  const removeSelection = (row: number, col: number): void => {
    const idxOccurrence = selected(row, col);
    if (idxOccurrence !== -1) {
      selection.splice(idxOccurrence, 1);
    }
  };
  const mouseMoveHandler: React.MouseEventHandler = (e) => {
    if (highlightCol === undefined || highlightRow === undefined) {
      return;
    }
    if (selecting && e.buttons === LEFT_MOUSEKEY) {
      e.preventDefault();
      addSelectionRange(highlightRow, highlightCol);
      setSelection([...selection]);
    }
  };
  const mouseDownHandler: React.MouseEventHandler = (e) => {
    setSelection([[highlightRow!, highlightCol!]]);
    e.preventDefault();
    setSelecting(true);
  };
  const mouseUpHandler: React.MouseEventHandler = (e) => {
    setSelecting(false);
    setSelection([...selection]);
  };

  const headClickHandler = (data?: { expression: Partial<E> }, keyName?: K): void => {
    setColSel(defaultSels);
    setEditingKey(keyName ?? (Object.keys(colSelections) as K[])[0]);
    refreshHead();
    setEditingHead(data);
    headToRefresh = data;
    refreshHead();
  };

  const headHeadClickHandler = (title: K): void => {
    const selections = colSelections[title];
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

  const headSortClickHandler = async (data?: { expression: Partial<E> }): Promise<void> => {
    if (!sort) {
      return headClickHandler(data);
    }
    let dir: -1 | 1;
    if (sortCol === data) {
      dir = -sortDirection as 1 | -1;
    } else {
      dir = 1;
    }
    setSortDirection(dir);
    setSortCol(data);
    const sorter = await sort(data?.expression);
    if (!sorter) {
      return headClickHandler(data);
    }

    const sorted = rows.sort((a, b) => {
      return dir * (sorter(a) - sorter(b));
    });
    setRows(sorted.map((item) => ({ ...item })));
    setResult([]);
  };

  const arrRowExpression = (r: typeof rows): K[] =>
    r.reduce<Array<K>>((prev, { expression }) => {
      const keys = Object.keys(expression) as Array<K>;
      return prev.concat(keys).filter((dup, id, arr) => arr.indexOf(dup) === id);
    }, []);

  const clipboard = async (): Promise<void> => {
    const _rows: typeof rows = [];
    const _cols: typeof cols = [];

    if (selection.length) {
      selection.forEach(([r, c]) => {
        if (!_rows.includes(rows[r])) {
          _rows.push(rows[r]);
        }

        if (!_cols.includes(cols[c])) {
          _cols.push(cols[c]);
        }
      });
    } else {
      _rows.push(...rows);
      _cols.push(...cols);
    }
    const _results = await executeAll(_rows, _cols);

    const expressions = arrRowExpression(_rows);
    const headArray = [...expressions, ..._cols.map((c, i) => Object.values(c.expression).join(';'))];
    const resultArray = _results.map((row, i) => [...expressions.map((k) => _rows[i].expression[k] ?? ''), ...row]);
    const resultTableFormat = [headArray, ...resultArray]
      .map((row) => row.join(format === 'gherkin' ? ' | ' : '\t'))
      .join('\n');
    await navigator.clipboard.writeText(resultTableFormat);
  };

  const highlight = (row: number, col: number): void => {
    setHighlightRow(row);
    setHighlightCol(col);
  };

  return (
    <>
      <Toolbox>
        <button type="button" onClick={run}>
          run
        </button>
        <button type="button" onClick={clipboard}>
          copy
        </button>
        <div>
          <label htmlFor="rbtGherkin" title='separator: "|"'>
            <input
              id="rbtGherkin"
              type="radio"
              value="Gherkin"
              name="format"
              checked={format === 'gherkin'}
              onChange={() => setFormat('gherkin')}
            />
            Gherkin
          </label>

          <label htmlFor="rbtXls" title='separator: "\t"'>
            <input
              id="rbtXls"
              type="radio"
              value="xls"
              name="format"
              checked={format === 'xls'}
              onChange={() => setFormat('xls')}
            />
            XLS
          </label>
        </div>
      </Toolbox>
      <Table onMouseUp={mouseUpHandler}>
        <aside>
          <RowHead style={{ width: '100%', textAlign: 'center' }}>
            {arrRowExpression(rows).map((title, i) => (
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
          {rows.map((r, i) => (
            <Head
              key={i}
              className={highlightRow === i ? 'highlight' : ''}
              onMouseMove={() => highlight(i, -1)}
              titles={arrRowExpression(rows)}
              getTrigger={(refresh) => {
                triggersRows[i] = refresh;
              }}
              onClick={headClickHandler}
              colHead={r}
              isEditing={editingHead === r}
              targeted={editingHead === r || Object.keys(colSel).length === 1 ? editingKey : undefined}
            />
          ))}
        </aside>
        <section>
          <div onMouseLeave={mouseUpHandler}>
            <div
              style={width}
              onMouseDown={(e) => {
                setSelection([]);
                e.preventDefault();
              }}
            >
              {cols.map((col, j) => (
                <span key={j}>
                  <Head
                    colHead={col}
                    className={highlightCol === j ? 'highlight' : ''}
                    getTrigger={(refresh) => {
                      triggersCols[j] = refresh;
                    }}
                    onClick={headSortClickHandler}
                    onMouseMove={(e) => {
                      if (e.buttons === LEFT_MOUSEKEY) {
                        addSelectionRange(undefined, j);
                        setSelection([...selection]);
                        e.preventDefault();
                      }
                    }}
                    isEditing={editingHead === col}
                    style={{ textAlign: 'center' }}
                  >
                    <i>{sortCol === col ? (sortDirection === 1 ? '↓' : '↑') : undefined}</i>
                  </Head>
                </span>
              ))}
            </div>
            {rows.map((r, i) => (
              <div
                onMouseDown={mouseDownHandler}
                key={i}
                style={width}
                className={highlightRow === i ? 'highlight' : ''}
              >
                {cols.map((col, j) => (
                  <Cell
                    key={j}
                    style={
                      selected(i, j) !== -1 ? { borderColor: `${THEME[5]} ${THEME[2]} ${THEME[2]} ${THEME[5]}` } : {}
                    }
                    onMouseMove={(e) => {
                      highlight(i, j);
                      return mouseMoveHandler(e);
                    }}
                    className={highlightCol === j ? 'highlight' : ''}
                  >
                    {`${result?.[i]?.[j] ?? '--'}\t`}
                  </Cell>
                ))}
              </div>
            ))}
          </div>
        </section>
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
