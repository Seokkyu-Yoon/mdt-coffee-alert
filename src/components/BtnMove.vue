<script setup>
import { ref, onMounted } from 'vue'

const moving = ref(false)
const clientX = ref(null)
const clientY = ref(null)
const dX = ref(null)
const dY = ref(null)

function startMoving (e) {
  moving.value = true
  clientX.value = e.clientX
  clientY.value = e.clientY
  dX.value = null
  dY.value = null
}
function stopMoving () {
  moving.value = false
  clientX.value = null
  clientY.value = null
}

function onMove(e) {
  if (!moving.value) return
  const cb = send()
  cb(e.clientX, e.clientY)
}

function send () {
  let timer = null
  let lastClientX = null
  let lastClientY = null
  return function (x, y) {
    lastClientX = x
    lastClientY = y
    if (!timer) {
      timer = setTimeout(() => {
        const dx = lastClientX - clientX.value
        const dy = lastClientY - clientY.value
        clientX.value = lastClientX
        clientY.value = lastClientY
        window.ipc.send('winState:move', { dx, dy })
      }, 300)
    }
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', stopMoving)
})

</script>

<template>
  <button @mousedown="startMoving">M</button>
</template>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #888;
  color: white;
  border: 1px solid #333;
  border-radius: 5px;
  cursor: pointer;
}
</style>