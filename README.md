# cypress-plugin-stripe-elements

<img src="https://github.com/dbalatero/cypress-plugin-stripe-elements/workflows/End-to-end%20tests/badge.svg" />

This plugin provides a `fillElementsInput` that makes it easy to fill out
Stripe Elements inputs without `cy.wait()` hacks or anything else.

```es6
cy.fillElementsInput('cardNumber', '4242424242424242');
```

## Installation

```
npm install --save-dev cypress-plugin-stripe-elements
# or
yarn add --dev cypress-plugin-stripe-elements
```

Set `{ "chromeWebSecurity": false }` in your `cypress.json` file, or the plugin
will not work.

Import the plugin in your `cypress/support/index.js` file:

```es6
// cypress/support/index.js

import 'cypress-plugin-stripe-elements';
```

### TypeScript

Make sure to include the following `types` in your `tsconfig.json` file:

```json 
{
  "compilerOptions": {
    "types": ["cypress", "cypress-plugin-stripe-elements"]
  }
}
```

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
the tests with `yarn test` after setting the environment variables `CYPRESS_TEST_APP_PORT` and `STRIPE_PUBLISHABLE_KEY`:

```
CYPRESS_TEST_APP_PORT=4000 STRIPE_PUBLISHABLE_KEY=your_key_here yarn test
```