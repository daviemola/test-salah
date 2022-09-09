import React from "react";

const PageNotFound = () => {
  return (
    <div className="error-view">
      <div className="error-view__header">
        <a href="https://paystack.com/">
          <img
            src="/assets/images/paystack-logo-with-text.svg"
            alt="paystack"
          />
        </a>
      </div>
      <div className="error-view__content">
        <h2 className="error-view__content__title">Storefront not found</h2>
        <p className="error-view__content__info">This link is incorrect.</p>
        <a
          href="https://paystack.com/storefront"
          className="error-view__content__link"
        >
          What's a Paystack Storefront?
        </a>
      </div>
      <div className="error-view__footer">
        <p>
          Illustration by:{" "}
          <a href="https://paystack.com/" className="error-view__footer__link">
            Paystack Design Team
          </a>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
