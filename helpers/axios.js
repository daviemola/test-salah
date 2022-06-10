import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.paystack.co/storefront/verify/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
