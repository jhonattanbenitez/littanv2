import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const makePaymentRequest = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${baseUrl}`,
    "Content-Type": "application/json",
  },
});
