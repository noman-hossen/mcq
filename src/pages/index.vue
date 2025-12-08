<template>
  <div class="home">
    <HomeTxt />
    <Btn1 text="Start Exam" to="/mode" />
    <Btn1 text="View Scores" />
  </div>
</template>

<script>
// @ is an alias to /src
import Btn1 from "@/components/Btn1.vue";
import HomeTxt from "@/components/HomeTxt.vue";
export default {
  name: "home",
  components: {
    HomeTxt,
    Btn1,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
</style>
