import { CypressStripeElementsFieldName } from 'cypress-plugin-stripe-elements';

const getSelectorForField = (name: CypressStripeElementsFieldName): string => {
  return `input[data-elements-stable-field-name="${name}"]`;
}

Cypress.Commands.add('fillElementsInput', (field: CypressStripeElementsFieldName, value: string): void => {
  if (Cypress.config('chromeWebSecurity')) {
    throw new Error(
      "You must set `{ \"chromeWebSecurity\": false }` in `cypress.json`, " +
      "or cypress-plugin-stripe-elements cannot access the Stripe Elements " +
      "<iframe> to perform autofill."
    );
  }

  const selector = getSelectorForField(field);

  cy
    .get('iframe')
    .should(iframe => expect(iframe.contents().find(selector)).to.exist)
    .then(iframe => cy.wrap(iframe.contents().find(selector)))
    .within(input => {
      /**
       * The .should("not.be.disabled") check implements a Cypress-team-recommended
       * workaround for cases where the iframe isn't completely loaded,
       * so Cypress fails on the type() command because the input is
       * temporarily disabled.
       *
       * See https://github.com/cypress-io/cypress/issues/5827#issuecomment-751995883
       */
      cy
        .wrap(input)
        .should("not.be.disabled")
        .clear()
        .type(value);
    });
})
