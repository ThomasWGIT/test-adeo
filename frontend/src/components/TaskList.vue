<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTasks, updateTask, deleteTask, type Task, createTask } from '@/services/taskService';

const title = ref('');
const description = ref('');

const addTask = async (event: Event) => {
    console.log("addTask");
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const taskTitle = (target.querySelector('#title') as HTMLInputElement).value;
    const taskDescription = (target.querySelector('#description') as HTMLInputElement).value;
    await createTask(taskTitle, taskDescription);
    title.value = '';
    description.value = '';
    fetchTasks();
};

const tasks = ref<Task[]>([]);

const fetchTasks = async () => {
  tasks.value = await getTasks();
};

const changeStatus = async (task: Task, newStatus: Task['status']) => {
  await updateTask(task._id, newStatus);
  fetchTasks();
};

const removeTask = async (id: string) => {
  await deleteTask(id);
  fetchTasks();
};

onMounted(fetchTasks);

</script>

<template>
  <main class="">
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
    <div class="">
      <div v-for="task in tasks" :key="task._id" class="">
        <div class="">
          <div>
            <h3 class="font-semibold">{{ task.title }}</h3>
            <p>{{ task.description }}</p>
            <p>{{ task.status }}</p>
          </div>

          <!-- Select for changing status -->
          <select 
            v-model="task.status" 
            @change="changeStatus(task, task.status)" 
            class="">
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>

          <button @click="removeTask(task._id)" class="">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
    top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

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
</style>
