import { describe, test, it, expect } from '@jest/globals';
import { BDNumberFormatOptions, createNumberFormatter } from '../src/index';

describe('Format', () => {
  test.each([
    { locale: 'en', input: 1234567.89, num: '1,234,567.89' },
    { locale: 'fr', input: 1234567.89, num: '1 234 567,89' },
    { locale: 'de', input: 1234567.89, num: '1.234.567,89' },
    { locale: 'de', input: 1000, num: '1000' },
    { locale: 'de', input: 10000, num: '10.000' },
    { locale: 'hi', input: 1234567.89, num: '12,34,567.89' },
    { locale: 'pt-PT', input: 1234567.89, num: '1 234 567,89' },
    { locale: 'en', input: 1234.5, num: '1,234.5' },
    { locale: 'en', input: 100, num: '100' },
    { locale: 'en', input: 999.999, num: '999.999' },
    { locale: 'en', input: 0, num: '0' },
    { locale: 'en', input: -23, num: '-23' },
    { locale: 'da', input: -1234, num: '-1234' },
    { locale: 'km', input: 1234567.89, num: '1,234,567.89' },
    { locale: 'lt', input: 1000, num: '1000' },
    { locale: 'lt', input: 10000, num: '10 000' },
    { locale: 'sq', input: 1000, num: '1 000' },
    { locale: 'sq', input: 10000, num: '10 000' },
  ])('Format pattern', async ({ locale, input, num }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When number is <input>
    const numberInput = input;

    //@Then FormatLocalizedNumber(num); should be <num>
    const result = formatter.formatLocalizedInteger(numberInput);
    expect(result).toBe(num);
  });
  test.each([
    { locale: 'en', input: -0.12, percent: '-12%', 'per-mille': '-120‰' },
    { locale: 'ro', input: -0.12, percent: '-12 %', 'per-mille': '-120 ‰' },
    { locale: 'tr', input: -0.12, percent: '-%12', 'per-mille': '-‰120' },
    { locale: 'en', input: 0, percent: '0%', 'per-mille': '0‰' },
    { locale: 'en', input: 0.5555, percent: '56%', 'per-mille': '556‰' },
  ])('proportional', async ({ locale, input, percent, 'per-mille': perMille }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json');
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When number is <input>
    expect(input).toBeDefined();

    //@When formatOption.style = "percent"
    formatOption.notation = 'percent';

    //@Then FormatLocalizedProportional(num, formatOption); should be <percent>
    expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(percent);

    //@When formatOption.style = "per-mille"
    formatOption.notation = 'per-mille';

    //@Then FormatLocalizedProportional(num, formatOption); should be <per-mille>
    expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(perMille);
  });
  test.each([
    { locale: 'en', input: 12345678, short: '12.3M', long: '12.3 million' },
    { locale: 'ko', input: 12345678, short: '1,234.6만', long: '1,234.6만' },
    { locale: 'nl', input: 12345678, short: '12,3 mln.', long: '12,3 miljoen' },
    { locale: 'sw-KE', input: 12345678, short: 'M12.3', long: 'milioni 12.3' },
    { locale: 'pt-PT', input: 12345678, short: '12,3 milhões', long: '12,3 milhões' },
    { locale: 'en', input: 567, short: '567', long: '567' },
    { locale: 'en', input: 5678, short: '5.7K', long: '5.7 thousand' },
    { locale: 'ja', input: 5678, short: '5,678', long: '5,678' },
    { locale: 'en', input: 999, short: '999', long: '999' },
    { locale: 'en', input: 999.9, short: '999.9', long: '999.9' },
    { locale: 'en', input: 999.99, short: '1K', long: '1 thousand' },
    { locale: 'en', input: 1049, short: '1K', long: '1 thousand' },
    { locale: 'ja', input: 9999, short: '9,999', long: '9,999' },
    { locale: 'ja', input: 99999099, short: '9,999.9万', long: '9,999.9万' },
    { locale: 'zh', input: 99999999, short: '1 亿', long: '1 亿' },
    { locale: 'en', input: 999999, short: '1M', long: '1 million' },
    { locale: 'fr-CA', input: 10999, short: '10 999', long: '11 mille' },
    { locale: 'th', input: 999909, short: '999.9K', long: '1 ล้าน' },
    { locale: 'it', input: 999909, short: '999.909', long: '999,9 mila' },
    { locale: 'it', input: 999999, short: '999.999', long: '1 milione' },
    { locale: 'pt-PT', input: 1000, short: 'mil', long: 'mil' },
    { locale: 'pt-PT', input: 1100, short: '1,1 mil', long: '1,1 mil' },
    { locale: 'ca', input: 0, short: '0', long: '0' },
    { locale: 'ar', input: 1000, short: 'ألف', long: 'ألف' },
    { locale: 'ar', input: 2000, short: 'ألفان', long: 'ألفان' },
    { locale: 'en', input: 123.45, short: '123.4', long: '123.4' },
  ])('compact mode', async ({ locale, input, short, long }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When number is <input>
    const numberInput = input;

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@Then FormatLocalizedCompact(num, formatOption); should be <short>
    expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(short);

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@When formatOption.compactDisplay = "long"
    formatOption.compactDisplay = 'long';

    //@Then FormatLocalizedCompact(num, formatOption); should be <long>
    expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(long);
  });
  test.each([
    { locale: 'ru', input: 1000, short: '1 тыс.', long: '1 тысяча' },
    { locale: 'ru', input: 4000, short: '4 тыс.', long: '4 тысячи' },
    { locale: 'ru', input: 7000, short: '7 тыс.', long: '7 тысяч' },
    { locale: 'cs', input: 18000000, short: '18 mil.', long: '18 milionů' },
  ])('plurals', async ({ locale, input, short, long }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When number is <input>
    const numberInput = input;

    //@When precision is 0
    formatOption.precision = 0;

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@Then FormatLocalizedPlurals(num, formatOption); should be <short>
    expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(short);

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@When formatOption.compactDisplay = "long"
    formatOption.compactDisplay = 'long';

    //@Then FormatLocalizedPlurals(num, formatOption); should be <long>
    expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(long);
  });
  test.each([
    {
      locale: 'en',
      input1: 1234,
      input2: 5678,
      between: '1,234–5,678',
      approximately: '~1.2K',
      atLeast: '1.2K+',
      atMost: '≤1.2K',
    },
    {
      locale: 'ja',
      input1: 1234,
      input2: 5678,
      between: '1,234～5,678',
      approximately: '約1,234',
      atLeast: '1,234以上',
      atMost: '1,234以下',
    },
    {
      locale: 'es',
      input1: 1234,
      input2: 5678,
      between: '1234-5678',
      approximately: '~1,2 mil',
      atLeast: 'Más de 1,2 mil',
      atMost: '≤1,2 mil',
    },
    {
      locale: 'pt',
      input1: 1234,
      input2: 5678,
      between: '1.234–5.678',
      approximately: '~1,2 mil',
      atLeast: '+1,2 mil',
      atMost: '≤1,2 mil',
    },
    {
      locale: 'te',
      input1: 1234,
      input2: 5678,
      between: '1,234–5,678',
      approximately: '~1.2వే',
      atLeast: '1.2వే+',
      atMost: '≤1.2వే',
    },
  ])('range mode', async ({ locale, input1, input2, between, approximately, atLeast, atMost }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When start number is <input1>
    const numberStart = input1;

    //@When end number is <input2>
    const numberEnd = input2;

    //@When formatOption.relativeForm = "between"
    formatOption.relativeForm = 'between';

    //@When formatOption.notation = "normal"
    formatOption.notation = 'normal';

    //@Then FormatNumberRangeWithFormatter(start, end, formatOption); should be <between>
    expect(formatter.formatLocalizedFloat(numberStart, numberEnd, formatOption)).toBe(between);

    //@When formatOption.relativeForm = "approximately"
    formatOption.relativeForm = 'approximately';

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <approximately>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(approximately);

    //@When formatOption.relativeForm = "atLeast"
    formatOption.relativeForm = 'atLeast';

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <atLeast>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(atLeast);

    //@When formatOption.relativeForm = "atMost"
    formatOption.relativeForm = 'atMost';

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <atMost>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(atMost);
  });
  test.each([
    {
      locale: 'en',
      input1: 1234,
      input2: 5678,
      between: 'from 1.2 thousand to 5.7 thousand',
      approximately: 'about 1.2 thousand',
      atLeast: 'at least 1.2 thousand',
      atMost: 'at most 1.2 thousand',
    },
    {
      locale: 'te',
      input1: 1234,
      input2: 5678,
      between: '1.2 వేలు–5.7 వేలు',
      approximately: '~1.2 వేలు',
      atLeast: '1.2 వేలు+',
      atMost: '≤1.2 వేలు',
    },
  ])('range mode fallback', async ({ locale, input1, input2, between, approximately, atLeast, atMost }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When start number is <input1>
    const numberStart = input1;

    //@When end number is <input2>
    const numberEnd = input2;

    //@When formatOption.relativeForm = "between"
    formatOption.relativeForm = 'between';

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@When formatOption.compactDisplay = "long"
    formatOption.compactDisplay = 'long';

    //@Then FormatNumberRangeWithFormatter(start, end, formatOption); should be <between>
    expect(formatter.formatLocalizedFloat(numberStart, numberEnd, formatOption)).toBe(between);

    //@When formatOption.relativeForm = "approximately"
    formatOption.relativeForm = 'approximately';

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@When formatOption.compactDisplay = "long"
    formatOption.compactDisplay = 'long';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <approximately>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(approximately);

    //@When formatOption.relativeForm = "atLeast"
    formatOption.relativeForm = 'atLeast';

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@When formatOption.compactDisplay = "long"
    formatOption.compactDisplay = 'long';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <atLeast>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(atLeast);

    //@When formatOption.relativeForm = "atMost"
    formatOption.relativeForm = 'atMost';

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@When formatOption.compactDisplay = "long"
    formatOption.compactDisplay = 'long';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <atMost>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(atMost);
  });
  test.each([
    { locale: 'en', input1: 0, input2: 0.999, between: '0%–100%', approximately: '~0%', atLeast: '0%+', atMost: '≤0%' },
    { locale: 'tr', input1: 0, input2: 0.999, between: '%0–%100', approximately: '~%0', atLeast: '%0+', atMost: '≤%0' },
    {
      locale: 'en',
      input1: 0.004,
      input2: 1.004,
      between: '0%–100%',
      approximately: '~0%',
      atLeast: '0%+',
      atMost: '≤0%',
    },
    {
      locale: 'gu',
      input1: 1000.001,
      input2: 1000.005,
      between: '1,00,000%-1,00,000%',
      approximately: '~1,00,000%',
      atLeast: '1,00,000%+',
      atMost: '≤1,00,000%',
    },
  ])('range mode percent', async ({ locale, input1, input2, between, approximately, atLeast, atMost }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When start number is <input1>
    const numberStart = input1;

    //@When end number is <input2>
    const numberEnd = input2;

    //@When formatOption.relativeForm = "between"
    formatOption.relativeForm = 'between';

    //@When formatOption.style = "percent"
    formatOption.notation = 'percent';

    //@Then FormatNumberRangeWithFormatter(start, end, formatOption); should be <between>
    expect(formatter.formatLocalizedFloat(numberStart, numberEnd, formatOption)).toBe(between);

    //@When formatOption.relativeForm = "approximately"
    formatOption.relativeForm = 'approximately';

    //@When formatOption.style = "percent"
    formatOption.notation = 'percent';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <approximately>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(approximately);

    //@When formatOption.relativeForm = "atLeast"
    formatOption.relativeForm = 'atLeast';

    //@When formatOption.style = "percent"
    formatOption.notation = 'percent';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <atLeast>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(atLeast);

    //@When formatOption.relativeForm = "atMost"
    formatOption.relativeForm = 'atMost';

    //@And formatOption.style = "percent"
    formatOption.notation = 'percent';

    //@When formatOption.style = "percent"
    formatOption.notation = 'percent';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <atMost>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(atMost);
  });
  test.each([
    {
      locale: 'en',
      input1: 0.999,
      input2: 0.9999,
      between: '999‰–1,000‰',
      approximately: '~999‰',
      atLeast: '999‰+',
      atMost: '≤999‰',
    },
    { locale: 'en', input1: 0, input2: 0.0006, between: '0‰–1‰', approximately: '~0‰', atLeast: '0‰+', atMost: '≤0‰' },
    {
      locale: 'he',
      input1: -0.1006,
      input2: -0.0001,
      between: '-101‰–0‰',
      approximately: '~-101‰',
      atLeast: '≥-101‰',
      atMost: '≤-101‰',
    },
  ])('range mode per-mille', async ({ locale, input1, input2, between, approximately, atLeast, atMost }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When start number is <input1>
    const numberStart = input1;

    //@When end number is <input2>
    const numberEnd = input2;

    //@When formatOption.relativeForm = "between"
    formatOption.relativeForm = 'between';

    //@When formatOption.style = "per-mille"
    formatOption.notation = 'per-mille';

    //@Then FormatNumberRangeWithFormatter(start, end, formatOption); should be <between>

    expect(formatter.formatLocalizedFloat(numberStart, numberEnd, formatOption)).toBe(between);

    //@When formatOption.relativeForm = "approximately"
    formatOption.relativeForm = 'approximately';

    //@When formatOption.style = "per-mille"
    formatOption.notation = 'per-mille';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <approximately>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(approximately);

    //@When formatOption.relativeForm = "atLeast"
    formatOption.relativeForm = 'atLeast';

    //@When formatOption.style = "per-mille"
    formatOption.notation = 'per-mille';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <atLeast>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(atLeast);

    //@When formatOption.relativeForm = "atMost"
    formatOption.relativeForm = 'atMost';

    //@When formatOption.style = "per-mille"
    formatOption.notation = 'per-mille';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <atMost>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(atMost);
  });
  test.each([
    {
      locale: 'en',
      input1: 99000000,
      input2: 99900000,
      between: '9.9E7–1.0E8',
      approximately: '~9.9E7',
      atLeast: '9.9E7+',
      atMost: '≤9.9E7',
    },
    {
      locale: 'mr',
      input1: 99900000,
      input2: 104500000,
      between: '[1.0×10^8]–[1.0×10^8]',
      approximately: '~[1.0×10^8]',
      atLeast: '[1.0×10^8]+',
      atMost: '≤[1.0×10^8]',
    },
  ])('range mode scientific', async ({ locale, input1, input2, between, approximately, atLeast, atMost }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When start number is <input1>
    const numberStart = input1;

    //@When end number is <input2>
    const numberEnd = input2;

    //@When formatOption.relativeForm = "between"
    formatOption.relativeForm = 'between';

    //@When formatOption.notation = "scientific"
    formatOption.notation = 'scientific';

    //@Then FormatNumberRangeWithFormatter(start, end, formatOption); should be <between>
    expect(formatter.formatLocalizedFloat(numberStart, numberEnd, formatOption)).toBe(between);

    //@When formatOption.relativeForm = "approximately"
    formatOption.relativeForm = 'approximately';

    //@When formatOption.notation = "scientific"
    formatOption.notation = 'scientific';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <approximately>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(approximately);

    //@When formatOption.relativeForm = "atLeast"
    formatOption.relativeForm = 'atLeast';

    //@When formatOption.notation = "scientific"
    formatOption.notation = 'scientific';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <atLeast>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(atLeast);

    //@When formatOption.relativeForm = "atMost"
    formatOption.relativeForm = 'atMost';

    //@When formatOption.notation = "scientific"
    formatOption.notation = 'scientific';

    //@Then FormatNumberRangeWithFormatter(start, formatOption); should be <atMost>
    expect(formatter.formatLocalizedFloat(numberStart, formatOption)).toBe(atMost);
  });
  test.each([
    { locale: 'en', input: 12345678, scientific: '1.2E7' },
    { locale: 'el', input: 12345678, scientific: '1,2e7' },
    { locale: 'hi', input: 12345678, scientific: '[1.2E7]' },
    { locale: 'sv', input: 12345678, scientific: '1,2×10^7' },
    { locale: 'en', input: 0, scientific: '0.0E0' },
    { locale: 'en', input: 0.1, scientific: '1.0E-1' },
    { locale: 'en', input: 1060000, scientific: '1.1E6' },
    { locale: 'en', input: 999, scientific: '1.0E3' },
  ])('scientific formats', async ({ locale, input, scientific }) => {
    //@Given number is <input>
    const numberInput = input;

    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);

    //@When formatOption.notation = "scientific"
    const formatOption: BDNumberFormatOptions = {
      notation: 'scientific',
    };

    //@Then FormatLocalizedScientific(num, formatOption); should be <scientific>
    const result = formatter.formatLocalizedInteger(numberInput, formatOption);
    expect(result).toBe(scientific);
  });
  test.each([
    { str: '1,234,567.89', locale: 'en', style: 'decimal', notation: 'standard', number: 1234567.89 },
    { str: '1.234.567,89', locale: 'ca', style: 'decimal', notation: 'standard', number: 1234567.89 },
    { str: '12,34,567.89', locale: 'bn', style: 'decimal', notation: 'standard', number: 1234567.89 },
    { str: '1 234 567,89', locale: 'fr', style: 'decimal', notation: 'standard', number: 1234567.89 },
  ])('parse formats', async ({ str, locale, style, notation, number }) => {
    //@Given input string is <str>
    const strIn = str;

    //@Given locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When set style to <style>
    formatOption.notation = style as any;

    //@When notation to <notation>
    formatOption.notation = notation as any;

    //@Then parsed number should be <number>
    expect(formatter.parseIntegerWithFormatter(strIn, formatOption)).toEqual(number);
  });
  test.each([
    { locale: 'en', input: 12345678.9012, standard: '12,345,678.9', compact: '12.35M', scientific: '1.23E7' },
    { locale: 'fr', input: 12345678.9012, standard: '12 345 678,9', compact: '12,35 M', scientific: '1,23E7' },
    { locale: 'mr', input: 12345678.9012, standard: '1,23,45,678.9', compact: '1.23 कोटी', scientific: '[1.23×10^7]' },
    { locale: 'zh', input: 12345678.9012, standard: '12345678.9', compact: '1234.57 万', scientific: '1.23E7' },
    { locale: 'en', input: 10603000, standard: '10,603,000', compact: '10.6M', scientific: '1.06E7' },
    { locale: 'en', input: 16034000, standard: '16,034,000', compact: '16.03M', scientific: '1.60E7' },
  ])('precision', async ({ locale, input, standard, compact, scientific }) => {
    //@Given number is <input>
    const num = input;

    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When precision is 2
    formatOption.precision = 2;

    //@When formatOption.notation = "standard"
    formatOption.notation = 'normal';

    //@Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <standard>
    expect(formatter.formatLocalizedFloat(num, formatOption)).toBe(standard);

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <compact>
    expect(formatter.formatLocalizedFloat(num, formatOption)).toBe(compact);

    //@When formatOption.notation = "scientific"
    formatOption.notation = 'scientific';

    //@Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <scientific>
    const result = formatter.formatLocalizedInteger(num, formatOption);
    expect(result).toBe(scientific);
  });
  test.each([
    { locale: 'en', input: 0.234567, percent: '23.46%', 'per-mille': '234.57‰' },
    { locale: 'fr', input: 0.234567, percent: '23,46 %', 'per-mille': '234,57 ‰' },
    { locale: 'en', input: 0.1029999, percent: '10.3%', 'per-mille': '103‰' },
    { locale: 'en', input: 0.109993, percent: '11%', 'per-mille': '109.99‰' },
    { locale: 'en', input: 0.109899, percent: '10.99%', 'per-mille': '109.9‰' },
  ])('precision small number', async ({ locale, input, percent, 'per-mille': perMille }) => {
    //@Given number is <input>
    const num = input;

    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When precision is 2
    formatOption.precision = 2;

    //@When formatOption.style = "percent"
    formatOption.notation = 'percent';

    //@Then FormatLocalizedNumberWithPrecisionSmall(num, formatOption); should be <percent>
    expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(percent);

    //@When formatOption.style = "per-mille"
    formatOption.notation = 'per-mille';

    //@Then FormatLocalizedNumberWithPrecisionSmall(num, formatOption); should be <per-mille>
    expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(perMille);
  });
  test.each([
    {
      locale: 'en',
      input: 1.4,
      normal: '1',
      percent: '140%',
      'per-mille': '1,400‰',
      short: '1',
      long: '1',
      scientific: '1E0',
    },
    {
      locale: 'en',
      input: 1.999,
      normal: '2',
      percent: '200%',
      'per-mille': '1,999‰',
      short: '2',
      long: '2',
      scientific: '2E0',
    },
    {
      locale: 'en',
      input: 999.99,
      normal: '1,000',
      percent: '99,999%',
      'per-mille': '999,990‰',
      short: '1K',
      long: '1 thousand',
      scientific: '1E3',
    },
    {
      locale: 'en',
      input: 1400,
      normal: '1,400',
      percent: '140,000%',
      'per-mille': '1,400,000‰',
      short: '1K',
      long: '1 thousand',
      scientific: '1E3',
    },
  ])(
    'precision set to zero',
    async ({ locale, input, normal, percent, 'per-mille': perMille, short, long, scientific }) => {
      //@Given default locale is <locale>
      const config = await import('../i18n/' + locale + '.json').catch((err) => {});
      expect(config).toBeDefined();
      const formatter = createNumberFormatter(config);
      const formatOption: BDNumberFormatOptions = {};

      //@When number is <input>
      const numberInput = input;

      //@When precision is 0
      formatOption.precision = 0;

      //@Then FormatLocalizedNumber(num); should be <normal>
      expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(normal);

      //@When formatOption.style = "percent"
      formatOption.notation = 'percent';

      //@Then FormatLocalizedProportional(num, formatOption); should be <percent>
      expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(percent);

      //@When formatOption.style = "per-mille"
      formatOption.notation = 'per-mille';

      //@Then FormatLocalizedProportional(num, formatOption); should be <per-mille>
      expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(perMille);

      //@When formatOption.notation = "compact"
      formatOption.notation = 'compact';

      //@Then FormatLocalizedCompact(num, formatOption); should be <short>
      expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(short);

      //@When formatOption.notation = "compact"
      formatOption.notation = 'compact';

      //@When formatOption.compactDisplay = "long"
      formatOption.compactDisplay = 'long';

      //@Then FormatLocalizedCompact(num, formatOption); should be <long>
      expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(long);

      //@When formatOption.notation = "scientific"
      formatOption.notation = 'scientific';

      //@Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <scientific>
      const result = formatter.formatLocalizedInteger(input, formatOption);
      expect(result).toBe(scientific);
    },
  );
  test.each([
    {
      locale: 'en',
      input: 1.456777,
      normal: '1.457',
      percent: '145.678%',
      'per-mille': '1,456.777‰',
      short: '1.457',
      long: '1.457',
      scientific: '1.457E0',
    },
    {
      locale: 'en',
      input: 1.4,
      normal: '1.400',
      percent: '140.000%',
      'per-mille': '1,400.000‰',
      short: '1.400',
      long: '1.400',
      scientific: '1.400E0',
    },
    {
      locale: 'en',
      input: 999,
      normal: '999.000',
      percent: '99,900.000%',
      'per-mille': '999,000.000‰',
      short: '999.000',
      long: '999.000',
      scientific: '9.990E2',
    },
    {
      locale: 'en',
      input: 999.999999,
      normal: '1,000.000',
      percent: '100,000.000%',
      'per-mille': '999,999.999‰',
      short: '1.000K',
      long: '1.000 thousand',
      scientific: '1.000E3',
    },
    {
      locale: 'en',
      input: 999999,
      normal: '999,999.000',
      percent: '99,999,900.000%',
      'per-mille': '999,999,000.000‰',
      short: '999.999K',
      long: '999.999 thousand',
      scientific: '1.000E6',
    },
    {
      locale: 'en',
      input: 999999.9,
      normal: '999,999.900',
      percent: '99,999,990.000%',
      'per-mille': '999,999,900.000‰',
      short: '1.000M',
      long: '1.000 million',
      scientific: '1.000E6',
    },
  ])(
    'precision set to three',
    async ({ locale, input, normal, percent, 'per-mille': perMille, short, long, scientific }) => {
      //@Given default locale is <locale>
      const config = await import('../i18n/' + locale + '.json').catch((err) => {});
      expect(config).toBeDefined();
      const formatter = createNumberFormatter(config);
      const formatOption: BDNumberFormatOptions = {};

      //@When number is <input>
      const numberInput = input;

      //@When precision is 3
      formatOption.precision = 3;

      //@When formatOption.keepTrailingZero = "true"
      formatOption.keepTrailingZero = true;

      //@Then FormatLocalizedNumber(num); should be <normal>
      expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(normal);

      //@When formatOption.style = "percent"
      formatOption.notation = 'percent';

      //@Then FormatLocalizedProportional(num, formatOption); should be <percent>
      expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(percent);

      //@When formatOption.style = "per-mille"
      formatOption.notation = 'per-mille';

      //@Then FormatLocalizedProportional(num, formatOption); should be <per-mille>
      expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(perMille);

      //@When formatOption.notation = "compact"
      formatOption.notation = 'compact';

      //@Then FormatLocalizedCompact(num, formatOption); should be <short>
      expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(short);

      //@When formatOption.notation = "compact"
      formatOption.notation = 'compact';

      //@When formatOption.compactDisplay = "long"
      formatOption.compactDisplay = 'long';

      //@Then FormatLocalizedCompact(num, formatOption); should be <long>
      expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(long);

      //@When formatOption.notation = "scientific"
      formatOption.notation = 'scientific';

      //@Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <scientific>
      const result = formatter.formatLocalizedInteger(numberInput, formatOption);
      expect(result).toBe(scientific);
    },
  );
  test.each([
    {
      locale: 'en',
      input: 0,
      normal: '0.00000',
      percent: '0.00000%',
      'per-mille': '0.00000‰',
      short: '0.00000',
      long: '0.00000',
      scientific: '0.00000E0',
    },
  ])(
    'precision and keeptrailingzeo test for zero',
    async ({ locale, input, normal, percent, 'per-mille': perMille, short, long, scientific }) => {
      //@Given default locale is <locale>
      const config = await import('../i18n/' + locale + '.json').catch((err) => {});
      expect(config).toBeDefined();
      const formatter = createNumberFormatter(config);
      const formatOption: BDNumberFormatOptions = {};

      //@When number is <input>
      const numberInput = input;
      //@When precision is 5
      formatOption.precision = 5;

      //@When formatOption.keepTrailingZero = "true"
      formatOption.keepTrailingZero = true;

      //@Then FormatLocalizedNumber(num); should be <normal>
      expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(normal);

      //@When formatOption.style = "percent"
      formatOption.notation = 'percent';

      //@Then FormatLocalizedProportional(num, formatOption); should be <percent>
      expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(percent);

      //@When formatOption.style = "per-mille"
      formatOption.notation = 'per-mille';

      //@Then FormatLocalizedProportional(num, formatOption); should be <per-mille>
      expect(formatter.formatLocalizedFloat(input, formatOption)).toBe(perMille);

      //@When formatOption.notation = "compact"
      formatOption.notation = 'compact';

      //@Then FormatLocalizedCompact(num, formatOption); should be <short>
      expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(short);

      //@When formatOption.notation = "compact"
      formatOption.notation = 'compact';

      //@When formatOption.compactDisplay = "long"
      formatOption.compactDisplay = 'long';

      //@Then FormatLocalizedCompact(num, formatOption); should be <long>
      expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(long);

      //@When formatOption.notation = "scientific"
      formatOption.notation = 'scientific';

      //@Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <scientific>
      const result = formatter.formatLocalizedInteger(numberInput, formatOption);
      expect(result).toBe(scientific);
    },
  );
  test.each([
    { tag: 'BCP47', locale: 'pt', input: 1234567.89, num: '1.234.567,89' },
    { tag: 'TT-locale', locale: 'pt', input: 1234567.89, num: '1 234 567,89' },
    { tag: 'BCP47', locale: 'ja-JP', input: 1234567.89, num: '1,234,567.89' },
    { tag: 'TT-locale', locale: 'not-exist', input: 1234567.89, num: '1,234,567.89' },
  ])('Locale mapping', async ({ tag, locale, input, num }) => {
    //@Given locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When formatOption.languageTag = <tag>
    // formatOption.languageTag = tag
    throw new Error('`formatOption.languageTag` is not Defined');

    //@When number is <input>
    const numberInput = input;

    //@Then FormatLocalizedNumber(num); should be <num>
    const result = formatter.formatLocalizedInteger(numberInput);
    expect(result).toBe(num);
  });
  test.each([
    { locale: 'da', input: 10000, short: '10.000' },
    { locale: 'da', input: 999909, short: '999.909' },
    { locale: 'et', input: 10000, short: '10 000' },
    { locale: 'et', input: 999909, short: '999 909' },
    { locale: 'el', input: 10000, short: '10.000' },
    { locale: 'el', input: 999909, short: '999.909' },
    { locale: 'hi', input: 10000000, short: '1 करोड़' },
    { locale: 'hi', input: 999999999, short: '1 अरब' },
    { locale: 'hi', input: 999999999999, short: '10 खरब' },
    { locale: 'jv', input: 1000000000, short: '1 M' },
    { locale: 'jv', input: 999999999999, short: '1 T' },
    { locale: 'km', input: 999909, short: '999.9 ពាន់' },
    { locale: 'nb', input: 999999999999, short: '1 billion' },
    { locale: 'pt-PT', input: 999999999, short: 'mil milhões' },
  ])('compact mode t3 fix', async ({ locale, input, short }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When number is <input>
    const numberInput = input;

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@Then FormatLocalizedCompact(num, formatOption); should be <short>
    expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(short);
  });
  test.each([
    { locale: 'my', input: 1000, short: '1 ထောင်', long: '1 ထောင်' },
    { locale: 'my', input: 10000, short: '1 သောင်း', long: '1 သောင်း' },
    { locale: 'my', input: 100000, short: '1 သိန်း', long: '1 သိန်း' },
    { locale: 'my', input: 1000000, short: '1 သန်း', long: '1 သန်း' },
    { locale: 'my', input: 10000000, short: '10 သန်း', long: '10 သန်း' },
    { locale: 'my', input: 100000000, short: 'သန်း 100', long: 'သန်း 100' },
    { locale: 'my', input: 1000000000, short: 'သန်း 1,000', long: 'သန်း 1,000' },
    { locale: 'my', input: 999909999, short: 'သန်း 999.9', long: 'သန်း 999.9' },
    { locale: 'my', input: 10000000000, short: 'ကုဋေ 1 ထ', long: '1,000 ကုဋေ' },
    { locale: 'my', input: 100000000000, short: 'ကုဋေ 1 သ', long: 'ကုဋေ 1 သောင်း' },
    { locale: 'my', input: 1000000000000, short: 'ဋေ 1 သိန်း', long: 'ကုဋေ 1 သိန်း' },
    { locale: 'my', input: 10000000000000, short: 'ဋေ 1 သန်း', long: 'ကုဋေ 1 သန်း' },
    { locale: 'my', input: 100000000000000, short: '1 ကောဋိ', long: '1 ကောဋိ' },
  ])('compact mode t3 fix for MY', async ({ locale, input, short, long }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When number is <input>
    const numberInput = input;

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@Then FormatLocalizedCompact(num, formatOption); should be <short>
    expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(short);

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@When formatOption.compactDisplay = "long"
    formatOption.compactDisplay = 'long';

    //@Then FormatLocalizedCompact(num, formatOption); should be <long>
    expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(long);
  });
  test.each([
    { locale: 'bn', input: 1000, short: '1 হা', long: '1 হাজার' },
    { locale: 'bn', input: 10000, short: '10 হা', long: '10 হাজার' },
    { locale: 'bn', input: 100000, short: '1 লা', long: '1 লাখ' },
    { locale: 'bn', input: 1000000, short: '1 মি', long: '1 মিলিয়ন' },
    { locale: 'bn', input: 10000000, short: '10 মি', long: '10 মিলিয়ন' },
    { locale: 'bn', input: 100000000, short: '100 মি', long: '100 মিলিয়ন' },
    { locale: 'bn', input: 1000000000, short: '1 বি', long: '1 বিলিয়ন' },
    { locale: 'bn', input: 10000000000, short: '10 বি', long: '10 বিলিয়ন' },
    { locale: 'bn', input: 100000000000, short: '100 বি', long: '100 বিলিয়ন' },
    { locale: 'bn', input: 1000000000000, short: '1 ট্রি', long: '1 ট্রিলিয়ন' },
    { locale: 'bn', input: 10000000000000, short: '10 ট্রি', long: '10 ট্রিলিয়ন' },
    { locale: 'bn', input: 100000000000000, short: '100 ট্রি', long: '100 ট্রিলিয়ন' },
  ])('compact mode t3 fix for BN', async ({ locale, input, short, long }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When number is <input>
    const numberInput = input;

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@Then FormatLocalizedCompact(num, formatOption); should be <short>
    expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(short);

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@When formatOption.compactDisplay = "long"
    formatOption.compactDisplay = 'long';

    //@Then FormatLocalizedCompact(num, formatOption); should be <long>
    expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(long);
  });
  test.each([
    { locale: 'en', input: -12345678, short: '-12.3M', long: '-12.3 million' },
    { locale: 'ko', input: -12345678, short: '-1,234.6만', long: '-1,234.6만' },
    { locale: 'nl', input: -12345678, short: '-12,3 mln.', long: '-12,3 miljoen' },
    { locale: 'sw-KE', input: -12345678, short: '-M12.3', long: '-milioni 12.3' },
    { locale: 'pt-PT', input: -12345678, short: '-12,3 milhões', long: '-12,3 milhões' },
    { locale: 'en', input: -567, short: '-567', long: '-567' },
    { locale: 'en', input: -5678, short: '-5.7K', long: '-5.7 thousand' },
    { locale: 'ja', input: -5678, short: '-5,678', long: '-5,678' },
    { locale: 'en', input: -999, short: '-999', long: '-999' },
    { locale: 'en', input: -999.9, short: '-999.9', long: '-999.9' },
    { locale: 'en', input: -999.99, short: '-1K', long: '-1 thousand' },
    { locale: 'en', input: -1049, short: '-1K', long: '-1 thousand' },
    { locale: 'ja', input: -9999, short: '-9,999', long: '-9,999' },
    { locale: 'ja', input: -99999099, short: '-9,999.9万', long: '-9,999.9万' },
    { locale: 'zh', input: -99999999, short: '-1 亿', long: '-1 亿' },
    { locale: 'en', input: -999999, short: '-1M', long: '-1 million' },
    { locale: 'fr-CA', input: -10999, short: '-10 999', long: '-11 mille' },
    { locale: 'th', input: -999909, short: '-999.9K', long: '-1 ล้าน' },
    { locale: 'it', input: -999909, short: '-999.909', long: '-999,9 mila' },
    { locale: 'it', input: -999999, short: '-999.999', long: '-1 milione' },
    { locale: 'pt-PT', input: -1000, short: '-1000', long: '-1000' },
    { locale: 'pt-PT', input: -1100, short: '-1,1 mil', long: '-1,1 mil' },
    { locale: 'es', input: -1000, short: '-1000', long: '-1000' },
    { locale: 'es', input: -1000000, short: '-1 mill.', long: '-1 millón' },
    { locale: 'es', input: -1000000000, short: '-1000 mill.', long: '-1000 millones' },
    { locale: 'ca', input: 0, short: '0', long: '0' },
    { locale: 'ar', input: -1000, short: '-ألف', long: '-ألف' },
    { locale: 'ar', input: -2000, short: '-ألفان', long: '-ألفان' },
    { locale: 'en', input: -123.45, short: '-123.4', long: '-123.4' },
  ])('negative numbers', async ({ locale, input, short, long }) => {
    //@Given default locale is <locale>
    const config = await import('../i18n/' + locale + '.json').catch((err) => {});
    expect(config).toBeDefined();
    const formatter = createNumberFormatter(config);
    const formatOption: BDNumberFormatOptions = {};

    //@When number is <input>
    const numberInput = input;

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@Then FormatLocalizedCompact(num, formatOption); should be <short>
    expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(short);

    //@When formatOption.notation = "compact"
    formatOption.notation = 'compact';

    //@When formatOption.compactDisplay = "long"
    formatOption.compactDisplay = 'long';

    //@Then FormatLocalizedCompact(num, formatOption); should be <long>
    expect(formatter.formatLocalizedFloat(numberInput, formatOption)).toBe(long);
  });
});
