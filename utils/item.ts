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

export async function getItem<T extends ItemResponse>(type: ModelType, id: number): Promise<T> {
  const response = await axiosInstanceV2.get(`/item/${type}/${id}`)
  return response.data
}
