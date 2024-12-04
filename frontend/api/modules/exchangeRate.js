import useFetcher from "../../utils/fetch";

export default {
  getAll: async ({ params = {} } = {}) =>
    useFetcher().get(`/exchange-rate`, params),
};
