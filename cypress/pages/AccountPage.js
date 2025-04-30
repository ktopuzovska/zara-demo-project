class AccountPage {
    // Home Page Actions
    openHomePage() {
        cy.visit('https://www.zara.com/mk/en/');
    }

    clickSignIn() {
        cy.get('[data-qa-id="layout-header-user-logon"]').click();
    }

    clickSignInButton() {
        cy.get('[data-qa-id="oauth-logon-button"]').should('be.visible').click();
    }

    getLogo() {
        return cy.get('.layout-catalog-logo-icon')
    }

    getSearchBar() {
        return cy.get('input[type="search"]');
    }

    getNavigationMenuItems() {
        return cy.get('nav[role="navigation"] ul li');
    }

    // Account Creation Actions
    clickCreateAccount() {
        cy.get('[data-qa-id="logon-view-alternate-button"]').click();
    }

    fillAccountForm(firstName, lastName, email, password) {
        cy.get('[data-qa-input-qualifier="firstName"]').type(firstName);
        cy.get('[data-qa-input-qualifier="lastName"]').type(lastName);
        cy.get('[data-qa-input-qualifier="email"]').type(email);
        cy.get('[data-qa-input-qualifier="password"]').type(password);
        cy.contains('a', 'privacy statement');
    }

    submitAccountForm() {
        cy.get('[data-qa-action="sign-up-submit"]').should('be.visible').click();
    }

    verifyAccountCreation() {
        cy.contains('The account is successfully created').should('be.visible');

    }

    // Login Actions
    enterEmail(email) {
        cy.get('[data-qa-input-qualifier="logonId"]').type(email);
    }

    enterPassword(password) {
        cy.get('[data-qa-input-qualifier="password"]').type(password);
    }

    clickLoginButton() {
        cy.get('[data-qa-id="logon-form-submit"]').should('be.visible').click();
    }

    verifyLoginSuccess() {
        cy.url().should('include', '/SUCCESS');
    }

    verifyLoginErrorMessage() {
        cy.url().should('include', '/SORRY, SOMETHING WENT WRONG');
    }

    // My Account Page Actions
    getAccountName() {
        return cy.get('.profile-menu-view__header');
    }

    getAccountEmail() {
        return cy.get('.zds-selection-cell__description');
    }
}

export default AccountPage;
