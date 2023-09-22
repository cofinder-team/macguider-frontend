import axios from 'axios'

export const axiosInstanceV2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_V2,
})
