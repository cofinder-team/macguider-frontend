import { axiosInstanceV2 } from '@/lib/axios'

export async function getDeals(
  page = 1,
  size = 10,
  sort = 'date',
  direction = 'desc',
  type?: ModelType,
  model?: number,
  source?: Source
): Promise<DealResponse[]> {
  const optionalParams: {
    type?: ModelType
    model?: number
    source?: Source
  } = {
    ...(type && { type }),
    ...(model && { model }),
    ...(source && { source }),
  }

  const { data: deals } = await axiosInstanceV2.get(`/deal`, {
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

// will be deprecated
export async function getDealRaw(id: number) {
  const response = await axiosInstanceV2.get(`/deal/raw/${id}`)
  return response.data
}

export async function getDeal(id: number): Promise<DealOriginResponse> {
  const response = await axiosInstanceV2.get(`/deal/${id}/origin`)
  return response.data
}

// will be deprecated
export async function getItems() {
  const response = await axiosInstanceV2.get(`/item`)
  return response.data
}

// will be deprecated
export async function convertDealFromRaw(id, payload) {
  const response = await axiosInstanceV2.put(`/deal/raw/${id}`, payload)
  return response.data
}

export async function reportDeal(id: number, payload: DealManageRequest): Promise<void> {
  const response = await axiosInstanceV2.patch(`/deal/${id}`, payload)
  return response.data
}

// will be deprecated
export async function getItemPrice(type, itemId, unused) {
  const response = await axiosInstanceV2.get(
    `/price/trade/${type}/${itemId}/recent?unused=${unused}`
  )
  return response.data
}
