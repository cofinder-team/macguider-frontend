import { axiosInstanceV2 } from '@/lib/axios'

export async function getDeals() {
  const response = await axiosInstanceV2.get(`/deal`)
  return response.data
}

export async function getDealRaw(id) {
  const response = await axiosInstanceV2.get(`/deal/raw/${id}`)
  return response.data
}

export async function getItems() {
  const response = await axiosInstanceV2.get(`/item`)
  return response.data
}

export async function convertDealFromRaw(id, payload) {
  const response = await axiosInstanceV2.put(`/deal/raw/${id}`, payload)
  return response.data
}
