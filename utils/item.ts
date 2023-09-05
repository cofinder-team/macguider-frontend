import { axiosInstanceV2 } from '@/lib/axios'

export async function getItems(type?: ModelType, model?: number): Promise<ItemResponse[]> {
  const params = {
    ...(type && { type }),
    ...(model && { model }),
  }

  const response = await axiosInstanceV2.get(`/item`, {
    params,
  })
  return response.data
}

export async function getItem(type: ModelType, id: number): Promise<ItemResponse> {
  const response = await axiosInstanceV2.get(`/item/${type}/${id}`)
  return response.data
}
