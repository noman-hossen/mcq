<template>
  <div class='mode-page'>
    <h1>Choose Exam Mode</h1>
    <div class='actions'>
      <Btn2 text='Question Bank Exam' @click='openBank' />
      <Btn2 text='Random Exam' @click='openRandom' />
    </div>
  </div>
</template>

<script>
import Btn2 from '@/components/Btn2.vue'
import { useRouter } from 'vue-router'
export default {
  name: 'ExamMode',
  components: { Btn2 },
  setup() {
    const router = useRouter()
    function openBank() { router.push('/subjects') }
    function openRandom() { router.push('/exam/random/setup') }
    return { openBank, openRandom }
  }
}
</script>

<style scoped>
.mode-page { display:flex; flex-direction:column; gap:1rem; padding:2rem; align-items:center; }
.actions { display:flex; gap:1rem }
</style>
