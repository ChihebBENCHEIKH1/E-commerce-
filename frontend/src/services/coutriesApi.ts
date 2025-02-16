import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../config/env";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/countries` }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
