export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const CLEAR_CART = "CLEAR_CART";
export const DELETE_PRODUCT_IN_CART = "DELETE_PRODUCT_IN_CART";

const initialState = {
  items: {},
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
        },
      };

      return {
        ...state,
        items: newItems,
      };

    case CLEAR_CART:
      return {
        ...state,
        items: {},
      };

    case DELETE_PRODUCT_IN_CART:
      const nItems = {
        ...state.items,
      };

      delete nItems[action.payload];

      return {
        ...state,
        items: nItems,
      };

    default:
      return state;
  }
}

export const addProductToCart = (payload) => ({
  type: ADD_PRODUCT_TO_CART,
  payload,
});

export const clearCartItems = () => ({
  type: CLEAR_CART,
});

export const deleteProductInCart = (id) => ({
  type: DELETE_PRODUCT_IN_CART,
  payload: id,
});
