<script setup lang="ts">
import AddTask from './components/AddTask.vue';
import TaskList from './components/TaskList.vue'


</script>

<template>
  <header>Gestion des tâches</header>
  <main>
    <TaskList />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex: 5px;
}
</style>
