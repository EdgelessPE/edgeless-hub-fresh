const tsj = require("ts-json-schema-generator");
const fs = require("fs");

function main() {
  /** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
  const config = {
    path: "./electron/main/services/config/type.d.ts",
    tsconfig: "./tsconfig.json",
    type: "Config",
  };

  const output_path = "./schema/config.json";

  const schema = tsj.createGenerator(config).createSchema(config.type);
  const schemaString = JSON.stringify(schema, null, 2);
  fs.writeFile(output_path, schemaString, (err: any) => {
    if (err) throw err;
  });
}

main()
