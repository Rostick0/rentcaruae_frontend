import useFetcher from "../../utils/fetch";

export default {
    get: async ({ id, params }) => useFetcher().get(`/users/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/users/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/users/${id}`, data, params),
    getAll: async ({ params }) => useFetcher().get(`/users`, params),
  //   create: async ({ data }) => useFetcher().post(`/users`, data),
};
