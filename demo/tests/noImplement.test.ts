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
});
