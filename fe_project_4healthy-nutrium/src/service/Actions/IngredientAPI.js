import axiosInstance from "./CustomAxios";
const IngredientAPI = {
  getAll(data) {
    const url = `/ingredient`;
    return axiosInstance.get(url);
  },

  getById(id) {
    const url = `/ingredient/` + id;
    return axiosInstance.get(url);
  },

  add(data) {
    const url = `/ingredient`;
    return axiosInstance.post(url, data);
  },

  update(data) {
    const url = `/ingredient/` + data.id;
    return axiosInstance.post(url, data);
  },

  changeStatus(id) {
    const url = `/ingredient/` + id + `/changeStatus`;
    return axiosInstance.post(url);
  },

  searchActive(data) {
    const url = `/ingredient/search-active`;
    return axiosInstance.post(url,data);
  },

  getActive() {
    const url = `/ingredient/active`;
    return axiosInstance.get(url);
  },
};
export default IngredientAPI;
