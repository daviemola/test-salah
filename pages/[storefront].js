import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SearchBox } from "@/components/common";
import { ProductCard } from "@/components/ProductCard/index";
import { Layout } from "@/components/layout/index";
import { Sidebar } from "@/components/common/sidebar/index";
import { ApiServices } from "@/services/apiService";
import Drawer from "@mui/material/Drawer";
import { FloatingCartIconMobile } from "@/components/common/FloatingCartIconMobile/index";
import { NoSearchFound } from "@/components/common/nosearchfound/index";
import { LoadingView } from "@/components/common/loadingView/index";
import CartContext from "@/context/CartContext";
import { useContext } from "react";

const StoreFront = ({ products, detail }) => {
  // console.log(detail);
  const router = useRouter();
  const { storefront, product } = router.query;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [checkItem, setcheckItem] = useState(true);
  const [showing, setshowing] = useState(false);
  const [showProducts, setShowProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const { toggleSidebar, sidetoggle, cartItems, total } =
    useContext(CartContext);

  const toggleDrawer = () => {
    toggleSidebar();
  };

  const findKeywordData = async (e) => {
    console.log("first");

    if (e.key === "Enter") {
      setLoading(true);
      const apiServices = new ApiServices();
      const data = await apiServices.searchProducts(searchKeyword, storefront);
      if (data.length > 0) {
        setLoading(false);
        setShowProducts(data);
        setcheckItem(false);
      } else {
        setLoading(false);
        setShowProducts(data);
        setcheckItem(false);
      }
    }
    console.log(searchKeyword);
    if (searchKeyword === "") {
      // console.log("nothing on searchkeyword");
      setShowProducts(products);
      setcheckItem(false);
    }
  };

  useEffect(() => {
    const callSearchApi = setTimeout(async () => {
      if (searchKeyword === "") {
        setLoading(false);
        console.log("here.....");
        console.log("loading " + loading);
        setShowProducts(products);
        setshowing(false);
      } else {
        setLoading(true);
        const apiServices = new ApiServices();
        const data = await apiServices.searchProducts(
          searchKeyword,
          storefront
        );
        if (data.length > 0) {
          setTimeout(() => {
            setLoading(false);
            setShowProducts(data);
            setcheckItem(false);
            console.log("first success");
          }, 500);
        } else {
          setTimeout(() => {
            setshowing(false);
            setLoading(false);
            setShowProducts(data);
            setcheckItem(false);
            console.log("second failure");
          }, 500);
        }
      }
      console.log("here...");
    }, 1200);

    return () => clearTimeout(callSearchApi);
    //eslint-disable-next-line
  }, [searchKeyword]);

  return (
    <>
      <Layout detail={detail}>
        <div>
          <SearchBox
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
            findKeywordData={findKeywordData}
            showing={showing}
            detail={detail}
          />
          {showProducts && showProducts.length > 0 && loading == false ? (
            <div className="container page-height">
              <div className="columns">
                {showProducts.map((item, index) => {
                  return (
                    <ProductCard
                      item={item}
                      key={index}
                      productQuery={product}
                      detail={detail}
                    />
                  );
                })}
              </div>
            </div>
          ) : showing === true ? (
            <div></div>
          ) : loading ? (
            <LoadingView detail={detail} />
          ) : (
            <NoSearchFound searchKeyword={searchKeyword} detail={detail} />
          )}
          <Drawer anchor={"right"} open={sidetoggle} onClose={toggleDrawer}>
            <Sidebar
              cartItems={cartItems}
              detail={detail}
              total={total}
              item={products}
            />
          </Drawer>
          <FloatingCartIconMobile onClose={toggleDrawer} />
        </div>
      </Layout>
    </>
  );
};

export default StoreFront;

export async function getServerSideProps(context) {
  const storefront = context.params.storefront;
  const apiServices = new ApiServices();
  const products = await apiServices.getAllProducts(storefront);
  const detail = await apiServices.getStoreFrontDetail(storefront);
  return {
    props: {
      products,
      detail,
    },
  };
}

// export const getStaticProps = async (context) => {
//   const storefront = context.params.storefront;
//   console.log(context);
//   const apiServices = new ApiServices();
//   const products = await apiServices.getAllProducts(storefront);
//   const detail = await apiServices.getStoreFrontDetail(storefront);
//   return {
//     props: {
//       products,
//       detail,
//     },
//   };
// };

// export const getStaticPaths = () => {
//   const paths = [
//     {
//       params: { storefront: "shutabug" },
//     },
//     {
//       // params: { storefront: "test-salah" },
//       params: { storefront: "balafaama" },
//     },
//   ];
//   return {
//     paths,
//     fallback: false,
//   };
// };
