/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @ttfe/@typescript-eslint/no-unnecessary-condition */
import type { AggregatedResult, AssertionResult } from "@jest/test-result";
import * as cucumber from "@cucumber/cucumber";
import { runCLI } from "jest";
import { Step, Result, ExampleStep } from "../types";
// import { PickleStep } from '@cucumber/messages';

type StepContext = {
  jest: {
    stepIndex: Record<string, number>;
    exampleIndex?: number;
    parent: string;
    jestMappedResult: AssertionResult;
  };
};

type StepWithSanTitle = Step & {
  /**
   * see: https://github.com/cucumber/cucumber-js/blob/main/docs/custom_snippet_syntaxes.md
   */
  sanitizedTitle: string;
};

function escapableWrapper(wrapper: string) {
  const start = wrapper.charAt(0);
  const end = wrapper.charAt(1) ?? start;
  return `${start}(?:[^${end}]|\\\\${end})+[^\\\\]${end}`;
}

export class DelegateJest {
  filename: string;
  jestMappedResult: Result[] = [];
  constructor(filename: string) {
    this.filename = filename;
  }
  jesting(projects: string[], target?: string): ReturnType<typeof runCLI> {
    const options = {
      _: projects,
    } as Parameters<typeof runCLI>[0];
    if (target) {
      options.testNamePattern = target;
    }
    return runCLI(options, [process.cwd()]);
  }
  async main(gherkinMap: Step[] = []): Promise<AssertionResult[]> {
    const { results } = await this.jesting([this.filename]);
    return this.transformResult(results, gherkinMap);
  }

  transformResult(
    aggregatedResult: AggregatedResult | null,
    gherkinMap: Step[] = []
  ): AssertionResult[] {
    if (!aggregatedResult) {
      return [];
    }
    const resultInGherkin: AssertionResult[] = [];
    aggregatedResult.testResults.forEach((result) =>
      result.testResults.forEach((assertionResult) => {
        // const stepType = assertionResult.title.match(/^(When|Then|Given)\s(.+)/);
        // const relatedSteps: Result[] = [];
        // gherkinMap.forEach(step => {
        //   if (step.host === assertionResult.title) {
        //     relatedSteps.push(step);
        //   } else if (stepType && step.key == stepType[1] && step.value === stepType[2]) {
        //     relatedSteps.push(step);
        //   }
        // });

        // if (assertionResult.status === 'passed') {
        //   this.markStepsStatus(relatedSteps, 'passed');
        // } else if (assertionResult.status === 'skipped') {
        //   this.markStepsStatus(relatedSteps, 'skipped');
        // } else if (assertionResult.status === 'failed') {
        //   // console.log('-----', relatedSteps, assertionResult.title)
        //   assertionResult.failureMessages.forEach(msg => {
        //     this.traceErrorFromMessage(msg, relatedSteps);
        //   });
        // } else {
        //   this.markStepsStatus(relatedSteps, null);

        // }
        // resultInGherkin.push(...relatedSteps);

        resultInGherkin.push(assertionResult);
      })
    );
    return resultInGherkin;
  }

  markStepsStatus(relatedSteps: Result[], status: Result["status"]): void {
    relatedSteps.forEach((step) => {
      step.status = status;
    });
  }

  traceErrorFromMessage(msg: string, step: Step): Result["status"] {
    const lines = msg.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const stackPosition = line.match(/\s+at .*?(\S+):(\d+:\d+)\)*?$/);
      if (!stackPosition) {
        continue;
      } else {
        const fileName = stackPosition[1];
        if (!fileName.match(this.filename)) {
          continue;
        }
        const [lineNumber, colNumber] = (stackPosition[2]
          ?.split(":")
          ?.map((v) => Number(v) - 1) as [number, number] | null) ?? [0, 0];
        if (
          step.pos.end.line < lineNumber ||
          (step.pos.end.line === lineNumber &&
            step.pos.end.character < colNumber)
        ) {
          return "passed";
        } else if (
          step.pos.start.line < lineNumber ||
          (step.pos.start.line === lineNumber &&
            step.pos.start.character <= colNumber)
        ) {
          return "failed";
        } else {
          return "passed";
        }
      }
    }
  }

  sanitizeTitle(
    title: string,
    params?: ExampleStep["examples"]
  ): {
    cucumberStepKey: string;
    stepParams?: string[];
  } {
    const stepParams = title.match(new RegExp(escapableWrapper("<>"), "g")) as
      | string[]
      | undefined;
    let cucumberStepKey = title.replace(/\(/g, "\\(").replace(")", "\\)");

    stepParams?.forEach((p, i) => {
      const valKey = p.replace(/<|>/g, "");
      stepParams[i] = valKey;
      const examplesValue = params?.[0]?.[valKey];
      if (examplesValue !== undefined) {
        const typeOfValue =
          typeof examplesValue === "number" ? "{float}" : "{string}";
        cucumberStepKey = cucumberStepKey.replace(p, typeOfValue);
      }
    });
    return { cucumberStepKey, stepParams };
  }

  matchStepName(
    jestStep: StepWithSanTitle,
    pickleSteps: { text: string }[],
    callback: (values: string[], idx: number) => boolean | void
  ): void {
    const regexText = jestStep.sanitizedTitle
      .replace(
        /\{string\}/g,
        `(${escapableWrapper('"')}|${escapableWrapper("'")})`
      )
      .replace(/\{float\}/g, `((\-)?\d+(\.\d+)?)`);
    const regex = new RegExp(`^${regexText}$`);
    for (let i = 0; i < pickleSteps.length; i++) {
      const pickleStep = pickleSteps[i];
      const matchExp = pickleStep.text.match(regex);
      if (matchExp) {
        const [_fullText, ...values] = matchExp;
        if (callback(values, i)) {
          return;
        }
      }
    }
  }

  dedupeStepName(
    dedupe: { text: string; step: StepWithSanTitle }[]
  ): { text: string; step: StepWithSanTitle }[] {
    const paramSteps = [...dedupe.filter((v) => v.step.stepParams)];
    paramSteps.forEach(({ step }) => {
      this.matchStepName(step, dedupe, (values, idx) => {
        dedupe[idx].step.sanitizedTitle = step.sanitizedTitle;
        dedupe[idx].step.stepParams =
          dedupe[idx].step.stepParams ?? new Array(step.stepParams?.length);
      });
    });
    return dedupe.filter(
      (v, i) =>
        i ===
        dedupe.findIndex(
          (predicate) => predicate.step.sanitizedTitle === v.step.sanitizedTitle
        )
    );
  }

  delegateTo(steps: StepWithSanTitle[]): void {
    const cachedResult = this.main(steps);
    const matchStepName = this.matchStepName;

    cucumber.Before<StepContext>(async function (scenario) {
      const jestScenario = steps.find(
        (step) => step.key === "Scenario" && step.value === scenario.pickle.name
      );

      const examplesScenario: Record<string, string | number> = {};
      const pickleSteps = [...scenario.pickle.steps];
      const relatedSteps = steps.filter(
        (s) => s.parent === scenario.pickle.name
      );
      relatedSteps.forEach((jestStep) => {
        if (!jestStep.stepParams) {
          return;
        }
        const jStep = jestStep as StepWithSanTitle & {
          stepParams: Exclude<StepWithSanTitle["stepParams"], undefined>;
        };

        matchStepName(jStep, pickleSteps, (values, idx) => {
          const keys = jStep.stepParams;
          values.forEach((v, i) => {
            // const valueType = typeof jestScenario?.examples?.[0][keys[i]];
            // if (valueType === 'string') {
            //   examplesScenario[keys[i]] = v.replace(/^"|"$/g, '');
            // } else if (valueType === 'number') {
            //   examplesScenario[keys[i]] = Number(v);
            // }
            examplesScenario[keys[i]] = JSON.parse(v);
          });

          pickleSteps.splice(idx, 1);
          return true;
        });
      });
      const exampleIndex = jestScenario?.examples?.findIndex((v) => {
        for (const k in examplesScenario) {
          if (v[k] !== examplesScenario[k]) {
            return false;
          }
        }
        return true;
      });

      const result = await cachedResult;
      const arrJestMappedResult = result.filter((r) => {
        return r.title === scenario.pickle.name;
      });
      const jestMappedResult = arrJestMappedResult[exampleIndex ?? 0];
      this.jest = (this.jest as StepContext["jest"] | null) || {
        stepIndex: {},
        exampleIndex,
        parent: scenario.pickle.name,
        jestMappedResult,
      };
    });
    const dedupe: { text: string; step: StepWithSanTitle }[] = [];
    const scenarios = steps.filter((step) => step.key === "Scenario");

    steps.forEach((step) => {
      const keyword = step.key as "Given" | "When" | "Then";
      const title = step.value;
      if (cucumber[keyword]) {
        const parent = scenarios.find(
          (s) => s.key === "Scenario" && s.value === step.parent
        );

        const { cucumberStepKey, stepParams } = this.sanitizeTitle(
          title,
          parent?.examples
        );
        step.sanitizedTitle = cucumberStepKey;
        step.stepParams = stepParams;
        dedupe.push({ text: cucumberStepKey, step });
      }
    });
    this.dedupeStepName(dedupe).forEach(({ step }) => {
      this.registerStepDefinition(step, steps);
    });
  }

  registerStepDefinition(
    step: StepWithSanTitle,
    allSteps: StepWithSanTitle[]
  ): void {
    const traceErrorFromMessage: DelegateJest["traceErrorFromMessage"] =
      this.traceErrorFromMessage.bind(this);
    type ICallback = Parameters<typeof fnStepDefinition>[2];
    const keyword = step.key as "Given" | "When" | "Then";
    const fnStepDefinition: typeof cucumber.defineStep<StepContext> =
      cucumber[keyword];
    const cucumberStepKey = step.sanitizedTitle;

    const callback: ICallback = async function (...args) {
      // console.log('=====call=====', step.key, cucumberStepKey)

      this.jest.stepIndex[cucumberStepKey] =
        (this.jest.stepIndex[cucumberStepKey] ?? -1) + 1;
      const stepInScenario = allSteps.filter((s) => {
        return (
          s.parent === this.jest?.parent && s.sanitizedTitle === cucumberStepKey
        );
      })[this.jest.stepIndex[cucumberStepKey]] as StepWithSanTitle | undefined;
      if (!stepInScenario) {
        // throw new Error(['Not Found', keyword, cucumberStepKey].join('/'))
        return "pending";
      }

      const { jestMappedResult } = this.jest;
      if (!jestMappedResult) {
        return "pending";
      } else if (jestMappedResult.status === "failed") {
        if (stepInScenario.host) {
          for (
            let idxMsg = 0;
            idxMsg < jestMappedResult.failureMessages.length;
            idxMsg++
          ) {
            const status = traceErrorFromMessage(
              jestMappedResult.failureMessages[idxMsg],
              stepInScenario
            );
            if (status === "failed") {
              throw errorBuilder(jestMappedResult.failureMessages[idxMsg]);
            }
            if (status) {
              return status;
            }
          }
          return "pending";
        } else {
          throw errorBuilder(jestMappedResult.failureMessages[0]);
        }
      } else {
        return jestMappedResult.status;
      }
    };

    if (step.stepParams) {
      Object.defineProperty(callback, "length", {
        value: step.stepParams.length,
      });
    }
    // console.log('=====regi=====', step.key, cucumberStepKey)

    fnStepDefinition(cucumberStepKey, callback);
  }
}

function errorBuilder(msg: string): Error {
  const matched = msg.match(/Error: ([^\n]+)\n(.+)/);
  const err = new Error();
  if (!matched) {
    err.message = msg;
  } else {
    err.message = matched[1];
    err.stack = matched[2];
  }
  err.message = err.message.replace(/\[\d+m/g, "");
  return err;
}

export default DelegateJest;
