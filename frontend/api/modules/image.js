import useFetcher from "../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/image/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/image/${id}`, params),
  // update: async ({ id, data, params }) =>
  // useFetcher().patch(`/image/${id}`, data, params),
  // getAll: async ({ params }) => useFetcher().get(`/image`, params),
  create: async ({ data }) => useFetcher().post(`/image`, data, {}),
};
