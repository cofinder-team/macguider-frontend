import { axiosInstanceV2 } from '@/lib/axios'

export async function getDeals() {
  const response = await axiosInstanceV2.get(`/deal`)
  return response.data
}
