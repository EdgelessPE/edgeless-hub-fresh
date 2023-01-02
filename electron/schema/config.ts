const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $ref: "#/definitions/Config",
  definitions: {
    Config: {
      type: "object",
      properties: {
        ept: {
          type: "object",
          properties: {
            mirror: {
              type: "object",
              properties: {
                current: {
                  type: ["string", "null"],
                },
                pool: {
                  type: "object",
                  additionalProperties: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      baseUrl: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      protocol: {
                        type: "string",
                      },
                      property: {
                        type: "object",
                        properties: {
                          domestic_server: {
                            type: "boolean",
                          },
                          upload_bandwidth: {
                            type: "number",
                          },
                          sync_interval: {
                            type: "number",
                          },
                          official_maintained: {
                            type: "boolean",
                          },
                        },
                        required: [
                          "domestic_server",
                          "upload_bandwidth",
                          "sync_interval",
                          "official_maintained",
                        ],
                        additionalProperties: false,
                      },
                      services: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            path: {
                              type: "string",
                            },
                          },
                          required: ["name", "path"],
                          additionalProperties: false,
                        },
                      },
                    },
                    required: [
                      "name",
                      "baseUrl",
                      "description",
                      "protocol",
                      "property",
                      "services",
                    ],
                    additionalProperties: false,
                  },
                },
              },
              required: ["current", "pool"],
              additionalProperties: false,
            },
            preferences: {
              type: "object",
              properties: {
                deleteStrategy: {
                  type: "string",
                  enum: ["FlashRecycle", "ForceDelete"],
                },
              },
              required: ["deleteStrategy"],
              additionalProperties: false,
            },
          },
          required: ["mirror", "preferences"],
          additionalProperties: false,
        },
        theme: {
          type: "string",
          enum: ["light", "dark"],
        },
        download: {
          type: "object",
          properties: {
            provider: {
              type: "string",
            },
            cacheDir: {
              type: "string",
            },
            maxDownloadingTasks: {
              type: "number",
            },
          },
          required: ["provider", "cacheDir", "maxDownloadingTasks"],
          additionalProperties: false,
        },
        flashDisk: {
          type: ["string", "null"],
        },
      },
      required: ["ept", "theme", "download", "flashDisk"],
      additionalProperties: false,
    },
  },
};
export default schema;
