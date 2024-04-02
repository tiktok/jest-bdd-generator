import { loadConfiguration, loadSupport, runCucumber /*, loadSources */ } from '@cucumber/cucumber/api';
import * as path from 'path';
import * as fs from 'fs';

export async function runTests(options: {
  pathFeatureInput?: string;
  pathTestsInput?: string;
  pathOutput?: string;
  scenario?: string[];
}): Promise<boolean> {
  // load configuration from a particular file, and override a specific option
  const { runConfiguration } = await loadConfiguration();

  // load the support code upfront
  runConfiguration.support.requireModules = [
    path.join(__dirname, `./jest-to-cucumber/jest-ts-register${path.extname(__filename)}`),
  ];

  if (options.pathTestsInput) {
    if (fs.lstatSync(options.pathTestsInput).isDirectory()) {
      const foldername = options.pathTestsInput;

      runConfiguration.support.requirePaths = fs
        .readdirSync(options.pathTestsInput)
        .filter((subPath) => path.extname(subPath) === '.ts')
        .map((fname) => path.join(foldername, fname));
    } else {
      runConfiguration.support.requirePaths = [options.pathTestsInput];
    }
    runConfiguration.formats.files = {
      [`${path.basename(options.pathTestsInput)}-report.html`]: 'html',
    };
  }
  if (options.pathFeatureInput) {
    runConfiguration.sources.paths = [options.pathFeatureInput];
    if (fs.lstatSync(options.pathFeatureInput).isFile()) {
      const featureBookName = path.basename(options.pathFeatureInput).replace(/\.feature$/, '');
      // overwrite report name from testpath
      runConfiguration.formats.files = {
        [`${featureBookName}-report.html`]: 'html',
      };

      // filter *.test.ts with featureName
      runConfiguration.support.requirePaths = runConfiguration.support.requirePaths.filter(
        (filename) => path.basename(filename).indexOf(featureBookName) !== -1,
      );
    }
  }

  if (options.scenario) {
    runConfiguration.sources.names = options.scenario;

    const reportNameWithScenario: {
      [key: string]: 'html';
    } = {};
    Object.keys(runConfiguration.formats.files).forEach((key) => {
      reportNameWithScenario[`${path.basename(key)}-${options.scenario}.html`] = 'html';
    });

    runConfiguration.formats.files = reportNameWithScenario;
  }

  if (options.pathOutput) {
    const pathOutput = options.pathOutput;
    const filesFormats = runConfiguration.formats.files;
    runConfiguration.formats.files = {};
    Object.keys(filesFormats).forEach((key) => {
      const k = path.join(pathOutput, key);
      runConfiguration.formats.files[k] = filesFormats[key];
    });
  }
  // const { plan } = await loadSources(runConfiguration.sources);
  // console.log(plan); return true;
  const support = await loadSupport(runConfiguration);

  // console.log(support); return true;
  // run cucumber, using the support code we loaded already

  const { success } = await runCucumber({ ...runConfiguration, support });
  return success;
}
