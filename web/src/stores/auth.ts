import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(sessionStorage.getItem('token'))
  const isAuthenticated = computed(() => token.value !== null)
  const TOKEN_KEY = 'auth_token'
  function setToken(value: string | null) {
    token.value = value
    if (value) {
      sessionStorage.setItem(TOKEN_KEY, value)
    } else {
      sessionStorage.removeItem(TOKEN_KEY)
    }
  }

  function logout() {
    setToken(null)
  }

  return { token, isAuthenticated, setToken, logout }
})
