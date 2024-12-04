/// <reference types="cypress" />

const path = require("path");

describe("Second test suite", () => {
  beforeEach("Login to the Conduit app", () => {
    cy.intercept({ method: "Get", path: "tags" }, { fixture: "tags.json" });
    cy.loginToConduitAppAPI();
  });

  it(
    "Verification of the Browser API calls",
    { baseUrl: Cypress.env("conduitBaseUrl") },
    () => {
      cy.intercept(
        "POST",
        "https://conduit-api.bondaracademy.com/api/articles/"
      ).as("postArticles");

      cy.contains("New Article").click();
      cy.get("[formcontrolname='title']").type("This is the title");
      cy.get("[formcontrolname='description']").type("This is the description");
      cy.get("[formcontrolname='body']").type(
        "This is the body of the article"
      );
      cy.contains("Publish Article").click();

      cy.wait("@postArticles");
      cy.get("@postArticles").then((xhr) => {
        console.log(xhr);
        expect(xhr.response.statusCode).to.equal(201);
        expect(xhr.request.body.article.body).to.equal(
          "This is the body of the article"
        );
        expect(xhr.request.body.article.description).to.equal(
          "This is the description"
        );
      });
    }
  );

  it(
    "Verify popular tags are displayed",
    { baseUrl: Cypress.env("conduitBaseUrl") },
    () => {
      cy.get(".tag-list")
        .should("contain", "cypress")
        .and("contain", "automation")
        .and("contain", "testing");
    }
  );

  it(
    "Verify global feed likes count",
    { baseUrl: Cypress.env("conduitBaseUrl") },
    () => {
      cy.intercept(
        "GET",
        "https://conduit-api.bondaracademy.com/api/articles/feed*",
        {
          articles: [],
          articlesCount: 0,
        }
      );

      cy.intercept(
        "GET",
        "https://conduit-api.bondaracademy.com/api/articles*",
        {
          fixture: "articles.json",
        }
      );

      cy.contains("Global Feed").click();
      cy.get("app-article-list button").then((heartList) => {
        expect(heartList[0]).to.contain("1");
        expect(heartList[1]).to.contain("5");
      });

      cy.fixture("articles").then((file) => {
        const articleLink = file.articles[1].slug;
        file.articles[1].favoritesCount = 6;
        cy.intercept(
          "POST",
          "https://conduit-api.bondaracademy.com/api/articles/" +
            articleLink +
            "/favorite",
          file
        );

        cy.get("app-article-list button").eq(1).click().should("contain", "6");
      });
    }
  );

  it(
    "Intercepting and modifying request and response",
    { baseUrl: Cypress.env("conduitBaseUrl") },
    () => {
      cy.intercept("POST", "**/articles/", (req) => {
        req.body.article.description = "THIS IS THE NEW DESCRIPTION";
      }).as("postArticles");

      cy.contains("New Article").click();
      cy.get("[formcontrolname='title']").type("This is the new title");
      cy.get("[formcontrolname='description']").type("This is the description");
      cy.get("[formcontrolname='body']").type(
        "This is the body of the article"
      );
      cy.contains("Publish Article").click();

      cy.wait("@postArticles");
      cy.get("@postArticles").then((xhr) => {
        console.log(xhr);
        expect(xhr.response.statusCode).to.equal(201);
        expect(xhr.request.body.article.body).to.equal(
          "This is the body of the article"
        );
        expect(xhr.request.body.article.description).to.equal(
          "THIS IS THE NEW DESCRIPTION"
        );
      });
    }
  );

  it(
    "Delete a new article in a global feed",
    { baseUrl: Cypress.env("conduitBaseUrl") },
    () => {
      const bodyRequest = {
        article: {
          tagList: [],
          title: "Request from API",
          description: "API testing is easy",
          body: "Angular is cool",
        },
      };

      cy.get("@token").then((token) => {
        cy.request({
          url: "https://conduit-api.bondaracademy.com/api/articles",
          headers: { Authorization: "Token " + token },
          method: "POST",
          body: bodyRequest,
        }).then((response) => {
          expect(response.status).to.equal(201);
        });

        cy.contains("Global Feed").click();
        cy.wait(1000);
        cy.get(".article-preview").first().click();
        cy.get(".article-actions").contains("Delete Article").click();

        cy.request({
          url: "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
          headers: { Authorization: "Token " + token },
          method: "GET",
        })
          .its("body")
          .then((body) => {
            expect(body.articles[0].title).not.equal("Request from API");
          });
      });
    }
  );
});

//   const bodyRequest = {
//     article: {
//       tagList: [],
//       title: "Request from the API",
//       description: "API testing is easy",
//       body: "Angular is cool",
//     },
//   };

//   cy.get("@token").then((token) => {
//     cy.request({
//       url: Cypress.env("apiUrl") + "/api/articles/",
//       headers: { Authorization: "Token " + token },
//       method: "POST",
//       body: bodyRequest,
//     }).then((response) => {
//       expect(response.status).to.equal(200);
//     });

//     cy.contains("Global Feed").click();
//     cy.get(".article-preview").first().click();
//     cy.ter(".article-actions").contains("Delete Article").click();

//     cy.request({
//       url: Cypress.env("apiUrl") + "/api/articles?limit=10&offset=0",
//       headers: { Authorization: "Token " + token },
//       methot: "GET",
//     })
//       .its("body")
//       .then((body) => {
//         expect(body.articles[0].title.not.to.equal("Request from the API"));
//       });
//   });
// });
