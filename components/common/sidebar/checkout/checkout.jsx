import React, { useState, useMemo } from "react";
import Select from "react-select";
import styles from "./checkout.module.css";
import { adjust, numberWithCommas } from "../../../../utils/coloradjust";
import { lightOrDark } from "../../../../utils/lightOrDark";
import countryList from "react-select-country-list";

// const options = [
//   { value: "pakistan", label: "Pakistan" },
//   { value: "dubai", label: "Dubai" },
//   { value: "saudia arabia", label: "Saudia Arabia" },
// ];

// const shippingOptions = [
//   { value: "Lagos Mainland (NGN 1,500)", label: "Lagos Mainland (NGN 1,500)" },
//   { value: "Lagos Island (NGN 2,000)", label: "Lagos Island (NGN 2,000)" },
// ];

const Checkout = ({
  close,
  show_order_detail,
  isThisIsGift,
  setIsThisIsGift,
  recipientFirstName,
  recipientLastName,
  recipientPhone,
  recipientEmailAddress,
  deliveryAddress,
  deliveryCity,
  deliveryState,
  deliveryCountry,
  deliveryNote,
  shippingRegion,
  customerFirstName,
  customerLastName,
  customerEmail,
  customerPhone,
  setRecipientFirstName,
  setRecipientLastName,
  setRecipientPhone,
  setRecipientEmailAddress,
  setDeliveryAddress,
  setDeliveryCity,
  setDeliveryState,
  setDeliveryCountry,
  setDeliveryNote,
  setShippingRegion,
  setCustomerFirstName,
  setCustomerLastName,
  setCustomerEmail,
  setCustomerPhone,
  setShippingPrice,
  showEmailSection,
  setShowEmailSection,
  recipientFirstNameError,
  recipientPhoneError,
  recipientEmailAddressError,
  deliveryAddressError,
  deliveryCityError,
  shippingRegionError,
  customerFirstNameError,
  customerLastNameError,
  customerEmailError,
  customerPhoneError,
  cartItems,
  allTotal,
  shippingPrice,
  showPaymentSection,
  setShowPaymentSection,
  changeView,
  checkoutDetails,
  detail,
}) => {
  const [checked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shippingOption, setShippingOption] = useState(null);

  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (selectedOption) => {
    console.log("changing");
    console.log(selectedOption);
    setSelectedOption(selectedOption);
    setDeliveryCountry(selectedOption.label);
  };

  const handleChangeShipment = (selectedOption) => {
    console.log("selected");
    console.log(selectedOption);
    setShippingOption(selectedOption);
    // if (selectedOption.label == "Lagos Mainland (NGN 1,500)") {
    //   setShippingPrice("NGN 1,500");
    // } else {
    //   setShippingPrice("NGN 2,000");
    // }
    setShippingRegion(selectedOption.label);
    setShippingPrice(selectedOption.fee);
  };

  return (
    <div className={styles.off_canvas}>
      <div className={styles.w_100}>
        <div className={styles.sidebar_header}>
          <span className={styles.sidebar_header_title}>{detail?.name}</span>
          <div className={styles.sidebar_header_breadcrumbs}>
            <div className={styles.sidebar_header_breadcrumb_container}>
              <span
                className={
                  showPaymentSection
                    ? `${styles.sidebar_header_breadcrumb}`
                    : `${styles.sidebar_header_breadcrumb} ${styles.active}`
                }
              >
                Shipping
              </span>
              {showPaymentSection && (
                <img
                  src="https://paystack.shop/assets/images/success-round.svg"
                  alt="success"
                  className={styles.sidebar_header_icon}
                />
              )}
            </div>
            <div className={styles.sidebar_header_breadcrumb_container}>
              <img
                src="https://paystack.shop/assets/images/chevron-right.svg"
                alt="next"
              />
            </div>
            <div className={styles.sidebar_header_breadcrumb_container}>
              <span
                className={
                  showPaymentSection
                    ? `${styles.sidebar_header_breadcrumb} ${styles.active}`
                    : `${styles.sidebar_header_breadcrumb}`
                }
              >
                Pay
              </span>
            </div>
          </div>
        </div>
        {showPaymentSection ? (
          <PaymentSection
            styles={styles}
            detail={detail}
            setShowPaymentSection={setShowPaymentSection}
            showPaymentSection={showPaymentSection}
            showDetail={show_order_detail}
            customerFirstName={customerFirstName}
            setCustomerFirstName={setCustomerFirstName}
            customerLastName={customerLastName}
            setCustomerLastName={setCustomerLastName}
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            customerFirstNameError={customerFirstNameError}
            customerLastNameError={customerLastNameError}
            customerEmailError={customerEmailError}
            customerPhoneError={customerPhoneError}
            recipientFirstName={recipientFirstName}
            recipientLastName={recipientLastName}
            recipientPhone={recipientPhone}
            recipientEmailAddress={recipientEmailAddress}
          />
        ) : (
          <CheckOutDetails
            options={options}
            styles={styles}
            detail={detail}
            setChecked={setChecked}
            isThisIsGift={isThisIsGift}
            setIsThisIsGift={setIsThisIsGift}
            checked={checked}
            showEmailSection={showEmailSection}
            showEmailSectionSet={setShowEmailSection}
            selectedOption={selectedOption}
            handleChange={handleChange}
            shippingOption={shippingOption}
            handleChangeShipment={handleChangeShipment}
            // shippingOptions={shippingOptions}
            close={close}
            changeView={changeView}
            recipientFirstName={recipientFirstName}
            setRecipientFirstName={setRecipientFirstName}
            recipientLastName={recipientLastName}
            setRecipientLastName={setRecipientLastName}
            recipientPhone={recipientPhone}
            setRecipientPhone={setRecipientPhone}
            recipientEmailAddress={recipientEmailAddress}
            setRecipientEmailAddress={setRecipientEmailAddress}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            deliveryCity={deliveryCity}
            setDeliveryCity={setDeliveryCity}
            deliveryState={deliveryState}
            setDeliveryState={setDeliveryState}
            deliveryCountry={deliveryCountry}
            setDeliveryCountry={setDeliveryCountry}
            deliveryNote={deliveryNote}
            setDeliveryNote={setDeliveryNote}
            shippingRegion={shippingRegion}
            setShippingRegion={setShippingRegion}
            recipientFirstNameError={recipientFirstNameError}
            recipientPhoneError={recipientPhoneError}
            recipientEmailAddressError={recipientEmailAddressError}
            deliveryAddressError={deliveryAddressError}
            deliveryCityError={deliveryCityError}
            shippingRegionError={shippingRegionError}
            checkoutDetails={checkoutDetails}
          />
        )}

        <div className={styles.sidebar_footer}>
          <div className={styles.bag_summary_header}>
            <div className={styles.bag_summary_header_left}>
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
                  className={styles.cart_total}
                  style={{
                    color:
                      lightOrDark(detail?.background_color) === "light"
                        ? "#3BB75E"
                        : adjust(detail?.background_color, -30),
                  }}
                >
                  {cartItems.length}
                </span>
              </div>
            </div>
            <div className={styles.bag_summary_header_right}>
              <p className={styles.bag_summary_price_text}>
                {detail?.shipping_fees[0].currency}{" "}
                {allTotal ? numberWithCommas(allTotal / 100) : 0}
              </p>
              <p className={styles.bag_summary_shipping_price_text}>
                {`Shipping: ${
                  detail?.shipping_fees[0]?.currency
                } ${numberWithCommas(shippingPrice / 100)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;

const CheckOutDetails = ({
  styles,
  detail,
  setChecked,
  checked,
  showEmailSection,
  showEmailSectionSet,
  selectedOption,
  handleChange,
  shippingOption,
  handleChangeShipment,
  shippingOptions,
  close,
  isThisIsGift,
  setIsThisIsGift,
  changeView,
  recipientFirstName,
  recipientLastName,
  recipientPhone,
  recipientEmailAddress,
  deliveryAddress,
  deliveryCity,
  deliveryState,
  deliveryCountry,
  deliveryNote,
  shippingRegion,
  setRecipientFirstName,
  setRecipientLastName,
  setRecipientPhone,
  setRecipientEmailAddress,
  setDeliveryAddress,
  setDeliveryCity,
  setDeliveryState,
  setDeliveryCountry,
  setDeliveryNote,
  setShippingRegion,
  checkoutDetails,
  recipientFirstNameError,
  recipientPhoneError,
  recipientEmailAddressError,
  deliveryAddressError,
  deliveryCityError,
  shippingRegionError,
}) => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  console.log();
  const shippingoptions = detail.shipping_fees.map(function (row) {
    return {
      value: row.id,
      label: `${row.name} (${
        row?.fee === 0
          ? "Free"
          : `${detail?.currency} ${numberWithCommas(row.fee / 100)}`
      } )`,
      fee: row.fee,
    };
  });

  // console.log(options);
  console.log(shippingOptions);

  return (
    <div className={styles.sidebar_container_inner}>
      <form
        onSubmit={(e) => {
          checkoutDetails(e);
        }}
      >
        <div className={styles.form_control}>
          <div className={"form-group"}>
            <label
              className={`${styles.form_checkbox} ${styles.checkbox_group}`}
            >
              <input type="checkbox" name="Gift" />
              <i
                className={checked ? styles.form_icon_active : styles.form_icon}
                onClick={(e) => {
                  setChecked(!checked);
                  setIsThisIsGift(!isThisIsGift);
                }}
              ></i>
              Is this a gift?
            </label>
          </div>
        </div>
        {checked && (
          <>
            <div className={styles.form_control}>
              <label htmlFor="firstName" className={styles.label}>
                Recipient name
              </label>
              <div className={styles.input_group}>
                <div
                  className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_r_5}`}
                >
                  <input
                    placeholder={"First name"}
                    name="recipientFirstName"
                    type="text"
                    className={styles.input}
                    value={recipientFirstName}
                    onChange={(e) => {
                      setRecipientFirstName(e.target.value);
                    }}
                  />
                  {recipientFirstNameError && (
                    <span className={styles.error_text}>
                      Please Enter First Name
                    </span>
                  )}
                </div>
                <div
                  className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_l_5}`}
                >
                  <input
                    placeholder={"Last name"}
                    name="recipientLastName"
                    type="text"
                    className={styles.input}
                    value={recipientLastName}
                    onChange={(e) => [setRecipientLastName(e.target.value)]}
                  />
                </div>
              </div>
            </div>
            <div className={styles.form_control}>
              <label htmlFor="firstName" className={styles.label}>
                Recipient phone number
              </label>
              <div className={styles.input_group}>
                <div
                  className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_r_5}`}
                >
                  <input
                    placeholder={"Phone number"}
                    name="recipientPhone"
                    type="tel"
                    className={styles.input}
                    value={recipientPhone}
                    onChange={(e) => {
                      setRecipientPhone(e.target.value);
                    }}
                  />
                  {recipientPhoneError && (
                    <span className={styles.error_text}>
                      Please Enter Phone Number
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.form_control}>
              <div className={"form-group"}>
                <label
                  className={`${styles.form_checkbox} ${styles.checkbox_group}`}
                >
                  <input type="checkbox" name="Gift" />
                  <i
                    className={
                      showEmailSection
                        ? styles.form_icon_active
                        : styles.form_icon
                    }
                    onClick={(e) => {
                      showEmailSectionSet(!showEmailSection);
                    }}
                  ></i>
                  Inform recipient via email
                </label>
              </div>
            </div>
          </>
        )}
        {showEmailSection && (
          <div className={styles.form_control}>
            <label htmlFor="emailAddress" className={styles.label}>
              Recipient email address
            </label>
            <div className={styles.input_group}>
              <div
                className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_r_5}`}
              >
                <input
                  placeholder={"Email Address"}
                  name="recipientEmail"
                  type="email"
                  className={styles.input}
                  value={recipientEmailAddress}
                  onChange={(e) => {
                    setRecipientEmailAddress(e.target.value);
                  }}
                />
                {recipientEmailAddressError && (
                  <span className={styles.error_text}>
                    Please Enter Email Address
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        <div className={styles.form_control}>
          <label className={styles.label} htmlFor="address">
            Delivery address
          </label>
          <div className={styles.m_b_10}>
            <div
              className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_t_10}`}
            >
              <input
                placeholder={"Full address"}
                name="address"
                type="text"
                className={styles.input}
                value={deliveryAddress}
                onChange={(e) => {
                  setDeliveryAddress(e.target.value);
                }}
              />
              {deliveryAddressError && (
                <span className={styles.error_text}>
                  Please Enter Full Address
                </span>
              )}
            </div>
          </div>
          <div className={`${styles.input_group} ${styles.m_b_10}`}>
            <div
              className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_r_5}`}
            >
              <input
                placeholder={"City"}
                name="city"
                type="text"
                className={styles.input}
                value={deliveryCity}
                onChange={(e) => {
                  setDeliveryCity(e.target.value);
                }}
              />
              {deliveryCityError && (
                <span className={styles.error_text}>Please Enter City</span>
              )}
            </div>
            <div
              className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_l_5}`}
            >
              <input
                placeholder={"State"}
                name="state"
                type="text"
                className={styles.input}
                value={deliveryState}
                onChange={(e) => {
                  setDeliveryState(e.target.value);
                }}
              />
              {shippingRegionError && (
                <span className={styles.error_text}>Please Enter State</span>
              )}
            </div>
          </div>
          <div>
            <Select
              default={selectedOption}
              value={selectedOption}
              onChange={handleChange}
              options={options}
            />
          </div>
        </div>
        <div className={styles.form_control}>
          <label htmlFor="address" className={styles.label}>
            Delivery note
          </label>
          <div className={styles.input_group}>
            <div
              className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_t_10}`}
            >
              <input
                placeholder={"Optional"}
                name="deliveryNote"
                type="text"
                className={`${styles.input} ${styles.h_34}`}
                rows={1}
                value={deliveryNote}
                onChange={(e) => {
                  setDeliveryNote(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.form_control}>
          <label htmlFor="address" className={styles.label}>
            Shipping region
          </label>
          <div className={styles.input_group}>
            <div
              className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_t_10}`}
            >
              <Select
                default={shippingOption}
                value={shippingOption}
                onChange={handleChangeShipment}
                options={shippingoptions}
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.flex} ${styles.flex_justify_space_between} ${styles.flex_direction_column} ${styles.p_t_10}`}
        >
          <button
            className={`${styles.button} ${styles.btn_cta}`}
            style={{
              backgroundColor:
                lightOrDark(detail?.background_color) === "light"
                  ? "#3BB75E"
                  : adjust(detail?.background_color, -30),
            }}
            type={"submit"}
          >
            Continue to pay
          </button>
          <button
            className={`${styles.button} ${styles.m_t_10}`}
            onClick={close}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

const PaymentSection = ({
  styles,
  setShowPaymentSection,
  showPaymentSection,
  showDetail,
  customerFirstName,
  customerLastName,
  customerEmail,
  customerPhone,
  setCustomerFirstName,
  setCustomerLastName,
  setCustomerEmail,
  setCustomerPhone,
  customerFirstNameError,
  customerLastNameError,
  customerEmailError,
  customerPhoneError,
  detail,
}) => {
  console.log(detail);
  return (
    <>
      <div className={styles.sidebar_container_inner}>
        <form
          onSubmit={(e) => {
            showDetail(e);
          }}
        >
          <div className={styles.form_control}>
            <label htmlFor="firstName" className={styles.label}>
              Your name
            </label>
            <div className={styles.input_group}>
              <div
                className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_r_5}`}
              >
                <input
                  placeholder={"First name"}
                  name="recipientFirstName"
                  type="text"
                  className={styles.input}
                  value={customerFirstName}
                  onChange={(e) => {
                    setCustomerFirstName(e.target.value);
                  }}
                />
                {customerFirstNameError && (
                  <span className={styles.error_text}>
                    Please Enter First Name
                  </span>
                )}
              </div>
              <div
                className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_l_5}`}
              >
                <input
                  placeholder={"Last name"}
                  name="recipientLastName"
                  type="text"
                  className={styles.input}
                  value={customerLastName}
                  onChange={(e) => {
                    setCustomerLastName(e.target.value);
                  }}
                />
                {customerLastNameError && (
                  <span className={styles.error_text}>
                    Please Enter Last Name
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.form_control}>
            <label htmlFor="firstName" className={styles.label}>
              Your email address
            </label>
            <div className={styles.input_group}>
              <div
                className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_t_10}`}
              >
                <input
                  placeholder={"Email address"}
                  name="recipientEmailAddress"
                  type="text"
                  className={styles.input}
                  value={customerEmail}
                  onChange={(e) => {
                    setCustomerEmail(e.target.value);
                  }}
                />
                {customerEmailError && (
                  <div className={styles.error_text}>
                    Please Enter Email Address
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.form_control}>
            <label htmlFor="firstName" className={styles.label}>
              Your phone number
            </label>
            <div className={styles.input_group}>
              <div
                className={`${styles.flex} ${styles.flex_direction_column} ${styles.w_100} ${styles.m_t_10}`}
              >
                <input
                  placeholder={"Phone number"}
                  name="recipientPhoneNumber"
                  type="tel"
                  className={styles.input}
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value);
                  }}
                />
                {customerPhoneError && (
                  <span className={styles.error_text}>
                    Please Enter Phone Number
                  </span>
                )}
              </div>
            </div>
          </div>
          <div
            className={`${styles.flex} ${styles.flex_justify_space_between} ${styles.flex_direction_column} ${styles.p_t_10}`}
          >
            <button
              className={`${styles.button} ${styles.btn_cta}`}
              style={{
                backgroundColor:
                  lightOrDark(detail?.background_color) === "light"
                    ? "#3BB75E"
                    : adjust(detail?.background_color, -30),
              }}
              type={"submit"}
            >
              Review and pay
            </button>
            <button
              className={`${styles.button} ${styles.m_t_10}`}
              onClick={() => {
                setShowPaymentSection(!showPaymentSection);
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
      <div
        className={`${styles.flex} ${styles.flex_direction_column} ${styles.pfm_payForm}`}
      >
        <div
          className={`${styles.flex} ${styles.flex_justify_space_between} ${styles.pfm_payForm_divider}`}
        >
          <div className={styles.divider_dashed}></div>
          <p>or</p>
          <div className={styles.divider_dashed}></div>
        </div>
        <button
          className={`${styles.button} ${styles.button_cta}`}
          style={{
            color:
              lightOrDark(detail?.background_color) === "light"
                ? "#3BB75E"
                : adjust(detail?.background_color, -30),
          }}
        >
          Let someone pay for you
        </button>
      </div>
    </>
  );
};
