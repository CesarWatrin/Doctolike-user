<script setup>
import { onMounted, ref } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { FilterMatchMode } from "primevue/api";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";

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

const takeAppointment = () => {
  sidebarOpen.value = true;
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
          <template #body>
            <Button
              label="Take an appointment"
              class="p-button-outlined"
              icon="pi pi-calendar"
              icon-pos="left"
              @click="takeAppointment"
            />
          </template>
        </Column>
      </DataTable>
      <Sidebar
        v-model:visible="sidebarOpen"
        class="p-sidebar-md h-100"
        position="right"
      >
        <div></div>
      </Sidebar>
    </div>
  </div>
</template>
