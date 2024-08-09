import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/companies/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/companies/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/companies/${id}`, data, params),
  getAll: async ({ params = {} } = {}) =>
    useFetcher().get(`/companies`, params),
  //   create: async ({ data }) => useFetcher().post(`/companies`, data),
};
