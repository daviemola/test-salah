import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductSlider from "../ProductSlider/ProductSlider";
import ProductModal from "../ProductModal/ProductModal";
import { lightOrDark } from "../../utils/lightOrDark";
import { adjust, numberWithCommas } from "../../utils/coloradjust";

const ProductCard = ({ item, productQuery, detail }) => {
  // console.log({ item, productQuery, detail });
  console.log(item);
  console.log(detail);
  const router = useRouter();
  const { storefront } = router.query;
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState(null);
  const openDetailModal = (item) => {
    try {
      setProductData(item);
      toggle();
    } catch (error) {
      console.log(error);
    }
  };
  const toggle = () => {
    setOpenModal(!openModal);
  };

  const findAndOpenProduct = (productQuery, item) => {
    if (productQuery === item.slug) {
      openDetailModal(item);
    }
  };

  useEffect(() => {
    if (openModal) {
      window.history.pushState(
        "page2",
        "Title",
        `${storefront}?product=${item?.slug}`
      );
    } else {
      window.history.pushState("page2", "Title", `${storefront}`);
    }
    //eslint-disable-next-line
  }, [openModal]);

  useEffect(() => {
    if (productQuery) {
      findAndOpenProduct(productQuery, item);
    }
    //eslint-disable-next-line
  }, [productQuery]);

  return (
    <>
      <div
        className={`column product-column col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-6`}
        onClick={(e) => {
          openDetailModal(item);
        }}
      >
        <div className="product">
          <div
            className="product__media-container product__media-container--single-file"
            style={{
              backgroundColor: adjust(detail?.background_color, -30),
            }}
          >
            {item?.files.length === 0 ? (
              <>
                <img
                  src="/bag.svg"
                  className="product-view__media--img"
                  alt="product-image"
                />
              </>
            ) : (
              <>
                <ProductSlider images={item} />
              </>
            )}
          </div>
          <div className="product__details">
            <div className="product__details__name">
              <span>{item?.name}</span>
            </div>
            <div className="product__details__price">
              {item?.min_variant_price !== item?.max_variant_price
                ? `${item?.currency} ${numberWithCommas(
                    numberWithCommas(item?.min_variant_price / 100)
                  )}
              - ${numberWithCommas(item?.max_variant_price / 100)}`
                : `${item?.currency} ${numberWithCommas(item?.price / 100)}`}
            </div>
          </div>
        </div>
      </div>
      <ProductModal
        openModal={openModal}
        objectDetail={productData}
        toggle={toggle}
        detail={detail}
      />
    </>
  );
};

export default ProductCard;
