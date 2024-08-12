import useFetcher from "../../utils/fetch";

export default {
  // get: async ({ id, params }) => useFetcher().get(`/statistics-day/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/statistics-day/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/statistics-day/${id}`, data, params),
  getAll: async ({ params = {} } = {}) =>
    useFetcher().get(`/statistics-day`, params),
  create: async ({ data }) => useFetcher().post(`/statistics-day`, data),
};
