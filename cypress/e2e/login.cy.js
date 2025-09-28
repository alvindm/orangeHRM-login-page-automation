describe('OrangeHRM Login Page Test Suite', () => {
  it('should allow access to the login page', () => {
    // 1. Access login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Assert url path
    cy.url().should('include', '/web/index.php/auth/login');

    // 3. Assert login form
    cy.get('form.oxd-form').should('be.visible');
  });

  it('should login successfully with valid Admin credentials', () => {
    // 1. Access login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Enter valid username "Admin"
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > div:nth-child(2) > input')
      .type('Admin');

    // 3. Assert username input value is "Admin"
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > div:nth-child(2) > input')
      .should('have.value', 'Admin');

    // 4. Enter valid password "admin123"
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > div:nth-child(2) > input')
      .type('admin123');

    // 5. Assert password input value is "admin123"
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > div:nth-child(2) > input')
      .should('have.value', 'admin123');

    // 6. Click login button
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div.oxd-form-actions.orangehrm-login-action > button')
      .click();

    // 7. Assert user redirected to dashboard page
    cy.url().should('include', '/web/index.php/dashboard/index');

    // 8. Assert user logged in by checking the admin panel header is visible
    cy.get('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-navigation > header > div.oxd-topbar-header')
      .should('be.visible');
  });
  it('should login successfully with valid Admin credentials by pressing Enter', () => {
    // 1. Access login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Enter valid username "Admin" and assert it
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > div:nth-child(2) > input')
      .type('Admin')
      .should('have.value', 'Admin');

    // 3. Enter valid password "admin123" and press Enter key to submit
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > div:nth-child(2) > input')
      .type('admin123{enter}');

    // 4. Assert user redirected to dashboard
    cy.url().should('include', '/web/index.php/dashboard/index');

    // 5. Assert admin panel header is visible indicating successful login
    cy.get('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-navigation > header > div.oxd-topbar-header')
      .should('be.visible');
  });
it('should not login with username that has leading space', () => {
    // 1. Access OrangeHRM login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Enter username with a leading space: " Admin"
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > div:nth-child(2) > input')
      .type(' Admin')

      // 3. Assert username value
      .should('have.value', ' Admin'); 

    // 4. Enter password "admin123"
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > div:nth-child(2) > input')
      .type('admin123')
    
      // 5. Assert password value
      .should('have.value', 'admin123'); 

    // 6. Click login button
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div.oxd-form-actions.orangehrm-login-action > button')
      .click();

    // 7. Assert URL not redirected
    cy.url().should('include', '/web/index.php/auth/login');

    // 8. Assert error message "Invalid credentials" is visible
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > div > div.oxd-alert.oxd-alert--error > div.oxd-alert-content.oxd-alert-content--error > p')
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  });

it('Should not login with password that has leading space " admin123"', () => {
    // 1. Access OrangeHRM login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Enter valid username
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > div:nth-child(2) > input')
      .type('Admin')

      // 3. Assert username value
      .should('have.value', 'Admin'); 

    // 4. Enter password with leading space " admin123"
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > div:nth-child(2) > input')
      .type(' admin123')
    
      // 5. Assert password value
      .should('have.value', ' admin123'); 

    // 6. Click login button
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div.oxd-form-actions.orangehrm-login-action > button')
      .click();

    // 7. Assert URL not redirected
    cy.url().should('include', '/web/index.php/auth/login');

    // 8. Assert error message "Invalid credentials" is visible
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > div > div.oxd-alert.oxd-alert--error > div.oxd-alert-content.oxd-alert-content--error > p')
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  })  
it('Should login successfully with username that has trailing space "Admin "', () => {
    // 1. Access OrangeHRM login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Enter valid username
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > div:nth-child(2) > input')
      .type('Admin ')

      // 3. Assert username value
      .should('have.value', 'Admin '); 

    // 4. Enter password with leading space " admin123"
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > div:nth-child(2) > input')
      .type('admin123')
    
      // 5. Assert password value
      .should('have.value', 'admin123'); 

    // 6. Click login button
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div.oxd-form-actions.orangehrm-login-action > button')
      .click();

    // 7. Assert URL redirected
    cy.url().should('include', '/web/index.php/dashboard/index');

    // 8. Assert admin panel header is visible indicating successful login
    cy.get('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-navigation > header > div.oxd-topbar-header')
      .should('be.visible');
  }) 
it('Should not login successfully with password that has trailing space "admin123 "', () => {
    // 1. Access OrangeHRM login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Enter valid username
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > div:nth-child(2) > input')
      .type('Admin')

      // 3. Assert username value
      .should('have.value', 'Admin'); 

    // 4. Enter password with leading space " admin123"
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > div:nth-child(2) > input')
      .type('admin123 ')
    
      // 5. Assert password value
      .should('have.value', 'admin123 '); 

    // 6. Click login button
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div.oxd-form-actions.orangehrm-login-action > button')
      .click();

    // 7. Assert URL not redirected
    cy.url().should('include', '/web/index.php/auth/login');

    // 8. Assert error message "Invalid credentials" is visible
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > div > div.oxd-alert.oxd-alert--error > div.oxd-alert-content.oxd-alert-content--error > p')
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  }) 
it('Should login successfully with capslock username "ADMIN"', () => {
    // 1. Access OrangeHRM login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Enter valid username
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > div:nth-child(2) > input')
      .type('ADMIN')

      // 3. Assert username value
      .should('have.value', 'ADMIN'); 

    // 4. Enter password with leading space " admin123"
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > div:nth-child(2) > input')
      .type('admin123')
    
      // 5. Assert password value
      .should('have.value', 'admin123'); 

    // 6. Click login button
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div.oxd-form-actions.orangehrm-login-action > button')
      .click();

    // 7. Assert URL redirected
    cy.url().should('include', '/web/index.php/dashboard/index');

    // 8. Assert admin panel header is visible indicating successful login
    cy.get('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-navigation > header > div.oxd-topbar-header')
      .should('be.visible');
  }) 
 
it('Should login successfully with capslock password "ADMIN123"', () => {
    // 1. Access OrangeHRM login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Enter valid username
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > div:nth-child(2) > input')
      .type('Admin')

      // 3. Assert username value
      .should('have.value', 'Admin'); 

    // 4. Enter password with leading space " admin123"
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > div:nth-child(2) > input')
      .type('ADMIN123')
    
      // 5. Assert password value
      .should('have.value', 'ADMIN123'); 

    // 6. Click login button
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div.oxd-form-actions.orangehrm-login-action > button')
      .click();

    // 7. Assert URL not redirected
    cy.url().should('include', '/web/index.php/auth/login');

    // 8. Assert error message "Invalid credentials" is visible
    cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > div > div.oxd-alert.oxd-alert--error > div.oxd-alert-content.oxd-alert-content--error > p')
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  }) 
  it('should allow access to the forgot password page', () => {
    // 1. Access login page
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Assert url path
    cy.url().should('include', '/web/index.php/auth/login');

    // 3. Assert login form
    cy.get('form.oxd-form').should('be.visible');
  });
});