declare namespace Cypress {
  // These type is meant to hint you about the basic card input fields you can fill.
  type CypressStripeElementsFieldName = 'cardCvc' | 'cardNumber' | 'cardExpiry' | 'postalCode'
    
  interface Chainable {
    fillElementsInput<T>(field: T extends string ? string : CypressStripeElementsFieldName, value: string): Chainable<Element>
  }
  // In case we haven't added a stable field name, you can fix type warnings by
  // cy.fillElementsInput<string>('extraField,'some value')
}
