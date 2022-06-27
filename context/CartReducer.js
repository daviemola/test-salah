import {
  REMOVE_ITEM,
  ADD_TO_CART,
  INCREASE,
  DECREASE,
  CHECKOUT,
  CLEAR,
  DELETE_FROM_CART,
  TOGGLESIDEBAR,
} from "./CartTypes.js";

// Save the cartItems to local storage
const Storage = (cartItems) => {
  typeof window !== "undefined" &&
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
};

// Export function to calculate the total price of the cart and the total quantity of the cart
export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = cartItems
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemCount, total };
};

// const INIT_STATE = {
// };

// The reducer is listening for an action, which is the type that we defined in the CartTypes.js file
const CartReducer = (state, action) => {
  // The switch statement is checking the type of action that is being passed in
  console.log(action.type);

  switch (action.type) {
    case TOGGLESIDEBAR:
      return {
        ...state,
        sidetoggle: !state.sidetoggle,
      };
  }

  switch (action.type) {
    // If the action type is ADD_TO_CART, we want to add the item to the cartItems array
    case ADD_TO_CART:
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    // If the action type is REMOVE_ITEM, we want to remove the item from the cartItems array
    case REMOVE_ITEM: {
      let cart_Clone = state.cart;
      let productGet = action.payload;
      let set_total_price = 0;
      let found_InCart = false;
      let cart_Index;
      for (let i = 0; i < cart_Clone.length; i++) {
        if (cart_Clone[i].id == productGet.id) {
          found_InCart = true;
          cart_Index = i;
          break;
        }
      }
      if (found_InCart) {
        productGet = cart_Clone[cart_Index];
        if (productGet.quantity > 0) {
          productGet.quantity--;
          productGet.totalPrice =
            productGet.quantity * Number(productGet.price);
          cart_Clone.splice(cart_Index, 1, productGet);
        } else {
          productGet.quantity = 0;
          productGet.totalPrice = 0;
          cart_Clone.splice(cart_Index, 1);
        }
      }
      set_total_price = productGet.totalPrice;
      return {
        ...state,
        cart: cart_Clone,
        total: set_total_price,
      };
    }

    // If the action type is INCREASE, we want to increase the quantity of the particular item in the cartItems array
    case INCREASE: {
      let cartClone = state.cartItems;
      let productItem = action.payload;
      let set_total_price = 0;
      let foundInCart = false;
      let cartIndex;
      for (let i = 0; i < cartClone.length; i++) {
        if (cartClone[i].id == productItem.id) {
          foundInCart = true;
          cartIndex = i;
          break;
        }
      }
      if (foundInCart) {
        productItem = cartClone[cartIndex];
        productItem.quantity++;
        productItem.totalPrice =
          productItem.quantity * Number(productItem.price);
        cartClone.splice(cartIndex, 1, productItem);
      } else {
        productItem.totalPrice =
          productItem.quantity * Number(productItem.price);
        cartClone.push(productItem);
      }
      set_total_price = productItem.totalPrice;
      return {
        ...state,
        cart: cartClone,
        total: set_total_price,
        ...sumItems(state.cartItems),
      };
    }

    // If the action type is DECREASE, we want to decrease the quantity of the particular item in the cartItems array
    case DECREASE: {
      let cart_Clone = state.cart;
      let productGet = action.payload;
      let set_total_price = 0;
      let found_InCart = false;
      let cart_Index;
      for (let i = 0; i < cart_Clone?.length; i++) {
        if (cart_Clone[i].id == productGet.id) {
          found_InCart = true;
          cart_Index = i;
          break;
        }
      }
      if (found_InCart) {
        productGet = cart_Clone[cart_Index];
        if (productGet.quantity > 0) {
          productGet.quantity--;
          productGet.totalPrice =
            productGet.quantity * Number(productGet.price);
          cart_Clone.splice(cart_Index, 1, productGet);
        } else {
          productGet.quantity = 0;
          productGet.totalPrice = 0;
          cart_Clone.splice(cart_Index, 1);
        }
      }
      set_total_price = productGet.totalPrice;
      return {
        ...state,
        cart: cart_Clone,
        total: set_total_price,
        ...sumItems(state.cartItems),
      };
    }

    // If the action type is CHECKOUT, we want to clear the cartItems array and set the checkout to true
    case CHECKOUT:
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };

    //If the action type is CLEAR, we want to clear the cartItems array
    case CLEAR:
      return {
        cartItems: [],
        ...sumItems([]),
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item) => {
            console.log(item.id);
            console.log(action.payload.id);
            return item.id !== action.payload.id;
          })
        ),
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload.id),
        ],
      };

    //Return the state if the action type is not found
    default:
      return state;
  }
};

export default CartReducer;
