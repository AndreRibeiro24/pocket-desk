<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LoginResponseSchema } from '@pocketdesk/shared'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const pin = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function submit() {
  error.value = null
  loading.value = true
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        pin: pin.value,
      }),
    })
    if (response.status === 401) {
      error.value = 'Wrong PIN'
      pin.value = ''
      return
    }
    if (response.status === 429) {
      error.value = 'Exceed maximum tries. Please await a few moments.'
      return
    }

    if (!response.ok) {
      error.value = `Unexpected error (${response.status})`
      return
    }
    const result = LoginResponseSchema.safeParse(await response.json())
    if (!result.success) {
      console.error('Invalid login response:', result.error)
      error.value = 'Invalide response from server'
      return
    }
    auth.setToken(result.data.token)
    await router.push('/')
  } catch {
    error.value = 'Could not reach the server'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="login">
    <h1>PocketDesk</h1>
    <form @submit.prevent="submit">
      <label for="pin">PIN</label>
      <input id="pin" v-model="pin" type="password" autocomplete="current-password" required />
      <button type="submit" :disabled="loading || pin.length === 0">
        {{ loading ? 'Signing in ...' : 'Sign in' }}
      </button>
      <p v-if="error" role="alert">{{ error }}</p>
    </form>
  </main>
</template>
