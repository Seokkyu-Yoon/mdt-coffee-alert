<script setup>
import { ref, computed, onMounted } from 'vue'

import BtnAlwaysOnTop from '@/components/BtnAlwaysOnTop.vue'
import BtnMove from '@/components/BtnMove.vue'
import BtnClose from '@/components/BtnClose.vue'

const dateCurrent = ref(null)
const dateFrom = computed(() => {
  if (!dateCurrent.value) return null
  const dayCurr = dateCurrent.value?.getDay()
  return new Date(dateCurrent.value?.getFullYear(), dateCurrent.value?.getMonth(), dateCurrent.value?.getDate() - dayCurr + 1)
})
const dateTo = computed(() => {
  if (!dateFrom.value) return null
  return new Date(dateFrom.value?.getFullYear(), dateFrom.value?.getMonth(), dateFrom.value?.getDate() + 4)
})

function getYYYYMMDD (date = new Date()) {
  if (!date) return ''
  const years = String(date.getFullYear()).padStart(4, '0')
  const months = String(date.getMonth() + 1).padStart(2, '0')
  const dates = String(date.getDate()).padStart(2, '0')
  return `${years}년 ${months}월 ${dates}일`
}
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
})
</script>

<template>
  <header>
    <btn-always-on-top/>
    <btn-move/>
    <btn-close/>
  </header>
  <body>
    <span>
      {{getYYYYMMDD(dateFrom)}} ~ {{getYYYYMMDD(dateTo)}}
    </span>
  </body>
</template>

<style>
html {
  display: flex;
  width: 100%;
  height: 100%;
  color: #fff;
}

body {
  position: relative;
  flex: 1;
  margin: 0;
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
body {
  border-radius: 3px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
