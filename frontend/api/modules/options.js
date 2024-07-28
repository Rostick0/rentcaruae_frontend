import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/options/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/options/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/options/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/options`, params),
  //   create: async ({ data }) => useFetcher().post(`/options`, data),
};
