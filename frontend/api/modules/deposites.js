import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/deposites/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/deposites/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/deposites/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/deposites`, params),
  create: async ({ data }) => useFetcher().post(`/deposites`, data),
};
