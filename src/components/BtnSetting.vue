<script setup>
import { defineProps, computed, ref } from 'vue'

const props = defineProps({
  refMembers: Object
})

const refMembers = computed(() => props?.refMembers || null)
const activate = ref(false)

function toggle () {
  activate.value = !activate.value
  refMembers.value?.setVisible?.(activate.value)
}

</script>
  
<template>
  <button :class="activate && 'activate'" @click="toggle">S</button>
</template>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #338;
  color: white;
  border: 1px solid #333;
  border-radius: 5px;
  cursor: pointer;
}
button.activate {
  background-color: #38f;
  color: #333;
}
</style>