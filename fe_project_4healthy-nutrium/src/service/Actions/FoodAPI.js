import axiosInstance from "./CustomAxios";

const FoodAPI = {
  getAll(data) {
    const url = `/food`;
    return axiosInstance.get(url);
  },

  getById(id) {
    const url = `/food/`+id;
    return axiosInstance.get(url);
  },

  add(food) {
    const url = `/food`;
    return axiosInstance.post(url,food);
  },

  update(food) {
    const url = `/food/`+food.id;
    return axiosInstance.post(url,food);
  },

  changeStatus(id) {
    const url = `/food/`+id+`/changeStatus`;
    return axiosInstance.post(url);
  },

  search(data) {
    const url = `/food/search`;
    return axiosInstance.post(url,data);
  },

  searchActive(data) {
    const url = `/food/search-active`;
    return axiosInstance.post(url,data);
  },

  getActive() {
    const url = `/food/active`;
    return axiosInstance.get(url);
  },
};
export default FoodAPI;
