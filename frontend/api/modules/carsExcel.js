import useFetcher from "../../utils/fetch";

export default {
  //   get: async ({ id, params }) => useFetcher().get(`/cars-excel/${id}`, params),
  //   delete: async ({ id, params }) => useFetcher().delete(`/cars-excel/${id}`, params),
  //   update: async ({ id, data, params }) =>
  //     useFetcher().patch(`/cars-excel/${id}`, data, params),
  //   getAll: async ({ params = {} } = {}) => useFetcher().get(`/cars-excel`, params),
  updatePrices: async ({ data }) => useFetcher().post(`/cars-excel`, data),
};
