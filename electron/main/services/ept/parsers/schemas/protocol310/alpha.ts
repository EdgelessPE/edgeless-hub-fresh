const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $ref: "#/definitions/AlphaResponse",
  definitions: {
    AlphaResponse: {
      type: "object",
      properties: {
        kernel_wim: {
          anyOf: [
            {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                version: {
                  type: "string",
                },
                url: {
                  type: "string",
                },
                size: {
                  type: "number",
                },
                timestamp: {
                  type: "number",
                },
                integrity: {
                  type: "object",
                  properties: {
                    method: {
                      type: "string",
                      enum: ["sha256", "blake3"],
                    },
                    value: {
                      type: "string",
                    },
                  },
                  required: ["method", "value"],
                  additionalProperties: false,
                },
              },
              required: ["name", "version", "url", "size"],
              additionalProperties: false,
            },
            {
              type: "null",
            },
          ],
        },
        cover: {
          anyOf: [
            {
              type: "object",
              properties: {
                lower_than: {
                  type: "string",
                },
                file: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    version: {
                      type: "string",
                    },
                    url: {
                      type: "string",
                    },
                    size: {
                      type: "number",
                    },
                    timestamp: {
                      type: "number",
                    },
                    integrity: {
                      type: "object",
                      properties: {
                        method: {
                          type: "string",
                          enum: ["sha256", "blake3"],
                        },
                        value: {
                          type: "string",
                        },
                      },
                      required: ["method", "value"],
                      additionalProperties: false,
                    },
                  },
                  required: ["name", "version", "url", "size"],
                  additionalProperties: false,
                },
              },
              required: ["lower_than", "file"],
              additionalProperties: false,
            },
            {
              type: "null",
            },
          ],
        },
      },
      required: ["kernel_wim", "cover"],
      additionalProperties: false,
    },
  },
};
export default schema;
