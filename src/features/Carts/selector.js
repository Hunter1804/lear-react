import { createSelector } from '@reduxjs/toolkit';

const cartItemSelector = (state) => state.cart.cartItems;

//count number of products in cart
export const cartItemSelectorCard = createSelector(cartItemSelector, (cartItem) =>
    cartItem.reduce((count, item) => count + item.quantity, 0)
);

//cal total of cart
export const cartTotalSelectorCard = createSelector(cartItemSelector, (cartItem) =>
    cartItem.reduce((total, item) => total + item.quantity * item.product.salePrice, 0)
);
