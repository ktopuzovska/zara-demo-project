import AccountPage from '../../pageObjects/AccountPage';

const accountPage = new AccountPage();

describe('Zara Account Creation and Login Tests', () => {
  let validUserData;
  let invalidUserData

  before(() => {
    cy.fixture('credentials').then((data) => {
      validUserData = data.validUser;
      invalidUserData = data.invalidUser;
    });
  });

  it('Create account and verify that the account is created successfully', () => {
    accountPage.openHomePage();
    accountPage.clickSignIn();
    accountPage.clickCreateAccount();

    accountPage.fillAccountForm(
      validUserData.firstName,
      validUserData.lastName,
      validUserData.email,
      validUserData.password
    );
    accountPage.submitAccountForm();

    accountPage.verifyAccountCreation();
  });

  it('Login with the created account', () => {
    accountPage.openHomePage();
    accountPage.clickSignIn();
    accountPage.clickSignInButton();
    accountPage.enterEmail(validUserData.email);
    accountPage.enterPassword(validUserData.password);
    accountPage.clickLoginButton();
  });

  it('Verify that the login is successful', () => {
    accountPage.verifyLoginSuccess();
  });

  it('Verify that the account details are displayed correctly', () => {
    accountPage.getAccountName().should('contain.text', validUserData.firstName);
    accountPage.getAccountEmail().should('contain.text', validUserData.email);
  });

  it('Login with non-existing account and verify that the account does not exist', () => {
    accountPage.openHomePage();
    accountPage.clickSignIn();

    // Enter invalid credentials
    accountPage.fillAccountForm(
      invalidUserData.email,
      invalidUserData.password
    );
    accountPage.clickLogin();
    accountPage.verifyLoginErrorMessage();
  });
});
