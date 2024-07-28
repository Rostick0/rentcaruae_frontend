import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/email-code/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/email-code/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/email-code/${id}`, data, params),
  //   getAll: async ({ params }) => useFetcher().get(`/email-code`, params),
  create: async ({ data }) => useFetcher().post(`/email-code`, data),
};
