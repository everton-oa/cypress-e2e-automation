import { env } from "process";

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,

  e2e: {
    baseUrl: "http://localhost:4200",
    excludeSpecPattern: ["**/1-getting-started", "**/2-advanced-examples"],
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    //   const username = process.env.DB_USERNAME;
    //   const password = process.env.PASSWORD;

    //   if (!password) {
    //     throw new Error(`Missing PASSWORD environment variable`);
    //   }

    //   config.env = { username, password };
    //   return config;
    },
    env: {
      username: "everton.araujo@test.com",
      password: "Cypress123",
      conduitBaseUrl: "https://conduit.bondaracademy.com",
      conduitApiBaseUrl: "https://conduit-api.bondaracademy.com",
      specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    },
  },
});
