<template>
  <div class="mode-page">
    <h1>Choose Mode</h1>
    <p>Select a mode to start the exam.</p>

    <div class="actions">
      <Btn2 text="Chapter Mode" to="/mode" />
      <Btn2 text="Random Mode" to="/mode/random/setup" />
    </div>
  </div>
</template>

<script>
import Btn2 from '@/components/Btn2.vue'
export default {
  name: 'ModePage',
  components: {
    Btn2,
  },
}
</script>

<style scoped>
.mode-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  align-items: center;
}
.actions {
  display: flex;
  gap: 1rem;
}
</style>
