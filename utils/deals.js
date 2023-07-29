import { axiosInstanceV2 } from '@/lib/axios'

export async function getDeals(
  page = 1,
  size = 10,
  sort = 'date',
  direction = 'desc',
  type,
  model
) {
  const optionalParams = type && model ? { type, model } : {}

  let { data: deals } = await axiosInstanceV2.get(`/deal`, {
    params: {
      page,
      size,
      sort,
      direction,
      ...optionalParams,
    },
  })

  return deals
}

export async function getDealRaw(id) {
  const response = await axiosInstanceV2.get(`/deal/raw/${id}`)
  return response.data
}

export async function getDeal(id) {
  const response = await axiosInstanceV2.get(`/deal/${id}`)
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

export async function reportDeal(id, payload) {
  const response = await axiosInstanceV2.put(`/deal/${id}`, payload)
  return response.data
}

export async function getItemPrice(type, itemId, unused) {
  const response = await axiosInstanceV2.get(`/price/deal/${type}/${itemId}?unused=${unused}`)
  return response.data
}
