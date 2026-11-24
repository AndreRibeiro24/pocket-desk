import router from '@/router'
import { useAuthStore } from '@/stores/auth'

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const auth = useAuthStore()

  const headers = new Headers(init.headers)
  if (auth.token) {
    headers.set('Authorization', `Bearer ${auth.token}`)
  }

  const response = await fetch(path, { ...init, headers })

  if (response.status === 401) {
    auth.logout()
    await router.push('/login')
  }

  return response
}
