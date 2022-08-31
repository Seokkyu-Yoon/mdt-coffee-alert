<script setup>
import { ref, computed } from 'vue'

const dateSelected = ref(new Date())

const dateFrom = computed(() => {
  if (!dateSelected.value) return ''
  const d = new Date(dateSelected.value)
  const years = d.getFullYear()
  const months = d.getMonth()
  const dates = d.getDate() + (2 - ((d.getDay() + 1) % 7))
  return getDateYYYYMMdd(new Date(years, months, dates))
})
const dateTo = computed(() => {
  if (!dateSelected.value) return ''
  const d = new Date(dateSelected.value)
  const years = d.getFullYear()
  const months = d.getMonth()
  const dates = d.getDate() + (6 - ((d.getDay() + 1) % 7))
  return getDateYYYYMMdd(new Date(years, months, dates))
})

function getDateYYYYMMdd(date = new Date()) {
  const years = String(date.getFullYear()).padStart(4, '0')
  const months = String(date.getMonth() + 1).padStart(2, '0')
  const dates = String(date.getDate()).padStart(2, '0')
  return `${years}-${months}-${dates}`
}

function getPrevWeek(date = new Date()) {
  const years = date.getFullYear()
  const months = date.getMonth()
  const dates = date.getDate()
  return new Date(years, months, dates - 7)
}
function getNextWeek(date = new Date()) {
  const years = date.getFullYear()
  const months = date.getMonth()
  const dates = date.getDate()
  return new Date(years, months, dates + 7)
}
function toPrevWeek () {
  dateSelected.value = getPrevWeek(dateSelected.value)
}
function toNextWeek () {
  dateSelected.value = getNextWeek(dateSelected.value)
}
</script>

<template>
  <div class="main_wrap">
    <header>
      <button @click="toPrevWeek">&lt;</button>
      <span>
        {{dateFrom}} ~ {{dateTo}}
      </span>
      <button @click="toNextWeek">&gt;</button>
    </header>
    <span>담당: 윤석규</span>
  </div>
</template>

<style scoped>
.main_wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  border-radius: 3px;
  width: 250px;
  padding: 10px;
  color: #fff;
}
.main_wrap > header {
  display: flex;
  margin-bottom: 10px;
}
.main_wrap > header > span {
  margin: 0 5px;
}
.main_wrap > header > button {
  cursor: pointer;
  border: none;
  background-color: #000;
  color: #fff;
}
</style>