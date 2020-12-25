import '../../src/index';

// Loaded from CYPRESS_TEST_APP_PORT environment variable.
// https://docs.cypress.io/guides/guides/environment-variables.html#Option-3-CYPRESS
const appPort = Cypress.env('TEST_APP_PORT');

describe('stripe elements', () => {
  it('fills in the element correctly', () => {
    cy.visit(`http://localhost:${appPort}`)

    cy.get('#card-element').within(() => {
      cy.fillElementsInput('cardNumber', '4242424242424242');
      cy.fillElementsInput('cardExpiry', '1025');
      cy.fillElementsInput('cardCvc', '123');
      cy.fillElementsInput('postalCode', '90210');
    });

    // Click Pay
    cy.get('#pay-button').click();

    cy.get('#result-area').should(($div) => {
      const text = $div.text();

      expect(text).to.match(/Token: tok_\w+/);
    });
  })
})
