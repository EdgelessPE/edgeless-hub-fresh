// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsj = require("ts-json-schema-generator");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const prettier = require("prettier");

interface NaiveAjvConfig {
  path: string;
  type: string;
  outputPath: string;
}

function main() {
  const arr: NaiveAjvConfig[] = [
    {
      path: "./types/config.d.ts",
      type: "Config",
      outputPath: "./electron/schema/config.ts",
    },
    {
      path: "./types/online.d.ts",
      type: "HelloResponse",
      outputPath:
        "./electron/main/services/ept/parsers/schemas/protocol310/hello.ts",
    },
    {
      path: "./types/online.d.ts",
      type: "AlphaResponse",
      outputPath:
        "./electron/main/services/ept/parsers/schemas/protocol310/alpha.ts",
    },
  ];

  for (const cfg of arr) {
    const { path, type, outputPath } = cfg;
    console.log(`Generating type ${type}...`);
    /** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
    const config = {
      path,
      type,
      tsconfig: "./tsconfig.json",
    };
    const schema = tsj.createGenerator(config).createSchema(config.type);
    const schemaString = JSON.stringify(schema, null, 2);
    const finalString = prettier.format(
      `const schema = ${schemaString}; \n export default schema;`,
      { parser: "babel" }
    );
    fs.writeFile(outputPath, finalString, (err: unknown) => {
      if (err) throw err;
    });
  }
}

main();
