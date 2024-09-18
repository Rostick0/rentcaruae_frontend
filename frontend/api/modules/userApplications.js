//

import useFetcher from "../../utils/fetch";

export default {
  getAll: async ({ params = {} } = {}) =>
    useFetcher().get(`/user-applications`, params),
  accept: async ({ id }) => useFetcher().post(`/user-applications/${id}`, {}),
  deny: async ({ id, params }) =>
    useFetcher().delete(`/user-applications/${id}`, params),
};
