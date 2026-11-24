<script setup lang="ts">
import HealthStatus from '@/components/HealthStatus.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

async function logout() {
  auth.logout()
  await router.push('/login')
}
</script>

<template>
  <HealthStatus />
  <button type="button" @click="logout">Log out</button>
</template>
