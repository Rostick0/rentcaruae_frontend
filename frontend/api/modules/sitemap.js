import useFetcher from "../../utils/fetch";

export default {
  get: async ({ params } = { params: {} }) =>
    useFetcher().get(`/sitemap-json/`, params),
};
