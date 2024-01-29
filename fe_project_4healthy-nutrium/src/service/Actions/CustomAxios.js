import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
      'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("jwt")
  console.log('t ',token)
  req.headers.Authorization = token
  return req
}
)

export default axiosInstance


