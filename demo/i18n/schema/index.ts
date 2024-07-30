/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Digit-Format configurations. see also: https://bytedance.sg.feishu.cn/sheets/RgKHsad7xhxevWtysE4l4YUfgNd
 */
export interface I18NConfigurations {
  /**
   * abbreviation of the language
   */
  name: string;
  /**
   * grouping pattern, where to put ',' and '.'
   */
  format: {
    /**
     * . - The decimal separator placeholder. In a computer program, this gets replaced automatically by the actual symbol used for the decimal point in your locale.  Not a real period ; must be retained!
     *  - The grouping (thousand) separator placeholder. In a computer program, this gets automatically replaced by the actual grouping separator in your language.  Not a real comma ; must be retained!
     * 0 - The placeholder for the start of a whole number. In a computer program, this gets replaced by an actual digit (or a zero if there aren't enough digits). N ot a real zero(digit) ; must be retained!
     * # - The # symbols are place holders for placements of digits based on positions of digit separator. In a computer program, these would be replaced by actual digits. The main use of # is to show the placement of the ',' (grouping separator).
     */
    pattern: string;
    /**
     * when to start grouping, with 1000 or 10000
     */
    minGroupingDigit?: number;
  };
  /**
   * percent and per-mille
   */
  proportional: {
    /**
     * how to display %
     */
    percent: string;
    /**
     * how to display ‰
     */
    perMille?: string;
  };
  /**
   * TBD - for
   */
  currency?: string[];
  /**
   * abbreviations for long numbers, i.e. 10000 to 10k
   */
  compact: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^\ddigit".
     */
    [k: string]: {
      short?: {
        other?: string;
        one?: string | null;
        two?: string | null;
        few?: string | null;
        many?: string | null;
        zero?: string | null;
      };
      long?: {
        other?: string;
        one?: string | null;
        two?: string | null;
        few?: string | null;
        many?: string | null;
        zero?: string | null;
      } | null;
    };
  };
  range: {
    between: {
      short: string;
      long?: string;
    };
    approximately: {
      short: string;
      long?: string;
    };
    atLeast: {
      short: string;
      long?: string;
    };
    atMost: {
      short: string;
      long?: string;
    };
  };
  scientific: string;
}