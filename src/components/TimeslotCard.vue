<script setup lang="ts">
import { defineEmits, computed } from 'vue';
import type { TimeslotInterface } from '@/interfaces/TimeslotInterface';
import type { DaysInterface } from '@/interfaces/DaysInterface';
import type { TaskInterface } from '@/interfaces/Task';

const props = defineProps<{
  task?: TaskInterface;
  timeslot?: TimeslotInterface;
  upcomingDay?: DaysInterface;
  getTaskForTimeslot?: (day: DaysInterface, slot: TimeslotInterface) => TaskInterface | undefined;
}>();

const emit = defineEmits<{
  (event: 'open-edit-screen', task: TaskInterface): void;
  (event: 'complete-task', task: TaskInterface, checked: boolean): void;
  (event: 'delete-task', task: TaskInterface): void;
}>();

const task = computed(() => props.task);

const hasTask = computed(() => !!task.value);

const taskTitle = computed(() => task.value ? task.value.title : 'Available');

const handleCardClick = () => {
  if (task.value) {
    emit('open-edit-screen', task.value);
  }
};

const handleDeleteClick = () => {
  if (task.value) {
    emit('delete-task', task.value);
  }
};

const handleCheckboxChange = (event: Event) => {
  if (task.value) {
    const target = event.target as HTMLInputElement;
    emit('complete-task', task.value, target.checked);
  }
};
</script>

<template>
  <div class="card text-bg-light mb-2">
    <div class="card-body d-flex justify-content-between align-items-center"
         :class="{ 'text-bg-primary': hasTask }">
      <span @click="handleCardClick" class="w-100">{{ timeslot?.time }} - {{ taskTitle }}</span>
      <div class="d-flex gap-2" v-if="hasTask">
        <input type="checkbox" :checked="task?.completed" @change="handleCheckboxChange" />
        <button class="btn-close" data-bs-toggle="tooltip"
                data-bs-title="Click this if you're sure to delete it" @click="handleDeleteClick"></button>
      </div>
    </div>
  </div>
</template>
