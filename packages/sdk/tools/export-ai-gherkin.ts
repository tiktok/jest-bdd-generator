import OpenAI from 'openai';
import * as fs from 'node:fs';
import * as process from 'node:process';
import * as path from 'node:path';

let openai: OpenAI;
function init() {
  fs.readFile('.openAIToken', (err, info) => {
    if (err || !info?.toString().split('\n')[2]) {
      console.error(
        [
          'Please provide your OpenAI token and project info in ./.openAIToken',
          'Format:',
          '<token>\\n<organizationId>\\n<projectId>'
        ].join('\n')
      );
      console.error('./.openAIToken file not valid');
      console.error('aborted');
      process.exit(2);
    }
    const tokens = info.toString().split('\n');

    process.env.OPENAI_API_KEY = tokens[0];
    openai = new OpenAI({
      organization: tokens[1],
      project: tokens[2]
    });
  });
}
async function readSpec(content: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an expert in Gherkin.' },
      {
        role: 'user',
        content: [
          `Please generate a Gherkin document to cover all the probable use cases, especially the class properties, and elaborate on the possible option values indicated by its type definition and group them into Scenario outlines.`,
          `Do not use tables in the steps.`,
          `Values in Examples must be valid for JSON.parse`,
          `# Output:`,
          '```gherkin',
          '...',
          '```',
          `# Input:`,
          '```markdown',
          content,
          '```'
        ].join('\n')
      }
    ]
  });

  const response = completion.choices[0].message.content?.split('\n') ?? [];
  const start = response.indexOf('```gherkin') ?? -1;
  const end = response.indexOf('```', start) ?? response.length;
  return response.slice(start + 1, end).join('\n');
}
async function traverse(filepath = './docs'): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filepath);
    if (fileName.match(/\.api\.md$/)) {
      fs.readFile(filepath, (err, info) => {
        if (err) {
          return reject(err);
        }

        const content = info.toString();
        console.log('generating:', fileName);
        readSpec(content).then((generatedGherkin) => {
          const fileNameOutput = path.join(path.dirname(filepath), fileName + '.feature');
          fs.writeFile(fileNameOutput, generatedGherkin, (err) => {
            if (err) {
              return reject(err);
            }

            console.log('succeeded:', fileNameOutput);
            resolve([generatedGherkin]);
          });
        });
      });
    } else {
      fs.lstat(filepath, async (err, info) => {
        if (err) {
          return reject(err);
        }

        if (info.isDirectory()) {
          fs.readdir(filepath, async (err, files) => {
            if (err) {
              return reject(err);
            }

            Promise.all(files.map((file) => traverse(path.join(filepath, file)))).then((children) => {
              resolve(children.flat());
            });
          });
        } else {
          resolve([]);
        }
      });
    }
  });
}

// readSpec(fs.readFileSync('./docs/jest-bdd-generator.api.md').toString()).then(ret => console.log(ret))
init();

traverse();
// .then( async ret => {
//   for (let i = 0; i< ret.length; i++) {
//     const fileContent = ret[i];
//     if (fileContent) {
//       const generated = await readSpec(fileContent);
//       console.log(generated);
//     }
//   }
// })
