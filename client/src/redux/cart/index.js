export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const CLEAR_CART = "CLEAR_CART";
export const DELETE_PRODUCT_IN_CART = "DELETE_PRODUCT_IN_CART";
export const PLUS_CART_ITEM = "PLUS_CART_ITEM";
export const MINUS_CART_ITEM = "MINUS_CART_ITEM";
export const GET_ITEMS = "GET_ITEMS";
const SELL_PERCENT = 50.8;

const initialState = {
  items: {},
  totalPrice: 0,
  sellTotalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const getPriceWithSell = (totalPrice) =>
  Math.floor(totalPrice * (1 - SELL_PERCENT / 100));

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split(".");
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      const totalCount = localStorage.getItem("total-count") || 0;
      const totalPrice = localStorage.getItem("total-price") || 0;
      const items = localStorage.getItem("cart-items");

      const cartItems = items ? JSON.parse(items) : {};

      return {
        ...state,
        items: cartItems,
        totalPrice,
        totalCount,
      };

    case ADD_PRODUCT_TO_CART: {
      const curentItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: curentItems,
          totalPrice: getTotalPrice(curentItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");
      const sellTotalPrice =
        totalCount > 8
          ? getPriceWithSell(getTotalSum(newItems, "totalPrice"))
          : 0;

      localStorage.setItem("total-count", totalCount);
      localStorage.setItem("total-price", totalPrice);
      localStorage.setItem("cart-items", JSON.stringify(newItems));

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
        sellTotalPrice,
      };
    }

    case CLEAR_CART: {
      localStorage.clear();

      return {
        totalPrice: 0,
        totalCount: 0,
        items: {},
      };
    }

    case DELETE_PRODUCT_IN_CART: {
      const newItems = {
        ...state.items,
      };

      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];

      const totalCount = state.totalCount - currentTotalCount;
      const totalPrice = state.totalPrice - currentTotalPrice;

      localStorage.setItem("total-count", totalCount);
      localStorage.setItem("total-price", totalPrice);
      localStorage.setItem("cart-items", JSON.stringify(newItems));

      return {
        ...state,
        items: newItems,
        totalPrice,
        totalCount,
      };
    }

    case PLUS_CART_ITEM: {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");
      const sellTotalPrice =
        totalCount > 8
          ? getPriceWithSell(getTotalSum(newItems, "totalPrice"))
          : 0;

      localStorage.setItem("total-count", totalCount);
      localStorage.setItem("total-price", totalPrice);
      localStorage.setItem("cart-items", JSON.stringify(newItems));

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
        sellTotalPrice,
      };
    }

    case MINUS_CART_ITEM: {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");
      const sellTotalPrice =
        totalCount > 8
          ? getPriceWithSell(getTotalSum(newItems, "totalPrice"))
          : 0;

      localStorage.setItem("total-count", totalCount);
      localStorage.setItem("total-price", totalPrice);
      localStorage.setItem("cart-items", JSON.stringify(newItems));

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
        sellTotalPrice,
      };
    }

    default:
      return state;
  }
}

export const getItems = () => ({
  type: GET_ITEMS,
});

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

export const plusCartItem = (id) => ({
  type: PLUS_CART_ITEM,
  payload: id,
});

export const minusCartItem = (id) => ({
  type: MINUS_CART_ITEM,
  payload: id,
});
