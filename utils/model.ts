import { axiosInstanceV2 } from '@/lib/axios'

export async function getModels(type?: ModelType): Promise<MainItemResponse[]> {
  const params = {
    ...(type && { type }),
  }

  const response = await axiosInstanceV2.get('/model', {
    params,
  })
  return response.data
}

export async function getModel(type: ModelType, id: number): Promise<MainItemResponse> {
  const response = await axiosInstanceV2.get(`/model/${type}/${id}`)
  return response.data
}
