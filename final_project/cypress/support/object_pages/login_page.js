// cypress/support/pageObjects/LoginPage.js
class LoginPage {
  visit(url) {
    cy.visit(url);
  }

  get usernameInput() {
    return cy.get('input[name="username"], input[type="text"]');
  }

  get passwordInput() {
    return cy.get('input[name="password"], input[type="password"]');
  }

  get loginButton() {
    return cy.get('button[type="submit"]');
  }

  get adminPanelHeader() {
    return cy.get('div.oxd-topbar-header');
  }

  get errorMessage() {
    return cy.get('div.oxd-alert--error p');
  }

  enterUsername(username) {
    this.usernameInput.clear().type(username);
  }

  enterPassword(password, pressEnter = false) {
    if (pressEnter) {
      this.passwordInput.clear().type(password + '{enter}');
    } else {
      this.passwordInput.clear().type(password);
    }
  }

  clickLogin() {
    this.loginButton.click();
  }
}

export default LoginPage;
