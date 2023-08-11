import { axiosInstanceV2 } from '@/lib/axios'

export async function getAuthUser() {
  const response = await axiosInstanceV2.get(`/user/auth`)
  return response.data
}
