/// <reference types="cypress" />

// All Stripe Elements fields have a `data-elements-stable-field-name`
// attribute that can be used to target it.
//
// This type is meant to hint you about the basic card input fields you can fill.
//
// In case we haven't added a stable field name to this list, you can always
// fallback to passing a `string`.
declare module "cypress-plugin-stripe-elements" {
  export type CypressStripeElementsFieldName = 'cardCvc' | 'cardNumber' | 'cardExpiry' | 'postalCode' | string;
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
    */
    fillElementsInput(field: CypressStripeElementsFieldName, value: string): Chainable<Element>
  }
}
