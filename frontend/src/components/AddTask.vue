<script setup lang="ts">
import { ref } from 'vue';
import { createTask } from '@/services/taskService';

const title = ref('');
const description = ref('');


const addTask = async (event: Event) => {
    console.log("addTask");
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const title = (target.querySelector('#title') as HTMLInputElement).value;
    const description = (target.querySelector('#description') as HTMLInputElement).value;
    await createTask(title, description);
};
</script>

<template>
    <div class="box">
        <h2>Ajouter une tâche</h2>
        <form @submit.prevent="addTask" class="space-y-4">
            <label for="title">Titre de la tâche</label>
            <input v-model="title" id="title" type="text" placeholder="Entrez le titre" />

            <label for="description">Description de la tâche</label>
            <input v-model="description" id="description" type="text" placeholder="Entrez le description"/>

            <button type="submit">Ajouter</button>
        </form>
    </div>
</template>

<style>
.box {
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

input {
    width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
}
</style>