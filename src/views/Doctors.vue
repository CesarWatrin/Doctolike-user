<script setup>
import { onMounted, ref } from "vue";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { FilterMatchMode } from "primevue/api";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import Textarea from "primevue/textarea";
import Calendar from "primevue/calendar";
import Message from "primevue/message";

const doctors = ref([]);

onMounted(() => {
  onSnapshot(collection(db, "clients"), (querySnapshot) => {
    const fbClients = [];
    querySnapshot.forEach((elem) => {
      const client = {
        id: elem.id,
        first_name: elem.data().first_name,
        last_name: elem.data().last_name,
      };
      fbClients.push(client);
    });
    doctors.value = fbClients;
  });
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const sidebarOpen = ref(false);
const selectedDoctor = ref(null);
const reason = ref("");
const date = ref(new Date(Date.now()));

const takeAppointment = (doctor) => {
  sidebarOpen.value = true;
  selectedDoctor.value = doctor;
};

const messages = ref([]);
const messageLife = ref(1000);
const messageId = ref(0);
const addMessages = () => {
  messages.value = [
    {
      severity: "success",
      content: "Appointment take",
      id: messageId.value++,
    },
  ];
  setTimeout(() => {
    messages.value = [];
    sidebarOpen.value = false;
  }, messageLife.value + 500);
};

const submitAppointment = async () => {
  if (reason.value !== "") {
    try {
      await addDoc(collection(db, "appointments"), {
        user: localStorage.getItem("user"),
        client: selectedDoctor.value.id,
        client_first_name: selectedDoctor.value.first_name,
        client_last_name: selectedDoctor.value.last_name,
        reason: reason.value,
        date: date.value,
      }).then(() => {
        addMessages();
      });
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<template>
  <div class="lg:w-2/3 mx-4 lg:mx-auto">
    <div class="py-8">
      <h1 class="font-bold text-3xl">Doctors' list</h1>
    </div>
    <div class="rounded-lg overflow-hidden">
      <DataTable
        v-model:filters="filters"
        :value="doctors"
        :paginator="true"
        :row-hover="true"
        :rows="10"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]"
        responsive-layout="scroll"
      >
        <template #header
          ><div class="flex flex-wrap">
            <div class="m-2">
              <span>
                <i class="pi pi-search mr-4" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search"
                />
              </span>
            </div></div
        ></template>
        <template #empty>
          <div class="text-center">No doctors found</div>
        </template>
        <template #loading>Loading...</template>
        <Column field="first_name" :sortable="true" header="First name" />
        <Column field="last_name" :sortable="true" header="Last name" />
        <Column header="Action" header-style="width: 17rem">
          <template #body="{ data }">
            <Button
              label="Take an appointment"
              class="p-button-outlined"
              icon="pi pi-calendar"
              icon-pos="left"
              @click="takeAppointment(data)"
            />
          </template>
        </Column>
      </DataTable>
      <Sidebar
        v-model:visible="sidebarOpen"
        class="p-sidebar-md h-100"
        position="right"
      >
        <template #header>
          <div class="absolute left-4 bottom-0">
            <transition-group name="p-message" tag="div">
              <Message
                v-for="msg of messages"
                :key="msg.id"
                :life="messageLife"
                :sticky="false"
                :severity="msg.severity"
                :closable="false"
              >
                {{ msg.content }}
              </Message>
            </transition-group>
          </div>
        </template>
        <div>
          <div class="flex items-end justify-center p-4">
            <h2 class="font-bold text-xl">Appointment</h2>
            <span class="ml-4">
              Dr.
              {{ selectedDoctor.first_name + " " + selectedDoctor.last_name }}
            </span>
          </div>
          <div class="p-2">
            <span class="w-full p-float-label my-6">
              <Textarea
                class="w-full"
                v-model="reason"
                :autoResize="true"
                rows="5"
                cols="30"
              />
              <label for="reason">Reason</label>
            </span>
            <Calendar class="w-full" v-model="date" :showTime="true" />
            <div class="my-6">
              <Button label="Submit" @click="submitAppointment" />
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  </div>
</template>
