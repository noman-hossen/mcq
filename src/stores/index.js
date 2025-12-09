import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useExamStore = defineStore('exam', () => {
  // Exam session state
  const currentExam = ref(null)
  const questions = ref([])
  const answers = ref({})
  const history = ref(JSON.parse(localStorage.getItem('examHistory') || '[]'))

  // Exam configuration
  const examConfig = ref({
    mode: null, // 'random' | 'bank'
    subject: null,
    year: null,
    board: null,
    questionCount: null,
    shuffleAnswers: false,
  })

  const currentQuestionIndex = ref(0)

  const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
  const totalQuestions = computed(() => questions.value.length)
  const progress = computed(() => ({
    current: currentQuestionIndex.value + 1,
    total: totalQuestions.value,
    percentage: ((currentQuestionIndex.value + 1) / totalQuestions.value) * 100,
  }))

  // Load questions for exam
  async function loadQuestions(config) {
    examConfig.value = config
    try {
      if (config.mode === 'random') {
        await loadRandomQuestions(config.questionCount)
      } else {
        await loadBankQuestions(config.subject, config.year, config.board)
      }
    } catch (error) {
      console.error('Failed to load questions:', error)
    }
  }

  async function loadBankQuestions(subject, year, board) {
    try {
      const response = await fetch(`/questions/${subject}/${year}/${board}.json`)
      const data = await response.json()
      questions.value = data.questions || []
    } catch (error) {
      console.error('Failed to load questions:', error)
      questions.value = []
    }
  }

  async function loadRandomQuestions(count = null) {
    try {
      const subjects = ['botany', 'chemistry', 'math', 'physics']
      const years = ['2021', '2022', '2023', '2024', '2025']
      const boards = [
        'barisal',
        'chittagong',
        'comilla',
        'dhaka',
        'dinajpur',
        'jessore',
        'mymensingh',
        'rajshahi',
        'sylhet',
      ]

      let allQuestions = []

      for (const subject of subjects) {
        for (const year of years) {
          for (const board of boards) {
            try {
              const response = await fetch(`/questions/${subject}/${year}/${board}.json`)
              const data = await response.json()
              allQuestions = allQuestions.concat(data.questions || [])
            } catch {
              // Skip missing files
            }
          }
        }
      }

      // Shuffle and limit
      allQuestions = allQuestions.sort(() => Math.random() - 0.5)
      questions.value = count ? allQuestions.slice(0, count) : allQuestions
    } catch (error) {
      console.error('Failed to load random questions:', error)
      questions.value = []
    }
  }

  function nextQuestion() {
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++
    }
  }

  function previousQuestion() {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--
    }
  }

  function goToQuestion(index) {
    if (index >= 0 && index < totalQuestions.value) {
      currentQuestionIndex.value = index
    }
  }

  function selectAnswer(questionIndex, answer) {
    answers.value[questionIndex] = answer
    localStorage.setItem(`exam-answers-${Date.now()}`, JSON.stringify(answers.value))
  }

  function calculateScore() {
    let correct = 0
    questions.value.forEach((q, idx) => {
      if (answers.value[idx] === q.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: questions.value.length,
      percentage: (correct / questions.value.length) * 100,
    }
  }

  function saveExamResult() {
    const score = calculateScore()
    const result = {
      id: Date.now(),
      mode: examConfig.value.mode,
      subject: examConfig.value.subject,
      year: examConfig.value.year,
      board: examConfig.value.board,
      score: score.correct,
      total: score.total,
      percentage: score.percentage,
      date: new Date().toISOString(),
      answers: answers.value,
    }

    history.value.push(result)
    localStorage.setItem('examHistory', JSON.stringify(history.value))
    currentExam.value = result

    return result
  }

  function resetExam() {
    currentExam.value = null
    questions.value = []
    answers.value = {}
    currentQuestionIndex.value = 0
    examConfig.value = {}
  }

  return {
    // State
    currentExam,
    questions,
    answers,
    history,
    examConfig,
    currentQuestionIndex,
    // Computed
    currentQuestion,
    totalQuestions,
    progress,
    // Methods
    loadQuestions,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    selectAnswer,
    calculateScore,
    saveExamResult,
    resetExam,
  }
})
