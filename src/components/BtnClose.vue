<script setup>
function close () {
  window?.ipc?.send?.('winState:close', true)
}

</script>

<template>
  <button @mousedown="close">X</button>
</template>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #f33;
  color: white;
  border: 1px solid #333;
  border-radius: 5px;
  cursor: pointer;
}
</style>