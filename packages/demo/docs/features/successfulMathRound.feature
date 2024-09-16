@format-feature
Feature: Rounding methods of Math

Scenario Outline: Integer pattern
  Given input number is <num>
  When rounding with <method>
  Then rounded number is <result>

Examples:
| num | method | result |
| 1234.1 | "ceil" | 1235 |
| 1234.9 | "ceil" | 1235 |
| -1234.1 | "ceil" | -1234 |
| -1234.9 | "ceil" | -1234 |
| 1234.1 | "floor" | 1234 |
| 1234.9 | "floor" | 1234 |
| -1234.1 | "floor" | -1235 |
| -1234.9 | "floor" | -1235 |
| 1234.5 | "round" | 1235 |
| 1234.4 | "round" | 1234 |
| -1234.5 | "round" | -1234 |
| -1234.6 | "round" | -1235 |


Scenario Outline: Float and double
  Given input number is <num>
  When rounding with <method>
  Then rounded number is <result>

Examples:
| num | method | result |
| 5.5 | "fround" | 5.5 |
| 5.05 | "fround" | 5.050000190734863 |
| 5 | "fround" | 5 |
| -5.05 | "fround" | -5.050000190734863 |