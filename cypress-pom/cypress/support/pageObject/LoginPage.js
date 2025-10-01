class LoginPage {
  url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  elements = {
    loginForm: () => cy.get('form.oxd-form'),
    usernameInput: () => cy.get('input[placeholder="Username"]'),
    passwordInput: () => cy.get('input[placeholder="Password"]'),
    loginButton: () => cy.get('button[type="submit"]'),
    adminHeader: () => cy.get('header .oxd-topbar-header'),
    errorAlert: () => cy.get('.oxd-alert-content--error p')
  };

  visit() {
    cy.visit(this.url);
  }

  fillUsername(username) {
    this.elements.usernameInput().clear().type(username);
  }

  fillPassword(password) {
    this.elements.passwordInput().clear().type(password);
  }

  submitLogin() {
    this.elements.loginButton().click();
  }

  submitLoginWithEnter(password) {
    this.elements.passwordInput().type(`${password}{enter}`);
  }
}

export default new LoginPage();