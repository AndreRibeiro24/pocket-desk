<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HealthStatus from '@/components/HealthStatus.vue'
import SystemInfo from '@/components/SystemInfo.vue'

const auth = useAuthStore()
const router = useRouter()

async function logout() {
  auth.logout()
  await router.push('/login')
}
</script>

<template>
  <HealthStatus />
  <SystemInfo />
  <button type="button" @click="logout">Log out</button>
</template>
