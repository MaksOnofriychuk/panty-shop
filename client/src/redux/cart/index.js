export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const CLEAR_CART = "CLEAR_CART";
export const DELETE_PRODUCT_IN_CART = "DELETE_PRODUCT_IN_CART";

const initialState = {
  items: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    case DELETE_PRODUCT_IN_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
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
