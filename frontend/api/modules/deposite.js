import useFetcher from "../../utils/fetch";

export default {
  create: async ({ data }) => useFetcher().post(`/deposite/init`, data),
  //   create: async ({ data }) => useFetcher().post(`/deposite`, data),
};
