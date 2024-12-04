/// <reference types="cypress" />

import { onDatepickerPage } from "../support/page-objects/datepickerPage";
import { onFormLayoutPage } from "../support/page-objects/formLayoutPage";
import { navigateTo } from "../support/page-objects/navigationPage";
import { onSmartTablePage } from "../support/page-objects/smartTablePage";

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

  it.only("Should submmit inline and basic form and select tomorrow date in the calendar", () => {
    navigateTo.formLayoutsPage();
    onFormLayoutPage.submitInLineFormWithNameAndEmail(
      "Everton",
      "test@test.com"
    );
    onFormLayoutPage.submitBasicFormWithEmailAndPassword(
      "test@test.com",
      "pass"
    );
    navigateTo.formDatepickerPage();
    onDatepickerPage.selectCommonDatepickerDateFromToday(1);
    onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14);

    navigateTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstAndLastName("John", "Doe");
    onSmartTablePage.updateAgeByFirstName("John", "35");
    onSmartTablePage.deleteRowByIndex(1);
  });
});
