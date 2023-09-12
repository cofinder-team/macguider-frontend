import optionsIpad from '@/data/options/ipad'
import optionsMac from '@/data/options/mac'
import { axiosInstanceV2 } from '@/lib/axios'

export const getAppleProductInfo = (id: string, optionId: number, category: ModelType): Item => {
  const target: Model[] = category === 'M' ? optionsMac : optionsIpad

  const product = target
    .find((e) => e.id === id)
    ?.data.find((spec) => spec.options.map((option) => option.id).includes(optionId)) as Item

  return product
}

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
