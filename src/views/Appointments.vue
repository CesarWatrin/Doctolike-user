<script setup>
import { onMounted, ref } from "vue";
import "@fullcalendar/core/vdom";
import "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const events = ref([]);

onMounted(() => {
  onSnapshot(collection(db, "appointments"), (querySnapshot) => {
    const fbAppointments = [];
    let index = 1;
    querySnapshot.forEach((elem) => {
      if (elem.data().user === localStorage.getItem("user")) {
        const date = new Date(elem.data().date.seconds * 1000);
        fbAppointments.push({
          id: index,
          title: elem.data().reason + " - Dr. " + elem.data().client_last_name,
          start:
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate() +
            "T" +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":00",
          end:
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate() +
            "T" +
            (date.getHours() + 1) +
            ":" +
            date.getMinutes() +
            ":00",
        });
      }
      index++;
    });
    events.value = fbAppointments;
  });
});

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
  events: events,
});
</script>

<template>
  <div class="lg:w-2/3 mx-4 lg:mx-auto">
    <div class="py-8">
      <h1 class="font-bold text-3xl">My appointments</h1>
    </div>
    <div class="pb-8">
      <div>
        <FullCalendar :options="calendarOptions" />
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
