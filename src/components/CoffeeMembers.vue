<script setup>
import { ref, defineExpose } from 'vue'

const visible = ref(false)

function setVisible(v) {
  visible.value = !!v
  window?.ipc?.send?.('winState:resize', {
    height: 93 + (visible.value ? 400 : 0)
  })
}

defineExpose({
  setVisible
})
</script>

<template>
  <div class="member_wrap" v-if="visible">
    <p>윤석규</p>
    <p>윤석규</p>
    <p>윤석규</p>
    <p>윤석규</p>
    <p>윤석규</p>
    <p>윤석규</p>
  </div>
</template>

<style scoped>
.member_wrap {
  border-top: 1px solid #fff;
}
</style>
