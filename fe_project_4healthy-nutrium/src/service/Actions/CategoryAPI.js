import axiosInstance from "./CustomAxios";
const CategoryAPI = {
  getAll() {
    const url = `/category`;
    return axiosInstance.get(url);
  },

  getById(id) {
    const url = `/category/` + id;
    return axiosInstance.get(url);
  },

  getActive() {
    const url = `/category/active`;
    return axiosInstance.get(url);
  },
};
export default CategoryAPI;
