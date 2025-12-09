<template>
  <div class="result-page" v-if="examStore.currentExam">
    <div class="result-content">
      <h1>Exam Finished!</h1>

      <div class="score-box">
        <div class="score-display">
          <div class="percentage">{{ Math.round(examStore.currentExam.percentage) }}%</div>
          <div class="score-text">
            {{ examStore.currentExam.score }} / {{ examStore.currentExam.total }} Correct
          </div>
        </div>
      </div>

      <div class="result-summary">
        <div class="summary-item">
          <span class="label">Mode:</span>
          <span class="value">{{ examStore.currentExam.mode === 'random' ? 'Random' : 'Question Bank' }}</span>
        </div>
        <div v-if="examStore.currentExam.subject" class="summary-item">
          <span class="label">Subject:</span>
          <span class="value">{{ capitalize(examStore.currentExam.subject) }}</span>
        </div>
        <div v-if="examStore.currentExam.year" class="summary-item">
          <span class="label">Year:</span>
          <span class="value">{{ examStore.currentExam.year }}</span>
        </div>
        <div v-if="examStore.currentExam.board" class="summary-item">
          <span class="label">Board:</span>
          <span class="value">{{ capitalize(examStore.currentExam.board) }}</span>
        </div>
      </div>

      <div class="actions">
        <button class="action-btn primary" @click="retakeExam">Retake Exam</button>
        <button class="action-btn secondary" @click="goHome">Go to Dashboard</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useExamStore } from '@/stores/exam'
import { useRouter } from 'vue-router'

const examStore = useExamStore()
const router = useRouter()

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function retakeExam() {
  examStore.resetExam()
  router.push('/mode')
}

function goHome() {
  examStore.resetExam()
  router.push('/')
}
</script>

<style scoped>
.result-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
}

.result-content {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  text-align: center;
}

h1 {
  color: #fff;
  font-size: 2.5rem;
  margin: 0;
}

.score-box {
  width: 100%;
  padding: 2rem;
  background: rgba(250, 201, 33, 0.1);
  border: 2px solid #fac921;
  border-radius: 12px;
}

.score-display {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.percentage {
  font-size: 4rem;
  font-weight: bold;
  color: #fac921;
}

.score-text {
  font-size: 1.2rem;
  color: #fff;
}

.result-summary {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #333;
  border-radius: 6px;
  color: #fff;
}

.label {
  font-weight: 600;
  color: #fac921;
}

.value {
  text-align: right;
}

.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-btn {
  padding: 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn.primary {
  background: #fac921;
  color: #000;
}

.action-btn.primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.action-btn.secondary {
  background: #333;
  color: #fff;
  border: 1px solid #555;
}

.action-btn.secondary:hover {
  border-color: #fac921;
  background: #3a3a3a;
}
</style>
