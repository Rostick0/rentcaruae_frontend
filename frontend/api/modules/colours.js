import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/colours/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/colours/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/colours/${id}`, data, params),
  getAll: async ({ params = {} } = {}) => useFetcher().get(`/colours`, params),
  //   create: async ({ data }) => useFetcher().post(`/colours`, data),
};
