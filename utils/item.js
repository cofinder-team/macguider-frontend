import { axiosInstanceV2 } from '@/lib/axios'

export async function getItem(type, model) {
  const params = {
    ...(type && { type }),
    ...(model && { model }),
  }

  const response = await axiosInstanceV2.get(`/item`, {
    params,
  })
  return response.data
}
