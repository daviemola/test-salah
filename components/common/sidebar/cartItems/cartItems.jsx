import React from "react";
// import { useDispatch } from "react-redux";
// import { addToCart, minusCart } from "../../../../store/action/sideBar";
import styles from "./cartItems.module.css";

const CartItemDisplay = ({ item, index, deleteItem }) => {
  const dispatch = useDispatch();
  const addToCartItem = () => {
    dispatch(addToCart(item));
  };
  const minusFromCart = () => {
    dispatch(minusCart(item));
  };
  return (
    <div className={styles.bagView_product} key={index}>
      <div className={`${styles.flex} ${styles.flex_justify_start}`}>
        <div>
          <img
            src={item?.files[0]?.path}
            className={styles.bagView_product_image}
          />
        </div>
        <div className={styles.bagView_product_price}>
          <p className={styles.bagView_product_price_text}>{item?.name}</p>
          <div className={styles.tags}>
            <span>
              {item?.size} {item?.border} {item?.frame}
            </span>
          </div>
          <p className={styles.bagView_product_price_text}>
            {item.currency} {item.totalPrice}
          </p>
        </div>
      </div>
      <div className={`${styles.flex} ${styles.flex_direction_column}`}>
        <div className={styles.bagView_product_quantity}>
          <div className={styles.quantity}>
            <span>
              <button
                className={styles.quantity_minus}
                onClick={() => {
                  minusFromCart();
                }}
              >
                <img
                  src="https://paystack.shop/assets/images/minus.svg"
                  alt="Decrement"
                />
              </button>
            </span>
            <input
              type="number"
              className={styles.quantity_input}
              value={item?.quantity}
            />
            <span>
              <button
                className={styles.quantity_plus}
                onClick={() => {
                  addToCartItem();
                }}
              >
                <img
                  src="https://paystack.shop/assets/images/plus.svg"
                  alt="Decrement"
                />
              </button>
            </span>
          </div>
          <button
            className={styles.bagview_delete_item}
            onClick={(e) => {
              deleteItem(e, item);
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default CartItemDisplay;
