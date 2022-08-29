<script setup>
import { ref } from 'vue'

const activate = ref(false)

function toggle () {
  activate.value = !activate.value
  window?.ipc?.send?.('winState:alwaysOnTop', activate.value)
}

</script>
  
<template>
  <button :class="activate && 'activate'" @click="toggle">T</button>
</template>
  
<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #883;
  color: white;
  border: 1px solid #333;
  border-radius: 5px;
  cursor: pointer;
}
button.activate {
  background-color: #38f;
}
</style>