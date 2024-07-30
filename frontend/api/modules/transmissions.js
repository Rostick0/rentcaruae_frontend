import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/transmissions/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/transmissions/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/transmissions/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/transmissions`, params),
  //   create: async ({ data }) => useFetcher().post(`/transmissions`, data),
};
