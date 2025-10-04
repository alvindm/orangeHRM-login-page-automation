import LoginPage from '../support/object_pages/login_page';

describe('OrangeHRM Login Page Test Suite', () => {
  const loginPage = new LoginPage();
  let loginData;

  before(() => {
    cy.fixture('login_data.json').then((data) => {
      loginData = data;
    });
  });

  it('should allow access to the login page', () => {
    loginPage.visit(loginData.url);
    cy.url().should('include', '/web/index.php/auth/login');
    cy.get('form.oxd-form').should('be.visible');
  });

  it('should login successfully with valid Admin credentials', () => {
    loginPage.visit(loginData.url);
    loginPage.enterUsername(loginData.validAdmin.username);
    loginPage.usernameInput.should('have.value', loginData.validAdmin.username);
    loginPage.enterPassword(loginData.validAdmin.password);
    loginPage.passwordInput.should('have.value', loginData.validAdmin.password);
    loginPage.clickLogin();
    cy.url().should('include', '/web/index.php/dashboard/index');
    loginPage.adminPanelHeader.should('be.visible');
  });

  it('should login successfully with valid Admin credentials by pressing Enter', () => {
    loginPage.visit(loginData.url);
    loginPage.enterUsername(loginData.validAdmin.username);
    loginPage.usernameInput.should('have.value', loginData.validAdmin.username);
    loginPage.enterPassword(loginData.validAdmin.password, true);
    cy.url().should('include', '/web/index.php/dashboard/index');
    loginPage.adminPanelHeader.should('be.visible');
  });

  it('should not login with username that has leading space " Admin"', () => {
    loginPage.visit(loginData.url);
    loginPage.enterUsername(loginData.invalidLeadingSpaceUser.username);
    loginPage.usernameInput.should('have.value', loginData.invalidLeadingSpaceUser.username);
    loginPage.enterPassword(loginData.invalidLeadingSpaceUser.password);
    loginPage.passwordInput.should('have.value', loginData.invalidLeadingSpaceUser.password);
    loginPage.clickLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.errorMessage.should('be.visible').and('contain.text', 'Invalid credentials');
  });

  it('should not login with password that has leading space " admin123"', () => {
    loginPage.visit(loginData.url);
    loginPage.enterUsername(loginData.invalidLeadingSpacePass.username);
    loginPage.usernameInput.should('have.value', loginData.invalidLeadingSpacePass.username);
    loginPage.enterPassword(loginData.invalidLeadingSpacePass.password);
    loginPage.passwordInput.should('have.value', loginData.invalidLeadingSpacePass.password);
    loginPage.clickLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.errorMessage.should('be.visible').and('contain.text', 'Invalid credentials');
  });

  it('should login successfully with username that has trailing space "Admin "', () => {
    loginPage.visit(loginData.url);
    loginPage.enterUsername(loginData.validTrailingSpaceUser.username);
    loginPage.usernameInput.should('have.value', loginData.validTrailingSpaceUser.username);
    loginPage.enterPassword(loginData.validTrailingSpaceUser.password);
    loginPage.passwordInput.should('have.value', loginData.validTrailingSpaceUser.password);
    loginPage.clickLogin();
    cy.url().should('include', '/web/index.php/dashboard/index');
    loginPage.adminPanelHeader.should('be.visible');
  });

  it('should not login successfully with password that has trailing space "admin123 "', () => {
    loginPage.visit(loginData.url);
    loginPage.enterUsername(loginData.invalidTrailingSpacePass.username);
    loginPage.usernameInput.should('have.value', loginData.invalidTrailingSpacePass.username);
    loginPage.enterPassword(loginData.invalidTrailingSpacePass.password);
    loginPage.passwordInput.should('have.value', loginData.invalidTrailingSpacePass.password);
    loginPage.clickLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.errorMessage.should('be.visible').and('contain.text', 'Invalid credentials');
  });

  it('should login successfully with capslock username "ADMIN"', () => {
    loginPage.visit(loginData.url);
    loginPage.enterUsername(loginData.capsLockUser.username);
    loginPage.usernameInput.should('have.value', loginData.capsLockUser.username);
    loginPage.enterPassword(loginData.capsLockUser.password);
    loginPage.passwordInput.should('have.value', loginData.capsLockUser.password);
    loginPage.clickLogin();
    cy.url().should('include', '/web/index.php/dashboard/index');
    loginPage.adminPanelHeader.should('be.visible');
  });

  it('should not login successfully with capslock password "ADMIN123"', () => {
    loginPage.visit(loginData.url);
    loginPage.enterUsername(loginData.capsLockPass.username);
    loginPage.usernameInput.should('have.value', loginData.capsLockPass.username);
    loginPage.enterPassword(loginData.capsLockPass.password);
    loginPage.passwordInput.should('have.value', loginData.capsLockPass.password);
    loginPage.clickLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.errorMessage.should('be.visible').and('contain.text', 'Invalid credentials');
  });

  it('should not login successfully with valid username containing space in between "Ad min"', () => {
    loginPage.visit(loginData.url);
    loginPage.enterUsername(loginData.userWithSpaceInBetween.username);
    loginPage.usernameInput.should('have.value', loginData.userWithSpaceInBetween.username);
    loginPage.enterPassword(loginData.userWithSpaceInBetween.password);
    loginPage.passwordInput.should('have.value', loginData.userWithSpaceInBetween.password);
    loginPage.clickLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.errorMessage.should('be.visible').and('contain.text', 'Invalid credentials');
  });

  it('should not login successfully with valid password containing space in between "admin 123"', () => {
    loginPage.visit(loginData.url);
    loginPage.enterUsername(loginData.passWithSpaceInBetween.username);
    loginPage.usernameInput.should('have.value', loginData.passWithSpaceInBetween.username);
    loginPage.enterPassword(loginData.passWithSpaceInBetween.password);
    loginPage.passwordInput.should('have.value', loginData.passWithSpaceInBetween.password);
    loginPage.clickLogin();
    cy.url().should('include', '/web/index.php/auth/login');
    loginPage.errorMessage.should('be.visible').and('contain.text', 'Invalid credentials');
  });
});
