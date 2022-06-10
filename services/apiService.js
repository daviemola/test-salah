import axios from "../helpers/axios";

export class ApiServices {
  async getStoreFrontDetail(storefront) {
    try {
      const { data } = await axios.get(`${storefront}`);
      return data.data;
    } catch (error) {
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
      const { data } = await axios.get(`product/verify/${slug}`);
      return data.data;
    } catch (error) {
      return [];
    }
  }
}
