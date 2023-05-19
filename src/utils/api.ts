import axios from 'axios'

export const axiosInstance = axios.create({
  // baseURL: `${process.env.API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err)
  }
)

export const setApiBearerToken = (token: string) => {
  if (token) {
    if (typeof window !== 'undefined') {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
    }
  } else {
    delete axiosInstance.defaults.headers.common['Authorization']
    delete axiosInstance.defaults.headers['Authorization']
  }
}
