import axiosInstance from "./CustomAxios";


const JobAPI = {
  
  getAll(data) {
    const url = `/job`;
    return axiosInstance.get(url);
  }

}
export default JobAPI