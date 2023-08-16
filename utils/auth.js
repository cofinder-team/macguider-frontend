import { axiosInstanceV2 } from '@/lib/axios'

export async function login(email, password) {
  const response = await axiosInstanceV2.post(`/auth/login`, { email, password })
  return response.data
}

export async function register(email, password) {
  const response = await axiosInstanceV2.post(`/auth/register`, { email, password })
  return response.data
}

export async function refresh(refreshToken) {
  const response = await axiosInstanceV2.post(`/auth/refresh`, { refreshToken })
  return response.data
}

export async function logout() {
  const response = await axiosInstanceV2.post(`/auth/logout`)
  return response.data
}

export async function certificate(uuid) {
  const response = await axiosInstanceV2.post(`/auth/certificate`, {
    uuid,
  })
  return response.data
}

export async function resendEmail(email) {
  const response = await axiosInstanceV2.post(`/auth/resend`, {
    email,
  })

  return response.data
}
