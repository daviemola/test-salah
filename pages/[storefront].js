import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SearchBox } from "@/components/common";
import { ProductCard } from "@/components/ProductCard/index";
import { Layout } from "@/components/layout/index";
import { Sidebar } from "@/components/common/sidebar/index";
import { ApiServices } from "@/services/apiService";
import Drawer from "@mui/material/Drawer";
// import { toggleSidebar } from "../store/action/sideBar";
import { FloatingCartIconMobile } from "@/components/common/FloatingCartIconMobile/index";
import { NoSearchFound } from "@/components/common/nosearchfound/index";
import { LoadingView } from "@/components/common/loadingView/index";

export const getStaticPaths = () => {
  const paths = [
    {
      params: { storefront: "shutabug" },
    },
    {
      params: { storefront: "test-salah" },
    },
  ];
  return {
    paths,
    fallback: false,
  };
};

const StoreFront = ({ products, detail }) => {
  const router = useRouter();
  const { storefront, product } = router.query;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showProducts, setShowProducts] = useState(products);
  const [loading, setLoading] = useState(false);

  console.log(showProducts);

  // const totalPrice = useSelector(({ sidebar }) => {
  //   return sidebar.total;
  // });
  // const toggleDrawer = () => {
  //   dispatch(toggleSidebar());
  // };
  // const findKeywordData = async (e) => {
  //   if (e.key === "Enter") {
  //     setLoading(true);
  //     const apiServices = new ApiServices();
  //     const data = await apiServices.searchProducts(searchKeyword, storefront);
  //     if (data.length > 0) {
  //       setLoading(false);
  //       setShowProducts(data);
  //     } else {
  //       setLoading(false);
  //       setShowProducts(data);
  //     }
  //   }
  //   if (searchKeyword == "") {
  //     setShowProducts(products);
  //   }
  // };
  // useEffect(() => {
  //   const callSearchApi = setTimeout(async () => {
  //     if (searchKeyword !== "") {
  //       setLoading(true);
  //       const apiServices = new ApiServices();
  //       const data = await apiServices.searchProducts(
  //         searchKeyword,
  //         storefront
  //       );
  //       if (data.length > 0) {
  //         setLoading(false);
  //         setShowProducts(data);
  //       } else {
  //         setLoading(false);
  //         setShowProducts(data);
  //       }
  //     } else {
  //       setShowProducts(products);
  //     }
  //   }, 2000);

  //   return () => clearTimeout(callSearchApi);
  // }, [searchKeyword]);

  return (
    <>
      <Layout detail={detail}>
        <div>
          <SearchBox
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
            // findKeywordData={findKeywordData}
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
          ) : loading ? (
            <LoadingView />
          ) : (
            <NoSearchFound />
          )}
          <Drawer
            anchor={"right"}
            // open={sideBar}
            // onClose={toggleDrawer}
          >
            <Sidebar />
          </Drawer>
          <FloatingCartIconMobile
          // onClose={toggleDrawer}
          />
        </div>
      </Layout>
    </>
  );
};
export default StoreFront;

export const getStaticProps = async (context) => {
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
};
