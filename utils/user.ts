import { axiosInstanceV2 } from '@/lib/axios'

export async function getAuthUser(): Promise<AuthUser> {
  const response = await axiosInstanceV2.get<AuthUser>(`/user/auth`)
  return response.data
}

export async function sendSubscribeByUuid(uuid: string): Promise<void> {
  const response = await axiosInstanceV2.post<void>(`/user/subscribe/${uuid}`)
  return response.data
}

export async function sendSubscribeByEmail(email: string): Promise<void> {
  const response = await axiosInstanceV2.post<void>(`/user/subscribe`, { email })
  return response.data
}
