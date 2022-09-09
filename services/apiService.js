import axios from "../helpers/axios";

export class ApiServices {
  async getStoreFrontDetail(storefront) {
    console.log("first");
    try {
      const { data } = await axios.get(`${storefront}`);
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getAllProducts(storefront) {
    try {
      const { data } = await axios.get(`${storefront}/product?page=1&perPage=`);
      return data.data;
    } catch (error) {
      return [];
    }
  }

  async searchProducts(keyword, storefront) {
    try {
      const { data } = await axios.get(
        `${storefront}/product?page=1&perPage=30&search=${keyword}`
      );
      return data.data;
    } catch (error) {
      return [];
    }
  }

  async getProductDetail(slug) {
    try {
      console.log("name ");
      // const { data } = await axios.get(`product/verify/${slug}`);
      const { data } = await axios.get(`product/verify/popup`);
      return data.data;
    } catch (error) {
      return [];
    }
  }
}
