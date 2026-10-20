<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { HealthResponse } from '@pocketdesk/shared'
import { HealthResponseSchema } from '@pocketdesk/shared'

const health = ref<HealthResponse | null>(null)
const error = ref<string | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/api/health')

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }

    const result = HealthResponseSchema.safeParse(await response.json())

    if (!result.success) {
      console.error('Invalid health response:', result.error)
      throw new Error('Invalid response from server')
    }
    health.value = result.data
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Unexpected error!'
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="health-container">
    <h2>System Health</h2>
    <!--If System Status is Loading-->
    <div v-if="loading" class="status-loading">
      <p>Verifying API Status</p>
    </div>

    <!--If System Status is Error-->
    <div v-else-if="error" class="status-error">
      <p>Data Loading was not possible due to server error:</p>
      <small>{{ error }}</small>
    </div>
    <div></div>
    <!--If System Status is Ok-->
    <div v-else-if="health" class="status-healthy">
      <p>
        Connection Established! Status: {{ health.status }} - Uptime:
        {{ Math.round(health.uptime) }}s
      </p>
    </div>
  </div>
</template>
