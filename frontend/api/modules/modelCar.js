import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/model-car/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/model-car/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/model-car/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/model-car`, params),
  //   create: async ({ data }) => useFetcher().post(`/model-car`, data),
};
