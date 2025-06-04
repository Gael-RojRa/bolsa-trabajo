import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://bolsabackend.ticocr.org",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});