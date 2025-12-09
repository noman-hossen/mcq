<template>
  <div class='subjects-page'>
    <h1>Choose Subject</h1>
    <ul>
      <li v-for='s in subjects' :key='s'>
        <router-link :to='/subjects/'>{{ formatTitle(s) }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SubjectsIndex',
  setup() {
    const subjects = ['botany', 'chemistry', 'math', 'physics', 'zoology']
    function formatTitle(s) {
      return s.charAt(0).toUpperCase() + s.slice(1)
    }
    return { subjects, formatTitle }
  }
}
</script>

<style scoped>
.subjects-page { padding: 1rem }
ul { list-style: none; padding: 0 }
li { margin: 0.5rem 0 }
</style>
