<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SystemInfoSchema } from '@pocketdesk/shared'
import type { SystemInfo } from '@pocketdesk/shared'
import { apiFetch } from '@/api'

const info = ref<SystemInfo | null>(null)
const error = ref<string | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await apiFetch('/api/system/info')

    if (response.status === 401) return
    if (!response.ok) {
      error.value = `Unexpected Error (${response.status})`
      return
    }

    const result = SystemInfoSchema.safeParse(await response.json())
    if (!result.success) {
      console.error('Invalid response: ', result.error)
      error.value = 'Invalid server response'
      return
    }
    info.value = result.data
  } catch {
    error.value = 'Could not reach the server'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="system-info">
    <h2>System</h2>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="info">{{ info.hostname }} ({{ info.platform }})</p>
  </div>
</template>
