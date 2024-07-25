<script setup lang="ts">
import { ref } from 'vue';
import { getDays } from '@/composables/getDays';  
import { Task } from '@/states/TaskState';
import type { DaysInterface } from '@/interfaces/DaysInterface';
import type { TaskInterface } from '@/interfaces/Task';

const task = new Task();

const upcomingDays = ref<DaysInterface[]>(getDays());
const tasks = ref<TaskInterface[]>(await task.all());

</script>

<template>
  <main class="container-fluid mt-5">
    <div class="row">
      <div class="col-2">
        <div class="card">
          <div class="card-header">
            Tasks
          </div>
          <div class="card-body">

          </div>
        </div>
      </div>
      <div class="col-2" v-for="(upcomingDay, index) in upcomingDays" :key="index">
        <div class="card">
          <div class="card-header">
            {{ upcomingDay.name }}
          </div>
          <div class="card-body">

          </div>
        </div>
      </div>
    </div>
  </main>
</template>
