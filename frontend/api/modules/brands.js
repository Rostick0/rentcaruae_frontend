import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/brands/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/brands/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/brands/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/brands`, params),
  create: async ({ data }) => useFetcher().post(`/brands`, data),
};
