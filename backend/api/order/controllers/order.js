'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const stripe = require('stripe')(process.env.sk_test_51IgTE6SEtraFFPFEOWiZ2oMZcksbag4It9XDeV62kdeg4qoEH8Kl0SSSksaiNwP20sa5UwhCQQ4BhCtVyp8yMlN000cM3djDLS)
const MY_DOMAIN = 'http://localhost:3000/cart';
module.exports = {
    async create(ctx) {
        const { cartDetail, cartTotal } = ctx.request.body
        //build line items array
        const line_items = cartDetail.map((cartItem) => {
            const item = {}
            item.price_data = {
                currency: 'usd',
                product_data: {
                    name: cartItem.name,
                    images: [`${cartItem.url}`]
                },
                unit_amount: (cartItem.price * 100).toFixed(0),
            },
            item.quantity = cartItem.quantity
            return item;
        })
        // create order
        await strapi.services.order.create({ Item: line_items })
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${MY_DOMAIN}?success=true`,
            cancel_url: `${MY_DOMAIN}?canceled=true`,
        })
        return { id: session.id}
    } 
};