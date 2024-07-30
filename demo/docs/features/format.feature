@format-feature
Feature: Format
- reference: https://bytedance.feishu.cn/docx/YNmzdBZXPowtTnxSd7dc4MHJni4

Scenario Outline: Format pattern

  Given default locale is <locale>
  When number is <input>
  Then FormatLocalizedNumber(num); should be <num>

Examples:
| locale | input | num |
| "en" | 1234567.89 | "1,234,567.89" |
| "fr" | 1234567.89 | "1\u202f234\u202f567,89" |
| "de" | 1234567.89 | "1.234.567,89" |
| "de" | 1000 | "1000" |
| "de" | 10000 | "10.000" |
| "hi" | 1234567.89 | "12,34,567.89" |
| "pt-PT" | 1234567.89 | "1\u00a0234\u00a0567,89" |
| "en" | 1234.5 | "1,234.5" |
| "en" | 100.0 | "100" |
| "en" | 999.999 | "999.999" |
| "en" | 0 | "0" |
| "en" | -23 | "-23" |
| "da" | -1234 | "-1234" |
| "km" | 1234567.89 | "1,234,567.89" |
| "lt" | 1000 | "1000" |
| "lt" | 10000 | "10\u00a0000" |
| "sq" | 1000 | "1\u00a0000" |
| "sq" | 10000 | "10\u00a0000" |

Scenario Outline: proportional
  Given default locale is <locale>
  When number is <input>

  When formatOption.style = "percent"
  Then FormatLocalizedProportional(num, formatOption); should be <percent>


  When formatOption.style = "per-mille"
  Then FormatLocalizedProportional(num, formatOption); should be <per-mille>

Examples:
| locale | input | percent | per-mille |
| "en" | -0.12 | "-12%" | "-120‰" |
| "ro" | -0.12 | "-12\u00a0%" | "-120\u00a0‰" |
| "tr" | -0.12 | "-%12" | "-‰120" |
| "en" | 0 | "0%" | "0‰" |
| "en" | 0.5555 | "56%" | "556‰" |

Scenario Outline:  compact mode

  Given default locale is <locale>

  When number is <input>

  When formatOption.notation = "compact"
  Then FormatLocalizedCompact(num, formatOption); should be <short>

  When formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatLocalizedCompact(num, formatOption); should be <long>

Examples:
| locale | input | short | long |
| "en" | 12345678 | "12.3M" | "12.3 million" |
| "ko" | 12345678 | "1,234.6만" | "1,234.6만" |
| "nl" | 12345678 | "12,3\u00a0mln." | "12,3 miljoen" |
| "sw-KE" | 12345678 | "M12.3" | "milioni 12.3" |
| "pt-PT" | 12345678 | "12,3\u00a0milhões" | "12,3 milhões" |
| "en" | 567 | "567" | "567" |
| "en" | 5678 | "5.7K" | "5.7 thousand" |
| "ja" | 5678 | "5,678" | "5,678" |
| "en" | 999 | "999" | "999" |
| "en" | 999.9 | "999.9" | "999.9" |
| "en" | 999.99 | "1K" | "1 thousand" |
| "en" | 1049 | "1K" | "1 thousand" |
| "ja" | 9999 | "9,999" | "9,999" |
| "ja" | 99999099 | "9,999.9万" | "9,999.9万" |
| "zh" | 99999999 | "1\u00a0亿" | "1 亿" |
| "en" | 999999 | "1M" | "1 million" |
| "fr-CA" | 10999 | "10\u00a0999" | "11 mille" |
| "th" | 999909 | "999.9K" | "1 ล้าน" |
| "it" | 999909 | "999.909" | "999,9 mila" |
| "it" | 999999 | "999.999" | "1 milione" |
| "pt-PT" | 1000 | "mil" | "mil" |
| "pt-PT" | 1100 | "1,1\u00a0mil" | "1,1 mil" |
| "ca" | 0 | "0" | "0" |
| "ar" | 1000 | "ألف" | "ألف" |
| "ar" | 2000 | "ألفان" | "ألفان" |
| "en" | 123.45 | "123.4" | "123.4" |


Scenario Outline:  plurals

  Given default locale is <locale>

  When number is <input>
  When precision is 0
  When formatOption.notation = "compact"
  Then FormatLocalizedPlurals(num, formatOption); should be <short>

  When formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatLocalizedPlurals(num, formatOption); should be <long>

Examples:
| locale | input | short | long |
| "ru" | 1000 | "1\u00a0тыс." | "1 тысяча" |
| "ru" | 4000 | "4\u00a0тыс." | "4 тысячи" |
| "ru" | 7000 | "7\u00a0тыс." | "7 тысяч" |
| "cs" | 18000000 | "18\u00a0mil." | "18 milionů" |


Scenario Outline: range mode

  Given default locale is <locale>

  When start number is <input1>
  When end number is <input2>

  When formatOption.relativeForm = "between"
  And formatOption.notation = "normal"
  Then FormatNumberRangeWithFormatter(start, end, formatOption); should be <between>


  When formatOption.relativeForm = "approximately"
  And formatOption.notation = "compact"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <approximately>


  When formatOption.relativeForm = "atLeast"
  And formatOption.notation = "compact"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <atLeast>


  When formatOption.relativeForm = "atMost"
  And formatOption.notation = "compact"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <atMost>

Examples:
| locale | input1 | input2 | between | approximately | atLeast | atMost |
| "en" | 1234 | 5678 | "1,234–5,678" | "~1.2K" | "1.2K+" | "≤1.2K" |
| "ja" | 1234 | 5678 | "1,234～5,678" | "約1,234" | "1,234以上" | "1,234以下" |
| "es" | 1234 | 5678 | "1234-5678" | "~1,2\u00a0mil" | "Más de 1,2\u00a0mil" | "≤1,2\u00a0mil" |
| "pt" | 1234 | 5678 | "1.234–5.678" | "~1,2\u00a0mil" | "+1,2\u00a0mil" | "≤1,2\u00a0mil" |
| "te" | 1234 | 5678 | "1,234–5,678" | "~1.2వే" | "1.2వే+" | "≤1.2వే" |

Scenario Outline: range mode fallback

  Given default locale is <locale>

  When start number is <input1>
  When end number is <input2>
  
  When formatOption.relativeForm = "between"
  And formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatNumberRangeWithFormatter(start, end, formatOption); should be <between>


  When formatOption.relativeForm = "approximately"
  And formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <approximately>


  When formatOption.relativeForm = "atLeast"
  And formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <atLeast>


  When formatOption.relativeForm = "atMost"
  And formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <atMost>

Examples:
| locale | input1 | input2 | between | approximately | atLeast | atMost |
| "en" | 1234 | 5678 | "from 1.2 thousand to 5.7 thousand" | "about 1.2 thousand" | "at least 1.2 thousand" | "at most 1.2 thousand" |
| "te" | 1234 | 5678 | "1.2 వేలు–5.7 వేలు" | "~1.2 వేలు" | "1.2 వేలు+" | "≤1.2 వేలు" |

Scenario Outline: range mode percent

  Given default locale is <locale>

  When start number is <input1>
  When end number is <input2>
  
  When formatOption.relativeForm = "between"
  And formatOption.style = "percent"
  Then FormatNumberRangeWithFormatter(start, end, formatOption); should be <between>

  When formatOption.relativeForm = "approximately"
  And formatOption.style = "percent"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <approximately>
  
  When formatOption.relativeForm = "atLeast"
  And formatOption.style = "percent"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <atLeast>

  When formatOption.relativeForm = "atMost"
  And formatOption.style = "percent"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <atMost>
  
Examples:
| locale | input1 | input2 | between | approximately | atLeast | atMost |
| "en" | 0 | 0.999 | "0%–100%" | "~0%" | "0%+" | "≤0%" |
| "tr" | 0 | 0.999 | "%0–%100" | "~%0" | "%0+" | "≤%0" |
| "en" | 0.004 | 1.004 | "0%–100%" | "~0%" | "0%+" | "≤0%" |
| "gu" | 1000.001 | 1000.005 | "1,00,000%-1,00,000%" | "~1,00,000%" | "1,00,000%+" | "≤1,00,000%" |

Scenario Outline: range mode per-mille

  Given default locale is <locale>

  When start number is <input1>
  When end number is <input2>
  
  When formatOption.relativeForm = "between"
  And formatOption.style = "per-mille"
  Then FormatNumberRangeWithFormatter(start, end, formatOption); should be <between>

  When formatOption.relativeForm = "approximately"
  And formatOption.style = "per-mille"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <approximately>
  
  When formatOption.relativeForm = "atLeast"
  And formatOption.style = "per-mille"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <atLeast>

  When formatOption.relativeForm = "atMost"
  And formatOption.style = "per-mille"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <atMost>

Examples:
| locale | input1 | input2 | between | approximately | atLeast | atMost |
| "en" | 0.999 | 0.9999 | "999‰–1,000‰" | "~999‰" | "999‰+" | "≤999‰" |
| "en" | 0 | 0.0006 | "0‰–1‰" | "~0‰" | "0‰+" | "≤0‰" |
| "he" | -0.1006 | -0.0001 | "-101‰–0‰" | "~-101‰" | "≥-101‰" | "≤-101‰" |


Scenario Outline: range mode scientific

  Given default locale is <locale>

  When start number is <input1>
  When end number is <input2>
  
  When formatOption.relativeForm = "between"
  And formatOption.notation = "scientific"
  Then FormatNumberRangeWithFormatter(start, end, formatOption); should be <between>

  When formatOption.relativeForm = "approximately"
  And formatOption.notation = "scientific"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <approximately>
  
  When formatOption.relativeForm = "atLeast"
  And formatOption.notation = "scientific"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <atLeast>

  When formatOption.relativeForm = "atMost"
  And formatOption.notation = "scientific"
  Then FormatNumberRangeWithFormatter(start, formatOption); should be <atMost>

Examples:
| locale | input1 | input2 | between | approximately | atLeast | atMost |
| "en" | 99000000 | 99900000 | "9.9E7–1.0E8" | "~9.9E7" | "9.9E7+" | "≤9.9E7" |
| "mr" | 99900000 | 104500000 | "[1.0×10^8]–[1.0×10^8]" | "~[1.0×10^8]" | "[1.0×10^8]+" | "≤[1.0×10^8]" |


Scenario Outline: scientific formats
  Given number is <input>
  Given default locale is <locale>

  When formatOption.notation = "scientific"
  Then FormatLocalizedScientific(num, formatOption); should be <scientific>

Examples:
| locale | input | scientific |
| "en" | 12345678 | "1.2E7" |
| "el" | 12345678 | "1,2e7" |
| "hi" | 12345678 | "[1.2E7]" |
| "sv" | 12345678 | "1,2×10^7" |
| "en" | 0 | "0.0E0" |
| "en" | 0.1 | "1.0E-1" |
| "en" | 1060000 | "1.1E6" |
| "en" | 999 | "1.0E3" |

Scenario Outline: parse formats
  Given input string is <str>
  And locale is <locale>

  When set style to <style>
  And notation to <notation>

  Then parsed number should be <number>

Examples:
| str | locale | style | notation | number |
| "1,234,567.89" | "en" | "decimal" | "standard" | 1234567.89 |
| "1.234.567,89" | "ca" | "decimal" | "standard" | 1234567.89 |
| "12,34,567.89" | "bn" | "decimal" | "standard" | 1234567.89 |
| "1\u202f234\u202f567,89" | "fr" | "decimal" | "standard" | 1234567.89 |


Scenario Outline: precision
  Given number is <input>
  And default locale is <locale>

  When precision is 2

  When formatOption.notation = "standard"
  Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <standard>

  When formatOption.notation = "compact"
  Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <compact>

  When formatOption.notation = "scientific"
  Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <scientific>


Examples:
| locale | input | standard | compact | scientific |
| "en" | 12345678.9012 | "12,345,678.9" | "12.35M" | "1.23E7" |
| "fr" | 12345678.9012 | "12\u202f345\u202f678,9" | "12,35\u00a0M" | "1,23E7" |
| "mr" | 12345678.9012 | "1,23,45,678.9" | "1.23\u00a0कोटी" |  "[1.23×10^7]" |
| "zh" | 12345678.9012 | "12345678.9" | "1234.57\u00a0万" | "1.23E7" |
| "en" | 10603000 | "10,603,000" | "10.6M" | "1.06E7" |
| "en" | 16034000 | "16,034,000" | "16.03M" | "1.60E7" |


Scenario Outline: precision small number
  Given number is <input>
  And default locale is <locale>

  When precision is 2

  When formatOption.style = "percent"
  Then FormatLocalizedNumberWithPrecisionSmall(num, formatOption); should be <percent>


  When formatOption.style = "per-mille"
  Then FormatLocalizedNumberWithPrecisionSmall(num, formatOption); should be <per-mille>

Examples:
| locale | input | percent | per-mille |
| "en" | 0.234567 | "23.46%" | "234.57‰" |
| "fr" | 0.234567 | "23,46\u00a0%" | "234,57\u00a0‰" |
| "en" | 0.1029999 | "10.3%" | "103‰" |
| "en" | 0.109993 | "11%" | "109.99‰" |
| "en" | 0.109899 | "10.99%" | "109.9‰" |

Scenario Outline: precision set to zero

  Given default locale is <locale>

  When number is <input>
  When precision is 0
  
  Then FormatLocalizedNumber(num); should be <normal>
  
  When formatOption.style = "percent"
  Then FormatLocalizedProportional(num, formatOption); should be <percent>


  When formatOption.style = "per-mille"
  Then FormatLocalizedProportional(num, formatOption); should be <per-mille>
  
  When formatOption.notation = "compact"
  Then FormatLocalizedCompact(num, formatOption); should be <short>

  When formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatLocalizedCompact(num, formatOption); should be <long>
  
  When formatOption.notation = "scientific"
  Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <scientific>
  
Examples:
| locale | input | normal | percent | per-mille | short | long | scientific |
| "en" | 1.4 | "1" | "140%" | "1,400‰" | "1" | "1" | "1E0" |
| "en" | 1.999 | "2" | "200%" | "1,999‰" | "2" | "2" | "2E0" |
| "en" | 999.99 | "1,000" | "99,999%" | "999,990‰" | "1K" | "1 thousand" | "1E3" |
| "en" | 1400 | "1,400" | "140,000%" | "1,400,000‰" | "1K" | "1 thousand" | "1E3" |


Scenario Outline: precision set to three

  Given default locale is <locale>

  When number is <input>
  When precision is 3
  When formatOption.keepTrailingZero = "true"
  Then FormatLocalizedNumber(num); should be <normal>
  
  When formatOption.style = "percent"
  Then FormatLocalizedProportional(num, formatOption); should be <percent>


  When formatOption.style = "per-mille"
  Then FormatLocalizedProportional(num, formatOption); should be <per-mille>
  
  When formatOption.notation = "compact"
  Then FormatLocalizedCompact(num, formatOption); should be <short>

  When formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatLocalizedCompact(num, formatOption); should be <long>
  
  When formatOption.notation = "scientific"
  Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <scientific>
  
Examples:
| locale | input | normal | percent | per-mille | short | long | scientific |
| "en" | 1.456777 | "1.457" | "145.678%" | "1,456.777‰" | "1.457" | "1.457" | "1.457E0" |
| "en" | 1.4 | "1.400" | "140.000%" | "1,400.000‰" | "1.400" | "1.400" | "1.400E0" |
| "en" | 999 | "999.000" | "99,900.000%" | "999,000.000‰" | "999.000" | "999.000" | "9.990E2" |
| "en" | 999.999999 | "1,000.000" | "100,000.000%" | "999,999.999‰" | "1.000K" | "1.000 thousand" | "1.000E3" |
| "en" | 999999 | "999,999.000" | "99,999,900.000%" | "999,999,000.000‰" | "999.999K" | "999.999 thousand" | "1.000E6" |
| "en" | 999999.9 | "999,999.900" | "99,999,990.000%" | "999,999,900.000‰" | "1.000M" | "1.000 million" | "1.000E6" |

Scenario Outline: precision and keeptrailingzeo test for zero

  Given default locale is <locale>

  When number is <input>
  When precision is 5
  When formatOption.keepTrailingZero = "true"
  Then FormatLocalizedNumber(num); should be <normal>
  
  When formatOption.style = "percent"
  Then FormatLocalizedProportional(num, formatOption); should be <percent>


  When formatOption.style = "per-mille"
  Then FormatLocalizedProportional(num, formatOption); should be <per-mille>
  
  When formatOption.notation = "compact"
  Then FormatLocalizedCompact(num, formatOption); should be <short>

  When formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatLocalizedCompact(num, formatOption); should be <long>
  
  When formatOption.notation = "scientific"
  Then FormatLocalizedNumberWithPrecision(num, formatOption); should be <scientific>
Examples:
| "en" | 0 | "0.00000" | "0.00000%" | "0.00000‰" | "0.00000" | "0.00000" | "0.00000E0" |

Scenario Outline: Locale mapping

  Given locale is <locale>
  When formatOption.languageTag = <tag>
  When number is <input>
  Then FormatLocalizedNumber(num); should be <num>

Examples:
   | tag          | locale  | input      | num                      |
   | "BCP47"      | "pt"    | 1234567.89 | "1.234.567,89"           |
   | "TT-locale"  | "pt"    | 1234567.89 | "1\u00a0234\u00a0567,89" |
   | "BCP47"      | "ja-JP" | 1234567.89 | "1,234,567.89"           |
   | "TT-locale"  | "not-exist" | 1234567.89 | "1,234,567.89"           |
   
   
Scenario Outline:  compact mode t3 fix

  Given default locale is <locale>

  When number is <input>

  When formatOption.notation = "compact"
  Then FormatLocalizedCompact(num, formatOption); should be <short>
  
Examples:
| locale | input | short |
| "da" | 10000 | "10.000" |
| "da" | 999909 | "999.909" |
| "et" | 10000 | "10\u00a0000" |
| "et" | 999909 | "999\u00a0909" |
| "el" | 10000 | "10.000" |
| "el" | 999909 | "999.909" |
| "hi" | 10000000 | "1\u00a0करोड़" |
| "hi" | 999999999 | "1\u00a0अरब" |
| "hi" | 999999999999 | "10\u00a0खरब" |
| "jv" | 1000000000 | "1\u00a0M" |
| "jv" | 999999999999 | "1\u00a0T" |
| "km" | 999909 | "999.9\u00a0ពាន់" |
| "nb" | 999999999999 | "1\u00a0billion" |
| "pt-PT" | 999999999 | "mil\u00a0milhões" |

Scenario Outline:  compact mode t3 fix for MY 

  Given default locale is <locale>

  When number is <input>

  When formatOption.notation = "compact"
  Then FormatLocalizedCompact(num, formatOption); should be <short>
  
  When formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatLocalizedCompact(num, formatOption); should be <long>
  
Examples:
| locale | input | short | long |
| "my" | 1000 | "1\u00a0ထောင်" | "1 ထောင်" |
| "my" | 10000 | "1\u00a0သောင်း" | "1 သောင်း"  | 
| "my" | 100000 | "1\u00a0သိန်း" | "1 သိန်း" |
| "my" | 1000000 | "1\u00a0သန်း" | "1 သန်း" |
| "my" | 10000000 | "10\u00a0သန်း" | "10 သန်း" |
| "my" | 100000000 | "သန်း\u00a0100" | "သန်း 100" |
| "my" | 1000000000 | "သန်း\u00a01,000" | "သန်း 1,000" |
| "my" | 999909999 | "သန်း\u00a0999.9" | "သန်း 999.9" |
| "my" | 10000000000 | "ကုဋေ\u00a01\u00a0ထ" | "1,000 ကုဋေ" |
| "my" | 100000000000 | "ကုဋေ\u00a01\u00a0သ" | "ကုဋေ 1 သောင်း" |
| "my" | 1000000000000 | "ဋေ\u00a01\u00a0သိန်း" | "ကုဋေ 1 သိန်း" |
| "my" | 10000000000000 | "ဋေ\u00a01\u00a0သန်း" | "ကုဋေ 1 သန်း" |
| "my" | 100000000000000 | "1\u00a0ကောဋိ" | "1 ကောဋိ" |


Scenario Outline:  compact mode t3 fix for BN

  Given default locale is <locale>

  When number is <input>

  When formatOption.notation = "compact"
  Then FormatLocalizedCompact(num, formatOption); should be <short>
  
  When formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatLocalizedCompact(num, formatOption); should be <long>
  
Examples:
| locale | input | short | long |
| "bn" | 1000 | "1\u00a0হা" | "1 হাজার" |
| "bn" | 10000 | "10\u00a0হা" | "10 হাজার" |
| "bn" | 100000 | "1\u00a0লা" | "1 লাখ" |
| "bn" | 1000000 | "1\u00a0মি" | "1 মিলিয়ন" |
| "bn" | 10000000 | "10\u00a0মি" | "10 মিলিয়ন" |
| "bn" | 100000000 | "100\u00a0মি" | "100 মিলিয়ন" |
| "bn" | 1000000000 | "1\u00a0বি" | "1 বিলিয়ন" |
| "bn" | 10000000000 | "10\u00a0বি" | "10 বিলিয়ন" |
| "bn" | 100000000000 | "100\u00a0বি" | "100 বিলিয়ন" |
| "bn" | 1000000000000 | "1\u00a0ট্রি" | "1 ট্রিলিয়ন" |
| "bn" | 10000000000000 | "10\u00a0ট্রি" | "10 ট্রিলিয়ন" |
| "bn" | 100000000000000 | "100\u00a0ট্রি" | "100 ট্রিলিয়ন" |


Scenario Outline:  negative numbers

  Given default locale is <locale>

  When number is <input>

  When formatOption.notation = "compact"
  Then FormatLocalizedCompact(num, formatOption); should be <short>
  
  When formatOption.notation = "compact"
  And formatOption.compactDisplay = "long"
  Then FormatLocalizedCompact(num, formatOption); should be <long>
  
Examples:
| locale | input | short | long |
| "en" | -12345678 | "-12.3M" | "-12.3 million" |
| "ko" | -12345678 | "-1,234.6만" | "-1,234.6만" |
| "nl" | -12345678 | "-12,3\u00a0mln." | "-12,3 miljoen" |
| "sw-KE" | -12345678 | "-M12.3" | "-milioni 12.3" |
| "pt-PT" | -12345678 | "-12,3\u00a0milhões" | "-12,3 milhões" |
| "en" | -567 | "-567" | "-567" |
| "en" | -5678 | "-5.7K" | "-5.7 thousand" |
| "ja" | -5678 | "-5,678" | "-5,678" |
| "en" | -999 | "-999" | "-999" |
| "en" | -999.9 | "-999.9" | "-999.9" |
| "en" | -999.99 | "-1K" | "-1 thousand" |
| "en" | -1049 | "-1K" | "-1 thousand" |
| "ja" | -9999 | "-9,999" | "-9,999" |
| "ja" | -99999099 | "-9,999.9万" | "-9,999.9万" |
| "zh" | -99999999 | "-1\u00a0亿" | "-1 亿" |
| "en" | -999999 | "-1M" | "-1 million" |
| "fr-CA" | -10999 | "-10\u00a0999" | "-11 mille" |
| "th" | -999909 | "-999.9K" | "-1 ล้าน" |
| "it" | -999909 | "-999.909" | "-999,9 mila" |
| "it" | -999999 | "-999.999" | "-1 milione" |
| "pt-PT" | -1000 | "-1000" | "-1000" |
| "pt-PT" | -1100 | "-1,1\u00a0mil" | "-1,1 mil" |
| "es" | -1000 | "-1000" | "-1000" |
| "es" | -1000000 | "-1\u00a0mill." | "-1 millón" |
| "es" | -1000000000 | "-1000\u00a0mill." | "-1000 millones" |
| "ca" | -0 | "0" | "0" |
| "ar" | -1000 | "-ألف" | "-ألف" |
| "ar" | -2000 | "-ألفان" | "-ألفان" |
| "en" | -123.45 | "-123.4" | "-123.4" |
