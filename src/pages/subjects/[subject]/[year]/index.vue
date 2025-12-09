<template>
  <div class="board-page">
    <header class="page-header">
      <button class="back-btn" @click="goBack">← Back</button>
      <h1>Select Board</h1>
      <div class="spacer"></div>
    </header>

    <div class="page-content">
      <div class="boards-grid">
        <button
          v-for="board in boards"
          :key="board"
          class="board-btn"
          @click="selectBoard(board)"
        >
          {{ formatBoard(board) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { useExamStore } from '@/stores/exam'

export default {
  name: 'BoardPage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const examStore = useExamStore()

    const boards = ['barisal', 'chittagong', 'comilla', 'dhaka', 'dinajpur', 'jessore', 'mymensingh', 'rajshahi', 'sylhet']
    const subject = route.params.subject
    const year = route.params.year

    function selectBoard(board) {
      examStore.loadQuestions({
        mode: 'bank',
        subject,
        year,
        board,
      })
      router.push('/exam/bank')
    }

    function formatBoard(board) {
      return board.charAt(0).toUpperCase() + board.slice(1)
    }

    return {
      boards,
      selectBoard,
      formatBoard,
      goBack: () => router.back(),
    }
  },
}
</script>

<style scoped>
.board-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #333;
}

.back-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
}

.back-btn:hover {
  opacity: 0.7;
}

h1 {
  flex: 1;
  text-align: center;
  margin: 0;
}

.spacer {
  width: 40px;
}

.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.boards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.board-btn {
  padding: 1.5rem;
  background: #333;
  border: 1px solid #555;
  color: #fff;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.board-btn:hover {
  background: #444;
  border-color: #fac921;
}

@media (max-width: 600px) {
  .boards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
