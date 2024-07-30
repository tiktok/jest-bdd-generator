/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @ttfe/@typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { I18NConfigurations } from '../i18n/schema';
export type { I18NConfigurations } from '../i18n/schema';

export default function (): string {
  return 'hello world';
}

export type BDNumberFormatOptions = {
  notation?: 'compact' | 'normal' | 'scientific' | 'percent' | 'per-mille';
  compactDisplay?: 'long' | 'short';
  relativeForm?: keyof I18NConfigurations['range']; //'between' | 'approximately' | 'atLeast' | 'atMost';
  precision?: number;
  keepTrailingZero?: boolean;
};

export type RuleContentCompact = NonNullable<I18NConfigurations['compact'][string]['short']>;

export const COMPACT_RULE_PLACEHOLDER = '0';

export const DEFAULT_COMPACTDISPLAY: Exclude<BDNumberFormatOptions['compactDisplay'], undefined> = 'short';
export const DEFAULT_NOTATION: Exclude<BDNumberFormatOptions['notation'], undefined> = 'normal';
export const DEFAULT_PRECISION: Exclude<BDNumberFormatOptions['precision'], undefined> = 1;
export const DEFAULT_PRECISION_PROPORTIONAL: Exclude<BDNumberFormatOptions['precision'], undefined> = 0;

export class BDNumberFormatter {
  formatLocalizedFloat: BDNumberFormatter['notation'];
  formatLocalizedInteger: BDNumberFormatter['notation'];
  pluralRules: Intl.PluralRules;

  locale: I18NConfigurations;
  constructor(locale: I18NConfigurations) {
    this.locale = locale;
    this.formatLocalizedFloat = this.notation;
    this.formatLocalizedInteger = this.notation;
    this.pluralRules = Intl?.PluralRules
      ? new Intl.PluralRules(locale.name)
      : ({
          select(_n: number) {
            return 'other';
          },
        } as never);
  }
  parseIntegerWithFormatter(strFormatted: string, options?: BDNumberFormatOptions): number {
    return this._parseNumber(strFormatted, options);
  }
  parseFloatWithFormatter(strFormatted: string, options?: BDNumberFormatOptions): number {
    return this._parseNumber(strFormatted, options);
  }

  private _parseNumber(strFormatted: string, options?: BDNumberFormatOptions): number {
    const { decimal, group } = this._signsPattern();
    let ret = strFormatted;
    if (group) {
      ret = ret.replaceAll(group.separator, '');
    }

    ret = ret.replace(decimal, '.');

    const { percentSign, perMille } = this._signsProportional();
    let ratio = 1;
    if (ret.indexOf(percentSign) !== -1) {
      ret = ret.replace(percentSign, '');
      ratio /= 100;
    }
    if (ret.indexOf(perMille) !== -1) {
      ret = ret.replace(perMille, '');
      ratio /= 1000;
    }

    const retSearchDrySigns = ret.replace(/-?[\d|\.]+/, '0');
    ratio *= this._parseCompact(retSearchDrySigns);

    return Number(ret) * ratio;
  }

  private _parseCompact(strInput: string): number {
    Object.keys(this.locale.compact).forEach((ruleName) => {
      const digit = parseInt((ruleName.match(/\d+digit/) as [string])[0]);

      const rule = this.locale.compact[ruleName as keyof I18NConfigurations['compact']];
      (['short', 'long'] as Array<keyof typeof rule>).forEach((compactDisplay: keyof typeof rule) => {
        if (!rule[compactDisplay]) {
          return;
        }
        const ruleLongOrShort = rule[compactDisplay] as RuleContentCompact;
        Object.keys(ruleLongOrShort).forEach((plural) => {
          const pluralRule = ruleLongOrShort[plural as keyof (typeof rule)['long']];
          if (pluralRule === strInput) {
            return digit;
          }
        });
      });
    });
    return 1;
  }

  public notation(num: number, option?: BDNumberFormatOptions): string;
  public notation(num: number, num2: number, option?: Omit<BDNumberFormatOptions, 'notation'>): string;
  public notation(
    num: number,
    _option?: BDNumberFormatOptions | number,
    _moreOption?: Omit<BDNumberFormatOptions, 'notation'>,
  ): string {
    if (typeof _option === 'number') {
      return this._range(num, _option as number, _moreOption ?? {});
    }
    if (_option?.relativeForm) {
      return this._range(num, _option);
    }
    const option = _option ?? {};
    if (!option.notation) {
      option.notation = DEFAULT_NOTATION;
    }
    switch (option.notation) {
      case 'percent':
        return this._proportional(num, 'percent', option.precision, option.keepTrailingZero);
      case 'per-mille':
        return this._proportional(num, 'per-mille', option.precision, option.keepTrailingZero);
      case 'compact':
        return this._compact(num, option.compactDisplay, option.precision, option.keepTrailingZero);
      case 'normal':
        return this._pattern(num, option.precision, option.keepTrailingZero);
      case 'scientific':
        return this._scientific(num, option.precision, option.keepTrailingZero);
      default:
        break;
    }
    return '';
  }

  private _range(num1: number, num2: number | BDNumberFormatOptions, _option?: BDNumberFormatOptions): string {
    let option: BDNumberFormatOptions;
    if (typeof num2 !== 'number') {
      option = num2;
    } else {
      option = _option as BDNumberFormatOptions;
    }
    const {
      relativeForm = 'approximately',
      compactDisplay = 'short',
      precision,
      notation = 'normal',
      keepTrailingZero,
    } = option;
    const pattern = this.locale.range[relativeForm][compactDisplay] ?? this.locale.range[relativeForm].short;
    const ret = pattern.replace('{0}', this.notation(num1, { notation, compactDisplay, precision, keepTrailingZero }));
    if (relativeForm === 'between') {
      if (typeof num2 !== 'number') {
        throw TypeError('Between Notation Need Two Numbers');
      }
      return ret.replace('{1}', this.notation(num2, { notation, compactDisplay, precision, keepTrailingZero }));
    } else {
      return ret;
    }
  }

  private _proportional(
    num: number,
    style: BDNumberFormatOptions['notation'],
    precision: number = DEFAULT_PRECISION_PROPORTIONAL,
    keepTrailingZero = false,
  ): string {
    let rule: string, targetNum: number;
    if (style === 'percent') {
      rule = this.locale.proportional.percent;
      targetNum = num * 100;
    } else {
      targetNum = num * 1000;
      rule = this.locale.proportional.perMille ?? this.locale.proportional.percent.replace('%', '‰');
    }
    const roundedNumberMaybeZero = this._pattern(targetNum, precision, keepTrailingZero);
    return this._parseNegative(roundedNumberMaybeZero, rule);
  }

  private _parseNegative(strIn: string, pattern: string): string {
    const placeholder = pattern.match(/\{0\}|0+/)?.[0];

    if (strIn.indexOf('-') !== -1) {
      if (pattern.indexOf('-') === -1) {
        if (!placeholder) {
          return `-${pattern}`;
        } else {
          return `-${pattern.replace(placeholder, strIn.substring(1))}`;
        }
      } else {
        if (!placeholder) {
          return pattern;
        } else {
          return pattern.replace(placeholder, strIn);
        }
      }
    } else {
      const cleanPattern = pattern.replace('-', '');
      if (!placeholder) {
        return cleanPattern;
      }
      return cleanPattern.replace(placeholder, strIn);
    }
  }

  private _scientific(num: number, precision: number = DEFAULT_PRECISION, keepTrailingZero = true): string {
    let pow10 = 0;
    let numToScientific = Number(this._getRaw(num / Math.pow(10, pow10), precision)[1]);
    if (num === 0) {
      // continue;
    } else if (numToScientific > 1) {
      while (numToScientific >= 10) {
        pow10++;
        numToScientific = Number(this._getRaw(num / Math.pow(10, pow10), precision)[1]);
      }
    } else {
      while (numToScientific < 1) {
        pow10--;
        numToScientific = Number(this._getRaw(num / Math.pow(10, pow10), precision)[1]);
      }
    }
    //{0}10^{1}
    const strNumbers = this._pattern(num / Math.pow(10, pow10), precision, keepTrailingZero);
    return this.locale.scientific
      .replace(/^([^#]*?)#/, `$1${strNumbers}`)
      .replace(/0([^0]*?)$/, `${pow10.toFixed()}$1`);
  }

  private _compact(
    num: number,
    compactDisplay: BDNumberFormatOptions['compactDisplay'],
    precision = DEFAULT_PRECISION,
    keepTrailingZero = false,
  ): string {
    const compactRules = this.locale.compact;
    let ret: string | undefined;
    let prevRoundedDigit: number = this._getRaw(num, precision)[1].length + 1;
    Object.keys(compactRules).forEach((ruleName) => {
      const rule = compactRules[ruleName as keyof I18NConfigurations['compact']];
      const longShort = rule[compactDisplay ?? DEFAULT_COMPACTDISPLAY]; // default to short.
      if (!longShort) {
        return;
      }

      const digitRule = parseInt((ruleName.match(/\d+digit/) as [string])[0]);
      if (isNaN(digitRule)) {
        return;
      }

      if (digitRule < prevRoundedDigit) {
        const digitRulePluralOther = longShort['other'];
        const digitDisplay = 1 + digitRule - (digitRulePluralOther?.match(/0/g)?.length ?? 1);
        const compactNumber = num / Math.pow(10, digitDisplay - 1);
        const [_raw, int, frag] = this._getRaw(compactNumber, precision);
        prevRoundedDigit = digitDisplay + int.length;
        const strNumber = this._pattern(compactNumber, precision, keepTrailingZero);
        const pluralName = ((this.pluralRules.select(Number(`${int}${frag}`)) as
          | undefined
          | keyof RuleContentCompact) ?? 'other') as keyof RuleContentCompact;

        const rulePlural = longShort[pluralName] ?? longShort['other'];
        const [positive, negative] = rulePlural!.split(';');
        let ruleProper = positive;
        if (num < 0) {
          ruleProper = negative ?? positive;
        } else {
          ruleProper = positive;
        }
        if (ruleProper === '') {
          return;
        }
        ret = this._parseNegative(strNumber, ruleProper);
      }
    });

    return ret ?? this._pattern(num, precision, keepTrailingZero);
  }

  private _getRaw(num: number, precision?: number): [string, string, string | null, string] {
    let strRaw;
    if (typeof precision === 'undefined' || isNaN(precision as number)) {
      strRaw = num.toString();
      const [_raw, rawInt, rawFrag] = strRaw.match(/-?([\d]+)(\.[\d]+)*?$/) as [string, string, string | null];
      return [_raw, rawInt, rawFrag, num < 0 ? '-' : ''];
    } else {
      const digitToPrecise = Math.pow(10, precision);
      const numToPrecise = Math.abs(num * digitToPrecise);
      let intToPrecise = Math.floor(numToPrecise);
      const fragmentToPrecise = numToPrecise % 1;
      if (fragmentToPrecise > 0.5) {
        intToPrecise += 1;
      } else if (fragmentToPrecise === 0.5 && intToPrecise % 2 === 1) {
        intToPrecise += 1;
      }
      const sign = intToPrecise > 0 && num < 0 ? '-' : '';
      const strToPrecise = intToPrecise.toFixed();
      if (precision === 0) {
        return [`${sign}${strToPrecise}`, strToPrecise, '', sign];
      }
      const rawInt = strToPrecise.slice(0, -precision) || '0';
      // BUG: strToPrecise may shorter than precision
      // const rawFrag = `.${strToPrecise.slice(-precision)}`;
      let strFrag: string;
      if (strToPrecise.length >= precision) {
        strFrag = strToPrecise.slice(-precision);
      } else {
        strFrag = new Array(precision - strToPrecise.length).fill('0').concat(strToPrecise).join('');
      }
      const rawFrag = `.${strFrag}`;
      const _raw = `${sign}${rawInt}${rawFrag}`;
      return [_raw, rawInt, rawFrag, sign];
    }
  }

  private _signsProportional(): {
    percentSign: string;
    perMille: string;
  } {
    return {
      percentSign: this.locale.proportional.percent.replace(/-(\{0\})/g, ''),
      perMille: this.locale.proportional.perMille?.replace(/-(\{0\})/g, '') ?? '{0}‰',
    };
  }

  private _signsPattern(): {
    decimal: string;
    group?: {
      separator: string;
      groupSizes: number;
      group0Size: number;
      minGroupSize: number;
    };
  } {
    const [_pattern, patternInt, _patternFrag] = this.locale.format.pattern.match(/(.+[0#])([^#0]+[#0]+)$/) as [
      string,
      string,
      string,
    ];

    const decimal = _patternFrag.replace(/[0#]+/, ''),
      separator = patternInt.match(/[0#]+([^0#]+)[0#]+/)?.[1];

    const ret: {
      decimal: string;
      group?: {
        separator: string;
        groupSizes: number;
        group0Size: number;
        minGroupSize: number;
      };
    } = {
      decimal,
    };
    //-----
    if (separator) {
      // : there's no separator in ar
      const groupItems = patternInt.split(separator);
      const groupSizes = groupItems[1].length; // repeated group size
      const group0Size = groupItems[2]?.length ?? groupSizes; // first group size

      // first pattern group size should be enough : ##,###.### -> 2; #,###.### -> 1
      const minGroupSize = this.locale.format.minGroupingDigit ?? groupItems[0].length;
      ret.group = { separator, groupSizes, group0Size, minGroupSize };
    }
    return ret;
  }

  private _pattern(num: number, precision?: number, keepTrailingZero = false): string {
    const [_raw, rawInt, rawFrag, sign] = this._getRaw(num, precision);
    const { decimal, group } = this._signsPattern();
    const fragment = (keepTrailingZero ? rawFrag : rawFrag?.replace(/\.?0+$/, ''))?.replace('.', decimal);
    //-----
    if (group) {
      // : there's no separator in ar

      const { separator, groupSizes, group0Size, minGroupSize } = group;
      // first pattern group size should be enough : ##,###.### -> 2; #,###.### -> 1

      if (rawInt.length - group0Size > minGroupSize - 1) {
        const ret = [];
        for (let i = 0; i < rawInt.length; i++) {
          const idxAfterGroup0 = i - group0Size;
          if (idxAfterGroup0 >= 0 && idxAfterGroup0 % groupSizes === 0) {
            ret.push(separator);
          }
          ret.push(rawInt.charAt(rawInt.length - 1 - i));
        }
        ret.push(sign);
        ret.reverse();
        ret.push(fragment);
        return ret.join('');
      }
    }
    return [sign, rawInt, fragment].join('');
  }
}

export function createNumberFormatter(locale: I18NConfigurations): BDNumberFormatter {
  return new BDNumberFormatter(locale);
}
