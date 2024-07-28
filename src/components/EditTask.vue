<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue';
import type { TaskInterface } from '@/interfaces/Task';
import type { TimeslotInterface } from '@/interfaces/TimeslotInterface';

const props = defineProps<{
    editTask: TaskInterface | null;
    availableTimes: TimeslotInterface[];
}>();

const emit = defineEmits<{
    (event: 'save', task: TaskInterface): void;
}>();

const isEditing = ref(!!props.editTask);

const task = ref<TaskInterface>({
    id: 0,
    title: '',
    description: '',
    due_date: '',
    timeslot_id: 0,
    completed: false,
    ...props.editTask
});

// Watch for changes to props.editTask
watch(() => props.editTask, (newVal) => {
    if (newVal) {
        task.value = { ...newVal };
        isEditing.value = true;
    } else {
        task.value = {
            id: 0,
            title: '',
            description: '',
            due_date: '',
            timeslot_id: 0,
            completed: false
        };
        isEditing.value = false;
    }
});

function getDateForOption(daysOffset: number): string {
    const today = new Date();
    today.setDate(today.getDate() + daysOffset);
    return today.toISOString().split('T')[0];
}

function submitTask() {
    if (isEditing.value) {
        emit('save', task.value);
    } else {
        emit('save', { ...task.value, id: undefined });
    }
}
</script>


<template>
    <div class="modal fade" id="editTaskModal" tabindex="-1" aria-labelledby="editTaskModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editTaskModalLabel">{{ isEditing ? 'Edit Task' : 'Create New Task' }}
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="taskForm">
                        <div class="mb-3">
                            <label for="taskTitle" class="form-label">Task Title</label>
                            <input v-model="task.title" id="taskTitle" type="text" class="form-control"
                                placeholder="Task Title" maxlength="100" required />
                        </div>
                        <div class="mb-3">
                            <label for="taskDescription" class="form-label">Description</label>
                            <textarea v-model="task.description" id="taskDescription" class="form-control"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="taskDate" class="form-label">Due Date</label>
                            <select v-model="task.due_date" id="taskDate" class="form-select" required>
                                <option value="" disabled>Select a due date</option>
                                <option :value="getDateForOption(0)">Today</option>
                                <option :value="getDateForOption(1)">Tomorrow</option>
                                <option :value="getDateForOption(2)">+3 days</option>
                                <option :value="getDateForOption(3)">+4 days</option>
                                <option :value="getDateForOption(4)">+5 days</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="taskTime" class="form-label">Timeslot</label>
                            <select v-model="task.timeslot_id" id="taskTime" class="form-select" required>
                                <option v-for="timeslot in availableTimes" :key="timeslot.id" :value="timeslot.id">{{
                                    timeslot.time }}
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" @click="submitTask">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
