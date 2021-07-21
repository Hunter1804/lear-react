const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: [], //id , product , quantity
    },
    reducers: {
        //action chua payload
        showMiniCart(state, action) {
            state.showMiniCart = true;
        },

        hideMiniCart(state, action) {
            state.showMiniCart = false;
        },

        addToCart(state, action) {
            const newItem = action.payload;
            const index = state.cartItems.findIndex((item) => item.id === newItem.id);

            if (index >= 0) {
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
        },

        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            //check idR
            const index = state.cartItems.findIndex((x) => x.id === id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },

        removeFromCart(state, action) {
            const idRemove = action.payload;

            state.cartItems = state.cartItems.filter((c) => c.id !== idRemove);
        },
    },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions;
export default reducer;
