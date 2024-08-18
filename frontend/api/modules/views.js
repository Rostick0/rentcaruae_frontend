import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/views/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/views/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/views/${id}`, data, params),
  //   getAll: async ({ params }) => useFetcher().get(`/views`, params),
  create: async ({ data }) => useFetcher().post(`/views`, data),
};
