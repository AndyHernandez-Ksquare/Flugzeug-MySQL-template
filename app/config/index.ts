import { Dialect } from "sequelize/types";
import ip from "ip";
import path from "path";

export const config = {
  root: path.normalize(`${__dirname}/..`),

  env: process.env.NODE_ENV || "development",

  jwt: {
    secret:
      process.env.JWT_SECRET || "AlgghIw3HJD8HJwog-GXmnMwzywP49TqXvaeZevcHMQ",
    access: {
      expiry: {
        unit: "hours",
        length: process.env.JWT_EXPIRY_HOURS
          ? parseInt(process.env.JWT_EXPIRY_HOURS)
          : 30 * 24,
      },
      subject: "access",
      audience: "user",
    },
    refresh: {
      expiry: {
        unit: "months",
        length: 6,
      },
      subject: "refresh",
      audience: "user",
    },
    reset: {
      expiry: {
        unit: "hours",
        length: 12,
      },
      subject: "reset",
      audience: "user",
    },
  },

  email: {
    from_address:
      process.env.EMAIL_FROM_ADDRESS || "MyApp <no-reply@example.com>",
    host: process.env.EMAIL_SMTP_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_SMPT_PORT
      ? parseInt(process.env.EMAIL_SMPT_PORT)
      : 587,
    secure: process.env.EMAIL_SMTP_SECURE
      ? process.env.EMAIL_SMTP_SECURE === "true"
      : true,
    auth: {
      user: process.env.EMAIL_SMTP_USER || "(your SMTP user)",
      pass: process.env.EMAIL_SMTP_PASS || "(your SMTP password)",
    },
  },

  server: {
    port: process.env.SERVER_PORT || 8888,
  },

  api: {
    // Default limit and offset levels for responses
    limit: 99,
    offset: 0,
    // Show detailed error responses or not
    debug: true,
  },

  log: {
    // Console Log levels: error, warn, info, verbose, debug, silly
    level: process.env.LOG_LEVEL || "debug",
    logToFiles: process.env.LOG_TO_FILES
      ? process.env.LOG_TO_FILES === "true"
      : false,
  },

  urls: {
    // Url config as seen from the user NOT NECESSARILY THE SAME AS SERVER
    // http or https
    protocol: process.env.URLS_PROTOCOL || "http",
    url: process.env.URLS_URL || ip.address(),
    port: process.env.URLS_PORT ? String(process.env.URLS_PORT) : "",
    apiRoot: process.env.URLS_API_ROOT || "/api/v1",
    base: "",
    baseApi: "",
  },

  db: {
    database: process.env.DB_NAME || "doc-builder",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    dialect: (process.env.DB_TYPE || "mysql") as Dialect,
    logging: false,
    storage: process.env.DB_STORAGE || "db.sqlite",
    timezone: "utc", // IMPORTANT For correct timezone management with DB.
  },
};

let portString = "";
if (Number.isInteger(parseInt(config.urls.port)))
  portString = `:${config.urls.port}`;

config.urls.base = `${config.urls.protocol}://${config.urls.url}${portString}`;
config.urls.baseApi = `${config.urls.base}${config.urls.apiRoot}`;

if (config.db.dialect === "sqlite") {
  // sqlite dialect doesn't support timezone and crashes if we pass one (it is utc by default anyway)
  delete config.db.timezone;
}
