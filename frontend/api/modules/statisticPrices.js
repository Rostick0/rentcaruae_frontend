import useFetcher from "../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/statistic-prices/${id}`, params),
  //   delete: async ({ id, params }) =>
  //     useFetcher().delete(`/statistic-prices/${id}`, params),
  // update: async ({ id, data, params }) =>
  // useFetcher().patch(`/statistic-prices/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/statistic-prices`, params),
  //   create: async ({ data }) => useFetcher().post(`/statistic-prices`, data, {}),
};
