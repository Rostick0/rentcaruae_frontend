import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/generations/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/generations/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/generations/${id}`, data, params),
  getAll: async ({ params = {} } = {}) =>
    useFetcher().get(`/generations`, params),
  //   create: async ({ data }) => useFetcher().post(`/generations`, data),
};
