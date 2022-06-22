import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductSlider from "../ProductSlider/ProductSlider";
import ProductModal from "../ProductModal/ProductModal";

const ProductCard = ({ item, productQuery, detail }) => {
  console.log(item);
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
          <div className="product__media-container product__media-container--single-file">
            {item.files.length > 1 ? (
              <ProductSlider images={item.files} />
            ) : (
              <div className="file-wrapper file-wrapper__single-image">
                {item.files.length == 0 ? (
                  <img
                    src="https://res.cloudinary.com/paystack/image/upload/q_auto/w_350,c_limit/public/files/products/81sxt23daevgm7w2hoi7.jpeg"
                    className="product-view__media--img "
                    alt="product-image"
                  />
                ) : (
                  <img
                    src={item.files[0].path}
                    className="product-view__media--img"
                    alt="product-image"
                  />
                )}
              </div>
            )}
          </div>
          <div className="product__details">
            <div className="product__details__name">
              <span>{item.name}</span>
            </div>
            <div className="product__details__price">
              {item.currency} {item.price / 100}
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
