import expect from "expect";

describe("Global", () => {
  it("should have a blue background, but not a red color", () => {
    cy.visit("http://localhost:3001/color-red?frontity_name=emotion");
    cy.visit("http://localhost:3001/background-blue?frontity_name=emotion");
    cy.get("body").should("not.have.css", "background-color", "rgb(0, 0, 255)");
    cy.get("body").should("not.have.css", "color", "rgb(255, 0, 0)");
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("body").should("have.css", "background-color", "rgb(0, 0, 255)");
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("body").should("not.have.css", "background-color", "rgb(0, 0, 255)");
  });

  it("should have a red color, but not a blue background", () => {
    cy.visit("http://localhost:3001/background-blue?frontity_name=emotion");
    cy.visit("http://localhost:3001/color-red?frontity_name=emotion");
    cy.get("body").should("not.have.css", "background-color", "rgb(0, 0, 255)");
    cy.get("body").should("not.have.css", "color", "rgb(255, 0, 0)");
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("body").should("have.css", "color", "rgb(255, 0, 0)");
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("body").should("not.have.css", "color", "rgb(255, 0, 0)");
  });
});

describe("styled", () => {
  it("should have a red color", () => {
    cy.visit("http://localhost:3001/styled-css?frontity_name=emotion");
    cy.get("[data-test-id='styled-div']").should(
      "have.css",
      "color",
      "rgb(255, 0, 0)"
    );
  });

  it("should toggle the color", () => {
    cy.visit("http://localhost:3001/styled-css?frontity_name=emotion");
    cy.get("[data-test-id='styled-div']").should(
      "have.css",
      "color",
      "rgb(255, 0, 0)"
    );
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='styled-div']").should(
      "have.css",
      "color",
      "rgb(0, 0, 255)"
    );
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='styled-div']").should(
      "have.css",
      "color",
      "rgb(255, 0, 0)"
    );
  });

  it("should have a Styled class name (autoLabel)", function () {
    const frontityModeProduction =
      Cypress.env("FRONTITY_MODE") !== "development";

    // If we are in production mode skip the test since
    // the autoLabel works only in development
    if (frontityModeProduction) {
      this.skip();
    }

    cy.visit("http://localhost:3001/styled-css?frontity_name=emotion");
    cy.get("[data-test-id='styled-div']").should((div) => {
      const className = div[0].className;
      expect(className).toContain("Styled");
    });
  });
});

describe("css", () => {
  it("should have a red color", () => {
    cy.visit("http://localhost:3001/styled-css?frontity_name=emotion");
    cy.get("[data-test-id='css-div']").should(
      "have.css",
      "color",
      "rgb(255, 0, 0)"
    );
  });

  it("should toggle the color", () => {
    cy.visit("http://localhost:3001/styled-css?frontity_name=emotion");
    cy.get("[data-test-id='css-div']").should(
      "have.css",
      "color",
      "rgb(255, 0, 0)"
    );
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='css-div']").should(
      "have.css",
      "color",
      "rgb(0, 0, 255)"
    );
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='css-div']").should(
      "have.css",
      "color",
      "rgb(255, 0, 0)"
    );
  });

  it("should have a Styled class name (autoLabel)", function () {
    const frontityModeProduction =
      Cypress.env("FRONTITY_MODE") !== "development";

    // If we are in production mode skip the test since
    // the autoLabel works only in development
    if (frontityModeProduction) {
      this.skip();
    }

    cy.visit("http://localhost:3001/styled-css?frontity_name=emotion");
    cy.get("[data-test-id='css-div']").should((div) => {
      const className = div[0].className;
      expect(className).toContain("CSS");
    });
  });
});

describe("critical css", () => {
  it("should extract the critical css", () => {
    cy.visitSSR("http://localhost:3001/styled-css?frontity_name=emotion").then(
      () => {
        cy.get("head style[data-emotion]").should("exist");

        // Frontity is the cache key
        cy.get("head style[data-emotion]").should("contain", "frontity");
      }
    );
  });
});
