/// <reference types="cypress" />

describe("First test suite", () => {
  it("First test - First suite", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //Find element by Tag name
    cy.get("input");

    //Find element by ID
    cy.get("#inputEmail1");

    //Find element by Class value
    cy.get(".input-full-width");

    //Find element by Attribute name
    cy.get("[fullwidth]");

    //Find element by Attribute  and value
    cy.get("[placeholder='Email']");

    //Find element by entire class value
    cy.get(
      "[class='start-search appearance-ghost size-medium status-primary shape-rectangle icon-start icon-end transitions']"
    );

    //Find element by two attributes
    cy.get("[placeholder='Email'][fullwidth]");

    //Find element by tag, attribute, id and class
    cy.get("input[placeholder='Email']#inputEmail1.input-full-width");

    //Find element by Cypress test ID
    cy.get("[data-cy='imputEmail1']");
  });

  it("Second test - First suite", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //It only interacts with the first element among all elements found
    //It ignores all other elements found
    cy.contains("Sign in").click();

    //Using a second attribute to find a unique element
    cy.contains("[status='warning']", "Sign in").click();

    //Chain using find() method
    cy.contains("nb-card", "Horizontal form").find("button").click();
    // cy.contains("nb-card", "Horizontal form").contains("Sign in").click();

    //Chain methods do not work when get() is used - 8 elements are find using the method below
    cy.contains("nb-card", "Horizontal form").get("button");

    //Cypress chains and DOM
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
  });

  it.only("Third test - Save subject of the command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find("[for='inputEmail1']")
      .should("contain", "Email");
    cy.contains("nb-card", "Using the Grid")
      .find("[for='inputPassword2']")
      .should("contain", "Password");

    //Ways to avoid repeating code

    //CAN'T DO THIS IN CYPRESS
    // const usingTheGrid = cy.contains("nb-card", "Using the Grid")
    // usingTheGrid.find("[for='inputEmail1']").should("contain", "Email");
    // usingTheGrid.find("[for='inputPassword2']").should("contain", "Password");

    // Cypress Alias
    cy.contains("nb-card", "Using the Grid").as("usingTheGrid");
    cy.get("@usingTheGrid")
      .find("[for='inputEmail1']")
      .should("contain", "Email");
    cy.get("@usingTheGrid")
      .find("[for='inputPassword2']")
      .should("contain", "Password");

    // Cypress then() method
    cy.contains("nb-card", "Using the Grid").then((usingTheGrid) => {
      cy.wrap(usingTheGrid)
        .find("[for='inputEmail1']")
        .should("contain", "Email");
      cy.wrap(usingTheGrid)
        .find("[for='inputPassword2']")
        .should("contain", "Password");
    });
  });
});
