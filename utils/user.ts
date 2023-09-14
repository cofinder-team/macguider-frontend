import { axiosInstanceV2 } from '@/lib/axios'

export async function getAuthUser(): Promise<AuthUser> {
  const response = await axiosInstanceV2.get<AuthUser>(`/user/auth`)
  return response.data
}
