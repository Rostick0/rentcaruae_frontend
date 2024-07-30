import useFetcher from "../../utils/fetch";

export default {
  getAll: async ({ params }) => useFetcher().get(`/distinct-value`, params),
};
