import * as fs from 'fs';
import * as path from 'path';
import { Extractor, ExtractorConfig, ExtractorResult } from '@microsoft/api-extractor';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
function getTemplate(entry: string, subModuleName: string) {
  const moduleNameParts = subModuleName.split('/');
  const moduleName = moduleNameParts.splice(-1, 1)[0];
  const modulePath = moduleNameParts.join('/');
  const reportPath = path.join(`<projectFolder>/docs/`, modulePath);
  if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath, {
      recursive: true,
    });
  }
  const basePath = path.relative(subModuleName, './');
  return {
    extends: path.relative(`${pathOfConfig}/${subModuleName}`, pathOfBaseConfig),
    mainEntryPointFilePath: path.join('<projectFolder>', entry),
    apiReport: {
      reportFileName: `${moduleName}.api.md`,
      reportFolder: reportPath,
    },
    docModel: {
      apiJsonFilePath: `${reportPath}/${moduleName}.api.json`,
    },
  };
}
const originalFile = fs.readFileSync(path.join(__dirname, '../config/api-extractor.json'), 'utf-8');
const pathOfBaseConfig = './config/api-extractor.json';
const pathOfConfig = './config/api-extractor/';
const exportsPackageJSON = packageJSON.exports;

if (!fs.existsSync(pathOfBaseConfig)) {
  const originalConfig = new Function(`return (${originalFile})`)();
  (originalConfig.mainEntryPointFilePath = path.join('<projectFolder>', packageJSON.types)),
    fs.writeFileSync(pathOfBaseConfig, JSON.stringify(originalConfig, undefined, 2));
}
generateAPIExtraction(pathOfBaseConfig);

if (exportsPackageJSON && Object.keys(exportsPackageJSON).length) {
  Object.keys(exportsPackageJSON).forEach((subModuleName) => {
    // if (fs.exists(subModule))
    const moduleConfig = exportsPackageJSON[subModuleName as keyof typeof exportsPackageJSON];
    const route = path.join('./', moduleConfig.types);

    const info = fs.statSync(route);
    if (info.isDirectory()) {
      // const tempFile = path.join(route, 'package.json');
      // const tempContent = JSON.stringify({
      //   name: route,
      //   main: moduleConfig.require,
      //   module: moduleConfig.import,
      //   types: moduleConfig.types,
      // });
      // fs.writeFileSync(tempFile, tempContent);
    } else {
      const pathFolder = path.join(pathOfConfig, subModuleName);
      if (!fs.existsSync(pathFolder)) {
        fs.mkdirSync(pathFolder, {
          recursive: true,
        });
      }
      const tempFile = path.join(pathFolder, `api-extractor.json`);
      const tempContent = JSON.stringify(getTemplate(route, subModuleName), undefined, 2);
      fs.writeFileSync(tempFile, tempContent);
      console.log(tempFile, pathFolder);
      generateAPIExtraction(tempFile);
    }
  });
}

function generateAPIExtraction(tempFile: string) {
  const extractorConfig: ExtractorConfig = ExtractorConfig.loadFileAndPrepare(tempFile);

  const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true,
  });

  if (extractorResult.succeeded) {
    console.log(`API Extractor completed successfully`);
    process.exitCode = 0;
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`,
    );
    process.exitCode = 1;
  }
}
