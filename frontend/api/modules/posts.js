import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/posts/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/posts/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/posts/${id}`, data, params),
  getAll: async ({ params } = { params: {} }) =>
    useFetcher().get(`/posts`, params),
  create: async ({ data }) => useFetcher().post(`/posts`, data),
  getByTitleLink: async ({ title_link, params }) =>
    useFetcher().get(`/posts/link/${title_link}`, params),
};
