# cypress-plugin-stripe-elements

This plugin provides a `fillElementsInput` that makes it easy to fill out
Stripe Elements inputs without `cy.wait()` hacks or anything else.

## Installation

```
npm install --save-dev cypress-plugin-stripe-elements
# or
yarn add --dev cypress-plugin-stripe-elements
```

Set `{ "chromeWebSecurity": false }` in your `cypress.json` file, or the plugin
will not work.

## Usage

This package provides a `cy.fillElementsInput(name, value)` command.

The `name` parameter can be one of:

* `cardNumber` - credit card number field
* `cardExpiry` - credit card MM/YY expiry field
* `cardCvc` - credit card 3-digit CVC field
* `postalCode` - postal/ZIP code

or any `string` value matching the `data-elements-stable-field-name` attribute
of the Elements `<input>` you want to target. Use the DevTools/inspector to
figure out the stable field name.

The `value` is whatever `string` you want to fill the field with.

```es6
describe('payment form', () => {
  it('allows for a successful payment', () => {
    cy.visit(`http://localhost:4000`);

    // It's recommended to scope `fillElementsInput` to a specific container
    // in case you have multiple Stripe Elements on the page.
    cy.get('#card-element').within(() => {
      cy.fillElementsInput('cardNumber', '4242424242424242');
      cy.fillElementsInput('cardExpiry', '1025'); // MMYY
      cy.fillElementsInput('cardCvc', '123');
      cy.fillElementsInput('postalCode', '90210');
    });

    // Click your Pay button (yours is different)
    // cy.get('#pay-button').click();

    // TODO: Assert some success state
  })
})
```

## Development

To modify this plugin, `git clone` the repo and run `yarn install`. You can run
the tests with `yarn test`.
