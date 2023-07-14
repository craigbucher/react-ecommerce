"use strict";

// using 'require' because have not configured 'import modules' ?????
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller (provided by strapi)
 */

const { createCoreController } = require("@strapi/strapi").factories;

// destructure out 'strapi' api and create callback function:
module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {	// add custom functionality to strapi api
    const { products, userName, email } = ctx.request.body;	// we get products, userName, email from frontend (sent to api/orders)
    try {
      // retrieve item information
			// do this here so that price info can't be manipulated and fraudulently sent to api
      const lineItems = await Promise.all(	// 'Promise.all' permits multiple async calls
        products.map(async (product) => {		// cycle through products
          const item = await strapi
            .service("api::item.item")	// get item information from strapi
            .findOne(product.id);

          return {
						// format item price info in format required by stripe:
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );

      // create a stripe session
			// using stripe's pre-built checkout page https://stripe.com/docs/checkout/quickstart
      // custom payment flow would require React Stripe.js
			const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "http://localhost:3000/confirmation",	// redirect frontend to 'checkout/success'
        cancel_url: "http://localhost:3000",
        line_items: lineItems,
      });

      // create the item
      await strapi
        .service("api::order.order")	// create a new order in strapi
        .create({ data: { userName, products, stripeSessionId: session.id } });

      // return the session id
      return { id: session.id };	// return session.id to frontend
    } catch (error) {		// catch all errors:
      ctx.response.status = 500;
      return { error: { message: "There was a problem creating the charge" } };
    }
  },
}));