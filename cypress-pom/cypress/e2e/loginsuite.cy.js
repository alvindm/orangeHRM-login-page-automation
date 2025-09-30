import loginPage from './pages/LoginPage';

describe('OrangeHRM Login Page Test Suite', () => {
  it('Should allow access to the login page', () => {
    loginPage.visit();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.elements.loginForm().should('be.visible');
  });

  it('Should login successfully with valid Admin credentials', () => {
    loginPage.visit();
    loginPage.fillUsername('Admin');
    loginPage.elements.usernameInput().should('have.value', 'Admin');
    loginPage.fillPassword('admin123');
    loginPage.elements.passwordInput().should('have.value', 'admin123');
    loginPage.submitLogin();
    cy.url().should('include', '/web/index.php/dashboard/index');
    loginPage.elements.adminHeader().should('be.visible');
  });

  it('Should login successfully with valid Admin credentials by pressing Enter', () => {
    loginPage.visit();
    loginPage.fillUsername('Admin');
    loginPage.elements.usernameInput().should('have.value', 'Admin');
    loginPage.submitLoginWithEnter('admin123');
    cy.url().should('include', '/web/index.php/dashboard/index');
    loginPage.elements.adminHeader().should('be.visible');
  });

  it('Should not login with username that has leading space " Admin"', () => {
    loginPage.visit();
    loginPage.fillUsername(' Admin');
    loginPage.elements.usernameInput().should('have.value', ' Admin');
    loginPage.fillPassword('admin123');
    loginPage.elements.passwordInput().should('have.value', 'admin123');
    loginPage.submitLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.elements.errorAlert()
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  });

  it('Should not login with password that has leading space " admin123"', () => {
    loginPage.visit();
    loginPage.fillUsername('Admin');
    loginPage.elements.usernameInput().should('have.value', 'Admin');
    loginPage.fillPassword(' admin123');
    loginPage.elements.passwordInput().should('have.value', ' admin123');
    loginPage.submitLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.elements.errorAlert()
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  });

  it('Should login successfully with username that has trailing space "Admin "', () => {
    loginPage.visit();
    loginPage.fillUsername('Admin ');
    loginPage.elements.usernameInput().should('have.value', 'Admin ');
    loginPage.fillPassword('admin123');
    loginPage.elements.passwordInput().should('have.value', 'admin123');
    loginPage.submitLogin();
    cy.url().should('include', '/web/index.php/dashboard/index');
    loginPage.elements.adminHeader().should('be.visible');
  });

  it('Should not login successfully with password that has trailing space "admin123 "', () => {
    loginPage.visit();
    loginPage.fillUsername('Admin');
    loginPage.elements.usernameInput().should('have.value', 'Admin');
    loginPage.fillPassword('admin123 ');
    loginPage.elements.passwordInput().should('have.value', 'admin123 ');
    loginPage.submitLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.elements.errorAlert()
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  });

  it('Should login successfully with capslock username "ADMIN"', () => {
    loginPage.visit();
    loginPage.fillUsername('ADMIN');
    loginPage.elements.usernameInput().should('have.value', 'ADMIN');
    loginPage.fillPassword('admin123');
    loginPage.elements.passwordInput().should('have.value', 'admin123');
    loginPage.submitLogin();
    cy.url().should('include', '/web/index.php/dashboard/index');
    loginPage.elements.adminHeader().should('be.visible');
  });

  it('Should not login successfully with capslock password "ADMIN123"', () => {
    loginPage.visit();
    loginPage.fillUsername('Admin');
    loginPage.elements.usernameInput().should('have.value', 'Admin');
    loginPage.fillPassword('ADMIN123');
    loginPage.elements.passwordInput().should('have.value', 'ADMIN123');
    loginPage.submitLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.elements.errorAlert()
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  });

  it('Should not login successfully with valid username containing space in between "Ad min"', () => {
    loginPage.visit();
    loginPage.fillUsername('Ad min');
    loginPage.elements.usernameInput().should('have.value', 'Ad min');
    loginPage.fillPassword('admin123');
    loginPage.elements.passwordInput().should('have.value', 'admin123');
    loginPage.submitLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.elements.errorAlert()
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  });

  it('Should not login successfully with valid password containing space in between "admin 123"', () => {
    loginPage.visit();
    loginPage.fillUsername('Admin');
    loginPage.elements.usernameInput().should('have.value', 'Admin');
    loginPage.fillPassword('admin 123');
    loginPage.elements.passwordInput().should('have.value', 'admin 123');
    loginPage.submitLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.elements.errorAlert()
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  });
});