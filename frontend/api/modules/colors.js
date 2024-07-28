import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/colors/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/colors/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/colors/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/colors`, params),
  //   create: async ({ data }) => useFetcher().post(`/colors`, data),
};
