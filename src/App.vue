<script setup>
import { ref, onMounted } from 'vue'
import BtnMove from '@/components/BtnMove.vue'

const selectedDate = ref(null)

function refresh() {
  const now = new Date()
  const tomarrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
  selectedDate.value = now
  setTimeout(() => {
    refresh()
  }, tomarrow - now)
}

onMounted(() => {
  refresh()
})
</script>

<template>
  <header>
    <btn-move/>
  </header>
  {{selectedDate}}
</template>

<style>
</style>
