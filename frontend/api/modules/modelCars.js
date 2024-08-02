import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/model-cars/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/model-cars/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/model-cars/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/model-cars`, params),
  //   create: async ({ data }) => useFetcher().post(`/model-cars`, data),
};
