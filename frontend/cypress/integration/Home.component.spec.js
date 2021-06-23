context("Assertions", () => {
  const baseUrl = "http://localhost:3000";

  describe("Home Component", () => {
    it("It should open the Homepage", () => {
      cy.visit(baseUrl);
    });

    it("It should find an email field and fill it", () => {
      cy.get("#email").type("steffen@steffen.com");
    });

    it("It should login and redirect to the /user page", () => {
      cy.contains("Login").click();
      cy.url().should("include", `${baseUrl}/user`);
    });
  });
});

// navbar__item