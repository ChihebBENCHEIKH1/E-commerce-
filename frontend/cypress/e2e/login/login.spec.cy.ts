describe("Login Page Tests", () => {
  beforeEach(() => {
    cy.visit(" http://localhost:5173/MotorcycleXpert/login");
  });

  it("should display the login form", () => {
    cy.get('img[alt="Logo"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should show validation errors for invalid inputs", () => {
    cy.fixture("users").then((users) => {
      cy.get('button[type="submit"]').click();
      cy.contains("Email is required").should("be.visible");
      cy.contains("Password is required").should("be.visible");

      cy.get('input[name="email"]').type(users.invalidUser.email);
      cy.get('input[name="password"]').type(users.invalidUser.password);
      cy.get('button[type="submit"]').click();
      cy.contains("Invalid email format").should("be.visible");
      cy.contains("Password must be at least 6 characters").should(
        "be.visible"
      );
    });
  });

  /* This will always fails due to recaptcha  */
  it("should submit the form with valid inputs", () => {
    cy.fixture("users").then((users) => {
      cy.get('input[name="email"]').type(users.validUser.email);
      cy.get('input[name="password"]').type(users.validUser.password);
      cy.get("#recaptcha-anchor").click();
      cy.url().should("include", "/MotorcycleXpert/home");
    });
  });
});
