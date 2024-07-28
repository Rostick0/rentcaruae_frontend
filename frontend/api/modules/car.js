import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/cars/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/cars/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/cars/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/cars`, params),
  create: async ({ data }) => useFetcher().post(`/cars`, data),
};
