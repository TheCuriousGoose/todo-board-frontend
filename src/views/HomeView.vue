<script setup lang="ts">
import { ref, computed } from 'vue';
import { getDays } from '@/composables/getDays';
import { Task } from '@/states/TaskState';
import type { DaysInterface } from '@/interfaces/DaysInterface';
import type { TaskInterface } from '@/interfaces/Task';
import { Timeslot } from '@/states/TimeslotState';
import type { TimeslotInterface } from '@/interfaces/TimeslotInterface';
import EditTask from '@/components/EditTask.vue';
import CreateTask from '@/components/CreateTask.vue';
import TimeslotCard from '@/components/TimeslotCard.vue';
import { Modal } from 'bootstrap';

const taskService = new Task();
const timeslotService = new Timeslot();

const upcomingDays = ref<DaysInterface[]>(getDays());
const tasks = ref<TaskInterface[]>(await taskService.all());
const availableTimes = ref<TimeslotInterface[]>(await timeslotService.all());


const completedTasks = computed(() => tasks.value.filter(task => task.completed));
const todoTasks = computed(() => tasks.value.filter(task => !task.completed && task.due_date == null));

const editTask = ref<Partial<TaskInterface>>({});

// Helper function to format date for input
function formatDateForInput(date: Date | string | null | undefined): string {
  if (!date) return '';

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Retrieve task for a given day and timeslot
function getTaskForTimeslot(day: DaysInterface, timeslot: TimeslotInterface): TaskInterface | undefined {
  return tasks.value.find(task => {
    const taskDate = new Date(task.due_date ?? 0).toDateString();
    const dayDate = new Date(day.date).toDateString();

    return taskDate === dayDate && task.timeslot_id === timeslot.id && task.completed == false;
  });
}

function closeModals() {
  let modalIds = ['editTaskModal', 'createTaskModal'];

  modalIds.forEach((id) => {
    let modal = new Modal(`#${id}`);
    modal.hide();
  })
}

const completeTask = async (taskToComplete: TaskInterface, checked: boolean) => {
  closeModals();

  await taskService.update({ completed: checked }, taskToComplete.id ?? 0);
  taskToComplete.completed = checked;

  tasks.value = await taskService.all();
};

// Handle editing screen
function openEditScreen(task: TaskInterface) {
  editTask.value = {
    ...task,
    due_date: formatDateForInput(task.due_date)
  };

  let modal = new Modal('#editTaskModal');
  modal.show();
}

async function handleSaveTask(task: TaskInterface) {
  editTask.value = {};

  if (task.id) {
    await taskService.update(task, task.id);
  } else {
    // Create new task
    await taskService.create(task);
  }
  tasks.value = await taskService.all();
}

async function deleteTask(task: TaskInterface) {
  await taskService.delete(task.id ?? 0);

  tasks.value = await taskService.all();
}
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
            <div class="card mb-2">
              <div class="card-header">
                TODO
              </div>
              <div class="card-body">
                <TimeslotCard v-for="task in todoTasks" :key="task.id" :task="task" @open-edit-screen="openEditScreen"
                  @complete-task="completeTask" @delete-task="deleteTask" />
              </div>
            </div>
            <div class="card">
              <div class="card-header">
                Done
              </div>
              <div class="card-body">
                <TimeslotCard v-for="task in completedTasks" :key="task.id" :task="task"
                  @open-edit-screen="openEditScreen" @complete-task="completeTask" @delete-task="deleteTask" />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTaskModal">
              Create Task
            </button>
          </div>
        </div>
      </div>
      <div class="col-2" v-for="(upcomingDay, index) in upcomingDays" :key="index">
        <div class="card">
          <div class="card-header">
            {{ upcomingDay.name }}
          </div>
          <div class="card-body">
            <TimeslotCard v-for="timeslot in availableTimes" :key="timeslot.id"
              :task="getTaskForTimeslot(upcomingDay, timeslot)" :timeslot="timeslot" :upcomingDay="upcomingDay"
              @open-edit-screen="openEditScreen" @complete-task="completeTask" @delete-task="deleteTask" />
          </div>
        </div>
      </div>
    </div>
  </main>

  <EditTask :editTask="editTask" :availableTimes="availableTimes" @save="handleSaveTask" />
  <CreateTask :availableTimes="availableTimes" @save="handleSaveTask" />
</template>
