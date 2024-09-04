import { describe, test, it, expect } from '@jest/globals';

describe('Fail With Math.f16Round', () => {
  test.each([
    {num: 1234.1, method: "ceil", result: 1235},
    {num: 1234.9, method: "ceil", result: 1235},
    {num: -1234.1, method: "ceil", result: -1234},
    {num: -1234.9, method: "ceil", result: -1234},
    {num: 1234.1, method: "floor", result: 1234},
    {num: 1234.9, method: "floor", result: 1234},
    {num: -1234.1, method: "floor", result: -1235},
    {num: -1234.9, method: "floor", result: -1235},
    {num: 1234.5, method: "round", result: 1235},
    {num: 1234.4, method: "round", result: 1234},
    {num: -1234.5, method: "round", result: -1234},
    {num: -1234.6, method: "round", result: -1235}
  ])('Integer pattern', async ({ num,method,result }) => {
    //@Given input number is <num>
    expect(typeof num).toBe('number');

    //@When rounding with <method>
    expect(Math[method]).toBeDefined();

    //@Then rounded number is <result>
    expect(Math[method](num)).toEqual(result);

  });
  test.each([
    {num: 5.5, method: "fround", result: 5.5},
    {num: 5.5, method: "f16round", result: 5.5},
    {num: 5.05, method: "fround", result: 5.050000190734863},
    {num: 5.05, method: "f16round", result: 5.05078125},
    {num: 5, method: "fround", result: 5},
    {num: 5, method: "f16round", result: 5},
    {num: -5.05, method: "fround", result: -5.050000190734863},
    {num: -5.05, method: "f16round", result: -5.05078125}
  ])('Float, Single and double', async ({ num,method,result }) => {
      
    //@Given input number is <num>
    expect(typeof num).toBe('number');

    //@When rounding with <method>
    expect(Math[method]).toBeDefined();

    //@Then rounded number is <result>
    expect(Math[method](num)).toEqual(result);

  });
  
});
