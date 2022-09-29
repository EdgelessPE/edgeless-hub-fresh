const tsj = require("ts-json-schema-generator");
const fs = require("fs");

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
      outputPath: "./electron/schema/config.json",
    },
    {
      path: "./types/online.d.ts",
      type: "HelloResponse",
      outputPath:
        "./electron/main/services/ept/parsers/schemas/protocol310.json",
    },
    // {
    //   path: "./types/online.d.ts",
    //   type: "AlphaResponse",
    //   outputPath:
    //     "./electron/main/services/ept/parsers/protocol3/schema/alpha.json",
    // },
  ];

  for (const cfg of arr) {
    const { path, type, outputPath } = cfg;
    /** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
    const config = {
      path,
      type,
      tsconfig: "./tsconfig.json",
    };
    const schema = tsj.createGenerator(config).createSchema(config.type);
    const schemaString = JSON.stringify(schema, null, 2);
    fs.writeFile(outputPath, schemaString, (err: any) => {
      if (err) throw err;
    });
  }
}

main()
