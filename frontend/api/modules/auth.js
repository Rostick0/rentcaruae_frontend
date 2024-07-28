import useFetcher from "../../utils/fetch";

export default {
  login: async (data) => useFetcher().post(`/auth/login`, data),
  register: async (data) => useFetcher().post(`/auth/register`, data),
  logout: async (data) => useFetcher().post(`/auth/login`, data),
  me: async (params, headers) => useFetcher().get(`/auth/me`, params, headers),
};
