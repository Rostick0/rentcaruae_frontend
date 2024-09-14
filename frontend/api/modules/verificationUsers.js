import useFetcher from "../../utils/fetch";

export default {
  //     get: async ({ id, params }) => useFetcher().get(`/verification-user/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/verification-user/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/verification-user/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/verification-user`, params),
  create: async ({ data }) => useFetcher().post(`/verification-user`, data),
};
