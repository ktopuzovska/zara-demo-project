import AccountPage from '../../pageObjects/AccountPage';
import ShoppingPage from '../../pageObjects/ShoppingPage';

const accountPage = new AccountPage();
const shoppingPage = new ShoppingPage();

describe('Zara Homepage and Navigation Tests', () => {
  let paymentInfo;

  before(() => {
    cy.fixture('credentials').then((data) => {
      paymentInfo = data.paymentDetails;
    });
  });

  beforeEach(() => {
    accountPage.openHomePage();
  });

  it('Verify that the Zara logo is displayed on the homepage', () => {
    accountPage.getLogo().should('be.visible');
  });

  it('Make sure that the search bar is present and functional', () => {
    accountPage.getSearchBar().should('be.visible').type('dress{enter}');
    cy.url().should('include', 'search');
  });

  it('Check that the main navigation menu items are visible and clickable', () => {
    accountPage.getNavigationMenuItems().each((item) => {
      cy.wrap(item).should('be.visible').click({force: true});
      cy.go('back');
    });
  });

  it('Search for a specific product using the search bar', () => {
    accountPage.getSearchBar().should('be.visible').type('dress{enter}');
    shoppingPage.verifySearchResultsDisplayed();
  });

  it('Verify that the search URL has query params', () => {
    cy.url().should('include', 'search');
    cy.url().should('include', 'q=dress'); 
  });

  it('Verify that the search results are relevant', () => {
    shoppingPage.getSearchResults().each((result) => {
      cy.wrap(result).should('contain.text', 'Dress');
    });
  });

  it('Check that the "+" (Add to cart) button is visible and add multiple products to the cart', () => {
    shoppingPage.addFirstProductToCart();
    shoppingPage.addSecondProductToCart();
    shoppingPage.verifyCartCount(2); 
  });

  it('Check that the "Bookmark" button is visible and bookmark a product', () => {
    shoppingPage.bookmarkFirstProduct();
    shoppingPage.verifyProductBookmarked();
  });

  it('Remove the product from the cart and verify that the price has been changed accordingly', () => {
    shoppingPage.openCart();
    shoppingPage.removeFirstProduct();
    shoppingPage.verifyCartTotalPriceUpdated();
  });

  it('Verify that shipping address, shipping method, and payment details can be entered', () => {
    shoppingPage.startCheckout();

    shoppingPage.paymentInfo(
      paymentInfo.fullName,
      paymentInfo.address,
      paymentInfo.city,
      paymentInfo.zipCode,
      paymentInfo.country,
      paymentInfo.cardNumber,
      paymentInfo.cardExpiration,
      paymentInfo.cvcCode,
      paymentInfo.shippingMethod
    );
  });

  it('Ensure that the checkout process is smooth and functional', () => {
    shoppingPage.completeOrder();
    shoppingPage.verifyOrderConfirmation();
  });
});
