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

  it("Third test - Save subject of the command", () => {
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

  it("Fourth test - Extract text values", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get("[for='exampleInputEmail1']").should("contain", "Email address");

    //2
    cy.get("[for='exampleInputEmail1']").then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
      cy.wrap(labelText).should("contain", "Email address");
    });

    // 3
    cy.get("[for='exampleInputEmail1']")
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });
    cy.get("[for='exampleInputEmail1']")
      .invoke("text")
      .as("labelText")
      .should("contain", "Email address");

    // 4
    cy.get("[for='exampleInputEmail1']")
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label");
      });

    // 5 Invoke property
    cy.get("#exampleInputEmail1").type("test@test.com");
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .should("contain", "test@test.com")
      .then((property) => {
        expect(property).to.equal("test@test.com");
      });

    // Extra validation exercise
    // force: true is necessary because the element has the value visually-hidden
    // cy.contains("nb-card", "Basic form").find(".custom-checkbox").click();

    cy.contains("nb-card", "Basic form")
      .find("[type='checkbox']")
      .then((cb) => {
        cy.wrap(cb).check({ force: true }).should("be.checked");
      });

    cy.contains("nb-card", "Basic form")
      .find(".custom-checkbox")
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.contain("checked");
      });
  });

  it("Fifth test - Checkboxes and Radio buttons", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find("[type='radio']")
      .then((rb) => {
        cy.wrap(rb).eq(0).check({ force: true }).should("be.checked");
        cy.wrap(rb).eq(1).check({ force: true }).should("be.checked");
        cy.wrap(rb).eq(0).should("not.be.checked");
        cy.wrap(rb).eq(2).should("be.disabled");
      });
  });

  it("Sixth test - Checkboxes and Radio buttons", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    // Check all checkboxes
    cy.get("[type='checkbox']").check({ force: true });
  });

  it("Seventh test - Date pickers 1", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    let date = new Date();
    date.setDate(date.getDate() + 5);
    let futureDate = date.getDate();
    let dateToAssert = `Dec ${futureDate}, 2024`;

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get(".day-cell").not(".bounding-month").contains(Number(futureDate)).click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", dateToAssert);
          cy.wrap(input).should("have.value", dateToAssert);
      });
  });

  it.only("Eighth test - Date pickers 2", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleDateString("en-US", { month: "short" });
      let futureYear = date.getFullYear();
      let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (
            !dateAttribute.includes(futureMonth) ||
            !dateAttribute.includes(futureYear)
          ) {
            cy.get("[data-name='chevron-right']").click();
            selectDayFromCurrent(day);
          } else {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(Number(futureDay))
              .click();
          }
        });
      return dateToAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();

        const dateToAssert = selectDayFromCurrent(5);
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  });
});
