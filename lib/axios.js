import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const axiosInstanceV2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V2,
})

export default axiosInstance
