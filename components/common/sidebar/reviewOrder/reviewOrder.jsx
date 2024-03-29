import React from "react";
import styles from "./reviewOrder.module.css";
import CartContext from "@/context/CartContext";
import { useContext } from "react";
import { adjust, numberWithCommas } from "../../../../utils/coloradjust";
import { lightOrDark } from "../../../../utils/lightOrDark";
import { PaystackButton } from "react-paystack";
import axios from "axios";

const ReviewOrder = ({
  checkout,
  customerFirstName,
  customerLastName,
  customerEmail,
  customerPhone,
  deliveryAddress,
  deliveryNote,
  shippingRegion,
  shippingPrice,
  cart,
  allTotal,
  orderPlace,
  detail,
  isThisIsGift,
  deliveryCity,
  deliveryCountry,
  recipientFirstName,
  recipientLastName,
  recipientPhone,
  recipientEmailAddress,
}) => {
  const { itemCount } = useContext(CartContext);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();

  const array = cart.map((o) => {
    return {
      type: o.variant_options.length === 0 ? "product" : "variant",
      item: o.id,
      quantity: o.quantity_cart,
    };
  });
  // console.log(array);
  // console.log(detail);
  const token = "pk_test_7f8acf3182b1c5c333c70f4f4d97537525637c79";
  const config = {
    headers: { Authorization: `Bearer ${detail.integration.key}` },
  };
  // console.log(detail);
  const reqdata = {
    storefront: detail.id,
    currency: detail.currency,
    email: customerEmail,
    phone: customerPhone,
    first_name: customerFirstName,
    last_name: customerLastName,
    items: array,
    is_gift: isThisIsGift,
    pay_for_me: false,
    receiver: isThisIsGift
      ? {
          first_name: recipientFirstName,
          last_name: recipientLastName,
          phone: recipientPhone,
        }
      : null,
    shipping: {
      street_line: deliveryAddress,
      city: deliveryCity,
      country: deliveryCountry,
      shipping_fee: shippingPrice,
      delivery_note: deliveryNote,
    },
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.post(
          "https://api.paystack.co/order",
          reqdata,
          config
        );
        setData(response);
        console.log(response);
      } catch (error) {
        setError(error.response.data.message);
        console.log(error.response.data.message);
        console.error(error.response);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // console.log(data);

  let totalAmount = allTotal
    ? numberWithCommas((Number(allTotal) + Number(shippingPrice)) / 100)
    : 0;

  const auth = {
    email: customerEmail,
    username: `${customerFirstName} ${customerLastName}`,
    contact: customerEmail,
  };
  const amount = totalAmount * 100;
  const publicKey = "pk_test_be8d8807ef6ad0749c7e5c9b6f03478b3dc76dc3";

  const componentProps = {
    email: auth.email,
    amount,
    metadata: {
      userName: auth.username,
      phone: auth.contact,
      custom_field: [{ name: auth.username }],
    },
    publicKey,
    text: loading
      ? `Please wait...`
      : `Pay ${detail?.shipping_fees[0].currency} ${totalAmount}`,
    onSuccess: (e) => {
      console.log(e);
    },
    onClose: () => {
      alert("Wait! You need this product, don't go!!!!");
    },
  };
  return (
    <div className={styles.off_canvas}>
      <div className={styles.sidebar_container}>
        <div>
          <div className={styles.order_view_header}>
            <span className={styles.order_view_title}>Order details</span>
            <div className={styles.bagIcon}>
              <svg
                className={"bagicon__icon"}
                width="22"
                height="25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.421 6.284h7.904v2.384c0 1.04-.416 2.038-1.157 2.774a3.969 3.969 0 01-5.59 0 3.908 3.908 0 01-1.157-2.774V6.284z"
                  fill={
                    lightOrDark(detail?.background_color) === "light"
                      ? "#3BB75E"
                      : adjust(detail?.background_color, -30)
                  }
                ></path>
                <path
                  d="M11.373 0A3.969 3.969 0 008.58 1.15 3.908 3.908 0 007.42 3.923v2.53h1.635v-2.53a2.293 2.293 0 01.695-1.599 2.328 2.328 0 013.248 0c.434.423.683.997.695 1.6v2.53h1.635v-2.53a3.901 3.901 0 00-1.159-2.776A3.958 3.958 0 0011.373 0z"
                  fill={
                    lightOrDark(detail?.background_color) === "light"
                      ? "#3BB75E"
                      : adjust(detail?.background_color, -30)
                  }
                ></path>
                <path
                  d="M21.996 23.67L20.102 7.343a1.19 1.19 0 00-.395-.754 1.208 1.208 0 00-.8-.303H13.71v2.317a2.31 2.31 0 01-.684 1.64 2.346 2.346 0 01-3.306 0 2.31 2.31 0 01-.684-1.64V6.285H3.844c-.296 0-.58.108-.801.303a1.19 1.19 0 00-.394.754L.758 23.671a1.185 1.185 0 00.297.93 1.201 1.201 0 00.898.399h18.844a1.21 1.21 0 00.9-.397 1.19 1.19 0 00.299-.932z"
                  fill={
                    lightOrDark(detail?.background_color) === "light"
                      ? "#3BB75E"
                      : adjust(detail?.background_color, -30)
                  }
                ></path>
              </svg>
              <span
                className={styles.navbar_cart_total}
                style={{
                  color:
                    lightOrDark(detail?.background_color) === "light"
                      ? "#3BB75E"
                      : adjust(detail?.background_color, -30),
                }}
              >
                {itemCount}
              </span>
            </div>
          </div>
          <div className={styles.order_view_inner}>
            <div className={styles.order_view_contact_info}>
              <div className={styles.order_view_customer_info}>
                <div className={styles.order_view_contact_info_row}>
                  <div
                    className={styles.order_view_avatar}
                    style={{
                      backgroundColor:
                        lightOrDark(detail?.background_color) === "light"
                          ? "#3BB75E"
                          : adjust(detail?.background_color, -30),
                    }}
                  >
                    {customerFirstName.charAt(0).toLowerCase()}
                  </div>
                  <span className={styles.order_view_customer_info_text}>
                    {customerFirstName} {customerLastName}
                  </span>
                </div>
                <div className={styles.order_view_contact_info_row}>
                  <div className={styles.order_view_icon_container}>
                    <img
                      src="https://paystack.shop/assets/images/email.svg"
                      alt="email"
                    />
                  </div>
                  <span className={styles.order_view_customer_info_text_change}>
                    {customerEmail}
                  </span>
                </div>
                <div className={styles.order_view_contact_info_row}>
                  <div className={styles.order_view_icon_container}>
                    <img
                      src="https://paystack.shop/assets/images/phone.svg"
                      alt="phone"
                    />
                  </div>
                  <span className={styles.order_view_customer_info_text_change}>
                    {customerPhone}
                  </span>
                </div>
              </div>
              {isThisIsGift && (
                <div className={styles.reciepient_details}>
                  <div>
                    <span className={styles.order_view_address_text_title}>
                      Gifting to
                    </span>
                  </div>
                  <div>
                    <span className={styles.order_view_address_text}>
                      {`${recipientFirstName} ${recipientLastName}`}
                    </span>
                  </div>
                  <div>
                    <span className={styles.order_view_address_text}>
                      {`${recipientPhone}`}
                    </span>
                  </div>
                </div>
              )}

              <div className={styles.order_view_address}>
                <span className={styles.order_view_address_text_title}>
                  Delivery Address
                </span>
                <span className={styles.order_view_address_text}>
                  {deliveryAddress}
                </span>
              </div>
              <div className={styles.order_view_address}>
                <span className={styles.order_view_address_text_title}>
                  Note
                </span>
                <span className={styles.order_view_address_text}>
                  {deliveryNote}
                </span>
              </div>
            </div>
            <div className={styles.order_summary}>
              {cart &&
                cart.length > 0 &&
                cart.map((item, index) => {
                  return (
                    <div className={styles.w_100} key={index}>
                      <div className={styles.order_summary_row}>
                        <div
                          className={
                            styles.order_summary_product_name_container
                          }
                        >
                          <span className={styles.order_summary_product_name}>
                            {item.name} x {item.quantity_cart}
                          </span>
                        </div>
                        <div
                          className={
                            styles.order_summary_product_price_container
                          }
                        >
                          <span className={styles.order_summary_product_price}>
                            {item.currency}{" "}
                            {item.totalPrice
                              ? numberWithCommas(item.totalPrice / 100)
                              : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div className={styles.order_summary_row}>
                <div className={styles.order_summary_product_name_container}>
                  <span className={styles.order_summary_variant_name}>
                    Shipping to {shippingRegion}
                  </span>
                </div>
                <div className={styles.order_summary_product_price_container}>
                  <span className={styles.order_summary_product_price}>
                    {`${detail?.shipping_fees[0]?.currency} ${numberWithCommas(
                      shippingPrice / 100
                    )}`}
                  </span>
                </div>
              </div>
              <div className={styles.order_summary_row}>
                <div className={styles.order_summary_product_name_container}>
                  <span className={styles.order_summary_product_name}>
                    Total
                  </span>
                </div>
                <div className={styles.order_summary_product_price_container}>
                  <span className={styles.order_summary_product_price}>
                    {detail?.shipping_fees[0].currency}{" "}
                    {allTotal
                      ? numberWithCommas(
                          (Number(allTotal) + Number(shippingPrice)) / 100
                        )
                      : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sidebar_footer}>
          <div style={{ color: "darkred", textAlign: "center" }}>
            {error ? error : null}
          </div>
          <div className={styles.sidebar_actions}>
            <div
              style={{
                backgroundColor:
                  lightOrDark(detail?.background_color) === "light"
                    ? "#3BB75E"
                    : adjust(detail?.background_color, -30),
                borderRadius: "5px",
                opacity: loading || error ? 0.5 : 1,
                pointerEvents: loading || error ? "none" : "auto",
              }}
            >
              <PaystackButton
                className={`${styles.button} ${styles.btn_cta}`}
                {...componentProps}
              />
            </div>

            <button
              className={`${styles.button} ${styles.m_t_10}`}
              onClick={checkout}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
