import { PROMOS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const promosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromos: builder.query({
      query: () => PROMOS_URL, // Fetch all promos
      providesTags: ["Promo"], // Cache and invalidate these tags when necessary
      keepUnusedDataFor: 5,
    }),
    getPromoDetails: builder.query({
      query: (promoId) => `${PROMOS_URL}/${promoId}`, // Fetch promo details by ID
      keepUnusedDataFor: 5,
    }),
    createPromo: builder.mutation({
      query: () => ({
        url: PROMOS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Promo"], // Invalidates the cache after a promo is created
    }),
    updatePromo: builder.mutation({
      query: (data) => ({
        url: `${PROMOS_URL}/${data.promoId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Promos"], // Invalidate promo cache when it's updated
    }),
    deletePromo: builder.mutation({
      query: (promoId) => ({
        url: `${PROMOS_URL}/${promoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Promo"], // Invalidate cache after promo deletion
    }),
    uploadPromoImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPromosQuery,
  useGetPromoDetailsQuery,
  useCreatePromoMutation,
  useUpdatePromoMutation,
  useDeletePromoMutation,
  useUploadPromoImageMutation,
} = promosApiSlice;
