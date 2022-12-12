<script setup>
import { ref } from "vue";
import "@fullcalendar/core/vdom";
import "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const events = ref([]);

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialDate: new Date(Date.now()),
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  editable: false,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
});
</script>

<template>
  <div class="lg:w-2/3 mx-4 lg:mx-auto">
    <div class="py-8">
      <h1 class="font-bold text-3xl">My appointments</h1>
    </div>
    <div class="pb-8">
      <div>
        <FullCalendar :events="events" :options="calendarOptions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 960px) {
  ::v-deep(.fc-header-toolbar) {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
