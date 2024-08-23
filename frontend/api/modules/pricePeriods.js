import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/price-periods/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/price-periods/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/price-periods/${id}`, data, params),
  getAll: async ({ params } = { params: {} }) =>
    useFetcher().get(`/price-periods`, params),
  //   create: async ({ data }) => useFetcher().post(`/price-periods`, data),
};
