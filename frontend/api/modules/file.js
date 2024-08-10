import useFetcher from "../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/file/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/file/${id}`, params),
  // update: async ({ id, data, params }) =>
  // useFetcher().patch(`/file/${id}`, data, params),
  // getAll: async ({ params }) => useFetcher().get(`/file`, params),
  create: async ({ data }) => useFetcher().post(`/file`, data, {}),
};
