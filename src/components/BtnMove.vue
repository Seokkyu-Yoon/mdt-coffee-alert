<script setup>
import { ref, onMounted } from 'vue'

const moving = ref(false)
const clientX = ref(null)
const clientY = ref(null)

function startMoving (e) {
  moving.value = true
  clientX.value = e.clientX
  clientY.value = e.clientY
}
function stopMoving () {
  moving.value = false
  clientX.value = null
  clientY.value = null
}

function onMove(e) {
  if (!moving.value) return
  window?.ipc?.send?.('winState:move', {
    clientX: clientX.value,
    clientY: clientY.value,
  })
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