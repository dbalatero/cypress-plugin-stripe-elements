const express = require('express')
const app = express()

const options = {
  appPort: process.env.CYPRESS_TEST_APP_PORT,
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
};

if (!options.appPort) {
  throw new Error("Please set CYPRESS_TEST_APP_PORT=4000");
}

if (!options.publishableKey) {
  throw new Error("Please set STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx");
}

if (!options.publishableKey.startsWith("pk_test_")) {
  throw new Error("Make sure STRIPE_PUBLISHABLE_KEY is a test key (starts with `pk_test_...`)");
}

app.get('/', function (req, res) {
  res.send(`
    <html>
      <head>
        <script src="https://js.stripe.com/v3/"></script>
        <style type="text/css">
        /**
        * The CSS shown here will not be introduced in the Quickstart guide, but
        * shows how you can use CSS to style your Element's container.
        */
        input,
        .StripeElement {
          height: 40px;
          padding: 10px 12px;

          color: #32325d;
          background-color: white;
          border: 1px solid transparent;
          border-radius: 4px;

          box-shadow: 0 1px 3px 0 #e6ebf1;
          -webkit-transition: box-shadow 150ms ease;
          transition: box-shadow 150ms ease;
        }

        input:focus,
        .StripeElement--focus {
          box-shadow: 0 1px 3px 0 #cfd7df;
        }

        .StripeElement--invalid {
          border-color: #fa755a;
        }

        .StripeElement--webkit-autofill {
          background-color: #fefde5 !important;}

        #payment-form {
          width: 800px;
          margin: 0 auto;
          background-color: #ddd;
          padding: 1em;
        }
        </style>
      </head>

      <body>
        <form action="/charge" method="post" id="payment-form">
          <div class="form-row">
            <div id="card-element">
              <!-- A Stripe Element will be inserted here. -->
            </div>

            <button id="pay-button">Pay</button>

            <pre id="result-area"></pre>
          </div>
        </form>

        <script type="text/javascript">
        // Create a Stripe client.
        var stripe = Stripe('${options.publishableKey}');

        // Create an instance of Elements.
        var elements = stripe.elements();

        // Custom styling can be passed to options when creating an Element.
        // (Note that this demo uses a wider set of styles than the guide below.)
        var style = {
          base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        };

        // Create an instance of the card Element.
        var card = elements.create('card', {style: style});

        // Add an instance of the card Element into the card-element <div>.
        card.mount('#card-element');

        var button = document.getElementById('pay-button');
        button.addEventListener('click', function() {
          button.disabled = true;

          stripe.createToken(card).then(function(result) {
            document.getElementById('result-area').innerText = "Token: " + result.token.id;
          });
        });
        </script>
      </body>
    </html>
  `);
});

console.log('Started Stripe test server');
console.log(`  ==> http://localhost:${options.appPort}`);

app.listen(options.appPort);
