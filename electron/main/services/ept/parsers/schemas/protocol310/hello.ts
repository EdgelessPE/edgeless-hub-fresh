const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $ref: "#/definitions/HelloResponse",
  definitions: {
    HelloResponse: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        root: {
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
        plugins: {
          type: "object",
          properties: {
            tree: {
              type: "object",
              additionalProperties: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
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
                  required: ["name", "size", "timestamp"],
                  additionalProperties: false,
                },
              },
            },
            path: {
              type: "string",
            },
          },
          required: ["tree", "path"],
          additionalProperties: false,
        },
        kernel: {
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
        ventoy: {
          type: "object",
          properties: {
            windows: {
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
            linux: {
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
            plugin: {
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
          required: ["windows", "linux", "plugin"],
          additionalProperties: false,
        },
        hub: {
          type: "object",
          properties: {
            latest: {
              type: "object",
              properties: {
                version: {
                  type: "string",
                },
                page: {
                  type: "string",
                },
              },
              required: ["version", "page"],
              additionalProperties: false,
            },
            update: {
              type: "object",
              properties: {
                allow_normal_since: {
                  type: "string",
                },
                force_update_until: {
                  type: "string",
                },
                wide_gaps: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
              required: [
                "allow_normal_since",
                "force_update_until",
                "wide_gaps",
              ],
              additionalProperties: false,
            },
            notices: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  channel: {
                    type: "string",
                  },
                  level: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  close_text: {
                    type: "string",
                  },
                  lower_than: {
                    type: "string",
                  },
                  repeat_after: {
                    type: "number",
                  },
                },
                required: [
                  "id",
                  "channel",
                  "level",
                  "message",
                  "description",
                  "close_text",
                  "lower_than",
                  "repeat_after",
                ],
                additionalProperties: false,
              },
            },
            packages: {
              type: "object",
              properties: {
                update: {
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
                extended_update: {
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
                full: {
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
              required: ["update", "extended_update", "full"],
              additionalProperties: false,
            },
          },
          required: ["latest", "update", "notices", "packages"],
          additionalProperties: false,
        },
      },
      required: [
        "name",
        "description",
        "root",
        "protocol",
        "property",
        "services",
      ],
      additionalProperties: false,
    },
  },
};
export default schema;
