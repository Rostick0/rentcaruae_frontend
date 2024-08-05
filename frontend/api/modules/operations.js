import useFetcher from "../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/operations/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/operations/${id}`, params),
  // update: async ({ id, data, params }) =>
  // useFetcher().patch(`/operations/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/operations`, params),
  create: async ({ data }) => useFetcher().post(`/operations`, data, {}),
};
