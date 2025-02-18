import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../config/env";

export const motorcycleApi = createApi({
  reducerPath: "motorcycleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/motorcycles`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMotorcycles: builder.query({
      query: ({ page = 1, limit = 10 }) => `?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetMotorcyclesQuery } = motorcycleApi;
