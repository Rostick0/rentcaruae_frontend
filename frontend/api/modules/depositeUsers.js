import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/deposite-users/${id}`, params),
  //   //   delete: async ({ id, params }) => useFetcher().delete(`/deposite-users/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/deposite-users/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/deposite-users`, params),
  union: async ({ params }) =>
    useFetcher().get(`/deposite-users/union`, params),
  //   create: async ({ data }) => useFetcher().post(`/deposite-users`, data),
};
