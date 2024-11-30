const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1920,
  viewportWidth: 1080,
  video: false, 
  e2e: {
    baseUrl: "http://localhost:4200",
    excludeSpecPattern: ["**/1-getting-started", "**/2-advanced-examples"],
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
