import { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import { sumItems } from "./CartReducer";
import { INCREASE } from "./CartTypes";

// let Storage;
//Local Storage
// if (typeof window !== "undefined") {
// const Storage =
//   typeof window !== "undefined" && localStorage.getItem("cartItems")
//     ? typeof window !== "undefined" &&
//       JSON.parse(localStorage.getItem("cartItems"))
//     : [];
// }

const CartState = ({ children }) => {
  //Change the code above to that below to get the initial state from local storage
  const initialState = {
    cartItems: [],
    ...sumItems,
    checkout: false,
    sidetoggle: false,
    qtyZeroErr: false,
    moreQtyErr: false,
  };

  //Set up the reducer
  const [state, dispatch] = useReducer(CartReducer, initialState);

  //function to handle when sidebar is toggled
  const qtyZeroErrFunc = (payload) => {
    dispatch({ type: "ZEROQUANTITYERROR", payload });
  };

  //function to handle when sidebar is toggled
  const moreQtyErrFunc = (payload) => {
    dispatch({ type: "MOREQTYERROR", payload });
  };

  //function to handle when sidebar is toggled
  const toggleSidebar = () => {
    dispatch({ type: "TOGGLESIDEBAR" });
  };

  //Function to handle when an item is added from the store into the Cart
  const addToCart = (payload) => {
    // console.log(payload);
    // console.log(cartItems);
    dispatch({ type: "ADD_TO_CART", payload });
    // dispatch({ type: "CLEAR", payload });
  };

  const addNewToCart = (payload) => {
    // console.log(payload);
    // console.log(cartItems);
    dispatch({ type: "ADD_NEW_ITEM_TO_CART", payload });
  };

  const addMoreItemToCart = (payload) => {
    // console.log(payload);
    // console.log(cartItems);
    dispatch({ type: "ADD_MORE_ITEMS", payload });
  };

  //Function to handle when an item that is in the cart is added again
  const increase = (payload) => {
    dispatch({ type: INCREASE, payload });
  };

  //Function to handle when an item is removed from the cart
  const decrease = (payload) => {
    dispatch({ type: "DECREASE", payload });
  };

  //Function to remove an item from the cart
  const removeFromCart = (payload) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  //Function to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  // Delete Date from a cart
  const deleteDataFromCart = (payload) => {
    dispatch({ type: "DELETE_FROM_CART", payload });
  };

  //Function to handle when the user clicks the checkout button
  const handleCheckout = () => {
    dispatch({ type: "CHECKOUT" });
  };

  return (
    //Add the above functions into the Context provider, and pass to the children
    <CartContext.Provider
      value={{
        showCart: state.showCart,
        cartItems: state.cartItems,
        addToCart,
        addNewToCart,
        removeFromCart,
        increase,
        decrease,
        moreQtyErrFunc,
        qtyZeroErrFunc,
        handleCheckout,
        deleteDataFromCart,
        addMoreItemToCart,
        clearCart,
        toggleSidebar,
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
