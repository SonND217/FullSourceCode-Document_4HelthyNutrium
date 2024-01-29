import axiosInstance from "./CustomAxios";

const DietInfoAPI = {

  getDietOptions(data) {
    const url = `/diet/options`;
    return axiosInstance.post(url,data);
  },
  
  save(data) {
    const url = `/diet`;
    return axiosInstance.post(url,data);
  },

  getByUserID(uid) {
    const url = `/diet/` +uid;
    return axiosInstance.get(url);
  }

}
export default DietInfoAPI