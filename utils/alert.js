import { axiosInstanceV2 } from '@/lib/axios'

export async function getAlert() {
  const response = await axiosInstanceV2.get('/alert')
  return response.data
}

export async function createAlert(type, id, unused) {
  const response = await axiosInstanceV2.post('/alert', { type, id, unused })
  return response.data
}

export async function deleteAlert(id) {
  const response = await axiosInstanceV2.delete(`/alert/${id}`)
  return response.data
}

export async function emailDeleteAlert(uuid) {
  const response = await axiosInstanceV2.delete(`/alert/code/${uuid}`)
  return response.data
}
