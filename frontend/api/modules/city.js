import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/cities/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/cities/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/cities/${id}`, data, params),
  getAll: async ({ params = {} } = {}) => useFetcher().get(`/cities`, params),
  //   create: async ({ data }) => useFetcher().post(`/cities`, data),
};
