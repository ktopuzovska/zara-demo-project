class ShoppingPage {
    verifyProductBookmarked() {
        cy.get('.wishlist-item').should('have.length.greaterThan', 0);
    }

    // ----- Cart Page Actions -----
    openCart() {
        cy.get('a[href*="shopping-bag"]').click();
    }

    verifyCartCount(expectedCount) {
        cy.get('.cart-icon-badge').should('contain', expectedCount);
    }

    verifyProductsInCart() {
        cy.get('.cart-item').should('have.length.greaterThan', 0);
    }

    removeFirstProduct() {
        cy.get('.cart-item').eq(0).find('button.remove').click();
    }

    verifyCartTotalPriceUpdated() {
        cy.get('.cart-total-price').should('exist');
    }

    // ----- Checkout Page Actions -----
    startCheckout() {
        cy.get('button.checkout').click();
    }

    paymentInfo(fullName, address, city, zipCode, country, cardNumber, cardExpiration, cvcCode, shippingMethod) {
        cy.get('input[name="fullName"]').type(fullName);
        cy.get('input[name="address"]').type(address);
        cy.get('input[name="city"]').type(city);
        cy.get('input[name="zipCode"]').type(zipCode);
        cy.get('input[name="country"]').type(country);
        cy.get('input[name="cardNumber"]').type(cardNumber);
        cy.get('input[name="cardExpiration"]').type(cardExpiration);
        cy.get('input[name="cvcCode"]').type(cvcCode);
        cy.get('input[name="shippingMethod"]').type(shippingMethod);
    }

    completeOrder() {
        cy.get('button.confirm-order').click();
    }

    verifyOrderConfirmation() {
        cy.contains('Thank you for your purchase').should('be.visible');
    }

    // ----- Search Page Actions -----
    verifySearchResultsDisplayed() {
        cy.get('div.product-grid-element').should('be.visible');
    }

    getSearchResults() {
        return cy.get('div.product-grid-element');
    }

    addFirstProductToCart() {
        cy.get('div.product-grid-element').eq(0).find('button.add-to-cart').click();
    }

    addSecondProductToCart() {
        cy.get('div.product-grid-element').eq(1).find('button.add-to-cart').click();
    }

    bookmarkFirstProduct() {
        cy.get('div.product-grid-element').eq(0).find('button.bookmark').click();
    }
}

export default ShoppingPage;
