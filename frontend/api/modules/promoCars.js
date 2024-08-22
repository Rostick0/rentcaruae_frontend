import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/promo-cars/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/promo-cars/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/promo-cars/${id}`, data, params),
  //   getAll: async ({ params }) => useFetcher().get(`/promo-cars`, params),
  create: async ({ data }) => useFetcher().post(`/promo-cars`, data),
};
