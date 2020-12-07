type CypressStripeElementsFieldName = 'cardNumber' | 'expiry' | 'cvv' | 'postalCode';

const getSelectorForField = (field: CypressStripeElementsFieldName): null | string => {
  switch (field) {
    case 'cardNumber':
      return 'input[autocomplete="cc-number"]';
    case 'expiry':
      return 'input[autocomplete="cc-exp"]'
    case 'cvv':
      return 'input[autocomplete="cc-csc"]'
    case 'postalCode':
      return 'input[autocomplete="postal-code"]'
    default:
      return null;
  }
}

Cypress.Commands.add('fillElementsInput', (field: CypressStripeElementsFieldName, value: string): void => {
  const selector = getSelectorForField(field);

  if (!selector) throw new Error(`Bad field value: ${field}`);

  cy
    .get('iframe')
    .should(iframe => expect(iframe.contents().find(selector)).to.exist)
    .then(iframe => cy.wrap(iframe.contents().find(selector)))
    .within(input => {
      cy.wrap(input).type(value);
    });
})
