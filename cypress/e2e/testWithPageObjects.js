/// <reference types="cypress" />

import { navigateTo } from "../support/page-objects/navigationPage";

describe("First test suite", () => {
  beforeEach("Open application", () => {
    cy.visit("/");
  });

  it("Verify navigation across the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.formDatepickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toasterPage();
  });
});
