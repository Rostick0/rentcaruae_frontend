import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ params } = { params: {} }) =>
  // useFetcher().get(`/spendings`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/spendings/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/spendings/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/spendings`, params),
  //   create: async ({ data }) => useFetcher().post(`/spendings`, data),
};
