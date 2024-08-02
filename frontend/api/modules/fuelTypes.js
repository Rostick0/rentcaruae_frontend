import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/fuel-types/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/fuel-types/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/fuel-types/${id}`, data, params),
  getAll: async ({ params = {} } = {}) =>
    useFetcher().get(`/fuel-types`, params),
  //   create: async ({ data }) => useFetcher().post(`/fuel-types`, data),
};
