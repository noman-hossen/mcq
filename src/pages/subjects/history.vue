<template>
  <div class='history-page'>
    <h1>History</h1>
    <div v-if='!history.length'>No past exams yet.</div>
    <ul v-else>
      <li v-for='item in history' :key='item.id'>
        <div class='row'>
          <div class='title'>{{ formatTitle(item.subject) }}  {{ item.year }} — {{ formatTitle(item.board) }}</div>
          <div class='score'>{{ item.score }} / {{ item.total }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useExamStore } from '@/stores'

const examStore = useExamStore()
const history = computed(() => examStore.history || [])

function formatTitle(s) {
  if (!s) return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
</script>

<style scoped>
.history-page { padding:1rem }
.row { display:flex; justify-content:space-between; padding:0.5rem 0; border-bottom:1px solid #eee }
.title { font-weight:600 }
.score { color:#333 }
</style>
