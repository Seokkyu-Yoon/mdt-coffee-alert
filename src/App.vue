<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import BtnAlwaysOnTop from '@/components/BtnAlwaysOnTop.vue'
import BtnMove from '@/components/BtnMove.vue'
import BtnClose from '@/components/BtnClose.vue'
import BtnMembers from '@/components/BtnMembers.vue'

import MainContent from '@/components/MainContent.vue'
import CoffeeMembers from '@/components/CoffeeMembers.vue'

const dateCurrent = ref(null)
const bodyClientHeight = computed(() => window?.document?.body?.clientHeight || null)
const dateFrom = computed(() => {
  if (!dateCurrent.value) return null
  const dayCurr = dateCurrent.value?.getDay()
  return new Date(dateCurrent.value?.getFullYear(), dateCurrent.value?.getMonth(), dateCurrent.value?.getDate() - dayCurr + 1)
})
const dateTo = computed(() => {
  if (!dateFrom.value) return null
  return new Date(dateFrom.value?.getFullYear(), dateFrom.value?.getMonth(), dateFrom.value?.getDate() + 4)
})

const refMembers = ref(null)

function refresh() {
  const now = new Date()
  const tomarrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
  dateCurrent.value = now
  setTimeout(() => {
    refresh()
  }, tomarrow - now)
}

onMounted(() => {
  refresh()
  window?.ipc?.send?.('winState:resize', {
    height: 93,
    width: 270
  })
})
</script>

<template>
  <header>
    <btn-members :refMembers="refMembers"/>
    <btn-always-on-top/>
    <btn-move/>
    <btn-close/>
  </header>
  <body>
    <main-content/>
    <coffee-members ref="refMembers"/>
  </body>
</template>

<style>

body {
  position: relative;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
}
</style>


<style scoped>
header {
  display: flex;
  margin-bottom: 1px;
  justify-content: flex-end;
}
header > *:nth-child(n+2) {
  margin-left: 2px;
}
</style>
